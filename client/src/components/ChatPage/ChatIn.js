import React from 'react'
import './../../styles/ChatIn.scss';

const ChatIn = ({message}) => {
  return (
    <div className="chat-in">
       <img  src={process.env.PUBLIC_URL + '/images/user/user_talking.png'} className='chatin-img' alt='user'></img> 
        <div>
            <p className='id'>유저1</p>
            {/* <div>{message}</div> */}
            <div className='chatin-text'>안녕</div>
        </div>
    </div>
  )
}

export default ChatIn;