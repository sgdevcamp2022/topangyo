import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinMatching } from "../../store/slice/matchingslice";
import { closeModal, openModal } from "../../store/slice/modalslice";
import { setCurrentPost } from "../../store/slice/postsslice";

const WritePost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const matching = useSelector((state) => state.matching);
  const myStorage = sessionStorage;

  const [writePost, setWritePost] = useState({
    title: "",
    description: "",
    category: "hobby",
    meetDate: "",
    meetTime: "",
    memberLimit: 2,
  });

  const handleChange = (e) => {
    setWritePost({
      ...writePost,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleJoinPost = (data) => {
    dispatch(joinMatching(data));
    dispatch(setCurrentPost(data));
    dispatch(
      openModal({
        modalType: "MatchingDetailModal",
        isOpen: true,
        postPK: data.postPK,
      })
    );
  };

  const handleCreatePost = async (variables) => {
    try {
      if (matching.matchingCount < 3) {
        const result = await axios.post(
          "http://localhost:3700/post/create",
          variables
        );
        if (result) {
          alert("모집글 작성을 완료하였습니다!");
        }
        // 새로운 매치 CMS에 넣기(postPK result값 맞는지 확인하기)

        handleCreateNewMatch(result.data.postPK);
        handleJoinPost(result.data);
      } else {
        alert("매칭 초과로 방을 생성할 수 없습니다!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 새로운 매칭방 만들기
  const handleCreateNewMatch = async (postId) => {
    try {
      const result = await axios.post("http://localhost:4100/test", {
        room: postId,
        Id: user.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const variables = {
      title: writePost.title,
      description: writePost.description,
      author_id: user.id,
      imageURL: "",
      category: writePost.category,
      location_latitude: user.loc.lat,
      location_longitude: user.loc.lon,
      meetTime: `${writePost.meetDate}T${writePost.meetTime}`,
      memberLimit: parseInt(writePost.memberLimit),
    };
    handleCreatePost(variables);
  };

  const isToken = async () => {
    try {
      const myToken = myStorage.getItem('AccessToken');
      if(myToken) {

      } else {
        throw new Error('로그인을 먼저 해주세요!');
      }
    } catch(err) {
      if(err instanceof Error) {
        alert(err.message);
        handleCloseModal();
      }
      console.log(err);
    }
  }

  useEffect(() => {
    isToken();
  })

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "100",
        backgroundColor: "white",
        padding: "50px",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
      }}
    >
        <h3>모집 글 작성</h3>
        <form onSubmit={handleSubmit}>
          <input 
            onChange={handleChange} 
            className="input-box" 
            name='title' 
            type='text' 
            minLength={1}
            placeholder='제목'
            required
          />
          <select placeholder='제한인원' onChange={handleChange} name="memberLimit" required>
            <option         
              value="2"
            >2</option>
            <option              
              value="3"
            >3</option>
            <option              
              value="4"
            >4</option>
            <option              
              value="5"
            >5</option>
            <option              
              value="6"
            >6</option>
            <option              
              value="7"
            >7</option>
            <option              
              value="8"
            >8</option>
          </select>
          <select onChange={handleChange} name="category" required>
            <option 
              defaultValue 
              value="hobby"
            >취미</option>
            <option 
              value="restaurant"
            >맛집</option>
            <option 
              value="cafe"
            >카페</option>
            <option 
              value="sports"
            >스포츠/레저</option>
            <option 
              value="study"
            >공부</option>
            <option 
              value="shopping"
            >쇼핑</option>
            <option 
              value="meeting"
            >소모임</option>
            <option 
              value="etc"
            >기타</option>
          </select>
          <input 
            onChange={handleChange} 
            className="input-box" 
            type='date' 
            name='meetDate' 
            placeholder='만남날짜' 
            required
          />
          <input 
            onChange={handleChange} 
            className="input-box" 
            type='time' 
            name='meetTime' 
            placeholder='만남시간'
            required
          />
          <textarea 
            onChange={handleChange} 
            className="input-box" 
            name='description' 
            placeholder='본문'
            minLength={1}
            maxLength={100}
            required
          />
          <button onClick={handleCloseModal}>닫기</button>
          <button type='submit'>생성</button>
        </form>
    </div>
  );
};

export default WritePost;
