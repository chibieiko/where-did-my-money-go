import {GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";

export const schema = new GraphQLSchema({
   query: new GraphQLObjectType({
       name: 'Query',
       description: 'test',

       fields: () => ({
           user: {type: GraphQLString}
       })
   })
});