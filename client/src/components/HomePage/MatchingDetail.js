import React, { useEffect, useState } from "react";
import MatchingChat from "./MatchingDetail/MatchingChat";
import MatchingUser from "./MatchingDetail/MatchingUser";
import MatchingPlace from "./MatchingDetail/MatchingPlace";
import MatchingTime from "./MatchingDetail/MatchingTime";
import io from "socket.io-client"; //소켓 import
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/slice/modalslice";
import axios from "axios";
const CONNECT_URL_SOCKET = "http://localhost:4000/chat"; // 채팅 소켓 연결
// const CONNECT_URL = ""; // 채팅 소켓 연결
let socket = io.connect(CONNECT_URL_SOCKET); //소켓

const MatchingDetail = () => {
  const dispatch = useDispatch();
  const getPost = useSelector((state) => state.posts);
  const currentPost = getPost.currentPost;
  const [currentMatching, setCurrentMatching] = useState({});
  const [room, setRoom] = useState(currentPost.postPK); // 추후 현재 postId / postTitle로 바꾸기

  const handleCloseJoinModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    joinRoom(); //
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
    return () => {
      socket.emit("leave_room", { room });
    };
  }, []);

  // 방입장
  const joinRoom = () => {
    if (room !== 0) {
      socket.emit("join_room", { room });
    }
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
      <button onClick={handleCloseJoinModal}>X</button>
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
          }}
        >
          <MatchingUser socket={socket} room={room} />
          <MatchingPlace />
          <MatchingTime />
        </div>
      </div>
    </div>
  );
};

export default MatchingDetail;
