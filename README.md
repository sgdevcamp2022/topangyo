
<p align="center">
    <img src="./client/public/images/logo/DSG_logo.png" width="150px" />
</p>

# 플레이스 매칭 커뮤니티 '동세권'
- 현재 위치를 기반으로 유저들이 다양한 오프라인 장소를 직접 선택하여 함께 즐길 수 있는 플랫폼
- 원하는 유저들과 함께 매칭을 이뤄 여러 핫플을 가보세요!

# toPangyo
## 💫 Member
- 💁🏻 우명규 <strong style="color : yellow;">FE</strong>
- 💁🏻 최성민 <strong style="color : yellow;">BE</strong>
- 💁🏻‍♀️ 류나연 <strong style="color : yellow;">FE</strong>
- 💁🏻 선원종 <strong style="color : yellow;">BE</strong>
- 💁🏻‍♀️ 전혜지 <strong style="color : yellow;">BE</strong>

## 💫 Team Goals
- LCP 2.5초 이내로 최적화하기
- 정해진 기간 내에 서버를 MSA 아키텍쳐로 구현하기

# 동세권
> 동세권 프로젝트의 전체적인 구조입니다.
## 📄 기능
- 매칭
    - 매칭방 CRUD
    - 카테고리 분류
    - 검색
- 채팅
    - 메시지 송/수신
    - 방장 권한
    - 입/퇴장 기능
- 알림
    - 알림 전송
    - 알림 받기
- 유저
    - 로그인
    - 회원가입
    - 프로필 설정
- 포스팅
    - 모집글 CRUD
    - 시간 및 장소 설정
    - 신청 기능

## 💻 Architecture
<div align="center">
    <img width="712" style="background-color : white;" alt="image" src="https://user-images.githubusercontent.com/67165016/216052089-e33693cf-d06a-444c-a697-511660697e02.png">
</div>

## 🛠 Skills
- Front-end
    - React.js
    - SCSS
    - Redux
    - Kakao map API
    - axios
    - Figma
- Back-end
    - Node.js
    - express
    - NginX
    - Socket.io
    - MariaDB
    - MongoDB
    - redis
    - gitbook
    - Insomnia

## 팀목표를 이루기 위한 노력들

### LCP최적화
> 원인 1 : 카카오맵의 로딩용량이 컸었고, 카카오맵이 필요하지 않은 페이지에서도 카카오맵이 계속 실행되어 LCP에 영향을 준 것
[기존]
```js
(public/index.html)

...
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=%REACT_APP_KAKAO_MAP%&libraries=services"
></script>
...
```

[변경]
```js
(src/components/Homepage/MainMap.js)

...
const defaultMap = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=%REACT_APP_KAKAO_MAP%&autoload=false";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        var options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
    var kakaoMap = new window.kakao.maps.Map(container, options);
    dispatch(setMap(kakaoMap));
    })}}

...

useEffect(() => {
	defaultMap()
}, [])
...
```

✅ 해당 페이지가 렌더링 될때 script태그를 생성하여 카카오맵을 표시하게 만들었고 그에따라 LCP의 성능을 5.3초 → 3.7초로 최적화 할 수 있었다.
<div align="center">
    (개선 전)
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a3e1c96b-9654-43e2-8fd0-6dc7c6cb34fe/Untitled.png)
</div>


<div align="center">
    (개선 후)
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e602b249-c54e-46a0-9aeb-2e5955692570/Untitled.png)
</div>



> 원인 2 : LCP에 영향을 끼치는 불필요한 script코드들과 css코드들이 많았음
✅ 불필요한 코드들을 정리하여 LCP의 성능을 높였고 그에따라 LCP의 성능을 3.7초 → 3.3초로 최적화 할 수 있었다.
<div align="center">
    (개선 전)
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5e97cff4-d2bc-477a-b184-0d775ab6d7f6/Untitled.png)
</div>

<div align="center">
    (개선 후)
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/de951c46-3040-4be6-831e-cef1ec7952b1/Untitled.png)
</div>




## 프로젝트 성공과 실패 혹은 아쉬운 부분 / 개선사항
### 클라이언트 ✅(성공)
1. 카카오맵 api를 활용한 구현
    - 반경 계산
    - 마커 기능 구현
    - 현재 위치 받아오기
    - Service 라이브러리를 활용한 place 정보 호출 등

2. 성능 관련 기능 요소 구현
    - 폰트 경량화
    - 필요에 따른 스크립트 호출
    - 알맞은 hook 사용 등
    
3. 주요 기능의 이벤트 핸들링
    - 응답받은 데이터를 컴포넌트에 바인딩
    - 모달을 통한 페이지 호출 줄이기
    - 일반적인 CRUD 구현 등
    
4. 협업
    - 서버와 RESTful한 데이터 요청 및 응답
    - Github를 활용한 관리 및 업데이트 되는 코드
    
### 백엔드 ✅(성공)
1. 채팅
    - 소켓을 이용한 채팅 서버 구현(채팅, 채팅 방, 장소/시간 선택)
    - Room 단위 통제
    
2. DB
    - RESTful한 api설계
    - mySQL 외부 공유 (포트 포워딩)
    
3. 알림
    - Redis, FCM, web-push라이브러리, socket등 다양한 방법 이해
    - Redis 연결 및 미들웨어로의 사용, DB와 사용하며 I/O성능 개선
    
4. 경험
    - 아키텍쳐, 목표설정 등 체계적인 팀 프로젝트의 경험
    - Github를 활용한 관리 및 업데이트 되는 코드

<hr />
### 클라이언트 ❌(실패)
- 효율적인 코드 (ex 코드 중복) 
- 예외처리
- 성능 최적화
- 반응형 웹 구현
- 카테고리 페이지네이션
- 이벤트 처리의 
- 카테고리 페이지네이션 (기본 )
- RTK활용 미흡과 prop drilling 문제
- 컴포넌트에서의 실시간 데이터 전달
- 무분별한 axios 호출
- SCSS의 활용 제대로 못함
- 많은 라이브러리 경험 X

➡️ 기능을 구현에 어려움을 많이 겪다보니 실질적으로 성능을 최적화 할 수 있는 시간도 부족했고, 코드를 다시 한번 살펴보고 리팩토링 할 여유가 없었음

<hr />

### 서버 ❌(실패)
- 모델 인덱싱
➡️ 필요 속성 호출로 대체, 사전 고려 요소가 불충분 했고 설계 과정에서 다시 확인하기

- 채팅 클러스터링
➡️ 싱글 구현을 우선 진행

- 배포
➡️ AWS 등 시간과 역량 문제가 원인

- Redis pub/sub만을 이용한 알림 구현
➡️ 단독 알림 서버 구현 실패, 채팅과 비슷하다고 생각하여 추후 채팅과 비교하여 분석

- 중복없는 DB작성
➡️ 서버 별로 DB를 나누다 보니 발생 설계 문제

- MSA 아키텍쳐를 통한 서버 구성
➡️ 통합 되었으면 좋겠다 싶은 부분이 많았음. 설계 기준을 다시 확인하고 리팩토링

- 서버 호출 최소화
➡️ 코드 리뷰를 받으며 리팩토링

- Docker 컨테이너화
➡️ 컨테이너화의 부재를 느낌, 역량 문제

- Task queue 도입
➡️ 안정적인 서비스를 위한 도입을 시도 못함. 역량문제.

- 복잡한 코드
➡️ 너무 여러 방법을 찾아보았으며 시간 관리 미흡


## 🏃🏻 Notion
<a href="https://devcamp.notion.site/toPangyo-3535f9f859ca4bbbb71cc4a89dcd694f" style="text-decoration : none; font-size:20px; color : white;">팀원들과 열심히 노력한 흔적 보러가기!</a>


