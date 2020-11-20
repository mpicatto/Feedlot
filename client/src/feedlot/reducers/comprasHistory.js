import {PURCHASE_HISTORY} from '../actions/comprasHistory'
    const initialState = {
     data:[]
    };
    
    export default function global(state = initialState, action){
    
      if (action.type === PURCHASE_HISTORY){
        return{
          ...initialState,
          data:action.payload
             }
      }
    
      return state
    }  