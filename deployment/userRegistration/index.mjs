import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

console.log(PutCommand, DynamoDBDocumentClient);

const TABLE_NAME = "Users";

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

const client = new DynamoDBClient({ region: "ap-southeast-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const { username, password } = body;
  console.log("here", username, password);

  // Generate salt and hash the password
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  console.log(username, passwordHash);

  const params = {
    TableName: TABLE_NAME,
    Item: {
      PK: username,
      SK: "123",
      passwordHash: passwordHash,
    },
  };
  console.log(params);
  console.log(secret);
  try {
    const response = await docClient.send(new PutCommand(params));
    console.log(response, "response");
    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
    console.log(token, "token");
    return {
      statusCode: 201,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`, // 1 hour expiration
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "User created successfully" }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not create user" }),
    };
  }
};
