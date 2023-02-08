import React, { useEffect } from "react";

const MatchingUser = (props) => {
  const { socket, room } = props; //socket & room

  const checkRoom = () => {
    socket.emit("check", { room });
  };
  useEffect(() => {
    // checkRoom();
    return () => {};
  }, []);

  // useEffect(() => {
  //   socket.on("getUserList", (data) => {
  //     console.log(data.list);
  //   });
  //   return () => {};
  // }, [socket]);

  return <div>MatchingUser</div>;
};

export default MatchingUser;
