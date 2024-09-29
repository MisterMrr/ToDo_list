import React, { useState, useEffect } from "react";
import Task from "../Task/Task";

import style from "./TodoList.module.css";

import sprite from "../../assets/sprite.svg";

function Todolist() {
    const [input, setInput] = useState("");
    const [taskList, setTaskList] = useState(() => {
        // Попытка загрузить задачи из localStorage
        const storedTasks = localStorage.getItem("taskList");
        return storedTasks ? JSON.parse(storedTasks) : []; // Возвращаем массив задач или пустой массив
    });

    useEffect(() => {
        console.log("Updating localStorage with tasks:", taskList);
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }, [taskList]);

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
                return [
                    ...prev,
                    {
                        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
                        text: input,
                        completed: false,
                    },
                ];
            });
            setInput("");
        }
    }

    // Удаление
    function deleteTask(id) {
        setTaskList((prev) => prev.filter((taskList) => taskList.id !== id));
    }

    function deleteCompleted() {
        setTaskList((prev) =>
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
                <div className={style.list__container}>
                    <input
                        className={style.input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        type="text"
                        value={input}
                    />
                    <button className={style.add} onClick={addTask}>
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

            <div className={style.buttons_container}>
                <button className={style.completeAll} onClick={completeAll}>
                    Выполнить все
                </button>
                <button className={style.deleteAll} onClick={deleteAll}>
                    Удалить все
                </button>
                <button
                    className={style.deleteCompleted}
                    onClick={deleteCompleted}>
                    Удалить выполненные
                </button>
            </div>
        </>
    );
}

export default Todolist;
