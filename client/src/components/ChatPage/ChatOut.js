import React from 'react'
import './../../styles/ChatOut.scss';

const ChatOut = ({message}) => {

  return(
    
    <div className='chat'> 
          <div className ="chatOut">
           <div className = "chatOutText">{message}</div>
         </div>
     </div>

  )
}

export default ChatOut;