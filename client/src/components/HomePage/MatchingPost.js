import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../store/slice/modalslice';
import { setCurrentPost } from '../../store/slice/postsslice';
import PostState from './PostState';

const MatchingPost = ({data}) => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    

    const handleOpenModal = () => {
        dispatch(
            setCurrentPost(data)
        )
        dispatch(
            openModal({
                modalType : "MatchingDetailModal",
                isOpen : true,
                postPK : data.postPK
            })
        )
    }
        
    return (
        <a className="postcard non-matching" onClick={handleOpenModal}>
        <div className = "postcard-main">
          <div className="postcard-title">
            {
              category.map((categoryData, idx) => {
                if(data.category === categoryData.category) {
                  return (
                    <span key={idx}>{categoryData.text.slice(0, 2)}</span>
                  )
                }
              })
            }
            {data.title}
          </div>
        </div>
        <div className='postcard-inform'>
          <p>{data.author_nickname}</p>
          <p className='postcard-category'>{data.category}</p> 
          <p className='postcard-time'>{data.meetTime.split(".")[0]}</p>
        </div>
        <span className='postcard-participate'> 3 / {data.memberLimit}명 <PostState /></span>  
      </a>
    )
}

export default MatchingPost