import {
    GraphQLFloat, GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

import db from './models';
import mutation from './mutations';
import UserType from './types/UserType';

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'Root query',
        fields: () => ({
            user: {
                type: new GraphQLList(UserType),
                args: {
                    id: {type: GraphQLInt}
                },
                resolve: (root, args) => (
                    db.user.findAll({where: args})
                )
            }
        })
    }),
    mutation
});