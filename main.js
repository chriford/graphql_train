const express = require("express")
// const lodash = require("lodash")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./graphql_schema/schema")
const dotenv = require("dotenv");
dotenv.config()

const app = express();
const port = process.env.PORT;

app.use((request, reponse, next) => {
  console.log(request.rawHeaders[1])
  next()
})

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(port, ()=>{
  console.log(`running on ${port}`)
})
