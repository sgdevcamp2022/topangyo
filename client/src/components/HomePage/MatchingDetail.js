import React, { useEffect, useState } from "react";
import MatchingChat from "./MatchingDetail/MatchingChat";
import MatchingUser from "./MatchingDetail/MatchingUser";
import MatchingPlace from "./MatchingDetail/MatchingPlace";
import MatchingTime from "./MatchingDetail/MatchingTime";
import io from "socket.io-client"; //소켓 import
const CONNECT_URL = "http://localhost:4000/chat"; // 채팅 소켓 연결
let socket = io.connect(CONNECT_URL); //소켓

const MatchingDetail = ({ isDetailModal, setIsDetailModal }) => {
  const handleCloseJoinModal = () => {
    setIsDetailModal(!isDetailModal);
  };

  const [room, setRoom] = useState("postId"); // 추후 현재 postId / postTitle로 바꾸기

  // 접속시 소켓 연결
  useEffect(() => {
    // socket = io.connect(CONNECT_URL);
    joinRoom();
    return () => {
      // 언마운트시 연결 해제 구현해야함
    };
  }, []);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room });
      //   setRoomBefore(room);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: "50",
        backgroundColor: "white",
        padding: "20px",
        boxSizing: "border-box",
        bottom: "0",
      }}
    >
      <button onClick={handleCloseJoinModal}>X</button>
      <h3>매칭 상세</h3>
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          height: "100%",
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
