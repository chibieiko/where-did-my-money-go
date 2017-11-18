import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

import {UserType} from './schema';
import db from './models';

console.log("KÄYTTÄJÄ: ", UserType);

export const mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args) {
                let newUser = db.user.build({
                    username: args.username
                });

                return newUser.save()
                    .then(user => user)
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
});