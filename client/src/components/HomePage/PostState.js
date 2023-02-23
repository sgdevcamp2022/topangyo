import { useEffect } from 'react';
import './../../styles/PostState.scss';

const PostState = ({postInfo}) => {

  return (
    <>
    {
      postInfo?.matchingStatus === 0 || postInfo?.matchingStatus === false ?
      (
        <div className='poststate post-state-no'>
          모집중
        </div>
      )
      :
      (
        <div className='poststate post-state-ok'>
          모집 완료
        </div>
      )
    }
      
    </>
  )
}
  
export default PostState;