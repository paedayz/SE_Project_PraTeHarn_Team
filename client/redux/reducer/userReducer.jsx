import {SET_USER_DATA, CLEAR_SESSION} from '../type'

const initialState = {
    userData : null
}

export default function (state = initialState, action){
    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state,
                userData: action.payload
            }

        case CLEAR_SESSION :
            return initialState

        default :
            return state
    }
}