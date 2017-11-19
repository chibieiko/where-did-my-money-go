import {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString
} from "graphql";

import db from "../models/index";
import UserType from "../types/UserType";
import {formatErrors, generateResponseType} from "../types/ResponseType";

export const addUser = {
    type: generateResponseType(UserType, 'addUserResponse'),
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
                    result: user
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
    type: generateResponseType(UserType, 'updateUserResponse'),
    args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        username: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, args) {
        return db.user.update({
                username: args.username
            },
            {
                where: {
                    id: args.id
                }
            })
            .then(result => {
                if (result[0] == 1) {
                    return {
                        ok: true
                    };
                } else {
                    return {
                        ok: false,
                        errors: formatErrors(null, 'id', 'Nothing to update with given id.')
                    };
                }
            })
            .catch(error => {
                return {
                    ok: false,
                    errors: formatErrors(error)
                };
            });
    }
};

export const deleteUser = {
    type: generateResponseType(UserType, 'deleteUserResponse'),
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
                if (result == 1) {
                    return {
                        ok: true
                    }
                } else {
                    return {
                        ok: false,
                        errors: formatErrors(null, 'id', 'Nothing to delete with given id')
                    };
                }
            })
            .catch(error => {
                return {
                    ok: false,
                    errors: formatErrors(error)
                }
            });
    }
};