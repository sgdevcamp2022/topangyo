import React, { useState, useEffect } from "react";

const MatchingTime = (props) => {
  const { socket, id, room } = props;
  const [meetingDate, setMeetingDate] = useState("");

  useEffect(() => {
    socket.on("setMeetingDate", (data) => {
      setMeetingDate(data.meetingDate);
    });
    setTimeout(getMeetingDate(), 1000);
  }, []);

  // 버튼 눌렀을때
  // 안에서 바뀐 시간 정보(meetingDate)가 아래 미팅데이트에 들어가면 됨.
  const getMeetingDate = () => {
    socket.emit("getMeetingDate", { room, meetingDate });
  };

  return <div style={{ flexGrow: "1" }}>MatchingTime</div>;
};

export default MatchingTime;
