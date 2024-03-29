import { PrismaClient } from '@prisma/client'
import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { DocumentNode } from 'graphql'
import { createServer } from 'http'
import fs from 'fs'
const prisma = new PrismaClient()

console.log('ready to deploy');

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
    },
    async authors(_parent: any, _args: any, _ctx: any, _info: any) {
      return await prisma.author.findMany()
    },
    async book(_: any, { id }: { id: string }) {
      return await prisma.book.findUnique({ where: { id } })
    },
    async author(_: any, { id }: { id: string }) {
      return await prisma.author.findUnique({ where: { id } })
    }
  },
  Mutation: {
    async addBook(_parent: any, args: any, _ctx: any, _info: any) {
      args.book.year = new Date(args.book.year).toTimeString()
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

