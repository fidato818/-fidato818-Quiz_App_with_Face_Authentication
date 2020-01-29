import firebase from '../../config/firebase';
const fireAuth = firebase.auth();

const update_user = user => {
  return {
    type: 'SET_USER',
    data: user,
  };
};

const remove_user = () => {
  return {
    type: 'REMOVE_USER',
  };
};

// const logout_user = () => {
//   return (dispatch, getState) => {
//     firebase
//       .auth()
//       .signOut()
//       .then(response => {
//         console.log(response.status);
//         console.log(response);
//         dispatch({ type: 'SIGNOUT_SUCCESS' });
//       })
//       .catch(error => {
//         console.log(`${error}`);
//       });
//   };
// };

const logout_user = dispatch => {
  // return {

  fireAuth
    .signOut()
    .then(response => {
      console.log(response);
      dispatch({ type: 'SIGNOUT_SUCCESS' });
      // Actions.auth();
      console.log('Sign-out successful');
    })
    .catch(error => {
      console.log(`${error}`);
    });
  // }
};
// const logout_user = () => dispatch => {
//   firebase
//     .auth()
//     .signOut()
//     .then(response => {
//       console.log(response.status);
//       console.log(response);
//       dispatch({ type: 'SIGNOUT_SUCCESS' });
//       // Actions.auth();
//       console.log('Sign-out successful');
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

export { update_user, remove_user, logout_user };
