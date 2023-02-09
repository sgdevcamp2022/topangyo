import React, { useState, useEffect } from "react";

const MatchingUser = (props) => {
  const { socket, room } = props; //socket & room
  const [userList, setUserList] = useState([]); // 유저 목록을 담는 변수

  // 체크룸을 보내면 getUserList가 날아온다.
  const checkRoom = () => {
    socket.emit("checkRoom", { room });
  };

  // room에 조인이 진행되었을 때 마다 새로운 유저 리스트를 가져옴.
  useEffect(() => {
    checkRoom();
    return () => {};
  }, [props.joinRoom]);

  // 유저리스트에 설정해준다. 페이지가 언마운트 될 때 다시한번 유저목록을 갱신한다.
  // 이때 서버측 leave와의 데이터베이스 접근 시간을 고려하여
  // 언마운트 후 1초후에 갱신하도록 한다.
  useEffect(() => {
    socket.on("getUserList", (data) => {
      setUserList(data.userList);
    });
    return () => {
      setTimeout(() => checkRoom(), 1000);
    };
  }, []);

  return (
    <div>
      {userList.map((element, idx) => {
        return <p>{element}</p>;
      })}
    </div>
  );
};

export default MatchingUser;
