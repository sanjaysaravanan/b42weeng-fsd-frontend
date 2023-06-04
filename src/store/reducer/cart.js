// create a reducer and export it

const initialState = {
  items: [],
  totalAmount: 0
};

function cartReducer(state = initialState, action) {
  // reducer is function which the same state with initial value return different state on different actions
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: action.items,
        totalAmount: action.totalAmount
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== action.id)
      }
    default:
      return state;
  }
}

export default cartReducer;