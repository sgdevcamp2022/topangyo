import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../store/slice/modalslice";
import { joinMatching } from "../../store/slice/matchingslice";
import "../../styles/DetailPost.scss";
import axios from "axios";

const DetailPost = () => {
  const dispatch = useDispatch();
  const currentPost = useSelector((state) => state.posts.currentPost);
  const [duplicate, setDuplicate] = useState(true);
  const [memberList, setMemberList] = useState([]);
  const category = useSelector((state) => state.category);
  const myStorage = localStorage;
  const getMatchingPostPK = JSON.parse(myStorage.getItem("matchingPostPK"));

  const handleDuplicate = () => {
    getMatchingPostPK?.map((data, idx) => {
      if (data === currentPost.postPK) {
        setDuplicate(false);
      }
    });
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleJoinPost = () => {
    if (!(memberList.length < currentPost.memberLimit)) {
      return alert("이미 방이 꽉찼습니다!");
    } else if (currentPost.matchingStatus) {
      return alert("이미 모집이 완료되었습니다!");
    }
    if (duplicate) {
      if (myStorage.getItem("matchingPostPK") == null) {
        myStorage.setItem(
          "matchingPostPK",
          JSON.stringify([currentPost.postPK])
        );
      } else {
        myStorage.setItem(
          "matchingPostPK",
          JSON.stringify([
            currentPost.postPK,
            ...JSON.parse(myStorage.getItem("matchingPostPK")),
          ])
        );
      }
      dispatch(joinMatching());
      dispatch(
        openModal({
          modalType: "MatchingDetailModal",
          isOpen: true,
          postPK: currentPost.postPK,
        })
      );
    } else {
      alert("더 이상 방에 입장할 수 없습니다!");
    }
  };

  const isToken = async () => {
    try {
      const myToken = myStorage.getItem("AccessToken");
      if (myToken) {
      } else {
        throw new Error("로그인을 먼저 해주세요!");
      }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
        handleCloseModal();
      }
      console.log(err);
    }
  };

  const isMembers = async () => {
    try {
      setTimeout(async () => {
        const getMatchedMembers = await axios.post(
          `http://localhost:4100/match/membersList`,
          {
            room: currentPost.postPK,
          }
        );
        setMemberList(getMatchedMembers.data.membersList.members);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isToken();
    handleDuplicate();
    isMembers();
  }, []);

  return (
    <div className="detailpost">
      <div className="detailpost-main">
        <div className="detailpost-title">
          {category.map((categoryData, idx) => {
            if (currentPost.category === categoryData.category) {
              return <span key={idx}>{categoryData.text.slice(0, 2)}</span>;
            }
          })}
          {currentPost.title}
        </div>
        <img
          alt="cancelImage"
          width="15px"
          className="x-img"
          src="images/close.png"
          onClick={handleCloseModal}
        />
      </div>
      <hr id="detailpost-line" />
      <div className="detailpost-detail">
        <div className="detailpost-inform">
          <div className="detailpost-item">{currentPost.author_nickname}</div>
          <div className="detailpost-item">{currentPost.category}</div>
          <div className="detailpost-item">{currentPost.meetTime} </div>
          <div className="detailpost-item">
            {" "}
            {memberList.length} / {currentPost.memberLimit}명{" "}
          </div>
        </div>
        <div className="detailpost-description">{currentPost.description}</div>
      </div>
      <button className="detailpost-button" onClick={handleJoinPost}>
        입장
      </button>
    </div>
  );
};

export default DetailPost;
