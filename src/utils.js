import { adjectives, nouns } from './word';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from 'jsonwebtoken';
import './env';

// 이메일로 보낼 비밀값 생성
export const generateSecret = () => {
	const randomNumber = Math.floor(Math.random() * adjectives.length);
	return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

// nodemailer로 이메일 전송
export const sendMail = (email) => {
	const options = {
		auth: {
			api_user: process.env.SENDGRID_USERNAME,
			api_key: process.env.SENDGRID_PASSWORD
		}
	};
	const client = nodemailer.createTransport(sgTransport(options));
	return client.sendMail(email);
};

// 이메일 내용 작성
export const sendSecretMail = (address, secret) => {
	const email = {
		from: 'helstar@helstar.com',
		to: address,
		subject: '🗝 HelStar 첫 로그인 이메일 인증을 완료해주세요.',
		html: `HelStar(헬스타) 가입을 축하드립니다.<br/>
        첫 로그인시에는 이메일인증이 필요합니다. 하단의 key를 사이트에서 입력해주세요.<br/><br/>
        <strong>${secret}</strong><br/><br/>
        Copy paste on the app/website to log in<br/>
        Thank you. 👍    
        `
	};

	return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
