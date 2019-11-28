import { prisma } from '../../../generated/prisma-client';

export default {
	User: {
		posts: ({ id }) => prisma.user({ id }).posts(),
		following: ({ id }) => prisma.user({ id }).following(),
		followers: ({ id }) => prisma.user({ id }).followers(),
		starwing: ({ id }) => prisma.user({ id }).starwing(),
		starwers: ({ id }) => prisma.user({ id }).starwing(),
		likes: ({ id }) => prisma.user({ id }).likes(),
		comments: ({ id }) => prisma.user({ id }).comments(),
		chatRoom: ({ id }) => prisma.user({ id }).rooms(),
		postsCount: ({ id }) => prisma.postsConnection({ where: { user: { id } } }).aggregate().count(),
		foodPostsCount: ({ id }) =>
			prisma
				.postsConnection({
					where: {
						AND: [ { user: { id } }, { field: 'food' } ]
					}
				})
				.aggregate()
				.count(),
		helthPostsCount: ({ id }) =>
			prisma
				.postsConnection({
					where: {
						AND: [ { user: { id } }, { field: 'helth' } ]
					}
				})
				.aggregate()
				.count(),
		followingCount: ({ id }) => prisma.usersConnection({ where: { following_some: { id } } }).aggregate().count(),
		followersCount: ({ id }) => prisma.usersConnection({ where: { followers_some: { id } } }).aggregate().count(),
		starCount: ({ id }) => prisma.usersConnection({ where: { starwers_some: { id } } }).aggregate().count(),
		fullName: (parent) => {
			return `${parent.firstName} ${parent.lastName}`;
		},
		isFollowing: async (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			try {
				return prisma.$exists.user({
					AND: [
						{ id: user.id },
						{
							following_some: {
								id: parentId
							}
						}
					]
				});
			} catch (e) {
				return false;
			}
		},
		isStaring: async (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			try {
				return prisma.$exists.user({
					AND: [
						{ id: user.id },
						{
							starwing_some: {
								id: parentId
							}
						}
					]
				});
			} catch (e) {
				return false;
			}
		},
		isSelf: (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			return user.id === parentId;
		}
	}
};
