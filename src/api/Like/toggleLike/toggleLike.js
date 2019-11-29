import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		toggleLike: async (_, args, { request }) => {
			isAuthenticated(request);

			const { postId } = args;
			const { user } = request;

			const filterOptions = {
				AND: [
					{
						user: {
							id: user.id
						}
					},
					{
						post: {
							id: postId
						}
					}
				]
			};

			try {
				// 현재 로그인한 유저가 포스트에 좋아요를 눌렀는지 확인함
				const existingLike = await prisma.$exists.like(filterOptions);
				if (existingLike) {
					await prisma.deleteManyLikes(filterOptions);
				} else {
					await prisma.createLike({
						user: {
							connect: {
								id: user.id
							}
						},
						post: {
							connect: {
								id: postId
							}
						}
					});
				}
				return true;
			} catch (e) {
				return false;
			}
		}
	}
};
