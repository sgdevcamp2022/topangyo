import React from 'react'
import './../../styles/ChatIn.scss';
import { useEffect } from 'react';

const ChatIn = ({message, id}) => {

  // const process =  message.map( funtion(text, undex) {
  //   return(<div className='chat' id = {index}> 
  //        <div className ="chatIn">
  //           <img src = "" className='chatInImg'/>
  //           <div className = "chatInText">{text}</div>
  //       </div>
  //   </div>
  //   );
  // })
  
  

  return(
    
    <div className='chat' key ={id}> 
          <div className ="chatIn">
             <img src = "" className='chatInImg'/>
           <div className = "chatInText">{message}</div>
         </div>
     </div>

  )
}

export default ChatIn;