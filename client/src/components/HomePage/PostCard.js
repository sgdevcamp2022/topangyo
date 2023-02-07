import { useDispatch } from 'react-redux';
import { openModal } from '../../store/slice/modalslice';
import './../../styles/PostCard.scss';

const PostCard = ({data}) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalType : "DetailPostModal",
        isOpen : true,
        postPK : data.postPK,
      })
    )
  };
  
  return (
    <a className="postCard" onClick={handleOpenModal}>
      <p className="postTitle">{data.title}</p>
      <p>0 / {data.memberLimit}</p>
      <p>{data.meetTime.split('.')[0]}</p>
    </a>
  )
}
  
export default PostCard;