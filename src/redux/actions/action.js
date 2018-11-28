// import React from 'react';

export const URL_LOAD='URL_LOAD';
export const  IMAGE_BOX='IMAGE_BOX';


export const ActionText=(text)=>{
  return ({
    type:URL_LOAD,
    payload:text
  });
}
export const ImageBox=(obj)=>{
  return ({
    type:IMAGE_BOX,
    payload:obj,
  });
}
