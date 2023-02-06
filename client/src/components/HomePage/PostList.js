import PostCard from "./PostCard";
import {useEffect, useState} from 'react';
import Toolbar from './Toolbar';
import MatchingPost from "./MatchingPost";
import axios from "axios";

const PostList = ({setIsPostModal, isPostModal, isJoinModal, setIsDetailModal, isDetailModal, contents}) => {

  return (
    <div className="postList">
      {
        isJoinModal && (<MatchingPost setIsDetailModal={setIsDetailModal} isDetailModal={isDetailModal} />)
      }
      <Toolbar/>
      
      {
        contents ? 
        (
          contents.map((data, idx) => {
            return (
              <PostCard key={idx} data={data} setIsPostModal={setIsPostModal} isPostModal={isPostModal}/>
            )
          })
        )
        :
        (
          null
        )
      }
    </div>
  );
}
  
export default PostList;