export const SET_RODEO = 'SET_RODEO'

export function setRodeoState(payload){
    console.log(payload)
    return {type:SET_RODEO, payload:payload}
}