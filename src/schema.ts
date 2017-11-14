import {
    GraphQLFloat, GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

import db from './models';

const UserType = new GraphQLObjectType({
    name: 'User',
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

const ExpenseType = new GraphQLObjectType({
    name: 'Expense',
    description: 'An expense of the user',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        price: {
            type: GraphQLFloat
        },
        date: {
            type: GraphQLString
        },
        category: {
            type: CategoryType,
            resolve: (root, args) => {
                // todo get all categories where expense.categoryId == category.id
            }
        }
    })
});

const CategoryType = new GraphQLObjectType({
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
            type: new GraphQLList(ExpenseType)
        }
    })
});

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'query',
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
    })
});