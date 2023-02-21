import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../store/slice/modalslice';
import { setCurrentPost } from '../../store/slice/postsslice';
import PostState from './PostState';

const MatchingPost = ({data}) => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const user = useSelector((state) => state.user);
    const [postInfo, setPostInfo] = useState({});
    const [memberList, setMemberList] = useState([]);
    const myStorage = localStorage;
    const getMatchingPostPK = JSON.parse(myStorage.getItem('matchingPostPK'));
    

    const handleOpenModal = () => {
      dispatch(
        setCurrentPost(postInfo)
      )
      dispatch(
        openModal({
            modalType : "MatchingDetailModal",
            isOpen : true,
            postPK : data
        })
      )
    }

    const isContents = async () => {
      try {
        const getContentData = await axios.get(`http://localhost:3700/post/get/${data}`)
        setPostInfo(getContentData.data);
      } catch(err) {
        console.log(err)
      }
    }

    const isMembers = async () => {
      try {
        const getMatchedMembers = await axios.post(`http://localhost:4100/match/membersList`, {
          room : postInfo.postPK
        });
        setMemberList(getMatchedMembers.data.membersList.members);
      } catch(err) {
        console.log(err);
      }
    }

    useEffect(() => {
      isContents();
      isMembers();
    }, [postInfo.matchingStatus, getMatchingPostPK?.length, user.loc])
        
    return (
      postInfo.author_id === user.id || memberList?.includes(user.id) ?
      (
        <a className='matching-postcard matching' onClick={handleOpenModal}>
        <div className="postcard-main">
          <div className="postcard-title">
            {
              category.map((categoryData, idx) => {
                if(postInfo.category === categoryData.category) {
                  return (
                    <span key={idx}>{categoryData.text.slice(0, 2)}</span>
                  )
                }
              })
            } 
            {postInfo.title}
          </div>
        </div>
        <div className='postcard-inform'>
          <p>{postInfo.author_nickname}</p>
          <p className='postcard-category'>{postInfo.category}</p> 
          <p className='postcard-time'>{postInfo.meetTime}</p>
        </div>
        <span className='postcard-participate'> {memberList?.length} / {postInfo.memberLimit}명 <PostState postInfo={postInfo}/></span>  
        </a>
      )
      :
      (
        <a className='matching-postcard non-matching' onClick={handleOpenModal}>
          <div className="postcard-main">
            <div className="postcard-title">
              {
                category.map((categoryData, idx) => {
                  if(postInfo.category === categoryData.category) {
                    return (
                      <span key={idx}>{categoryData.text.slice(0, 2)}</span>
                    )
                  }
                })
              } 
              {postInfo.title}
            </div>
          </div>
          <div className='postcard-inform'>
            <p>{postInfo.author_nickname}</p>
            <p className='postcard-category'>{postInfo.category}</p> 
            <p className='postcard-time'>{postInfo.meetTime}</p>
          </div>
          <span className='postcard-participate'> {memberList?.length} / {postInfo.memberLimit}명 <PostState postInfo={postInfo}/></span>  
        </a>
      )
    )
}

export default MatchingPost