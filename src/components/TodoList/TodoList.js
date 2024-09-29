import React, { useState } from "react";
import Task from "../Task/Task";

import style from "./TodoList.module.css";

import sprite from "../../assets/sprite.svg";

function Todolist() {
    const [input, setInput] = useState("");
    const [taskList, setTaskList] = useState([]);

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            addTask();
        }
    }

    // Добавление
    function addTask() {
        if (input !== "") {
            setTaskList((prev) => {
                setInput("");

                return [
                    ...prev,
                    {
                        id: prev.length + 1,
                        text: input,
                        completed: false,
                    },
                ];
            });
        }
    }

    // Удаление
    function deleteTask(id) {
        return setTaskList((prev) =>
            prev.filter((taskList) => taskList.id !== id)
        );
    }

    function deleteCompleted() {
        return setTaskList((prev) =>
            prev.filter((taskList) => taskList.completed === false)
        );
    }

    function deleteAll() {
        setTaskList([]);
    }
    // Выполнение

    function completeTask(id) {
        setTaskList((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }

    function completeAll() {
        setTaskList((prevTasks) =>
            prevTasks.map((task) => {
                return { ...task, completed: true };
            })
        );
    }

    return (
        <>
            <div className={style.list}>
                <h1 className={style.title}>ToDo List</h1>
                <div class={style.list__container}>
                    <input
                        className={style.input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        type="text"
                        value={input}
                    />
                    <button class={style.add} onClick={addTask}>
                        <svg className={style.icon}>
                            <use href={`${sprite}#add`}></use>
                        </svg>
                    </button>
                </div>
            </div>

            {taskList.map((taskList) => (
                <Task
                    key={taskList.id}
                    taskText={taskList.text}
                    onClick={() => deleteTask(taskList.id)}
                    isChecked={taskList.completed}
                    completeTask={() => completeTask(taskList.id)}
                />
            ))}

            <div class={style.buttons_container}>
                <button class={style.completeAll} onClick={completeAll}>
                    Выполнить все
                </button>
                <button class={style.deleteAll} onClick={deleteAll}>
                    Удалить все
                </button>
                <button class={style.deleteCompleted} onClick={deleteCompleted}>
                    Удалить выполненные
                </button>
            </div>
        </>
    );
}

export default Todolist;
