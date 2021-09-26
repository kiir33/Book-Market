import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  cartList: [],
}

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.cartList.length < 5) {
        const newCartItem = action.payload
        const cartIndex = state.cartList.findIndex(item => item.book.id === newCartItem.book.id)
        if (cartIndex < 0) {
          state.cartList.push(newCartItem)
        } else {
          state.cartList[cartIndex].count += parseInt(newCartItem.count)
        }
      } else {
        alert('Cannot add more than 5 different books!')
      }
    },
    removeFromCart: (state, action) => {
      const tempList = state.cartList.filter(item => !action.payload.includes(item.book.id))
      state.cartList = tempList
    }
  },
})

export const { addToCart, removeFromCart } = CartSlice.actions

export default CartSlice.reducer;
