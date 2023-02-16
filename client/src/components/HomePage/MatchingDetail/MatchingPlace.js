import React, { useState, useEffect } from "react";

const MatchingPlace = (props) => {
  const {socket,id,room} = props
  const [place, setPlace] = useState({
    place: {
      place_name: "",
      address_name: "",
      place_url: "",
    },
  });

  useEffect(() => {
    socket.on("getPlaceInfo", (data) => {
      setPlace(data.place);
    });
  }, []);

  // 버튼 눌렀을때
  const getPlace = () => {
    // socket.emit("setPlace", {room, place})
  };

  return <div>MatchingPlace</div>;
};

export default MatchingPlace;
