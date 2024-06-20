import {
  DynamoDBClient,
  //   GetItemCommand,
  //   DescribeTableCommand,
  PutItemCommand,
  //   DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
// import { c } from "vite/dist/node/types.d-aGj9QkWt";

const REGION = "ap-southeast-2";
// const TABLE_NAME = "Users";

const config = {
  region: REGION,
  credentials: {
    accessKeyId: "AKIAU6GD3FPF2BIGIZMI",
    secretAccessKey: "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",
    // accessKeyId: "ASIAU6GD3FPF2UW4FWO3",
    // secretAccessKey: "Ehu0wgJ7bxHlLrTvq1YTc67+x4LjX2jslSNB0uaa",
  },
};

const client = new DynamoDBClient(config);

// createTable
// putCommand
// getCommand
// updateCommand
// deleteCommand

// const getItem = async () => {
//   const params = {
//     TableName: "Users",
//     Key: {
//       UserId: { S: "123" },
//       List: { S: "sup" }, // replace "yourListValue" with the actual value
//     },
//   };

//   try {
//     const data = await client.send(new GetItemCommand(params));
//     console.log(data.Item);
//   } catch (err) {
//     console.error(err);
//   }
// };

// getItem();

// now lets add an item to the table
const putItem = async () => {
  //   const params = {
  //     TableName: "Users",
  //     Item: {
  //       UserId: { S: "123" },
  //       List: { S: `sup${new Date()}` },
  //       Name: { S: `${Math.random()}` },
  //     },
  //   };
  const params = {
    TableName: "Users",
    Item: {
      UserId: { S: "joey" },
      List: { S: `supPal` },
      Name: { S: `TomisCool` },
    },
  };

  try {
    const data = await client.send(new PutItemCommand(params));
    console.log("Item added", data);
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  //for 10 times
  putItem();
};

main();
