import React from 'react';
import './imgContainer.css';

const ImgShow=({imgUrl,boxSz})=>{

if (imgUrl.length>0){

  return (<div className='center ma'>
              <div className='absolute ma2'>
              <img src={imgUrl} id='imageContainer' alt="Human" height='400px' width='auto'  className='br4 pt2'/>
              <div className="boundingbox" style={{top:boxSz.topRow ,right:boxSz.rightCol,bottom:boxSz.bottomCol,left:boxSz.leftCol}}></div>
            </div>
          </div>);
        }
return (<div></div>);

}
export default ImgShow;
