import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/slice/modalslice";
import { setPlaceSearch } from "../../../store/slice/placeslice";

const MatchingPlace = (props) => {
  const dispatch = useDispatch();

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
    dispatch(setPlaceSearch(true));
    dispatch(closeModal());
    // socket.emit("setPlace", {room, place})
  };

  return (
    <div>
      MatchingPlace
      <button onClick={getPlace}>장소 선택</button>  
    </div>
  )
};

export default MatchingPlace;
