import {GraphQLBoolean, GraphQLList, GraphQLObjectType} from "graphql";
import ErrorType from "./ErrorType";
import UserType from "./UserType";

export default new GraphQLObjectType({
    name: 'UserResponseType',
    description: 'Defines what is returned when doing user mutations',
    fields: () => ({
        ok: {
            type: GraphQLBoolean
        },
        errors: {
            type: new GraphQLList(ErrorType)
        },
        user: {
            type: UserType
        }
    })
})