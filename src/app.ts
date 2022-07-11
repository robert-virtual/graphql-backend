import { PrismaClient } from '@prisma/client'
import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { DocumentNode } from 'graphql'
import { createServer } from 'http'
import fs from 'fs'
const prisma = new PrismaClient()

interface params {
  typeDefs: DocumentNode
  resolvers: any
}
async function startApolloServer(
  { typeDefs,
    resolvers }: params
) {
  const app = express()
  const port = process.env.PORT || 3000
  const httpServer = createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()
  server.applyMiddleware({ app })

  httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
  })

}

const typeDefs = gql`${fs.readFileSync("./src/schema.graphql").toString()}`

const resolvers = {
  Query: {
    async books() {
      return await prisma.book.findMany()
    }
  },
  Mutation: {
    async addBook(_parent: any, args: any, _ctx: any, _info: any) {
      let book = await prisma.book.create({ data: args.book })
      return book
    },
    async addAuthor(_parent: any, args: any, _ctx: any, _info: any) {
      let author = await prisma.author.create({ data: args.author })
      return author
    }
  }
}

startApolloServer({ typeDefs, resolvers })

