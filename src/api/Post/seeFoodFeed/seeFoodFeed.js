import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		seeFoodFeed: async (_, __, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { user } = request;
			const following = await prisma.user({ id: user.id }).following();

			return prisma.posts({
				where: {
					AND: [ { field: 'food' }, { user: { id_in: [ ...following.map((user) => user.id), user.id ] } } ]
				},
				orderBy: 'createdAt_DESC'
			});
		}
	}
};
