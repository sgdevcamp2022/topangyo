import PostCard from "./PostCard";
import "./../../styles/PostList.scss";
import Toolbar from './Toolbar';

const PostList = () => {
    return (
      <div className="postList">
        <Toolbar/>
       <PostCard/>
       <PostCard/>
       <PostCard/>
       <PostCard/>
       <PostCard/>
      </div>
    );
  }
  
export default PostList;