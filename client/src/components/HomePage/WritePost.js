import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinMatching } from "../../store/slice/matchingslice";
import { closeModal, openModal } from "../../store/slice/modalslice";
import { setCurrentPost } from "../../store/slice/postsslice";
import '../../styles/WritePost.scss';

const WritePost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const matching = useSelector((state) => state.matching);
  const myStorage = localStorage;

  const [writePost, setWritePost] = useState({
    title: "",
    description: "",
    category: "hobby",
    meetDate: "",
    meetTime: "",
    memberLimit: 2,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setWritePost({
      ...writePost,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    dispatch(closeModal());
  };

  const handleJoinPost = (data) => {
    dispatch(joinMatching());
    dispatch(setCurrentPost(data));
    dispatch(
      openModal({
        modalType: "MatchingDetailModal",
        isOpen: true,
        postPK: data.postPK,
      })
    );
    if(myStorage.getItem('matchingPost') === null) {
      myStorage.setItem('matchingPost', JSON.stringify([data]));
    } else {
      myStorage.setItem('matchingPost', JSON.stringify([data, ...JSON.parse(myStorage.getItem('matchingPost'))]));
    }
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
      const result = await axios.post("http://localhost:4100/match", {
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
    <div className = "writepost-container">
      <div className='writepost-title'>
        모집글 작성
        <img width="20px" height="20px" alt="cancelImage" className = "x-img" src='images/close.png' onClick={handleCloseModal}/>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="writepost-form">
        <input 
          onChange={handleChange} 
          className="input-box" 
          name='title' 
          type='text' 
          minLength={1}
          placeholder='제목'
          required
        />
        <div className="writepost-select-area">
          모집 인원 : 
          <select className="writepost-select" onChange={handleChange} name="memberLimit" required>
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
          카테고리 : 
          <select className="writepost-select" onChange={handleChange} name="category" required>
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
        </div>
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
        <div className="writepost-button-area">
          <button type='submit'>생성</button>
        </div>
      </form>
    </div>
  );
};

export default WritePost;
