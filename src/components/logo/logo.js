import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain from './brain.png';

const Logo=()=>{
  return (<div className=''>
    <Tilt className="Tilt ml5 mt2 shadow-2 br1" options={{ max : 55 }} style={{ height: 150, width: 140}} >
      <div className="Tilt-inner pt3"><img src={brain} alt="logo" width="100px" height="100px"/></div>
      <p className='tc f4 pt0 mt0 near-black'>BRAIN</p>
    </Tilt>

  </div>);
}
export default Logo;
