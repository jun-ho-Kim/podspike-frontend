module.exports = {
    client: {
        include: ["./src/**/*.{tsx,ts}"],
        tagName: "gql",
        service: { 
            name: "podspike-backend",
            url: 'https://podspike.herokuapp.com/graphql',
        },
    },
};