import {SET_REDIRECT, SET_REDIRECT_OFF} from '../actions/global'
const initialState = {
    redirect: null,
};
export default function global(state = initialState, action){
if (action.type === SET_REDIRECT){
    return{
      ...initialState,
      redirect: action.payload
         }
  }

  if (action.type === SET_REDIRECT_OFF){
    return{
      ...initialState,
      redirect:null
         }
  }
  return state
}  