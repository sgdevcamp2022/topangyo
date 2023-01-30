import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeLocation } from '../../store/store';

const MainMap = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const { kakao } = window;

  const getUserLocation = (position) => {
      const setLocation = {
          lat : position.coords.latitude,
          lng : position.coords.longitude
      };
      dispatch(changeLocation(setLocation));
  }

  useEffect(() => {
    const container = document.getElementById('map'),
    options = {
      center : new kakao.maps.LatLng(user.location.lat, user.location.lng),
      level : 3
    };
    const map = new kakao.maps.Map(container, options);

    //HTML5의 geolocation으로 현재 위치 사용할 수 있는지 확인
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const setLocation = {
            lat : position.coords.latitude,
            lng : position.coords.longitude
        };
        dispatch(changeLocation(setLocation));
      })

        const locPosition = new kakao.maps.LatLng(user.location.lat, user.location.lng);

        map.setCenter(locPosition);
      
      const imageSrc = 'images/user/user_location.png',
        imageSize = new kakao.maps.Size(50,50),
        imageOption = {offset : new kakao.maps.Point(20,45)};

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
          markerPosition = new kakao.maps.LatLng(user.location.lat, user.location.lng);
        
        const marker = new kakao.maps.Marker({
          position : markerPosition,
          image : markerImage
        });

        marker.setMap(map);

    }
  },[user.location])

  return (
    <div id='map' style={{ width:'100%', height: '100%', position:'absolute', left: '0' }}>
      
    </div>
  )
}

export default MainMap