import PostCard from "./PostCard";
import {useEffect, useState} from 'react';
import Toolbar from './Toolbar';
import MatchingPost from "./MatchingPost";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/slice/postsslice";

const PostList = ({page, setPage}) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.posts.postList);
  const user = useSelector((state) => state.user);
  const place = useSelector((state) => state.place);

  const [maxPage, setMaxPage] = useState(1);
  const myStorage = localStorage;
  const getMatchingPostPK = JSON.parse(myStorage.getItem('matchingPostPK'));

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
    console.log('모집글 변경');
    isContents();
  }, [getMatchingPostPK?.length, page, user.loc, maxPage])

  
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
      <div className="matching-post">
        {
          myStorage.getItem('AccessToken') && !place.placeSearch ?
          (
            getMatchingPostPK?.map((data, idx) => {
              return(
                <MatchingPost key={idx} data={data}/>
              )
            })
          )
          :
          null
        }
      </div>
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
          postList.map((postInfo, idx) => {
            return (
              <PostCard key={idx} postInfo={postInfo} />
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
            justifyContent : 'space-between',
            marginBottom : '10px'
            
          }}>
            <button className="pagination-btn" onClick={onClickPrev}><img width="15px" src="https://cdn-icons-png.flaticon.com/512/130/130882.png" alt="prevImage" /></button>
            <button className="pagination-btn" onClick={onClickNext}><img width="15px" src="https://cdn-icons-png.flaticon.com/512/130/130884.png" alt="nextImage" /></button>
          </div>
        )
        :
        null
      }
      
    </div>
  );
}
  
export default PostList;