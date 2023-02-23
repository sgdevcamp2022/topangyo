import React from 'react'
import '../../../styles/ChatIn.scss';

const ChatIn = ({element}) => {
  return (
    <div className="chat-in">
      <img src='images/user/user_image.png' className='chatin-img' alt='user'></img> 
      <div className='chatin-container'>
        <div>
          <div className="chatin-id">{element.Id}</div>
          <div className='chatin-text'>{element?.message}</div>
        </div>
        <span className='chatin-time'>{element?.sendAt}</span>
      </div>
    </div>
  )
}

export default ChatIn;