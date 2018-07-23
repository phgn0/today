import {
    ADD_TASK,
    DELETE_TASK,
    CHANGE_TASK_TITLE,
    TASK_TOGGLE_COMPLETED
} from "./taskConstants";

export function addTask(taskDate, taskTitle) {
    return {
        type: ADD_TASK,
        taskDate,
        taskTitle
    };
}

export function deleteTask(taskDate, taskId) {
    return {
        type: DELETE_TASK,
        taskDate,
        taskId
    };
}

export function changeTaskTitle(taskDate, taskId, newTitle) {
    return {
        type: CHANGE_TASK_TITLE,
        taskDate,
        taskId,
        newTitle
    };
}

export function toggleCompleted(taskDate, taskId) {
    return {
        type: TASK_TOGGLE_COMPLETED,
        taskDate,
        taskId
    };
}
