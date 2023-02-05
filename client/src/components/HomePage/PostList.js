import PostCard from "./PostCard";
import {useState} from 'react';
import "./../../styles/PostList.scss";
import Toolbar from './Toolbar';
import MatchingPost from "./MatchingPost";

const PostList = ({setIsPostModal, isPostModal, isJoinModal, setIsDetailModal, isDetailModal}) => {
  

    return (
      <div className="postList">
        {
          isJoinModal && (<MatchingPost setIsDetailModal={setIsDetailModal} isDetailModal={isDetailModal} />)
        }
        <Toolbar/>
        <PostCard setIsPostModal={setIsPostModal} isPostModal={isPostModal}/>
        <PostCard setIsPostModal={setIsPostModal} isPostModal={isPostModal}/>
        <PostCard setIsPostModal={setIsPostModal} isPostModal={isPostModal}/>
        <PostCard setIsPostModal={setIsPostModal} isPostModal={isPostModal}/>
        <PostCard setIsPostModal={setIsPostModal} isPostModal={isPostModal}/>
      </div>
    );
  }
  
export default PostList;