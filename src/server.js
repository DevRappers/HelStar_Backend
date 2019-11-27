import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';
import './env';

// env에 PORT가 지정되어 있지 않다면 4000번으로 설정
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
	schema,
	context: ({ request }) => ({ request })
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => console.log(`HelStar Server running on http://localhost:${PORT}💙`));
