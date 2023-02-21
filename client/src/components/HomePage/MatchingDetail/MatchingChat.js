import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getHours, getMinutes } from "date-fns"; 
import ChatOut from "./ChatOut";
import ChatIn from "./ChatIn";

const MatchingChat = (props) => {
  const { socket, room } = props; 
  const { id } = useSelector((state) => state.user); 
  const [message, setMessage] = useState(""); 
  const [messageReceived, setMessageReceived] = useState([]); 
  let date = new Date(); 

  // 페이지 진입 시 이전채팅을 받는다.
  // chatList에서 메세지리시브에 저장한다.
  useEffect(() => {
    getPreviousChatHistory();
    socket.on("chatList", (data) => {
      setMessageReceived(data.chatList);
    });
    return () => {};
  }, []);

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      let content = {
        Id: data.Id,
        message: data.message,
        sendAt: data.sendAt,
      };
      setMessageReceived((current) => [...current, content]);
    });
  }, []);

  const onChangeText = (e) => {
    setMessage(e.target.value);
  };

  const getPreviousChatHistory = () => {
    socket.emit("getPreviousChatHistory", { room });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_msg", {
      Id: id,
      message,
      room,
      sendAt: `${getHours(date)}:${
        getMinutes(date) < 10 ? `0${getMinutes(date)}` : getMinutes(date)
      }`,
    });
    setMessage("");
  };

  return (
    <form className='matchingchat' onSubmit={sendMessage}>
      <div className='matchingchat-container'>
        <div className ="ballon-container">
          {
            messageReceived.map((element, i) => {
              return (
                <div
                  style={{
                    clear : 'right',
                    wordBreak : 'break-all'
                }}
                  key ={i}>
                    {
                      element.Id === id ?
                      (
                        <ChatOut element={element}/>
                      )
                      :
                      (
                        <ChatIn element={element}/>
                      )
                    }
                </div>
              )  
            })
          }
        </div>
      </div> 
      <div className="send-container">
        <input value={message} type="text" className="chat-input" onChange={onChangeText}/>
        <button className="chat-submit-button" type="submit">전송</button>
      </div>
    </form>
  );
};

export default MatchingChat;
