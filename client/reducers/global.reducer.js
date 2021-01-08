const globalInitialState = {
  user: null,
  errors: {
    user: null,
  },
};

const globalReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "SET_LOGGED_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_USER_ERROR":
      return {
        ...state,
        errors: { ...state.errors, user: action.payload },
      };
    default:
      return state;
  }
};

export { globalInitialState, globalReducer };
