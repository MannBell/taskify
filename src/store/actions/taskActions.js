export const createTask = (task) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
  
    const { auth } = getState().firebase;
    const myUid = auth.uid;

    firestore
    .collection("tasks")
    .doc(myUid)
    .collection("tasks")
    .doc(task.id)
    .set({ ...task, createdAt: new Date() })
    .then(() => {
      dispatch({
        type: "CREATE_TASK_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "CREATE_TASK_ERROR"
        , err
      })
    })
  };
}

export const doTask = (taskId) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
  
    const { auth } = getState().firebase;
    const myUid = auth.uid;

    firestore
    .collection("tasks")
    .doc(myUid)
    .collection("tasks")
    .doc(taskId)
    .update({ doneAt: new Date() })
    .then(() => {
      dispatch({
        type: "DO_TASK_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "DO_TASK_ERROR"
        , err
      })
    })
  };
}

export const deleteTask = (taskId) => {
  return (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
  
    const { auth } = getState().firebase;
    const myUid = auth.uid;

    firestore
    .collection("tasks")
    .doc(myUid)
    .collection("tasks")
    .doc(taskId)
    .set({})
    .then(() => {
      dispatch({
        type: "DELETE_TASK_SUCCESS"
      })
    })
    .catch((err) => {
      dispatch({
        type: "DELETE_TASK_ERROR"
        , err
      })
    })
  };
}