import './../../styles/PostCard.scss';

const PostCard = ({data, setIsPostModal, isPostModal}) => {

  const handleOpenModal = () => {
    setIsPostModal(!isPostModal);
  }
  
  return (
    <a className="postCard" onClick={handleOpenModal}>
      <p className="postTitle">{data.title}</p> 
      <p>모집정보</p>
      <p>0 / {data.memberLimit}</p>
      <p>{data.meetTime}</p>
    </a>
  )
}
  
export default PostCard;