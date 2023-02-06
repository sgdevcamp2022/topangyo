import PostCard from "./PostCard";
import {useEffect, useState} from 'react';
import Toolbar from './Toolbar';
import MatchingPost from "./MatchingPost";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const PostList = ({contents}) => {
  const dispatch = useDispatch();
  const matching = useSelector((state) => state.matching);

  return (
    <div className="postList">
      {
        matching.matchingPost.map((matchingData, idx) => {
          return (
            <MatchingPost key={idx} matchingData={matchingData}/>
          )
        })
      }
      <Toolbar/>
      {
        contents ? 
        (
          contents.map((data, idx) => {
            return (
              <PostCard key={idx} data={data} />
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