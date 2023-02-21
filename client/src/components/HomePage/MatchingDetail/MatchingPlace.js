import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/slice/modalslice";
import { setPlaceSearch } from "../../../store/slice/placeslice";

const MatchingPlace = (props) => {
  const {kakao} = window;
  const dispatch = useDispatch();
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

  useEffect(() => {
    socket.on("setPlaceInfo", (data) => {
      setPlace(data);
    });
    setTimeout(() => getPlaceInfo(), 1000);
  }, []);

  useEffect(() => {
    placeStaticMap();
  }, [place.place.latitude, place.place.longitude])

  const getPlaceInfo = () => {
    socket.emit("getPlaceInfo", { room });
  };

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
