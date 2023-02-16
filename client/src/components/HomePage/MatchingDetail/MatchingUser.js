import React, { useState, useEffect } from "react";

// 추후에 porps 정리할것것
const MatchingUser = (props) => {
  const {
    socket,
    room,
    applyUser,
    setApplyUser,
    matchedMembers,
    setMatchedMembers,
    id,
    currentPost,
    cancleMatching,
  } = props; //socket & room
  const [chatUser, setChatUser] = useState([]); // 유저 목록을 담는 변수

  // 유저리스트에 설정해준다. 페이지가 언마운트 될 때 다시한번 유저목록을 갱신한다.
  // 이때 서버측 leave와의 데이터베이스 접근 시간을 고려하여
  // 언마운트 후 1초후에 갱신하도록 한다.
  useEffect(() => {
    socket.on("getChatUserList", (data) => {
      setChatUser(data.chatUser);
    });

    // 글 작성자(host)와 현재 유저 검증 === 로그인 유저가 host인지 검증
    // 만약 호스트일경우 신청 유저를 받는 소켓을 연다.
    // if (props.currentPost.author_id === props.id) {
    socket.on("getApplyAndMatchedUserList", (data) => {
      setApplyUser(data.applyUser);
      setMatchedMembers(data.matchedMembers);
    });
    // }

    setTimeout(() => {
      getChatUser();
    }, 1000);
    getApplyAndMatchedUser();
    return () => {
      setTimeout(() => getChatUser(), 1000);
    };
  }, []);

  // 보내면 getUserList가 날아온다.
  const getChatUser = () => {
    socket.emit("getChatUser", { room, id });
  };

  // 보내면 getApplyAndMatchedUserList가 날아온다.
  const getApplyAndMatchedUser = () => {
    socket.emit("getApplyAndMatchedUser", { room, id });
  };

  // 신청 유저 수락 버튼 (host)
  const acceptApplyUser = (id) => {
    socket.emit("acceptApplyUser", { room, id });
  };

  //신청 유저 거절 버튼 (host)
  const declineApplyUser = (id) => {
    socket.emit("declineApplyUser", { room, id });
  };

  return (
    <div style={{ flexGrow : '1', }}>
      <p>chatUser</p>
      {chatUser?.map((element, idx) => {
        return <p key={idx}>{element}</p>;
      })}

      <p>applyUserList</p>
      {currentPost.author_id === id &&
        applyUser?.map((element, idx) => {
          return (
            <div key={idx}>
              <p>{element}</p>
              <button onClick={() => acceptApplyUser(element)}>수락</button>
              <button onClick={() => declineApplyUser(element)}>거절</button>
            </div>
          );
        })}

      <p>matchedMembersList</p>
      {matchedMembers.includes(id) && // 내가 들어가있으면서
      currentPost.author_id === id // 내가 호스트이면
        ? matchedMembers?.map((element, idx) => {
            return (
              <div key={idx}>
                <p>{element}</p>
                {element !== id ? (
                  <button onClick={() => cancleMatching(element)}>
                    매칭취소
                  </button>
                ) : null}
              </div>
            );
          })
        : matchedMembers.includes(id)
        ? matchedMembers?.map((element, idx) => {
            return (
              <div key={idx}>
                <p>{element}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default MatchingUser;
