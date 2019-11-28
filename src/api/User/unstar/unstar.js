import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		unstar: async (_, args, { request }) => {
			isAuthenticated(request);
			const { id } = args;
			const { user } = request;

			try {
				await prisma.updateUser({
					where: {
						id: user.id
					},
					data: {
						starwing: {
							disconnect: {
								id
							}
						}
					}
				});
			} catch (e) {
				return false;
			}
		}
	}
};
