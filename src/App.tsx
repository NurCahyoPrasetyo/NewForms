import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask, IProvinsi } from './interfaces'
import { Service } from './service';

export interface HitsApi {
  results: IProvinsi[];
}

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadLine, setDeadLine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [result, setResult] = useState<Service<HitsApi>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch('http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

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
    console.log(todoList)
    setTask("");
    setDeadLine(0);

  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))
  };

  return (
    <div className="App">
      {console.log(result)}
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task ..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Dead Line (in Days) ..."
            name="deadline"
            value={deadLine}
            onChange={handleChange}
          />
          <select name="cars" id="cars">
            <option value="volvo">Pilih Provinsi</option>
            <option value="saab">Saab</option>
          </select>
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  );
}

export default App;
