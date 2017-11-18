import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from "graphql";

import {CategoryType, ExpenseType} from "../schema";
import db from "../models/index";

export default new GraphQLObjectType({
    name: 'UserType',
    description: 'Owner of the budget.',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        username: {
            type: GraphQLString
        },
        expenses: {
            type: new GraphQLList(ExpenseType),
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (user, args) => {
                if (args !== {}) {
                    return db.expense
                        .findAll({where: {...args, userId: user.id}})
                }
                return user.getExpenses();
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (user, args) => {
                if (args !== {}) {
                    return db.category
                        .findAll({where: {...args, userId: user.id}})
                } else {
                    return user.getCategories();
                }
            }
        }
    })
});