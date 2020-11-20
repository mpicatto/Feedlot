import {SET_SECTION} from '../actions/seguimiento'

const initialState = {
    section: null,
}

export default function global(state = initialState, action){
    
    if (action.type === SET_SECTION){
        return{
          ...state,
          section:action.payload,
             }
      }


    return state
}





    