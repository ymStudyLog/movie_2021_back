//모듈 import
require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

//컨트롤러 파일 import
import api from './api';

//jwt 미들웨어 파일 import 
import jwtMiddleware from './lib/jwtMiddleware';

//환경변수로 MongoDB와 연결
const { PORT, MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI, {
    ignoreUndefined: true, 
    useNewUrlParser: true, 
    useFindAndModify: false, 
  })
  .then(() => {
    console.log('MongoDB 연결 성공');
  })
  .catch((e) => {
    console.log(e);
  });

//모듈로 만든 새 인스턴스
const app = new Koa();
const router = new Router();

//라우터 설정
router.use('/api', api.routes());

//서버에 미들웨어 등록
app.use(bodyParser()); //라우터 적용 전에 bodyParser적용 필수

app.use(jwtMiddleware); //토큰 검증 미들웨어

//서버에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../movieapp-front/build');
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

//서버 오픈
const port = PORT || 4000;
app.listen(port, () => {
  console.log('%d번 서버 오픈 성공', port);
});
