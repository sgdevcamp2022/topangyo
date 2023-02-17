import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../store/slice/modalslice';

const PlaceItem = ({data, idx}) => {
    const dispatch = useDispatch();
    const getPost = useSelector((state) => state.posts);
    const currentPost = getPost.currentPost;
  

    const handleSelectPlace = (e) => {
      e.preventDefault();
      dispatch(
        openModal({
          modalType : "MatchingDetailModal",
          isOpen : true,
          postPK : currentPost.postPK,
          place : {
            place_name: data.place_name,
            address_name: data.road_address_name,
            place_url: data.place_url,
          }
        })
      )
    }
    
  return (
    <a className="info" href={data.place_url} target="_blank" style={{ display:'flex', justifyContent : 'space-between' }}>
      <div>
          <h4>{data.place_name}</h4>
          <p>{data.category_group_name}</p>
          <p>{data.road_address_name}</p>
      </div>
      <button onClick={handleSelectPlace}>선택</button>
    </a>
    )
}

export default PlaceItem