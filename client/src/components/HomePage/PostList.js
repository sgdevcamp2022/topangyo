import PostCard from "./PostCard";
import {useEffect, useState} from 'react';
import Toolbar from './Toolbar';
import MatchingPost from "./MatchingPost";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/slice/postsslice";

const PostList = ({page, setPage}) => {
  const dispatch = useDispatch();
  const matching = useSelector((state) => state.matching);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const place = useSelector((state) => state.place);
  const [maxPage, setMaxPage] = useState(1);
  const myStorage = localStorage;
  const getMatchingPost = JSON.parse(myStorage.getItem('matchingPost'));

  const searchLat = user.loc.lat;
  const searchLon = user.loc.lon;
  
  const isContents = async () => {
    try {
      const getContentData = await axios.get(`http://localhost:3700/post/list?page=${page}&lat=${searchLat}&lon=${searchLon}`);
      const getPostPage = getContentData.data.allPageNum;
      if(getPostPage !== 0) {
        setMaxPage(getPostPage);
      }
      const getPosts = getContentData.data.raws;
      dispatch(setPosts(getPosts));
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    isContents();
  }, [matching.matchingCount, page, user.loc, maxPage])

  const onClickPrev = (e) => {
    e.preventDefault();
    if(page > 1) {
      setPage(page-1);
    }
  }

  const onClickNext = (e) => {
    e.preventDefault();
    if(page < maxPage) {
      setPage(page+1);
    }
  }
 
  return (
    <div className="postList">
      {
        myStorage.getItem('AccessToken') && !place.placeSearch ?
        (
          getMatchingPost?.map((data, idx) => {
            return (
              <MatchingPost key={idx} data={data}/>
            )
          })
        )
        :
        null
      }
      {
        !place.placeSearch ?
        (
          <Toolbar page={page} setPage={setPage}/>
        )
        :
        null
      }
      {
        !place.placeSearch ?
        (
          posts.postList.map((data, idx) => {
            return (
              <PostCard key={idx} data={data} />
            )
          })
        )
        :
        null
      }
      {
        !place.placeSearch ?
        (
          <div style={{
            display : 'flex',
          }}>
            <button onClick={onClickPrev}>이전</button><button onClick={onClickNext}>다음</button>
          </div>
        )
        :
        null
      }
      
    </div>
  );
}
  
export default PostList;