import React from 'react';
import Task from "../task/Task";

const TasksList = (props) => {
  // Tasks will be brought from parent
  const { tasks, colClass } = props;
  return (
    tasks.map((task)=> {

      return (
        <Task
          key={ task.id }
          id={ task.id }
          title={ task.title }
          content={ task.content }
          deadline={ task.deadline }
          createdAt={ task.createdAt }
          doneAt={ task.doneAt }
          colClass={ colClass }
        />
      );
    })
  )
}

export default TasksList;