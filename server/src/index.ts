import express, {Application, Request, Response} from 'express'
import {user} from "./mockData/mock_data";
import graphql, {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} from "graphql";
import {graphqlHTTP} from "express-graphql"
const cors = require('cors')

const PORT: number = 4000
const app: Application = express();

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        age: {type: GraphQLInt},
        name: {type: GraphQLString}
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'Get',
    fields: {
        getAllUsers: {
            type: new GraphQLList(userType),
            resolve(parent, args) {
                return user
            }
        }
    }
});
// Format
// query {
//  getAllUsers {
//    name
//    age
//  }
//}
const Mutation = new GraphQLObjectType({
    name: 'Mut',
    fields: {
        createUsers: {
            type: userType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                //DB LOGIC GOES HERE
                user.push({name: args.name, age: args.age})
                return args
            }
        }
    }
})

// mutation {
//     createUsers(name: "Toyko", age: 4) {
//         age
//         name
//     }
// }


const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation})
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(PORT, () => {
    console.log(`connected on port ${PORT}`)
})
