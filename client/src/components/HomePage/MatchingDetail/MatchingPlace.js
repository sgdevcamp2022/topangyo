import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/slice/modalslice";
import { setPlaceSearch } from "../../../store/slice/placeslice";

const MatchingPlace = (props) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
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

  useEffect(() => {
    if(modal.place) {
      const variables = {
        place : {
          place_name : modal.place.place_name,
          address_name : modal.place.address_name,
          place_url : modal.place.place_url,
        }
      }
      setPlace(variables);
    }
  }, [modal.place])

  // 버튼 눌렀을때
  const selectPlace = () => {
    dispatch(setPlaceSearch(true));
    dispatch(closeModal());
    // socket.emit("setPlace", {room, place})
  };

  return (
    <div>

      <button onClick={selectPlace}>장소 선택</button>  
    </div>
  )
};

export default MatchingPlace;
