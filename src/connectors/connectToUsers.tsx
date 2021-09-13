import {connect} from '../redux';

const userSelector = (state: any) => {
  return {
    user: state.user
  };
};

const userDispatcher = (dispatch: any) => {
  return {
    updateUser: (attrs: any) => dispatch({type: 'updateUser', payload: attrs})
  };
};

export const connectToUsers = connect(userSelector, userDispatcher);
