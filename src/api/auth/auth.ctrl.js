import Joi from 'joi';
import User from '../../models/user';

/*
 * 회원가입
 * POST /api/auth/register
 */
export const register = async (ctx) => {
  //Request Body 검증
  const schema = Joi.object().keys({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    //username이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; //Conflict
      return;
    }

    //문서 인스턴스 생성
    const user = new User({
      username,
    });
    await user.setPassword(password); //비밀번호 설정
    await user.save(); //DB에 저장

    //응답할 데이터에서 hashedPassword 필드 제거
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, //7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
 * 로그인
 * POST /api/auth/login
 */
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;

  //username, password 가 없으면 에러처리
  if (!username || !password) {
    ctx.status = 401; //Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);
    //계정이 존재하지 않으면 에러처리
    if (!user) {
      ctx.status = 401;
      return;
    }

    const valid = await user.checkPassword(password);
    //잘못된 비밀번호
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, //7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
 * 로그인 상태 확인
 * GET /api/auth/check
 */
export const check = async (ctx) => {
  const { user } = ctx.state; //토큰 검증 결과 조회
  if (!user) {
    //로그인 중이 아님
    ctx.status = 401; //unauthorized
    return;
  }
  ctx.body = user;
};

/*
 * 로그아웃
 * POST /api/auth/logout
 */
export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; //No content
};

/*
 * 비밀번호 변경 
 * POST /api/auth/modify 
 */
export const modify = async (ctx) => {
  //Verify a new password form 
  const passSchema = Joi.object().keys({
    password: Joi.string().required(),
  });
  const result = passSchema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { password } = ctx.request.body;
  
  try{
    //Get an username from token
    const { username } = ctx.state.user;
    const user = await User.findByUsername(username);
    user.hashedPassword = ''; //delete the previous password first(just in case)
    await user.setPassword(password);
    await user.save();

    ctx.body = user.serialize();

    //Generate a new token
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, //7일
      httpOnly: true,
    });
  } catch(e) {
    ctx.throw(500, e);
  }
};

/*
 * 회원 탈퇴
 * POST /api/auth/withdrawal
 * Document.prototype.deleteOne() 
 */
export const withdrawal = async (ctx) => {
  //Get an username from token
  const { username } = ctx.state.user;

  try{
    const user = await User.findByUsername(username);
    await user.deleteOne();
    ctx.cookies.set('access_token');
    ctx.status = 204; //No content
  } catch(e) {
    ctx.throw(500, e);
  }
};