import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/slice/modalslice";
import { setPlaceSearch } from "../../../store/slice/placeslice";

const MatchingPlace = (props) => {
  const {kakao} = window;
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const { currentPost } = props;
  const { socket, id, room, matchedMembers } = props;

  const [place, setPlace] = useState({
    place: {
      place_name: null,
      address_name: null,
      place_url: null,
      latitude : null,
      longitude : null,
    },
  });
  
  
  const placeStaticMap = async () => {
    try{
      var markerPosition  = new kakao.maps.LatLng(place.place.longitude, place.place.latitude); 
      var marker = {
        position: markerPosition,
        text : place.place.place_name,
      };

      const staticMapContainer = document.getElementById('static-map'),
      staticMapOption = {
        center : new kakao.maps.LatLng(place.place.longitude, place.place.latitude),
        level : 3,
        marker : marker
      };
      const staticMap = await new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
      
    }catch(err) {
      console.log(err)
    }
  }

  //------------------------------------------------------
  // 들어오면 place정보를 가져온다.
  //------------------------------------------------------
  useEffect(() => {
    socket.on("setPlaceInfo", (data) => {
      setPlace(data);
    });
    setTimeout(() => getPlaceInfo(), 1000);
  }, []);

  useEffect(() => {
    placeStaticMap();
  }, [place.place.latitude, place.place.longitude])

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
    <div className="matching-place">
      <h2>장소</h2>
      <hr />
      <button className="place-btn" onClick={selectPlace}>장소 선택</button>
      {
        place.place.place_name ?
        (
          <div className="place-area">
            <a className="place-card" href={place.place?.place_url} target="_blank">
              {
                place.place.latitude && place.place.longitude ?
                (
                  <div className="place-map" id="static-map"></div>
                )
                :
                null
              }
              <h3 className="place-text">{place.place?.place_name}</h3>
              <p className="place-text">{place.place?.address_name}</p>
            </a>
          </div>
        )
        :
        null
      }
    </div>
  );
};

export default MatchingPlace;
