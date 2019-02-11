let reducer = (state = {
  restaurant: undefined,
}, action) => {
  switch (action.type) {
    case 'SUBMIT_NOTES':
    {
      console.log(action.payload);
      return state;
    }
    case 'GET_INFO_FULFILLED':
      {
        return {
          ...state,
          restaurant: action.payload.data[0]
        };
      }

    default:
      return state;
  }
};

module.exports = reducer;