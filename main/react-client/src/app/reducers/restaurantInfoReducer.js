let reducer = (state = {
  restaurant: undefined,
}, action) => {
  switch (action.type) {
    case 'SUBMIT_NOTES_FULFILLED':
      {

        action.payload.data[0].dishes = action.payload.data.dishes;

        return {
          ...state,
          restaurant: action.payload.data[0],
        };
      }
    case 'GET_INFO_FULFILLED':
      {


        action.payload.data[0].dishes = action.payload.data.dishes;

        return {
          ...state,
          restaurant: action.payload.data[0],
        };
      }

    default:
      return state;
  }
};

module.exports = reducer;