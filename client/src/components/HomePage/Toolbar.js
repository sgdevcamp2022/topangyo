import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/slice/postsslice";
import "./../../styles/Toolbar.scss";

const Toolbar = ({page, setPage}) => {
  // const categories = ['🎳 취미', '🍴 맛집', '☕ 카페', '🛹 스포츠/레저', '📕 공부', '🛍 쇼핑', '👨‍👩‍👧‍👦 소모임', '🙌🏻 기타'];
  

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([
    {
      category : 'hobby',
      text : '🎳 취미'
    },
    {
      category : 'restaurant',
      text : '🍴 맛집'
    },
    {
      category : 'cafe',
      text : '☕ 카페'
    },
    {
      category : 'sports',
      text : '🛹 스포츠/레저'
    },
    {
      category : 'study',
      text : '📕 공부'
    },
    {
      category : 'shopping',
      text : '🛍 쇼핑'
    },
    {
      category : 'meeting',
      text : '👨‍👩‍👧‍👦 소모임'
    },
    {
      category : 'etc',
      text : '🙌🏻 기타'
    },
    {
      category : 'all',
      text : '전체'
    },
  ])

  const searchLat = user.loc.lat;
  const searchLon = user.loc.lon;


  const handleCategoryPost = async (e) => {
    e.preventDefault();
    const category = e.target.value;
    if(category === 'all') {
      const getContentData = await axios.get(`http://localhost:3700/post/list?page=${page}&lat=${searchLat}&lon=${searchLon}`);
      const getPosts = getContentData.data;
      dispatch(setPosts(getPosts));
    } else {
      try {
        const getContentData = await axios.get(`http://localhost:3700/post/content/list?page=${page}&category=${category}&lat=${searchLat}&lon=${searchLon}`)
        const getPosts = getContentData.data;
        dispatch(setPosts(getPosts));
      } catch(err) {
        console.log(err)
      }
    }
  }

  const onChangeSearch = (e) => {
    //모집글 검색기능
    console.log(e.target.value);
  }

  useEffect(() => {
    setPage(1);
  }, [])

  return (
    <div className="toolBar">
      <div style={{
        display : 'flex'
      }}>
        <button className="toolbarButton">🔍︎</button>
        <button className="toolbarButton">카테고리</button>
        <button className="toolbarButton">∨</button>
      </div>
      
      <div style={{
        margin : '10px'
      }}>
        <input
          placeholder="Search"
          onChange={onChangeSearch}
          style={{
            padding : '5px',
            backgroundColor : 'white',
            width : '100%',
            borderRadius : '50px',
            padding : '10px 20px',
            boxSizing : 'border-box',
        }} type='text' />
      </div>

      <div style={{
        margin : '5px'
      }}>
        {
          categories.map((category, idx) => {
            return (
              <button key={idx}
                onClick={handleCategoryPost}
                value={category.category}
                style={{
                  backgroundColor : 'white',
                  margin : '5px',
                  padding : '5px 20px',
                  borderRadius : '20px',
                  display : 'inline-block'
              }}>{category.text}</button>
            )
          })
        }
      </div>
    </div>
  );
}

export default Toolbar;