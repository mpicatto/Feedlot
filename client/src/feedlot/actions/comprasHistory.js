export const PURCHASE_HISTORY = 'PURCHASE_HISTORY';


  
  export function getHistory(data){
    return{type: PURCHASE_HISTORY, payload:data}
  }
