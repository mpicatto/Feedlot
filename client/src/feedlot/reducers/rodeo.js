import{SET_RODEO} from '../actions/rodeo'

const initialState ={
        establecimientos:[],
        rodeos:[],
        categoria:[]
    
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
    return state
}