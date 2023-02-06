import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeLocation } from '../../store/store';
import './../../styles/MainMap.scss';
import PostList from './PostList';
import DetailPost from "./DetailPost";
import MatchingDetail from './MatchingDetail';

const {kakao} = window;

var imageSrc = 'https://ifh.cc/g/rTKnWj.png', // 마커이미지의 주소입니다    
      imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
      imageOption = {offset: new kakao.maps.Point(20, 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
      markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다
  

  var marker = new kakao.maps.Marker({  
      image: markerImage // 마커이미지 설정 
  }); 

  var circle = new kakao.maps.Circle({
          radius: 1000, // 미터 단위의 원의 반지름입니다 
          strokeWeight: 5, // 선의 두께입니다 
          strokeColor: '#75B8FA', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'dashed', // 선의 스타일 입니다
          fillColor: '#CFE7FF', // 채우기 색깔입니다
          fillOpacity: 0.2  // 채우기 불투명도 입니다   
  }); 

  var tempMarker = new kakao.maps.Marker({  
  }); 



const MainMap = ({setIsPostModal, isPostModal, isJoinModal, setIsDetailModal, isDetailModal}) => {
  const user = useSelector(state => state.user);
  const myStorage = sessionStorage;

  useEffect(() => {
    const container = document.getElementById('map'),
    options = {
      center : new kakao.maps.LatLng(37.400664, 127.110739),
      level : 3
    };
    const map = new kakao.maps.Map(container, options);

    //HTML5의 geolocation으로 현재 위치 사용할 수 있는지 확인
    if(navigator.geolocation) {

      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude, // 위도
        lon = position.coords.longitude; // 경도
        
        let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition);

      });

    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      var locPosition = new kakao.maps.LatLng(37.400664, 127.110739),    
            message = '위치를 받아올 수가 없습니다. 위치 정보를 허용해주시고 chrome으로 접속해주세요'
            alert(message);
        displayMarker(locPosition);
    }

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition) {

      

      marker.setPosition(locPosition); 
      marker.setMap(map);

    
      // 지도에 원을 표시합니다 
      circle.setPosition(locPosition);
      circle.setMap(map); 
      

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);      
    }



    kakao.maps.event.addListener(map, 'center_changed', function() { 
    tempMarker.setPosition(map.getCenter()); 
    tempMarker.setMap(map);
   }); 

  },[user.location])

  const [show, setshow] = useState(false);

  return (
    <>
    {show && <button onclick = {() => (console.log("hi"))} style={{ color : "white", zIndex : '2', position : 'absolute', right : "46%", margin : "10px", backgroundColor : "#82B0E0", padding : "10px 25px", borderRadius : "10px"}}>해당 위치로 재검색</button>}
    <div id='map' onMouseDown={() => (setshow(true))}>
      <PostList setIsPostModal={setIsPostModal} isPostModal={isPostModal} isJoinModal={isJoinModal} setIsDetailModal={setIsDetailModal} isDetailModal={isDetailModal}/>
    </div>
    </>
  )
}

export default MainMap