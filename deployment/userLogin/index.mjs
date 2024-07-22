import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new DynamoDBClient({ region: "ap-southeast-2" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "Users";

const getJwtSecret = async () => {
  const secret_name = "testSecretKeyJWT";

  const jwtClient = new SecretsManagerClient({
    region: "ap-southeast-2",
  });

  let jwtResponse;

  // eslint-disable-next-line no-useless-catch
  try {
    jwtResponse = await jwtClient.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  const secret = jwtResponse.SecretString;
  return secret;
};

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const { username, password } = body;

  const params = {
    TableName: TABLE_NAME,
    Key: {
      username: username,
    },
  };

  try {
    const response = await docClient.send(new GetCommand(params));
    console.log(response, "response here");

    if (
      response.Item &&
      bcrypt.compareSync(password, response.Item.passwordHash)
    ) {
      const jwtSecret = await getJwtSecret();
      const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
      return {
        statusCode: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Login successful" }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid credentials" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not login user" }),
    };
  }
};
