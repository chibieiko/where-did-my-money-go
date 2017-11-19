import {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString
} from "graphql";
const pick = require('lodash.pick');

import db from "../models/index";
import UserType from "../types/UserType";
import UserResponseType from "../types/UserResponseType";

const formatErrors = (error, path = 'Unknown', message = 'Something went wrong') => {
    if (error && error instanceof db.sequelize.ValidationError) {
        return error.errors.map(x => pick(x, ['path', 'message']));
    }

    return [{path: path, message: message}]
};

export const addUser = {
    type: UserResponseType,
    args: {
        username: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, args) {
        let newUser = db.user.build({
            username: args.username
        });

        return newUser.save()
            .then(user => {
                return {
                    ok: true,
                    user: user
                }
            })
            .catch(error => {
                return {
                    ok: false,
                    errors: formatErrors(error)
                };
            })
    }
};

export const updateUser = {
    type: UserResponseType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        username: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, args, context) {
        db.user.update({
                username: args.username
            },
            {
                where: {
                    id: args.id
                }
            })
            .then(result => {
                console.log(result);
                if (result[0] == 1) {
                    return result;
                } else {

                    console.log("KONTEKSTI", context);
                    //context.Errors.Add(new ExecutionError("Nothing to update with given id"));
                    return null;
                }
                // todo return updated result if result == 1 else custom message
            });
    }
};

export const deleteUser = {
    type: UserType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, args) {
        return db.user.destroy({
            where: {
                id: args.id
            }
        })
            .then(result => {
                return {id: args.id};
            });
    }
};