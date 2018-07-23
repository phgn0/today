import {
    ADD_TASK,
    CHANGE_TASK_TITLE,
    CHANGE_TASK_COMMENT,
    DELETE_TASK,
    TASK_TOGGLE_COMPLETED
} from "./taskConstants.js";

function mergeTaskAttributes(state, taskDate, taskId, attributes) {
    return {
        ...state,
        days: {
            ...state.days,
            [taskDate]: state.days[taskDate].map((data, i) => {
                if (i === taskId) {
                    return { ...data, ...attributes };
                } else {
                    return data;
                }
            })
        }
    };
}

const defaultState = {
    days: {}
};

export default function taskReducer(state = defaultState, action) {
    switch (action.type) {
        case ADD_TASK: {
            const { taskDate, taskTitle } = action;

            return {
                ...state,
                days: {
                    ...state.days,
                    [taskDate]: [
                        ...(state.days[taskDate] || []),
                        {
                            title: taskTitle,
                            isCompleted: false,
                            comment: ""
                        }
                    ]
                }
            };
        }
        case DELETE_TASK: {
            const { taskDate, taskId } = action;

            return {
                ...state,
                days: {
                    ...state.days,
                    [taskDate]: [
                        ...state.days[taskDate].slice(0, taskId),
                        ...state.days[taskDate].slice(taskId + 1)
                    ]
                }
            };
        }
        case CHANGE_TASK_TITLE: {
            const { taskDate, taskId, newTitle } = action;
            return mergeTaskAttributes(state, taskDate, taskId, {
                title: newTitle
            });
        }
        case CHANGE_TASK_COMMENT: {
            const { taskDate, taskId, newComment } = action;
            return mergeTaskAttributes(state, taskDate, taskId, {
                comment: newComment
            });
        }
        case TASK_TOGGLE_COMPLETED: {
            const { taskDate, taskId } = action;
            return mergeTaskAttributes(state, taskDate, taskId, {
                isCompleted: !state.days[taskDate][taskId].isCompleted
            });
        }
        default: {
            return state;
        }
    }
}
