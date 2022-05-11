import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { PingResolver } from "./resolvers/ping";
import { SalesPeopleResolver } from "./resolvers/SalesPeopleResolver";
import { RetailOutletsResolver } from "./resolvers/RetailOutletsResolver";
import { SalesResolver } from "./resolvers/SalesResolver";
const responseTime = require("response-time");
const fs = require("fs");
import http from "http";
const https = require("https");
const path = require("path");
const Configuration = require("./config/config");
import { DEV } from "./types/config.types";

//----------------------------------------------


export async function startServer() {
  // Same ApolloServer initialization as before, plus the drain plugin.

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PingResolver,
        SalesPeopleResolver,
        RetailOutletsResolver,
        SalesResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();

  const app = express();

  server.applyMiddleware({ app, path: "/graphql" });

  let httpServer: any;
  if (Configuration.getInstance().env !== DEV) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    httpServer = https.createServer(
      {
        key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
        cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt') ),
      },
      app
    );
   } else {
    httpServer = http.createServer(app);
  }

  app.use(responseTime());

  await new Promise<void>((resolve) =>
    httpServer.listen(
      { port: Configuration.getInstance().iWebServer.port },
      resolve
    )
  );
  
  console.log(
    "🚀 Server ready at",
    `http${Configuration.getInstance().env !== DEV ? "s" : ""}://${
      Configuration.getInstance().iWebServer.host
    }:${Configuration.getInstance().iWebServer.port}${server.graphqlPath}`
  );
}


//----------------------------------------------
