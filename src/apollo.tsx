import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const authTokenVar = makeVar(token);
export const isLoggedInVar = makeVar(Boolean(token));

const httpLink = createHttpLink({
    uri: process.env.NODE_ENV ==="production"
    ? 'https://podspike.herokuapp.com/graphql': 
    'https://podspike.herokuapp.com/graphql'
    // 'http://localhost:5000/graphql'
});

const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "x-jwt": authTokenVar() ?? ""
      }
    };
  });


// const authLink = setContext((_, {headers}) => {
//     return
// })


export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    // uri: 'https://podspike.herokuapp.com/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read() {
                            return isLoggedInVar();
                        }
                    },
                    token: {
                        read() {
                            return authTokenVar();
                        }
                    }
                }
            }
        }
    })
})