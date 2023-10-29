'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Task } from '@/types'
import { deleteTodo, editTodo } from '@/api'
type TaskProps = {
    task: Task
}
const Todo = ({ task }: TaskProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditedTaskTitle, setIsEditedTaskTitle] = useState(task.text);
    useEffect(() => {
        if (isEditing) {
            ref.current?.focus();
        }
    }, [isEditing])
    const handleEdit = async () => {
        setIsEditing(true);
    }
    const handleSave = async () => {
        await editTodo(task.id, isEditedTaskTitle);
        setIsEditing(false);
    }

    const handleDelete = async () => {
        await deleteTodo(task.id);
    }
    return (
        <>
            <div>
                <li key={task.id} className='flex justify-between p-4 bg-white border-l-4 border-blue-500 required shadow'>
                    {isEditing ? (
                        <input
                            ref={ref}
                            type="text"
                            className='mr-2 py-1 px-2 rounded border-gray-400 border'
                            value={isEditedTaskTitle}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsEditedTaskTitle(e.target.value)}
                        />
                    ) : (
                        <span>{task.text}</span>
                    )}
                    <div>
                        {isEditing ? (
                            <button className='text-blue-500 mr-3' onClick={handleSave}>save</button>

                        ) : (
                            <button className='text-green-500 mr-3' onClick={handleEdit}>edit</button>
                        )}

                        <button className='text-red-500' onClick={handleDelete}>delete</button>
                    </div>
                </li >
            </div >
        </>
    )
}

export default Todo
