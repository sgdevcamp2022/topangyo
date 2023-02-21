import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/slice/postsslice";
import "./../../styles/Toolbar.scss";

const Toolbar = ({page, setPage}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [displaySearch, setDisplaySearch] = useState('none');
  const [displayCategory, setDisplayCategory] = useState('none');
  const categories = useSelector((state) => state.category);

  const searchLat = user.loc.lat;
  const searchLon = user.loc.lon;


  const handleCategoryPost = async (e) => {
    e.preventDefault();
    const category = e.target.value;
    if(category === 'all') {
      const getContentData = await axios.get(`http://localhost:3700/post/list?page=${page}&lat=${searchLat}&lon=${searchLon}`);
      const getPosts = getContentData.data.raws;
      dispatch(setPosts(getPosts));
    } else {
      try {
        const getContentData = await axios.get(`http://localhost:3700/post/content/list?page=${page}&category=${category}&lat=${searchLat}&lon=${searchLon}`)
        const getPosts = getContentData.data.raws;
        dispatch(setPosts(getPosts));
      } catch(err) {
        console.log(err)
      }
    }
  }

  const onChangeCategory = () => {
    if(isCategory) {
      setDisplayCategory('none');
      setIsCategory(false);
    } else {
      setDisplayCategory('block');
      setIsCategory(true);
    }
  }

  const onChangeSearch = () => {
    if(isSearch) {
      setDisplaySearch('none');
      setIsSearch(false);
    } else {
      setDisplaySearch('block');
      setIsSearch(true);
    }
  }

  const handleChangeKeyword = async (e) => {
    if(isSearch) {
      try {
        const getContentData = await axios.get(`http://localhost:3700/post/content/list?page=${page}&keyword=test14&lat=${searchLat}&lon=${searchLon}`)
      } catch(err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    setPage(1);
  }, [])

  return (
    <div className="toolBar">
      <div style={{
        display : isSearch,
      }}>
        <button className="toolbarButton" onClick={onChangeSearch}>🔍︎</button>
        <button className="toolbarButton" onClick={onChangeCategory}>카테고리</button>
        <button className="toolbarButton">∨</button>
      </div>
      
      <div style={{
        margin : '10px',
        display : displaySearch,
      }}>
        <input
          placeholder="Search"
          onChange={handleChangeKeyword}
          style={{
            padding : '5px',
            backgroundColor : 'white',
            width : '100%',
            borderRadius : '50px',
            padding : '10px 20px',
            boxSizing : 'border-box',
            boxShadow : '0px 0px 3px gray',
        }} type='text' />
      </div>

      <div style={{
        margin : '5px',
        display : displayCategory,
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
                  display : 'inline-block',
                  boxShadow : '0px 0px 3px gray',
              }}>{category.text}</button>
            )
          })
        }
      </div>
    </div>
  );
}

export default Toolbar;