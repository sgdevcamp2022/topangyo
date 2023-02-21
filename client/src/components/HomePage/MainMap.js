import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPosition, setMap, setMovePosition } from "../../store/slice/mapslice";
import { openModal } from "../../store/slice/modalslice";
import { setPlaceList, setPlaceObject } from "../../store/slice/placeslice";
import { setLocation } from '../../store/slice/userslice';
import "./../../styles/MainMap.scss";
import PlaceItem from "./PlaceItem.js";

const MainMap = ({setPage}) => {
  const dispatch = useDispatch();
  const { kakao } = window;
  const myStorage = localStorage;

  //reducer
  const user = useSelector((state) => state.user);
  const getSliceMap = useSelector((state) => state.map);
  const getSlicePlace = useSelector((state) => state.place);

  const map = getSliceMap.map,
  movePosition = getSliceMap.movePosition;

  const place = getSlicePlace.placeObject,
  placeList = getSlicePlace.placeList,
  placeSearch = getSlicePlace.placeSearch;

  const [placeMarkers, setPlaceMarkers] = useState([]);
  var placeMarker = [];

 


  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  

  
  const infowindow = new kakao.maps.InfoWindow({zIndex:1});


  var currentImageSrc = 'https://ifh.cc/g/jXtyB6.png', // 마커이미지의 주소입니다    
    currentImageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
    currentImageOption = {offset: new kakao.maps.Point(20, 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            
  var currentMarkerImage = new kakao.maps.MarkerImage(currentImageSrc, currentImageSize, currentImageOption);

  var currentMarker = new kakao.maps.Marker({  
    image: currentMarkerImage // 마커이미지 설정 
  }); 

  var moveImageSrc = 'https://i.imgur.com/j4Hek5N.png',
    moveImageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
    moveImageOption = {offset: new kakao.maps.Point(20, 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  var moveMarkerImage = new kakao.maps.MarkerImage(moveImageSrc, moveImageSize, moveImageOption)

  var moveMarker = new kakao.maps.Marker({  
    image : moveMarkerImage 
  });

  var circle = new kakao.maps.Circle({
      radius: 1000, // 미터 단위의 원의 반지름
      strokeWeight: 5, // 선의 두께
      strokeColor: '#75B8FA', // 선의 색깔
      strokeOpacity: 1, // 선의 불투명도 (1에서 0 사이의 값이며 0에 가까울수록 투명)
      strokeStyle: 'dashed', // 선의 스타일
      fillColor: '#CFE7FF', // 채우기 색깔
      fillOpacity: 0.2  // 채우기 불투명도
  });




  const defaultMap = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=0626e9548e4f66be4c64910324ad8d4e&autoload=false";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        var options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
    var kakaoMap = new window.kakao.maps.Map(container, options);
    dispatch(setMap(kakaoMap));
    // const container = document.getElementById('map'),
    // options = {
    //   center : new kakao.maps.LatLng(37.400664, 127.110739),
    //   level : 3
    // };
    // const kakaoMap = new kakao.maps.Map(container, options);
    // dispatch(setMap(kakaoMap));
    })}}

  const placesSearchCB = (data, status, pagination) => {
    if(status === kakao.maps.services.Status.OK) {
      placeMarker = placeMarkers;
      dispatch(setPlaceList(data));
      displayPlacePagination(pagination);
      var menuEl = document.getElementById('menu_wrap');

      removeMarker();

      const bounds = new kakao.maps.LatLngBounds();

      setTimeout(() => {
        for(var i=0; i < data.length; i++) {
          var placePosition = new kakao.maps.LatLng(data[i].y, data[i].x);
          var marker = addMarker(placePosition, i);
          
          bounds.extend(placePosition);
  
          (
            (marker, title, place) => {
              kakao.maps.event.addListener(marker, 'mouseover',() => {
                displayInfowindow(marker, title);
              });
  
              kakao.maps.event.addListener(marker, 'mouseout',() => {
                infowindow.close();
              });

              kakao.maps.event.addListener(marker, 'click', () => {
                window.open(place.place_url, '_blank');
              });

            }
          )(marker, data[i].place_name, data[i]);
        }
        
        map.setBounds(bounds);
        setPlaceMarkers(placeMarker);

        menuEl.scrollTop = 0;
        
      }, 0)

      
      
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생하였습니다');
      return;
    }
  }

  const addMarker = (position, index) => {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
      imgOptions =  {
          spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin : new kakao.maps.Point(0, (index*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage 
      });
    marker.setMap(map);

    placeMarker.push(marker);

    return marker
  }

  const displayInfowindow = (marker, title) => {
    var content = `<div style="padding : 5px; z-index : 1;">${title}</div>`;

    infowindow.setContent(content);
    infowindow.open(map, marker);
  }

  const displayPlacePagination = (pagination)  => {
    var paginationEl = document.getElementById('pagination'),
    fragment = document.createDocumentFragment(),
    i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;
        el.className = 'pagination';

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                  pagination.gotoPage(i);
                  removeMarker();
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }


  const removeMarker = () => {
    setTimeout(() => {
      for (var i = 0; i < placeMarker.length; i++) {
        placeMarker[i].setMap(null);
      }
      placeMarker = [];
    }, 0)
  }



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
        dispatch(setMovePosition(moveMarker.getPosition()));
        dispatch(setCurrentPosition(currentMarker.getPosition()));
      })
    }
  }
  
  //처음에 맵 렌더링 될 때
  useEffect(() => {
    defaultMap();
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=> {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        dispatch(setLocation({lat, lon}))
      });
    }
    const getPlaces = new kakao.maps.services.Places();
    dispatch(setPlaceObject(getPlaces));
  }, [])

  
  //유저의 위치가 변경될 때
  useEffect(() => {
    const locPosition = new kakao.maps.LatLng(user.loc.lat, user.loc.lon);
    displayMarker(locPosition);

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
    if(myStorage.getItem('AccessToken')) {
      dispatch(
        openModal({
          modalType : "WritePostModal",
          isOpen : true,
        })
      )
    } else {
      alert('로그인을 먼저 해주세요!');
    }
  }

  const handleGetPlaces = () => {
    place.keywordSearch(keyword, placesSearchCB);
  }

  const onChangeKeyword = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  }

  const handleClickCategory = (e) => {
    e.preventDefault();

    place.categorySearch(e.currentTarget.id, placesSearchCB, {useMapBounds:true});
  }


  const mapClick = () => {
    setShow(true);
  }

  return (
    <>
    {
      placeSearch ?
      <div style={{
        position : 'absolute',
        top : '100px',
        left : '50px',
        backgroundColor : 'white',
        zIndex : '2',
        boxShadow : '0 1px 1px rgba(0,0,0,0.4)'
      }}>
        <ul id="category" style={{
          display : 'flex', flexDirection : 'row'
        }}>
          <li onClick={handleClickCategory} id="FD6" className="category-box">
            <img className="category-image" alt="foodImage" width="30" src="https://cdn-icons-png.flaticon.com/512/2276/2276931.png" />  
            음식점
          </li>
          <li onClick={handleClickCategory} id="CE7" className="category-box">
            <img className="category-image" alt="coffeeImage" width="30" src="https://cdn-icons-png.flaticon.com/512/924/924463.png" />
            카페  
          </li>
          <li onClick={handleClickCategory} id="AT4" className="category-box">
            <img className="category-image" alt="tourImage" width="30" src="https://cdn-icons-png.flaticon.com/512/9638/9638606.png" />
            볼거리
          </li>
          <li onClick={handleClickCategory} id="CT1" className="category-box">
            <img className="category-image" alt="enjoyImage" width="30" src="https://cdn-icons-png.flaticon.com/512/1518/1518943.png" />
            즐길거리
          </li>
        </ul>
      </div>
      :
      null
    }
    {
      placeSearch ? 
      (
      <div
        id="menu_wrap"
      >
          <div>
            <input className="input-box" type="text" id="keyword" onChange={onChangeKeyword} value={keyword} />
            <button onClick={handleGetPlaces} style={{ width : '100%' }}>검색</button>
          </div>

        <div style={{ display:'flex', flexDirection : 'column' }}>
          <div id="place_list">
            {
              placeList ? 
              placeList.map((data, idx) => {
                return (
                  <div key={idx} className="place_item" style={{ display:'flex', alignItems : 'center' }}>
                    <span className={`markerbg marker_${idx+1}`}></span>
                    <PlaceItem data={data} idx={idx} />
                  </div>
                )
              })
              :
              null
            }
          </div>
          <div id="pagination" style={{ display:'flex', justifyContent : 'center' }}></div>
        </div>
      </div>
      )
      :
      null
    }
      <button onClick={handleWriteModal} className="write-button"><img alt="writeImage" width="30px" src="https://cdn-icons-png.flaticon.com/512/1001/1001259.png" /></button>
      {show && (placeSearch === false) && <button onClick={handleClickRescan} style={{ color : "white", zIndex : '2', position : 'absolute', right : "46%", margin : "10px", backgroundColor : "#82B0E0", padding : "10px 25px", borderRadius : "10px", boxShadow:'0px 0px 3px gray'}}>해당 위치로 재검색</button>}
      <div id="map" onMouseDown={mapClick}></div>
    </>
  );
};

export default MainMap;
