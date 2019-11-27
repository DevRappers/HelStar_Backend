// 모든 파일들을 이 파일에서 합침.
// 파일을 합치기 위해 필요한 패키지들을 불러옴.
import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

// fileLoader의 인자로는 path의 join을 입력함 **는 모든 폴더고 *.graphql은 graphql파일임
const allTypes = fileLoader(path.join(__dirname, '/api/**/*.graphql'));
const allResolvers = fileLoader(path.join(__dirname, '/api/**/*.js'));

// mergeTypes와 mergeResolvers로 합쳐줌
const schema = makeExecutableSchema({
	typeDefs: mergeTypes(allTypes),
	resolvers: mergeResolvers(allResolvers)
});

export default schema;
