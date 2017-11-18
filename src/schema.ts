import {
    GraphQLFloat, GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

import db from './models';
import {mutations} from './mutations';
import UserType from './types/UserType';

export const ExpenseType = new GraphQLObjectType({
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
            resolve: expense => (
                db.category.find({
                    where: {id: expense.categoryId}
                })
            )
        }
    })
});

export const CategoryType = new GraphQLObjectType({
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