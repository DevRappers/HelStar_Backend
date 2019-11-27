import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';
import { decipherPass } from '../../../crypto';

export default {
	Mutation: {
		confirmPassword: async (_, args) => {
			const { email, password } = args;
			console.log(email, password);
			const user = await prisma.user({ email });
			const decipherPassword = decipherPass(user.password);

			console.log(decipherPassword);

			if (decipherPassword === password) {
				await prisma.updateUser({
					where: {
						id: user.id
					},
					data: {
						loginSecret: ''
					}
				});
				if (user.firstLogin === '1') {
					return generateToken(user.id);
				} else {
					return '이메일 인증이 필요합니다.';
				}
			} else {
				throw Error('비밀번호가 잘못되었습니다.');
			}
		}
	}
};
