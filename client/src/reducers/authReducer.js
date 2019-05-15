import { FETCH_USER } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      // Return the user object OR false if res.data is empty string
      return action.payload || false;
    default:
      return state;
  }
};
