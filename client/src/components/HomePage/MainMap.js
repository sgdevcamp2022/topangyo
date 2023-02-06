import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLocation } from "../../store/store";
import "./../../styles/MainMap.scss";
import PostList from "./PostList";
import DetailPost from "./DetailPost";
import MatchingDetail from "./MatchingDetail";

const { kakao } = window;

const MainMap = ({
  setIsPostModal,
  isPostModal,
  isJoinModal,
  setIsDetailModal,
  isDetailModal,
}) => {
  const user = useSelector((state) => state.user);
  const myStorage = sessionStorage;

  useEffect(() => {
    const container = document.getElementById("map"),
      options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
    const map = new kakao.maps.Map(container, options);

    //HTML5의 geolocation으로 현재 위치 사용할 수 있는지 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "위치를 받아올 수가 없습니다.";

      displayMarker(locPosition, message);
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({});

      var circle = new kakao.maps.Circle(null);

      kakao.maps.event.addListener(map, "center_changed", function () {
        // 지도의 중심좌표를 얻어옵니다
        var latlng = map.getCenter();
        // console.log(latlng);

        marker.setPosition(latlng);
        marker.setMap(map);

        // 지도에 원을 표시합니다
        circle.setOptions({
          center: latlng, // 원의 중심좌표 입니다
          radius: 1000, // 미터 단위의 원의 반지름입니다
          strokeWeight: 5, // 선의 두께입니다
          strokeColor: "#75B8FA", // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: "dashed", // 선의 스타일 입니다
          fillColor: "#CFE7FF", // 채우기 색깔입니다
          fillOpacity: 0.2, // 채우기 불투명도 입니다
        });
        circle.setMap(map);
      });
      // 지도 중심좌표를 접속위치로 변경합니다
      map.panTo(locPosition);
    }
  }, [user.location]);

  return (
    <div id="map">
      <PostList
        setIsPostModal={setIsPostModal}
        isPostModal={isPostModal}
        isJoinModal={isJoinModal}
        setIsDetailModal={setIsDetailModal}
        isDetailModal={isDetailModal}
      />
    </div>
  );
};

export default MainMap;
