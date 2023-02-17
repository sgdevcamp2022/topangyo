import React, { useEffect, useState } from "react";
import MatchingChat from "./MatchingDetail/MatchingChat";
import MatchingUser from "./MatchingDetail/MatchingUser";
import MatchingPlace from "./MatchingDetail/MatchingPlace";
import MatchingTime from "./MatchingDetail/MatchingTime";
import io from "socket.io-client"; //소켓 import
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/slice/modalslice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setPlaceSearch } from "../../store/slice/placeslice";
const CONNECT_URL_SOCKET = "http://localhost:4000/chat"; // 소켓 주소
const socket = io.connect(CONNECT_URL_SOCKET); // 채팅 소켓 연결

const MatchingDetail = () => {
  const dispatch = useDispatch();
  const getPost = useSelector((state) => state.posts);
  const currentPost = getPost.currentPost;

  const myStorage = localStorage;
  const getMatchingPost = JSON.parse(myStorage.getItem('matchingPost'));

  const { id } = useSelector((state) => state.user); // 현재 로그인 유저 정보 가져오는 디스트럭팅 문법
  const [currentMatching, setCurrentMatching] = useState({});
  const [room, setRoom] = useState(currentPost.postPK); // 추후 현재 postId / postTitle로 바꾸기

  const [applyUser, setApplyUser] = useState([]); // 신청 유저
  const [matchedMembers, setMatchedMembers] = useState([]); // 매칭확정유저



  const handleCloseModal = () => {
    dispatch(setPlaceSearch(false));
    dispatch(closeModal());
  };

  useEffect(() => {
    const isContent = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3700/post/get/${currentPost.postPK}`
        );
        setCurrentMatching(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    isContent();
    joinRoom(); // room 연결

    return () => {
      leaveRoom(); // 언마운트시 room 끊기
    };
  }, []);

  // 방입장
  const joinRoom = () => {
    if (room !== 0) {
      socket.emit("join_room", { room, id });
    }
  };

  // 방퇴장
  const leaveRoom = () => {
    socket.emit("leave_room", { room, id });
  };

  // 신청(물어봐서 ㅇㅋ한사람만 신청하도록 변경하기,
  const sendApplyment = () => {
    socket.emit("applyment", { room, id });
  };

  // 신청 취소
  const cancleApplyment = () => {
    socket.emit("cancleApplyment", { room, id });
  };

  // 매칭 취소
  const cancleMatching = (id) => {
    socket.emit("cancleMatcing", { room, id });
  };

  const handleLeaveRoom = () => {
    getMatchingPost.map((data, idx) => {
      if(data.postPK == currentPost.postPK) {
        getMatchingPost.splice(idx,1);
        myStorage.setItem('matchingPost', JSON.stringify(getMatchingPost))
      }
    })
    handleCloseModal();
  }

  // 이름 적절히 바꿀 것
  // 현재 상태에 따라 filtering하여서 밑에 버튼을 바꾼다.
  const btn = () => {
    if (
      currentPost.author_id !== id &&
      applyUser?.includes(id) === false &&
      matchedMembers?.includes(id) === false
    )
      return <button onClick={sendApplyment}>신청</button>;
    if (currentPost.author_id !== id && applyUser?.includes(id) === true)
      return <button onClick={cancleApplyment}>신청취소</button>;
    if (currentPost.author_id !== id && matchedMembers?.includes(id) === true)
      return <button onClick={() => cancleMatching(id)}>매칭취소</button>;
  };

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "100",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        padding: "10px",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
      }}
    >
      <button onClick={handleCloseModal}>모달창 닫기</button>
      <h3>매칭 상세</h3>
      <h2>방제목 : {currentMatching.title}</h2>
      <h2>{currentMatching.author_nickname}의 방</h2>
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          height: "80%",
          boxSizing: "border-box",
        }}
      >
        <MatchingChat socket={socket} room={room} />
        <div
          style={{
            width: "50%",
            backgroundColor: "yellow",
            padding: "50px",
            boxSizing: "border-box",
            display: 'flex',
            flexDirection : 'column'
          }}
        >
          <MatchingUser
            socket={socket}
            room={room}
            id={id}
            currentPost={currentPost}
            applyUser={applyUser}
            setApplyUser={setApplyUser}
            matchedMembers={matchedMembers}
            setMatchedMembers={setMatchedMembers}
            cancleMatching={cancleMatching}
          />
          <MatchingPlace socket={socket} room={room} id={id} currentPost={currentPost} />
          <MatchingTime socket={socket} room={room} id={id} />
          {btn()}
        </div>
      </div>
      <button onClick={handleLeaveRoom}>매칭방 나가기</button>
    </div>
  );
};

export default MatchingDetail;
