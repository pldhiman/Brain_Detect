import React from 'react';
import './img.css';

const ImgForm=({url,buttonClick})=>{
  return (<div className='ma0'>
            <div>
              <p className='f3'>{`Detect Human Head. Give it try!`}</p>
            </div>
            <div className='center'>
              <div className='frm dib shadow-5'>
                <input type="text" placeholder="Url Of Image" className='w-70 f3 br2' onChange={url}/>
                <button className='w-30 f3 bg link bg-blue white ba b--blue br2 grow' onClick={buttonClick}> Detect</button>
              </div>
            </div>
        </div>);
}
export default ImgForm;
