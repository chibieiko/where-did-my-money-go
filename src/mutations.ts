import {GraphQLObjectType} from "graphql";

import {addUser, deleteUser, updateUser} from './mutations/userMutations';
import {addCategory, updateCategory} from "./mutations/categoryMutations";

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser,
        updateUser,
        deleteUser,
        addCategory,
        updateCategory
    }
});