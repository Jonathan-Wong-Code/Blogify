const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const cookieParser = require("cookie-parser");
const isAuthenticated = require("./middleware/auth");

const app = express();
const dotenv = require("dotenv");
const path = "/graphql";
dotenv.config({ path: "./config.env" });

app.use(express.json());

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000"
};

app.use(path, isAuthenticated);
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: request => ({ request })
});

server.applyMiddleware({ app, path, cors: corsOptions });

const db = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Mongoose connected");
    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    );
  })
  .catch(err => {
    console.log(err);
  });
