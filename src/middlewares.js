// 인증관련
export const isAuthenticated = (request) => {
	if (!request.user) {
		throw Error('에러 : 로그인되어 있지 않습니다. 다시 로그인해주세요.');
	}
	return;
};
