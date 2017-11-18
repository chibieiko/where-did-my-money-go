import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from "graphql";

import {ExpenseType} from "../schema";
import db from "../models/index";

export default new GraphQLObjectType({
    name: 'Category',
    description: 'A category for expenses',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        expenses: {
            type: new GraphQLList(ExpenseType),
            resolve: category => (
                db.expense.findAll({
                    where: {categoryId: category.id}
                })
            )
        }
    })
});