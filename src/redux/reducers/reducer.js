// import React from 'react';

import {URL_LOAD,IMAGE_BOX} from '../actions/action'

export const Reducer=(state="",{type,payload})=>{
  switch (type) {
    case URL_LOAD:
      return payload;
    default: return state;

  }
}


export const ImageBox=(state={},{type,payload})=>{
  switch (type) {
    case IMAGE_BOX:
        return payload;
    default:
      return state;

  }

}
