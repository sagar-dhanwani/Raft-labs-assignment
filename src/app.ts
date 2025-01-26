// src/app.ts
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./modules/graphql/schema";
import { authMiddleware } from "./middleware/auth";

const app = express();

app.use(express.json());
app.use(authMiddleware);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

export default app;
