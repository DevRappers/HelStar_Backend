import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		upload: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { user } = request;
			const { caption, location, files, field } = args;
			const post = await prisma.createPost({
				caption,
				location,
				field,
				user: {
					connect: {
						id: user.id
					}
				}
			});

			// 파일 목록 생성
			files.forEach(async (file) => {
				await prisma.createFile({
					url: file,
					post: {
						connect: {
							id: post.id
						}
					}
				});
			});
			return post;
		}
	}
};
