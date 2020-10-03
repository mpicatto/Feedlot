import{SET_RODEO} from '../actions/rodeo'

const initialState ={
        establecimiento:"Elija una opción...",
        rodeo:"Elija una opción..."
    
}

export default function rodeo (state = initialState, action){
    if (action.type === SET_RODEO){
        return {
            ...state,
            establecimiento:action.payload.establecimiento,
            rodeo:action.payload.rodeo
        }
    }
    return state
}