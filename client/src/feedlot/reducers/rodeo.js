import{SET_RODEO, CURRENT_RODEO} from '../actions/rodeo'

const initialState ={
        establecimientos:[],
        rodeos:[],
        categoria:[],
        currentEstablecimiento:{},
        currentRodeo:{}
    
}

export default function rodeo (state = initialState, action){
    if (action.type === SET_RODEO){
        return {
            ...state,
            establecimientos:action.payload.establecimientos,
            rodeos:action.payload.rodeos,
            categoria:action.payload.categoria
        }
    }

    if (action.type === CURRENT_RODEO){
        return {
            ...state,
            currentEstablecimiento:action.payload.establecimiento,
            currentRodeo:action.payload.rodeo
        }
    }
    return state
}