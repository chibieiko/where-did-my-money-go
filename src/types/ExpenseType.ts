import {
    GraphQLFloat,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';
import CategoryType from './CategoryType';
import db from '../models/index';

export default new GraphQLObjectType({
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