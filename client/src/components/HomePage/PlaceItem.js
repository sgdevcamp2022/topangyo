import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../store/slice/modalslice';

const PlaceItem = ({data, idx}) => {
    const dispatch = useDispatch();
    const getPost = useSelector((state) => state.posts);
    const currentPost = getPost.currentPost;
  

    const handleSelectPlace = (e) => {
        e.preventDefault();
        console.log(data);
        console.log(data.place_name);
        console.log(data.road_address_name);
        console.log(data.place_url);
        dispatch(
            openModal({
              modalType : "MatchingDetailModal",
              isOpen : true,
              postPK : currentPost.postPK,
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