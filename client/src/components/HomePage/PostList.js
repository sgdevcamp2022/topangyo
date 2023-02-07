import PostCard from "./PostCard";
import {useEffect, useState} from 'react';
import Toolbar from './Toolbar';
import MatchingPost from "./MatchingPost";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/slice/postsslice";

const PostList = () => {
  const dispatch = useDispatch();
  const matching = useSelector((state) => state.matching);
  const posts = useSelector((state) => state.posts);

  const [page, setPage] = useState(1);
  
  const isContents = async () => {
    try {
      const getContentData = await axios.get(`http://localhost:3700/post/list?page=${page}&lat=37.566770151102844&lon=126.97869755044226`);
      const getPosts = getContentData.data;
      dispatch(setPosts(getPosts));
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    isContents();
  }, [matching.matchingPost, page])

  const onClickPrev = (e) => {
    e.preventDefault();
    if(page > 1) {
      setPage(page-1);
    }
  }

  const onClickNext = (e) => {
    e.preventDefault();
    if(page < 5) {
      setPage(page+1);
    }
  }
 
  return (
    <div className="postList">
      {
        matching.matchingPost.map((data, idx) => {
          return (
            <MatchingPost key={idx} data={data}/>
          )
        })
      }
      <Toolbar/>
      {
        posts.postList.map((data, idx) => {
          return (
            <PostCard key={idx} data={data} />
          )
        })
      }
      <div style={{
        display : 'flex',
      }}>
        <button onClick={onClickPrev}>이전</button><button onClick={onClickNext}>다음</button>
      </div>
    </div>
  );
}
  
export default PostList;