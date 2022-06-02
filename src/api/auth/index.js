//REST API 설계 파일
import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);
auth.post('/modify', authCtrl.modify);
auth.post('/withdrawal', authCtrl.withdrawal);

export default auth;