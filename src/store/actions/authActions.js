export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    
    const firebase = getFirebase();

    firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "SIGN_OUT_SUCCESS" });
    })
    .catch((err) => {
      dispatch({
        type: "SIGN_OUT_ERROR"
        , err
      })
    })

  }
}

export const signUp = ({ email, password, firstname, lastname }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      return (
        firestore
        .collection("users")
        .doc(user.uid)
        .set({ firstname, lastname })
      );
    })
    .then(() => {
      dispatch({
        type: "SIGN_UP_SUCCESS"
        , user: { email, password, firstname, lastname }
      });
    })
    .catch((err) => {
      dispatch({
        type: "SIGN_UP_ERROR"
        , err
      })
    })

  }
}

export const login = ({ email, password }) => {
  return (dispatch, getState, { getFirebase }) => {
    
    const firebase = getFirebase();

    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({
        type: "LOGIN_SUCCESS"
        , email
        , password
      })
    })
    .catch((err) => {
      dispatch({
        type: "LOGIN_ERROR"
        , err
      })
    })

  }
}