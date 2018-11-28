import React from 'react';

let Rank=({rank,name})=>{
  return (  (name.length)===0 ? <div>
                                 <div>
                                   <h2>Please Login to check your Rank</h2>
                                 </div>
                             </div>
                              :
                              <div className='pa2 dib'>
                                <div className='f3 white'>{`Hello ${name} Yor Rank Is ...`}</div>
                                <div className='f2 white'>{`${rank}`}</div>
                              </div>);
}
export default Rank;
