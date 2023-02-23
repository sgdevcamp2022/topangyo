import React, { useEffect, useState } from "react";
import MatchingChat from "./MatchingDetail/MatchingChat";
import MatchingUser from "./MatchingDetail/MatchingUser";
import MatchingPlace from "./MatchingDetail/MatchingPlace";
import MatchingTime from "./MatchingDetail/MatchingTime";
import io from "socket.io-client"; //소켓 import
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/slice/modalslice";
import axios from "axios";
import { setPlaceSearch } from "../../store/slice/placeslice";
import "./../../styles/MatchingDetail.scss";
const CONNECT_URL_SOCKET = "http://localhost:4000/chat"; // 소켓 주소
const socket = io.connect(CONNECT_URL_SOCKET); // 채팅 소켓 연결

const MatchingDetail = () => {
  const dispatch = useDispatch();
  const currentPost = useSelector((state) => state.posts.currentPost);
  const matchedMembersCount = useSelector(
    (state) => state.matching.matchedMembersCount
  );
  const modal = useSelector((state) => state.modal);

  const myStorage = localStorage;
  const getMatchingPostPK = JSON.parse(myStorage.getItem("matchingPostPK"));

  const { id } = useSelector((state) => state.user); // 현재 로그인 유저 정보 가져오는 디스트럭팅 문법
  const [room, setRoom] = useState(currentPost.postPK); // 추후 현재 postId / postTitle로 바꾸기

  const [applyUser, setApplyUser] = useState([]); // 신청 유저
  const [matchedMembers, setMatchedMembers] = useState([]); // 매칭확정유저

  const handleCloseModal = () => {
    dispatch(setPlaceSearch(false));
    dispatch(closeModal());
    if (modal.place) {
      window.location.reload();
    }
  };

  useEffect(() => {
    const isContent = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3700/post/get/${currentPost.postPK}`
        );
      } catch (err) {
        console.log(err);
      }
    };
    isContent();
    joinRoom(); // room 연결

    return () => {
      leaveRoom(); // 언마운트시 room 끊기
    };
  }, [currentPost.matchingStatus]);

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

  const handleLeaveRoom = async () => {
    try {
      getMatchingPostPK.map((data, idx) => {
        if (data === currentPost.postPK) {
          getMatchingPostPK.splice(idx, 1);
          myStorage.setItem(
            "matchingPostPK",
            JSON.stringify(getMatchingPostPK)
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
    handleCloseModal();
  };

  const onConfirmMatching = async () => {
    try {
      const result = await axios.put(
        `http://localhost:3700/post/matchingstatus/${currentPost.postPK}`
      );
      alert("확정 되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  // 이름 적절히 바꿀 것
  // 현재 상태에 따라 filtering하여서 밑에 버튼을 바꾼다.
  const btn = () => {
    if (
      currentPost.author_id !== id &&
      applyUser?.includes(id) === false &&
      matchedMembers?.includes(id) === false
    )
      return (
        <button onClick={sendApplyment} className="application">
          신청
        </button>
      );
    if (currentPost.author_id !== id && applyUser?.includes(id) === true)
      return (
        <button onClick={cancleApplyment} className="non-application">
          신청취소
        </button>
      );
    if (currentPost.author_id !== id && matchedMembers?.includes(id) === true)
      return (
        <button onClick={() => cancleMatching(id)} className="non-application">
          매칭취소
        </button>
      );
    if (currentPost.author_id === id) {
      return (
        <button onClick={onConfirmMatching} className="application">
          확정
        </button>
      );
    }
  };

  return (
    <div className="chatpage">
      <div className="chatpage-container">
        <div className="chat-main">
          <div className="chat-first-text">
            <h2 className="chat-title">{currentPost.title}</h2>
            <button
              style={{ padding: 0, backgroundColor: "white" }}
              onClick={handleCloseModal}
            >
              <img width="30px" className="x-img" src="images/close.png"></img>
            </button>
          </div>
          <div className="chat-second-text">
            <div>
              매칭인원 : {matchedMembersCount.length} / 모집인원 :{" "}
              {currentPost.memberLimit}
            </div>
          </div>
        </div>
        <div className="chating">
          <MatchingChat socket={socket} room={room} />
          <div id="chat-column-line"></div>

          <div className="chat-inform">
            <div className="inform">
              <div className="inform-person">
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
              </div>
              <div className="inform-place">
                <MatchingPlace socket={socket} room={room} id={id} />
              </div>
              <div className="inform-time">
                <MatchingTime socket={socket} room={room} id={id} />
              </div>
            </div>
            <div className="inform-button">
              {btn()}
              <button className="out" onClick={handleLeaveRoom}>
                나가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingDetail;
