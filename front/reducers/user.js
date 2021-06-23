export const initialState = {
    isLoggedIn: false,
    me: null,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default reducer;
