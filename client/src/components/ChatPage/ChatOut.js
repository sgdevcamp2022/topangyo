import React from 'react'
import './../../styles/ChatOut.scss';

const ChatOut = ({message}) => {

  return(
    
    <div className='chatout'> 
          <div className ="chatout-container">
           <div className = "chatout-text">{message}</div>
         </div>
     </div>

  )
}

export default ChatOut;