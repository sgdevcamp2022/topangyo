import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../store/slice/modalslice";
import { setLocation } from '../../store/slice/userslice';
import "./../../styles/MainMap.scss";

const MainMap = ({setPage}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [map, setMap] = useState(null);
  const [movePosition, setMovePosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [places, setPlaces] = useState(null);
  const [keyword, setKeyword] = useState("");

  const { kakao } = window;
  //const infowindow = new kakao.maps.InfoWindow({zIndex:1});
  var placeMarkers = [];

  var currentImageSrc = 'https://ifh.cc/g/jXtyB6.png', // 마커이미지의 주소입니다    
    currentImageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
    currentImageOption = {offset: new kakao.maps.Point(20, 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            
  var currentMarkerImage = new kakao.maps.MarkerImage(currentImageSrc, currentImageSize, currentImageOption);

  var currentMarker = new kakao.maps.Marker({  
    image: currentMarkerImage // 마커이미지 설정 
  }); 

  var moveImageSrc = 'https://ifh.cc/g/jXR5By.png',
    moveImageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
    moveImageOption = {offset: new kakao.maps.Point(20, 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  var moveMarkerImage = new kakao.maps.MarkerImage(moveImageSrc, moveImageSize, moveImageOption)

  var moveMarker = new kakao.maps.Marker({  
    image : moveMarkerImage 
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


  const defaultMap = () => {
    const container = document.getElementById('map'),
    options = {
      center : new kakao.maps.LatLng(37.400664, 127.110739),
      level : 3
    };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }

  // 검색결과 항목을 Element로 반환하는 함수입니다
  const getListItem = (index, placeData) => {
    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h4>' + placeData.place_name + '</h4>';

    if (placeData.road_address_name) {
        itemStr += '    <span>' + placeData.category_group_name + '</span><br/>' +
                    '   <span class="jibun gray">' +  placeData.road_address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  placeData.address_name  + '</span>'; 
    }
                
      itemStr += '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  // const addMarker = (position, idx, title) => {
    
  //   var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
  //       imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
  //       imgOptions =  {
  //           spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
  //           spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
  //           offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
  //       },
  //       markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
  //           marker = new kakao.maps.Marker({
  //           position: position, // 마커의 위치
  //           image: markerImage 
  //       });
  //   marker.setMap(map); // 지도 위에 마커를 표출합니다
  //   placeMarkers.push(marker);  // 배열에 생성된 마커를 추가합니다

  //   return marker;
  // }

  // // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  // const removeMarker = () => {
  //   for ( var i = 0; i < placeMarkers.length; i++ ) {
  //     placeMarkers[i].setMap(null);
  //   }   
  //   placeMarkers = [];
  // }

  //  // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  // const removeAllChildNods = (el) => {   
  //   while (el.hasChildNodes()) {
  //     el.removeChild (el.lastChild);
  //   }
  // }

  // const displayInfowindow = (marker, title) => {
  //   var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

  //   infowindow.setContent(content);
  //   infowindow.open(map, marker);
  // }

  const placeMarker = (placeData) => {
    var listEl = document.getElementById('placesList'),
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(),
    bounds = new kakao.maps.LatLngBounds(),
    listStr = '';

    //검색 결과 목록에 추가된 항목들을 제거합니다.
    //removeAllChildNods(listEl);

    //지도에 표시되고 있는 마커를 제거합니다.
    //removeMarker();

    for(var i=0; i<placeData.length; i++) {
      var placePosition = new kakao.maps.LatLng(placeData[i].y, placeData[i].x),
      placeItem = getListItem(i, placeData[i]);

      fragment.appendChild(placeItem);
      bounds.extend(placePosition);
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;
    }

    // for(var i=0; i<place.length; i++) {
    //   var placePosition = new kakao.maps.LatLng(place[i].y, place[i].x),
    //   marker = addMarker(placePosition, i),
    //   itemEl = getListItem(i, place[i]); //검색 결과 항목 element를 생성합니다

    //   bounds.extend(placePosition);
    //   (function(marker, title) {
    //     kakao.maps.event.addListener(marker, 'mouseover', () => {
    //       displayInfowindow(marker, title);
    //     });

    //     kakao.maps.event.addListener(marker, 'mouseout', () => {
    //       infowindow.close();
    //     });

    //     itemEl.onmouseover = () => {
    //       displayInfowindow(marker, title);
    //     };

    //     itemEl.onmouseout = () => {
    //       infowindow.close();
    //     }

    //   })(marker, place[i].place_name);
    //   fragment.appendChild(itemEl);
    // }
    // listEl.appendChild(fragment);
    // menuEl.scrollTop = 0;
  }

  // const placePagination = (pagination) => {
  //   var paginationEl = document.getElementById('pagination'),
  //       fragment = document.createDocumentFragment(),
  //       i; 

  //   // 기존에 추가된 페이지번호를 삭제합니다
  //   while (paginationEl.hasChildNodes()) {
  //       paginationEl.removeChild (paginationEl.lastChild);
  //   }

  //   for (i=1; i<=pagination.last; i++) {
  //       var el = document.createElement('a');
  //       el.href = "#";
  //       el.innerHTML = i;

  //       if (i===pagination.current) {
  //           el.className = 'on';
  //       } else {
  //           el.onclick = (function(i) {
  //               return function() {
  //                   pagination.gotoPage(i);
  //               }
  //           })(i);
  //       }

  //       fragment.appendChild(el);
  //   }
  //   paginationEl.appendChild(fragment);
  // }

  const placesSearchCB = (data, status, pagination) => {
    if(status === kakao.maps.services.Status.OK) {
      console.log(data);
      placeMarker(data);
      //placePagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생하였습니다');
      return;
    }
  }
  

  useEffect(() => {
    defaultMap();
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=> {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        dispatch(setLocation({lat, lon}))
      });
    }
  }, [])
  

  const displayMarker = (locPosition) => {
    currentMarker.setPosition(locPosition); 
    currentMarker.setMap(map);
  
    // 지도에 원을 표시합니다 
    circle.setPosition(locPosition);
    circle.setMap(map);

    // 지도 중심좌표를 접속위치로 변경합니다
    if(map) {
      map.setCenter(locPosition);
      kakao.maps.event.addListener(map, 'center_changed', () => {
        moveMarker.setPosition(map.getCenter());
        moveMarker.setMap(map);
        setMovePosition(moveMarker.getPosition());
        setCurrentPosition(currentMarker.getPosition());
      })
    }
  }
  
  useEffect(() => {
    const locPosition = new kakao.maps.LatLng(user.loc.lat, user.loc.lon);
    displayMarker(locPosition);

    var getPlaces = new kakao.maps.services.Places();
    setPlaces(getPlaces);


    return () => {
      currentMarker.setMap(null);
      moveMarker.setMap(null);
      circle.setMap(null);
    }
  }, [user.loc])

  const handleClickRescan = (e) => {
    e.preventDefault();
    setPage(1);
    setShow(false);
    var lat = movePosition.Ma;
    var lon = movePosition.La;
    dispatch(setLocation({lat, lon}))
  }

  const handleWriteModal = () => {
    dispatch(
        openModal({
          modalType : "WritePostModal",
          isOpen : true,
        })
    )
  }
  

  const handleCurrentPosition = (e) => {
    e.preventDefault();
    setShow(false);
    var lat = currentPosition.Ma;
    var lon = currentPosition.La;

    var moveCurrentPosition = new kakao.maps.LatLng(lat, lon);
    map.panTo(moveCurrentPosition);
    
  }

  const handleGetPlaces = () => {
    var keyword = document.getElementById('keyword').value;
    places.keywordSearch(keyword, placesSearchCB)
  }

  const onChangeKeyword = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  }
  
  const mapClick = () => {
    setShow(true);
  }

  return (
    <>
      <div
        id="menu_wrap"
        style={{
          display : 'flex',
          flexDirection : 'column',
          position : 'absolute',
          left : '10px',
          top : '10%',
          zIndex : '2',
      }}>
        <div>
          <input type="text" id="keyword" onChange={onChangeKeyword} value={keyword} />
          <button onClick={handleGetPlaces}>검색</button>
        </div>

        <div>
          <ul id="placesList"></ul>
          <div id="pagination"></div>
        </div>
      </div>

      <button onClick={handleWriteModal} style={{ zIndex : '2', position : 'absolute', bottom : '20px', left : '20px' }}>글쓰기✏️</button>
      <button onClick={handleCurrentPosition} style={{ zIndex : '2', position : 'absolute', bottom : '20px', left : '200px' }}>검색 위치로 돌아가기</button>
      {show && <button onClick={handleClickRescan} style={{ color : "white", zIndex : '2', position : 'absolute', right : "46%", margin : "10px", backgroundColor : "#82B0E0", padding : "10px 25px", borderRadius : "10px"}}>해당 위치로 재검색</button>}
      <div id="map" onMouseDown={mapClick}></div>
    </>
  );
};

export default MainMap;
