import { configureStore } from  '@reduxjs/toolkit'
import Cart from './Reducers/Cart'

export default configureStore({
    reducer : {
        Cart : Cart,
    },
});