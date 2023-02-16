import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/slice/modalslice";
import { setCurrentPost } from "../../store/slice/postsslice";
import "./../../styles/PostCard.scss";

const PostCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(setCurrentPost(data));
    dispatch(
      openModal({
        modalType: "DetailPostModal",
        isOpen: true,
        postPK: data.postPK,
      })
    );
  };

  return (
    <a className="postCard" onClick={handleOpenModal}>
      <p className="postTitle">{data.title}</p>
      <p>0 / {data.memberLimit}</p>
      <p>{data.meetTime.split(".")[0]}</p>
    </a>
  );
};

export default PostCard;
