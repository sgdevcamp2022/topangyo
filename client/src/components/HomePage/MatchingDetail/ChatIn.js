import React from 'react'
import '../../../styles/ChatIn.scss';

const ChatIn = ({element}) => {
  return (
    <div className="chat-in">
       <img src='images/user/user_image.png' className='chatin-img' alt='user'></img> 
        <div>
            <p className='id'>{element.Id}</p>
            <div className='chatin-text'>{element?.message}</div>
        </div>
    </div>
  )
}

export default ChatIn;