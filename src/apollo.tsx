import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";

// const httpLink = createHttpLink({
//     uri: 'https://podspike.herokuapp.com/'
// })


// const authLink = setContext((_, {headers}) => {
//     return
// })

export const isLoggedInVar = makeVar(false);

export const client = new ApolloClient({
    uri: 'https://podspike.herokuapp.com/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read() {
                            return isLoggedInVar();
                        }
                    }
                }
            }
        }
    })
})