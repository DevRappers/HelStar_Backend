import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		addReplyComment: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { text, postId, parentId } = args;
			const { user } = request;

			const comment = await prisma.createComment({
				user: {
					connect: {
						id: user.id
					}
				},
				post: {
					connect: {
						id: postId
					}
				},
				text
			});

			try {
				await prisma.updateComment({
					where: {
						id: comment.id
					},
					data: {
						parent: {
							connect: {
								id: parentId
							}
						}
					}
				});
				return comment;
			} catch (e) {
				return e;
			}
		}
	}
};
