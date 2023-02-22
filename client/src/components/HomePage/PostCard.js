import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/slice/modalslice";
import { setCurrentPost } from "../../store/slice/postsslice";
import "./../../styles/PostCard.scss";
import PostState from "./PostState";

const PostCard = ({ postInfo }) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [memberList, setMemberList] = useState([]);

  const handleOpenModal = () => {
    dispatch(setCurrentPost(postInfo));
    dispatch(
      openModal({
        modalType: "DetailPostModal",
        isOpen: true,
        postPK: postInfo.postPK,
      })
    );
  };

  const isMembers = async () => {
    try {
      const getMatchedMembers = await axios.post(`http://localhost:4100/match/membersList`, {
        room : postInfo.postPK
      });
      setMemberList(getMatchedMembers?.data.membersList.members);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    isMembers();
  }, [memberList?.length])

  return (
    <a className="postcard" onClick={handleOpenModal}>
      <div className = "postcard-main">
        <div className="postcard-title">
          {
            category.map((categoryData, idx) => {
              if(categoryData.category === postInfo.category) {
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
        <p className='postcard-time'>{postInfo.meetTime.split(".")[0]}</p>
      </div>
      <span className='postcard-participate'> {memberList.length} / {postInfo.memberLimit}명 <PostState postInfo={postInfo}/></span> 
    </a>
  );
};

export default PostCard;
