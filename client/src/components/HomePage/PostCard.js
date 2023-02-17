import './../../styles/PostCard.scss';
import { useNavigate } from 'react-router-dom';
import PostState from './PostState';

const PostCard = ({setIsPostModal, isPostModal}) => {

  const handleOpenModal = () => {
    setIsPostModal(!isPostModal);
  }
  
  return (
    <a className="postcard" onClick={handleOpenModal}>
      <div className = "postcard-main">
        <div className="postcard-title">🎳 고깃집 혼밥 같이 할 사람? 같이 먹어요요요뉸노
        </div>
      </div>
      <div className='postcard-inform'>
        <p className='postcard-category'>2002년 00월 00일 13:00분</p> 
        <p className='postcard-time'></p>
      </div>
      <p className='postcard-participate'> 3 / 10명<PostState/></p> 
    </a>
  )
}
  
export default PostCard;