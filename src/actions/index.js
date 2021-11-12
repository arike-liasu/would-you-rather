import { receiveUsers } from './Users';
import { receiveQuestions } from './Questions';
import { _getQuestions, _getUsers } from '../utils/API';

// function that gets the initial data
export function getInitialData() {
  return (dispatch) => {
    return Promise.all([_getQuestions(), _getUsers()]).then((values) => {
      dispatch(receiveUsers(values[1]));
      dispatch(receiveQuestions(values[0]));
    });
  };
}