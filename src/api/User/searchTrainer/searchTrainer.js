import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		searchTrainer: async (_, args) =>
			prisma.users({
				where: {
					OR: [ { area_contains: args.term }, { job: 'trainer' } ]
				}
			})
	}
};
