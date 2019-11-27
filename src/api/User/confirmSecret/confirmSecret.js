import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		confirmSecret: async (_, args) => {
			const { secret, email } = args;
			const user = await prisma.user({ email });
			if (user.loginSecret === secret) {
				await prisma.updateUser({ data: { firstLogin: '1' }, where: { email } });
				return true;
			} else {
				throw Error('이메일 인증코드가 잘못되었습니다. 다시시도 해주십시오.');
				return false;
			}
		}
	}
};
