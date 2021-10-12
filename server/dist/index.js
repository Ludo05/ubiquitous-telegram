"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mock_data_1 = require("./mockData/mock_data");
var graphql_1 = require("graphql");
var express_graphql_1 = require("express-graphql");
var cors = require('cors');
var PORT = 4000;
var app = express_1.default();
var userType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: function () { return ({
        age: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString }
    }); }
});
var RootQuery = new graphql_1.GraphQLObjectType({
    name: 'Get',
    fields: {
        getAllUsers: {
            type: new graphql_1.GraphQLList(userType),
            resolve: function (parent, args) {
                return mock_data_1.user;
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
var Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mut',
    fields: {
        createUsers: {
            type: userType,
            args: {
                name: { type: graphql_1.GraphQLString },
                age: { type: graphql_1.GraphQLInt }
            },
            resolve: function (parent, args) {
                //DB LOGIC GOES HERE
                mock_data_1.user.push({ name: args.name, age: args.age });
                return args;
            }
        }
    }
});
// mutation {
//     createUsers(name: "Toyko", age: 4) {
//         age
//         name
//     }
// }
var schema = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: Mutation });
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(PORT, function () {
    console.log("connected on port " + PORT);
});
