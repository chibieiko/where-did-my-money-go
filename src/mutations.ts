import {GraphQLObjectType} from "graphql";

import {addUser, deleteUser, updateUser} from './mutations/userMutations';

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser,
        updateUser,
        deleteUser
    }
});