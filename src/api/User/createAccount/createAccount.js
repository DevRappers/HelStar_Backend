import { prisma } from '../../../../generated/prisma-client';
import { cipherPass } from '../../../crypto';

export default {
	Mutation: {
		createAccount: async (_, args) => {
			const {
				username,
				email,
				password,
				firstName = '',
				lastName = '',
				bio = '',
				job = '',
				area = '',
				phone = ''
			} = args;

			// username 과 email의 중복확인
			const exists = await prisma.$exists.user({
				OR: [
					{
						username
					},
					{
						email
					}
				]
			});

			// 중복된 계정정보가 있을 경우 Error 발생
			if (exists) {
				throw Error('이미 존재하는 계정명 / email 입니다.');
			}

			// 비밀번호 암호화
			const newPassword = cipherPass(password);

			await prisma.createUser({
				username,
				email,
				password: newPassword,
				firstName,
				lastName,
				bio,
				job,
				area,
				phone
			});

			return true;
		}
	}
};
