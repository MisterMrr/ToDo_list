import React from "react";
import style from "./Task.module.css";
import Checkbox from "../Checkbox/Checkbox";

import sprite from "../../assets/sprite.svg";

function Task({ taskText, onClick, isChecked, completeTask }) {
    // const [isChecked, setIsChecked] = useState(false);

    return (
        <div className={style.task}>
            <div>
                <Checkbox
                    label={taskText}
                    checked={isChecked}
                    onChange={completeTask}
                />
            </div>

            <button className={style.task__delete} onClick={onClick}>
                <svg className={style.icon}>
                    <use href={`${sprite}#icon-basket`}></use>
                </svg>
            </button>
        </div>
    );
}

export default Task;
