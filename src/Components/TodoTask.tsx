import * as React from 'react';
import { ITask } from '../interfaces';

interface Props {
    task: ITask,
    completeTask(taskNameToDelete: string): void
}
const TodoTask = ({ task, completeTask }: Props) => {
    return (
        <div className='flex bg-white rounded-l-md mb-2 drop-shadow-md'>
            <div className='mr-5 p-4 task'>
                <p>Name Task : <span>{task.taskName}</span></p>
                <p>Days :<span>{task.deadLine}</span></p>
            </div>
            <button className='bg-red-500 p-4 text-white font-bold rounded-r-md' onClick={() => {completeTask(task.taskName)}}>X</button>
        </div>
    );
};

export default TodoTask