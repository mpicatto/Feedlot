// import axios from 'axios';
export const SET_REDIRECT = 'SET_REDIRECT';
export const SET_REDIRECT_OFF = 'SET_REDIRECT_OFF';

export function setRedirect(state){
    return{type: SET_REDIRECT, payload:state}
  }
  
  export function setRedirectOff(){
    return{type: SET_REDIRECT_OFF}
  }