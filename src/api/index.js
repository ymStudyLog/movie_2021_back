import Router from 'koa-router';
import auth from './auth';

const api = new Router();

//각각의 경로에('/auth') 아래 api들(auth)로 라우터를 적용한다는(routes())뜻 
api.use('/auth', auth.routes());

//라우터를 내보낸다.
export default api;