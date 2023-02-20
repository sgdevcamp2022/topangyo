import React from 'react'
import '../../../styles/ChatOut.scss';

const ChatOut = ({element}) => {

  return(
    <div className='chatout'> 
      <div className="chatout-container">
        <div className="chatout-text">{element?.message}</div>
        <span className='chatout-time'>{element?.sendAt}</span>
      </div>
    </div>
  )
}

export default ChatOut;