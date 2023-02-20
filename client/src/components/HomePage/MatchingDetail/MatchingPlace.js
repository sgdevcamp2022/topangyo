import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/slice/modalslice";
import { setPlaceSearch } from "../../../store/slice/placeslice";

const MatchingPlace = (props) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const { currentPost } = props;
  const { socket, id, room, matchedMembers } = props;

  const [place, setPlace] = useState({
    place: {
      place_name: "",
      address_name: "",
      place_url: "",
    },
  });

  //------------------------------------------------------
  // 들어오면 place정보를 가져온다.
  //------------------------------------------------------
  useEffect(() => {
    socket.on("setPlaceInfo", (data) => {
      setPlace(data);
    });
    setTimeout(() => getPlaceInfo(), 1000);
  }, []);

  /**
  useEffect(() => {
    //currentPost.matchingStatus === true &&
    if (modal.place) {
      const variables = {
        place: {
          place_name: modal.place.place_name,
          address_name: modal.place.address_name,
          place_url: modal.place.place_url,
        },
      };
      setPlace(variables);
      socket.emit("setPlace", { room, place: variables });
    }
  }, [modal.place]);
 */

  const getPlaceInfo = () => {
    socket.emit("getPlaceInfo", { room });
  };

  //------------------------------------------------------
  // axios를 통해 http://localhost:4100/match/setPlace POST(주소확인할것)
  // 으로 body:{ room : (바꾸려는 글의 postPK), plcae : {양식에 맞는 place정보} }
  // 를 보낸다. 그러면 해당하는 디비 데이터의 place 정보가 update된다.

  // 만약 members만 장소 선택이 가능하도록 할것이라면
  // if(matchedMembers) 로 하면됨.

  /**
{
  "room" : "61",
  "place" : {
    "place_name" : "밥집",
    "address_name" : "영등포",
    "place_url" :"하하하"
  }
} 
*/
  //------------------------------------------------------
  const selectPlace = () => {
    dispatch(setPlaceSearch(true));
    dispatch(closeModal());
  };

  return (
    <div>
      <div>
        {console.log(place)}
        <p>{place.place?.place_name}</p>
        <p>{place.place?.address_name}</p>
        <p>{place.place?.place_url}</p>
      </div>
      <button onClick={selectPlace}>장소 선택</button>
    </div>
  );
};

export default MatchingPlace;
