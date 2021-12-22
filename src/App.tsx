import React, { FC, ChangeEvent, useState } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './interfaces'

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadLine, setDeadLine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadLine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadLine: deadLine };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadLine(0);

  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))
  };

  return (
    <div className="antialiased relative flex flex-col min-h-screen bg-gray-200 font-mono">
      <div className=' h-auto w-full py-3 px-3'>
        <h1 className='font-semibold text-3xl my-4 text-gray-800 text-center capitalize'>
          Simulasi Input Task use TypeScript
        </h1>
      </div>
      <div className="header h-40 w-full py-3 px-3 md:px-16 overflow-hidden">
        <div className="inputContainer">
          <div className='bg-white p-2 m-1 rounded-md shadow-sm'>
            <p className='text-xs'>Task :</p>
            <input
              type="text"
              placeholder="Task ..."
              name="task"
              value={task}
              onChange={handleChange}
            />
          </div>
          <div className='bg-white p-2 m-1 rounded-md shadow-sm'>
            <p className='text-xs'>Days :</p>
            <input
              type="number"
              placeholder="Dead Line (in Days) ..."
              name="deadline"
              value={deadLine}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className='items-center font-bold bg-white text-gray-400 shadow-sm h-auto' onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList max-h-full">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  );
}

export default App;
