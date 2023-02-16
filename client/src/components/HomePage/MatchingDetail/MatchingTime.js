import React, { useState, useEffect } from "react";

const MatchingTime = (props) => {
  const {socket,id,room} = props
  const [meetingDate, setMeetingDate] = useState("")

  useEffect(() => {
    socket.on("getMeetingDate", (data) => {
      setMeetingDate(data.meetingDate);
    });
  }, []);

    // 버튼 눌렀을때
    const getMeetingDate = () => {
      // socket.emit("setMeetingDate", {room, meetingDate})
    };
  
  return (
    <div>MatchingTime</div>
  )
}

export default MatchingTime