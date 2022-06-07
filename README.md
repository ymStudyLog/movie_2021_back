:eyes: *_Go back to github profile to check the other repositories_* :eyes:
[![profile-badge](https://img.shields.io/badge/Github-Profile-blue?style=flat&logo=Git&logoColor=F05032)](https://github.com/ymStudyLog)

_아래 프로젝트 개요는 movie/2021/front 레포지토리에서도 동일한 내용을 확인하실 수 있습니다._ 바로가기: :point_right:[![front-link](https://img.shields.io/badge/Go_To_movie_2021_front-repository-pink?style=flat&logo=Git&logoColor=F05032)](https://github.com/ymStudyLog/movie_2021_front)

# 프로젝트 개요

### - 사용한 기술
> front : React.js, Redux <br />
> back : Node.js(Koa framework), MongoDB <br />
> deploy : AWS EC2(ubuntu v18.04) <br />
### - 목차
- [프로젝트 제목](#프로젝트-제목)
- [프로젝트 목적](#프로젝트-목적)
- [프로젝트 목표](#프로젝트-목표)
- [프로젝트 실적](#프로젝트-실적)
- [프로젝트 평가](#프로젝트-평가)
- [향후 계획](#향후-계획)
- [특이 사항 및 참고 자료](#특이-사항-및-참고-자료)

## 프로젝트 제목
Node.js&MongoDB로 백엔드를 구현하여 회원가입 및 로그인시 실시간 평점순 영화 데이터를 보여주는 React 웹 서비스.

## 프로젝트 목적
기존에 연습용으로 만든 토이 프로젝트인 영화 평점 웹서비스(built on 29/Nov/2021)에 백엔드를 연결하여 풀스택 프로젝트로 발전시키는 것.

## 프로젝트 목표
- front
    1. Redux와 Redux 미들웨어 Redux-saga 사용법을 익힌다.
    2. styled-components로 넷플릭스 웹사이트를 참고하여 전체 UI를 스타일링한다.
- back
    1. Node.js환경에서 Koa 프레임워크로 서버를 오픈하고 여러 미들웨어를 적용해서 백엔드를 구현한다.
    2. MongoDB 스키마와 모델을 생성해서 문서를 만들어 데이터를 추가하는 법을 익힌다.
    3. 직접 컨트롤러 함수를 생성해본다. - 비밀번호 변경(modify), 회원 탈퇴(withdrawal)
- AWS EC2
    1. 풀스택 프로젝트를 AWS EC2 서비스를 통해 배포한다.
## 프로젝트 실적
- front
    1. Redux와 Redux 미들웨어 Redux-saga 사용법을 익힌다. <br />
        _=> | 입력 폼 관리 : modules/auth.js | 로그인 상태 관리 : modules/user.js | 로딩 상태 관리 : modules/loading.js_ <br />
        _=> Redux-saga를 왜 사용했는지? 백엔드 서버에 보내는 요청(register, login, modify, logout, check, withdrawal)을 비동기적으로 처리하기 위해 사가를 적용함._ <br />
        _=> 영화 데이터 또한 프로젝트 렌더링과 동시에 불러와서 리덕스로 관리하는 쪽으로 수정하려고 했으나, 프로젝트의 홈인 HomePage 컴포넌트가 제대로 렌더링 되지 않는 문제가 발생했다. 그래서 영화를 디스플레이 해주는 MoviePage 컴포넌트가 렌더링될 때 리덕스에 저장하게끔 구현하려고 했으나, 영화 데이터를 불러와서 바로 디스플레이하는데도 시간이 오래걸리는데 구지 이것을 또 리덕스에 저장했다가 다시 꺼내 디스플레이 하는 것에 의미가 없다고 생각되어 수정을 포기했다._ <br />
        _=> modify 비밀번호 수정 컨트롤러 함수 구현시 발생한 문제 : 처음에 modules/auth.js에서 modify_success시에 기존 auth 상태값 업데이트 & modify_failure시에는 새로 추가한 switchError 상태값 업데이트 방식으로 관리하려고 했다. 하지만 auth 상태값은 이미 로그인/회원가입 후 회원 정보를 저장하는 것에 쓰이고 있었기 때문에 비밀번호를 수정하지 않아도 modify_success 콘솔이 찍혀 진짜 modify_success가 되었을 때와 구분이 되지 않았다. 그래서 switchAuth라는 상태값을 추가했고 modify_success시 switchAuth값을 true로 주는 리듀서를 작성하고, 폼 초기화할 때 switchAuth와 switchError값도 함께 초기화 시키게끔 initialize_Form 리듀서도 수정하였다._ <br /><br />
    2. styled-components로 넷플릭스 웹사이트를 참고하여 전체 UI를 스타일링한다. <br />
        _=> CSS파일을 외부에 작성하지 않아서 편하였으나, styled-components를 사용해서 프레임용 컴포넌트를 제작할 때(directory : components/common/) props가 많아질수록 어떤 스타일이 적용되는지 알아보기 힘들어서 수정을 여러번 하게 되었다. 프로젝트 제작시 UI부분도 미리 대략적인 구도를 짜두는 것이 컴포넌트 제작에 용이할 것 같다._ <br />
        _=> 반응형으로 제작할때 width와 height속성값을 무엇으로 줄지 고민이 많아서 잦은 수정이 이루어졌다.(rem을 사용할지 px를 사용할지...) rem은 브라우저를 기준으로 한 상대값이라 꼭 필요한 곳에서만 사용해야 한다는 것을 깨달았다._ <br />
        _=> 페이지 배경화면을 어둡게 하는 이펙트를 주려고 모든 css 속성, 특히 가상 요소들을 뒤져서 적용하려고 오랜시간을 투자하였으나 실패. 결국 배경화면으로 쓸 이미지 자체를 어둡게 수정하는 것으로 성공시켰다._ <br /><br />
- back
    1. Node.js환경에서 Koa 프레임워크로 서버를 오픈하고 여러 미들웨어를 적용해서 백엔드를 구현한다.
        _=> Express와 Koa 두 프레임워크를 두고 어떤것으로 할지 고민했으나, koa는 작업을 추가하고 싶으면 미들웨어로 만들어 등록하기만하면 되는 것이 훨씬 편하다고 생각해서 Koa로 만들었다._ <br /><br />
    2. MongoDB 스키마와 모델을 생성해서 문서를 만들어 데이터를 추가하는 법을 익힌다.
        _=> mongoose 사용했으며, mongoose 공식 문서를 참고해서 다양한 미들웨어를 알아봤다._ <br /><br />
    3. 직접 컨트롤러 함수를 생성해본다. - 비밀번호 변경(modify), 회원 탈퇴(withdrawal)
        _=> modify 미들웨어에는 Document.prototype.updateOne()을 사용하려고 했으나, Postman에서는 수정이 잘 이루어지는데 웹 사이트에서 수정 요청할때는 제대로 작동하지 않았다. 그래서 일단 문서를 찾아서(findByUsername 메서드) 비밀번호를 다시 생성해서(setPassword  메서드) 저장하는 방식으로 구현했으나, 추후 정확히 어느 부분이 에러가 발생했는지 파악하여 updateOne()을 적용할 예정이다._ <br />
        _=> withdrawal 미들웨어에는 Model.prototype.deleteOne()을 사용함._ <br /><br />
- AWS EC2
    1. 풀스택 프로젝트를 AWS EC2 서비스를 통해 배포한다. <br />
         _=> 사실상 이 프로젝트에서 가장 오래걸린 부분이고 아직도 확실하게 이해하진 못하였으나, 수많은 구글링으로 어느 정도 노하우는 쌓아둔 상태이다. 배포하면서 가장 어려웠던 부분은 아래와 같다._ <br />
        _=> Nods.js 서버와 MongoDB를 연결하는 mongoose.connect()에 파라미터로 줄 MongoDB 서버 주소와 연결 옵션을 설정하는 것이 어려웠다. mongoose 공식 문서와 구글링으로 찾아낸 후 성공적으로 연결했을 때 성취감이 말로 이룰 수 없었다._ <br />
        _=> 환경변수 설정 : git을 사용하여 EC2 인스턴스에 프로젝트를 clone 했기 때문에 환경변수가 담긴 .env 파일은 .gitignore 설정으로 clone 되지 않아 직접 서버에서 vim 명령어로 파일을 생성했으나, 계속 환경변수를 읽지 못하는 에러가 발생. 나중에 찾아보니 리눅스 환경에서는 환경변수를 따로 설정하는 방법이 있었다._ <br />
        _=>심각한 버그는 아직까지 발생한 적 없으나, 인스턴스를 중지한 후 재시작 할 때마다 MongoDB 연결이 실패하여 당황했다. 이유는 모르지만 인스턴스 재시작할 때 socket을 먼저 삭제해주고 MongoDB 연결을 진행하니 정상적으로 연결되었다._ <br /><br />

## 프로젝트 평가
- front
    1. Redux와 Redux 미들웨어 Redux-saga 사용법을 익힌다. **3.5점/5점 만점**
    2. styled-components로 넷플릭스 웹사이트를 참고하여 전체 UI를 스타일링한다. **3점/5점 만점**
- back
    1. Node.js환경에서 Koa 프레임워크로 서버를 오픈하고 여러 미들웨어를 적용해서 백엔드를 구현한다. **4점/5점 만점**
    2. MongoDB 스키마와 모델을 생성해서 문서를 만들어 데이터를 추가하는 법을 익힌다. **4점/5점 만점**
    3. 직접 컨트롤러 함수를 생성해본다. - 비밀번호 변경(modify), 회원 탈퇴(withdrawal) **3점/5점 만점**
- AWS EC2
    1. 풀스택 프로젝트를 AWS EC2 서비스를 통해 배포한다. **2.5점/5점 만점**
- **총 평가 점수** : **3.3점/5점 만점**
## 향후 계획
- 웹사이트 (특히 모바일로 접속시) 버그와 UI 수정
    1. 모바일 기기에서 보여지는 UI를 다시 구상하고 디테일 수정하기. => media query breakpoints 추가 : (min-width: 460px) & (max-width: 459px), HomePage input 요소 border-round 속성값 없애기, header width 값 수정, 버튼 크기 줄이기.
    2. 회원 탈퇴 직전 띄우는 경고창 아이폰 환경에서 작동하지 않음 -> 변경하기
    3. 영화 데이터가 로딩되지 않는 경우가 있는데 왜 그러는지 알아보기(현재 한국에서는 로딩이 되는데 시드니에서는 로딩이 안됨)
    4. 여러 브라우저에서 접속해보고 버그가 발생하는 부분 확인하기.
    5. AWS EC2 인스턴스 내부 MongoDB와 로컬 컴퓨터의 데이터 관리 프로그램 연결해서 DB 관리하기.(Robo3T와 MongoDB Compass 사용해봤는데 연결 실패)
## 특이 사항 및 참고 자료
> Do it 클론 코딩 영화 평점 웹서비스 - 노마드 코더 니꼴라스, 김형태 지음 <br />
> 리액트를 다루는 기술 - 김민준 지음
