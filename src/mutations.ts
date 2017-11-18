import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

import UserType from './types/UserType';
import db from './models';


export default new GraphQLObjectType({
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