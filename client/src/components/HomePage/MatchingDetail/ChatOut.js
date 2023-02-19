import React from 'react'
import '../../../styles/ChatOut.scss';

const ChatOut = ({element}) => {

  return(
    <div className='chatout'> 
      <div className ="chatout-container">
        <div className = "chatout-text">{element?.message}</div>
      </div>
    </div>
  )
}

export default ChatOut;