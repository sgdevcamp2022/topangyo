import './../../styles/PostCard.scss';
import { useNavigate } from 'react-router-dom';


const PostCard = ({setIsPostModal, isPostModal}) => {

  const handleOpenModal = () => {
    setIsPostModal(!isPostModal);
  }
  
  return (
    <a className="postCard" onClick={handleOpenModal}>
      <p className="postTitle">모집글 제목  모집상태</p> 
      <p>모집정보</p>
      <p>현재인원 / 모집인원</p>
      <p>만남시간</p>
    </a>
  )
}
  
export default PostCard;