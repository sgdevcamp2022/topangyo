import React from 'react'
import './../../styles/ChatOut.scss';

const ChatOut = ({message, id}) => {
  return (
    <div className='chat' key = {id}> 
        <div className="chatOut">
            {/* <div>{message}</div> */}
            <div>안녕</div>
        </div>
    </div>
  )
}

export default ChatOut;