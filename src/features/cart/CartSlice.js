import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartList: [],
}

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newCartItem = action.payload
      const cartIndex = state.cartList.findIndex(item =>
        item.book.id === newCartItem.book.id)
      if (cartIndex < 0) {
        state.cartList.push(newCartItem)
      } else {
        state.cartList[cartIndex].count += 1
      }
    },
    removeFromCart: (state, action) => {
      const tempList = state.cartList.filter(item => item.book.id !== action.payload)
      state.cartList = tempList
    }
  },
})

export const { addToCart, removeFromCart } = CartSlice.actions

export default CartSlice.reducer;
