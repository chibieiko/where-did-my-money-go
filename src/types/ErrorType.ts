import {GraphQLObjectType, GraphQLString} from "graphql";

export default new GraphQLObjectType({
    name: 'Error',
    description: 'Used to display custom errors',
    fields: () => ({
        path: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        }
    })
})