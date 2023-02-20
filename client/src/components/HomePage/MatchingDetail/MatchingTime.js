import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MatchingTime = (props) => {
  const { socket, id, room } = props;
  const [meetingDate, setMeetingDate] = useState("");
  const getPost = useSelector((state) => state.posts);
  const currentPost = getPost.currentPost;


  useEffect(() => {
    socket.on("setMeetingDate", (data) => {
      setMeetingDate(data.meetingDate);
    });
    setTimeout(() => getMeetingDate(), 1000);
  }, []);

  // 버튼 눌렀을때
  // 안에서 바뀐 시간 정보(meetingDate)가 아래 미팅데이트에 들어가면 됨.
  const getMeetingDate = (e) => {
    socket.emit("getMeetingDate", { room, meetingDate });
  };

  return (
    <div className="matching-time">
      <h2>시간</h2>
      <hr />
      <div style={{ margin : '20px 0' }}>
        <h2>
          {
            currentPost ?
            (
              currentPost?.meetTime
            )
            :
            null
          }
        </h2>
      </div>
    </div>
  )
};

export default MatchingTime;
