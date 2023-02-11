import React, { useEffect, useState } from 'react'
import { useSelector} from 'react-redux';
import './../../styles/MainMap.scss';
import PostList from './PostList';

const {kakao} = window;

const imageSrc = 'https://ifh.cc/g/jXtyB6.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(20, 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          
const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

const marker = new kakao.maps.Marker({  
    image: markerImage // 마커이미지 설정 
}); 

const circle = new kakao.maps.Circle({
    radius: 1000, // 미터 단위의 원의 반지름입니다 
    strokeWeight: 5, // 선의 두께입니다 
    strokeColor: '#75B8FA', // 선의 색깔입니다
    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'dashed', // 선의 스타일 입니다
    fillColor: '#CFE7FF', // 채우기 색깔입니다
    fillOpacity: 0.2  // 채우기 불투명도 입니다   
}); 

const imageSrc2 = 'https://ifh.cc/g/jXR5By.png',
    imageSize2 = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
    imageOption2 = {offset: new kakao.maps.Point(20, 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

const markerImage2 = new kakao.maps.MarkerImage(imageSrc2, imageSize2, imageOption2),
    markerPosition2 = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

const tempMarker = new kakao.maps.Marker({  
  image :markerImage2 
}); 

const MainMap = ({setIsPostModal, isPostModal, isJoinModal, setIsDetailModal, isDetailModal}) => {
  const user = useSelector(state => state.user);
  const myStorage = sessionStorage;

//   const mapinit = useEffect(() => {
//   const script = document.createElement("script");
//   script.src = "https://unpkg.com/lodash//dapi.kakao.com/v2/maps/sdk.js?appkey=%REACT_APP_KAKAO_MAP%";
//   script.async = true;
//   document.body.appendChild(script);
// });

  const map = useEffect(() => {
    const container = document.getElementById('map'),
    options = {
      center : new kakao.maps.LatLng(37.400664, 127.110739),
      level : 3
    };
    const map = new kakao.maps.Map(container, options);

    
    const showYourLocation = ((position) => {
      let lat = position.coords.latitude, // 위도
      lon = position.coords.longitude; // 경도
      
      let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition);
    });

    const showErrorMsg = ((error) => { 
      switch(error.code) {
          case error.PERMISSION_DENIED:
          alert("사용자가 Geolocation API의 사용 요청을 거부했습니다.");
          break;
   
          case error.POSITION_UNAVAILABLE:
          alert("가져온 위치 정보를 사용할 수 없습니다.");
          break;
   
          case error.TIMEOUT:
          alert("위치 정보를 가져오기 위한 요청이 허용 시간을 초과하였습니다.");
          break;
   
          case error.UNKNOWN_ERROR:
          alert("알 수 없는 오류가 발생했습니다.");
          break;
      }
    });

    const locationOption = { 
      enableHighAccuracy: true, 
  };

    if(navigator.geolocation) // geolocation 을 지원한다면 위치를 요청한다.  
    {
      navigator.geolocation.getCurrentPosition(showYourLocation, showErrorMsg, locationOption); 
    }
    else 
    {
     alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
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

    // 마커 객체에 사용자 이벤트를 등록한다
    kakao.maps.event.addListener(marker, 'custom_action', function(data){
      kakao.maps.event.addListener(map, 'center_changed', function() { 
        tempMarker.setPosition(map.getCenter()); 
        tempMarker.setMap(map);
      })
    });

  },[user.location])

  const [show, setShow] = useState(false);

  const mapClick = () => {
    setShow(true);
    kakao.maps.event.trigger(marker, 'custom_action')
  }

  return (
    <>
    {show && <button onClick = {() => (map)} className = "locationButton">해당 위치로 재검색</button>}
    <div id='map' onMouseDown={mapClick}>
      <PostList setIsPostModal={setIsPostModal} isPostModal={isPostModal} isJoinModal={isJoinModal} setIsDetailModal={setIsDetailModal} isDetailModal={isDetailModal}/>
    </div>
    </>
  )
}

export default MainMap