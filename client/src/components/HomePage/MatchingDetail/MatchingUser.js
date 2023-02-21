import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMatchedMembersCount } from "../../../store/slice/matchingslice";
import axios from "axios";

// 추후에 porps 정리할것것
const MatchingUser = (props) => {
  const {
    socket,
    room,
    applyUser,
    setApplyUser,
    matchedMembers,
    setMatchedMembers,
    id,
    currentPost,
    cancleMatching,
  } = props; //socket & room
  const [chatUser, setChatUser] = useState([]); // 유저 목록을 담는 변수
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("getChatUserList", (data) => {
      setChatUser(data.chatUser);
    });


    socket.on("getApplyAndMatchedUserList", (data) => {
      setApplyUser(data.applyUser);
      setMatchedMembers(data.matchedMembers);
      dispatch(setMatchedMembersCount(data.matchedMembers))
      axios({
        method: 'post',
        url: `http://127.0.0.1:3800/push/${props.id}`,
        data: {
            title: '매칭신청',
            message: '작성하신글에 참여요청이 들어왔어요~ 확인해주세요',
            url: 'chat',
            icon: ''
        }
      })
    });


    setTimeout(() => {
      getChatUser();
      getApplyAndMatchedUser();
    }, 1000);

    return () => {
      setTimeout(() => getChatUser(), 1000);
    };
  }, []);

  // 보내면 getUserList가 날아온다.
  const getChatUser = () => {
    socket.emit("getChatUser", { room, id });
  };

  // 보내면 getApplyAndMatchedUserList가 날아온다.
  const getApplyAndMatchedUser = () => {
    socket.emit("getApplyAndMatchedUser", { room, id });
  };

  // 신청 유저 수락 버튼 (host)
  const acceptApplyUser = (id) => {
    socket.emit("acceptApplyUser", { room, id });
  };

  //신청 유저 거절 버튼 (host)
  const declineApplyUser = (id) => {
    socket.emit("declineApplyUser", { room, id });
  };

  return (
    <div>
      <h3>입장한 유저</h3>
      <hr />
      {
        chatUser?.map((element, idx) => {
          return (
            <div key={idx} className='user-card'>
              <div className='user-container'>
                <img alt='userImage' className='user-icon' src='images/user/user_image.png' />{element}
              </div>
            </div>
          )
        })
      }
      {
        currentPost.author_id === id ?
        (
          <>
            <h3>매칭 신청한 유저</h3>
            <hr />
          </>
        )
        :
        null
      }
      {
        currentPost.author_id === id &&
        applyUser?.map((element, idx) => {
          return (
            <div key={idx} className='user-card'>
              <div className='user-container'>
                <img alt='userImage' className='user-icon' src='images/user/user_image.png' />{element}
              </div>
                <div>
                  <button onClick={() => acceptApplyUser(element)}>수락</button>
                  <button onClick={() => declineApplyUser(element)}>거절</button>
                </div>
            </div>
          );
        })
      }
      {
        matchedMembers.includes(id) ?
        (
          <>
            <h3>매칭된 유저</h3>
            <hr />
          </>
        )
        :
        null
      }
      {
        matchedMembers.includes(id) &&
        currentPost.author_id === id
        ? matchedMembers?.map((element, idx) => {
            return (
              <div key={idx} className='user-card'>
                <div className='user-container'>
                <img alt='userImage' className='user-icon' src='images/user/user_image.png' />{element}
                </div>
                {element !== id ? (
                  <button onClick={() => cancleMatching(element)}>
                  매칭취소
                  </button>
                ) : null}
              </div>
            );
          })
        : matchedMembers?.includes(id)
        ? matchedMembers?.map((element, idx) => {
            return (
              <div key={idx} className='user-card'>
                <div className='user-container'>
                <img alt='userImage' className='user-icon' src='images/user/user_image.png' />{element}
                </div>
              </div>
            );
          })
        : null
      }
    </div>
  );
};

export default MatchingUser;
