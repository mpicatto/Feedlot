export const SET_RODEO = 'SET_RODEO'
export const CURRENT_RODEO = 'CURRENT_RODEO'

export function setRodeoState(payload){
    return {type:SET_RODEO, payload:payload}
}

export function setCurrentRodeo(payload){
    return {type:CURRENT_RODEO, payload:payload}
}