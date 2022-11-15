import {createContext, useReducer} from "react";
import {reducer} from "./reducer";

export const ShopContext = createContext([])

const initialState = {
    goods: [],
    loading: true,
    order: localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [],
    isBasketShow: false,
    alertName: ''
}

const initializer = initialState => {
    return initialState
}

export const ContextProvider = ({children}) => {
    const [value, dispatch] = useReducer(reducer, initialState, initializer)

    value.setGoods = data => {
        dispatch({type: 'SET_GOODS', payload: data})
    }

    value.addToBasket = item => {
        dispatch({type: 'ADD_TO_BASKET', payload: item})
    }

    value.removeFromBasket = id => {
        dispatch({type: 'REMOVE_FROM_BASKET', payload: {id}})
    }

    value.incQuantity = id => {
        dispatch({type: 'INCREMENT_QUANTITY', payload: {id}})
    }

    value.decQuantity = id => {
        dispatch({type: 'DECREMENT_QUANTITY', payload: {id}})
    }

    value.closeAlert = () => {
        dispatch({type: 'CLOSE_ALERT'})
    }

    value.toggleBasket = () => {
        dispatch({type: 'TOGGLE_BASKET'})
    }

    return <ShopContext.Provider value={value}>
        {children}
    </ShopContext.Provider>
}
