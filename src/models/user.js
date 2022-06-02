import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

UserSchema.methods.setPassword = async function(password) {
    const hashed = await bcrypt.hash(password, 10);
    this.hashedPassword = hashed;
};

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; //true / false
};

UserSchema.statics.findByUsername = function(username) {
    return this.findOne({ username });
};

/*
 * 문서 데이터를 JSON 데이터로 변환 후 -> 민감한 데이터(비밀번호 같은)를 제거하는 작업 함수화
 */
UserSchema.methods.serialize = function() {
    const data = this.toJSON(); //this = 문서
    delete data.hashedPassword;
    return data;
};

/*
 * 토큰 발급 인스턴스 메서드
 */
UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
        //첫번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터
        {
            _id: this.id,
            username: this.username,
        },
        process.env.JWT_KEY, //두번째 파라미터에는 JWT 비밀키
        {
            expiresIn: '7d', //7일 동안 유효함
        },
    );
    return token;
};

const User = mongoose.model('MovieUser', UserSchema);
export default User;