import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getYear, getMonth, getDate, getHours, getMinutes } from "date-fns"; // 시간 설정을 위한 라이브러리

const MatchingChat = (props) => {
  const { socket, room } = props; //socket & room
  const { id, nickname } = useSelector((state) => state.user); // 현재 로그인 유저 정보 가져오는 디스트럭팅 문법
  const [message, setMessage] = useState(""); // 내가 보낼 메세지
  const [messageReceived, setMessageReceived] = useState([]); // 받은 메세지
  let date = new Date(); // Date 객체 생성

  // 페이지 진입 시 이전채팅을 받는다.
  // chatList에서 메세지리시브에 저장한다.
  useEffect(() => {
    getPreviousChatHistory();
    socket.on("chatList", (data) => {
      setMessageReceived(data.chatList);
    });
    return () => {};
  }, []);

  // 메세지 받았을 때
  useEffect(() => {
    socket.on("receive_msg", (data) => {
      let content = {
        Id: data.Id,
        message: data.message,
        currentTime: data.currentTime,
      };
      // console.log(content);
      setMessageReceived((current) => [...current, content]);
    });
  }, []);

  const onChangeText = (e) => {
    setMessage(e.target.value);
  };

  // 이전 채팅을 받는 함수.
  const getPreviousChatHistory = () => {
    socket.emit("getPreviousChatHistory", { room });
  };

  // 메세지 보낼때
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_msg", {
      Id: id,
      message,
      room,
      currentTime: `${getHours(date)}:${
        getMinutes(date) < 10 ? `0${getMinutes(date)}` : getMinutes(date)
      }`,
    });
    setMessage("");
  };

  return (
    <div
      style={{
        width: "50%",
        padding: "50px",
      }}
    >
      <div
        style={{
          height: "95%",
          maxHeight: "95%",
          width: "100%",
          overflow: "scroll",
        }}
      >
        {
          //채팅 내용이 남는 공간
          messageReceived.map((element, i) => {
            return (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "gray",
                  borderRadius: "10px",
                  margin: "20px 0",
                  wordBreak: "break-all",
                }}
                key={i}
              >
                {element.Id} : {element.message} : {element.currentTime}
              </div>
            );
          })
        }
      </div>
      <form
        style={{
          display: "flex",
          height: "5%",
        }}
      >
        <input
          onChange={onChangeText}
          className="input-box"
          type="text"
          style={{ width: "90%" }}
          value={message}
        />
        <button tpye="submit" onClick={sendMessage} style={{ width: "10%" }}>
          전송
        </button>
      </form>
    </div>
  );
};

export default MatchingChat;
