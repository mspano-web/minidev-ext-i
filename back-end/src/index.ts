import "reflect-metadata";
import { startServer } from "./app";
const connectPostgres  = require("./config/database");

//----------------------------------------------

async function main() {
  try {
    await connectPostgres.getInstance();
    await startServer();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Fail in start up!")
  }
}

main();

//----------------------------------------------
