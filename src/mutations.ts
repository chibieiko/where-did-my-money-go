import {GraphQLObjectType} from "graphql";

import {addUser, deleteUser, updateUser} from './mutations/userMutations';
import {
    addCategory,
    deleteCategory,
    updateCategory
} from "./mutations/categoryMutations";
import {addExpense} from "./mutations/expenseMutations";

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser,
        updateUser,
        deleteUser,
        addCategory,
        updateCategory,
        deleteCategory,
        addExpense
    }
});