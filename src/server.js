// dotenv을 불러옴
require('dotenv').config();
import { GraphQLServer } from 'graphql-yoga';

// env에 PORT가 지정되어 있지 않다면 4000번으로 설정
const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query{
        hello: String!
    }
`;

const resolvers = {
	Query: {
		hello: () => 'Hi'
	}
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: PORT }, () => console.log(`Server running on http://localhost:${PORT}`));
