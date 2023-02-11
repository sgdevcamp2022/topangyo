import React from 'react'
import './../../styles/ChatIn.scss';

const ChatIn = ({message}) => {
  return (
    <div className='chat'>
       <img src={process.env.PUBLIC_URL + '/images/user/user_talking.png'} className='chatInImg' alt='user'></img> 
        <div className="chatIn">
            {/* <div>{message}</div> */}
            <div className='chatInText'>안녕</div>
        </div>
    </div>
  )
}

export default ChatIn;