import {
    BOOK_LIST_REQUEST,
    BOOK_LIST_SUCCESS,
    BOOK_LIST_FAILURE,
} from '../constants/bookConstants'

export const bookListReducer =  (state = {books: []}, action) => 
{
    switch(action.type)
    {
        case BOOK_LIST_REQUEST:
            return {loading:true, books: []}

        case BOOK_LIST_SUCCESS:
            return {loading:false, books: action.payload}

        case BOOK_LIST_FAILURE:
            return {loading:false, error: action.payload}

        default:
            return state
    }

}