import taskReducer from "../store/taskReducer";
import {
    ADD_TASK,
    DELETE_TASK,
    CHANGE_TASK_TITLE,
    TASK_TOGGLE_COMPLETED
} from "../store/taskConstants";

describe("the taskReducer", () => {
    it("should return the correct initial state", () => {
        // grouped by days, empty state
        expect(taskReducer(undefined, {})).toEqual({
            days: {}
        });
    });

    it("should correctly handle adding tasks", () => {
        const taskDate = Symbol();
        const taskTitle = Symbol("task1");

        // add one todo
        let state = taskReducer(undefined, {
            type: ADD_TASK,
            taskDate,
            taskTitle
        });
        expect(state.days[taskDate][0]).toEqual({
            title: taskTitle,
            isCompleted: false
        });

        // add another one
        const taskTitle2 = Symbol("task2");
        let state2 = taskReducer(state, {
            type: ADD_TASK,
            taskDate,
            taskTitle: taskTitle2
        });
        expect(state2.days[taskDate][1]).toEqual({
            title: taskTitle2,
            isCompleted: false
        });
    });

    it("should correctly handle deleting tasks", () => {
        const taskDate = Symbol();
        const taskTitle1 = Symbol("task1");
        const taskTitle2 = Symbol("task2");
        const taskTitle3 = Symbol("task3");

        let state = {
            days: {
                [taskDate]: [
                    {
                        title: taskTitle1,
                        isCompleted: false
                    },
                    {
                        title: taskTitle2,
                        isCompleted: false
                    },
                    {
                        title: taskTitle3,
                        isCompleted: false
                    }
                ]
            }
        };
        // delete second task
        state = taskReducer(state, {
            type: DELETE_TASK,
            taskDate,
            taskId: 1
        });
        expect(state.days[taskDate]).not.toContainEqual({
            title: taskTitle2,
            isCompleted: false
        });
        expect(state.days[taskDate].length).toBe(2);

        // delete first task
        state = taskReducer(state, {
            type: DELETE_TASK,
            taskDate,
            taskId: 0
        });
        expect(state.days[taskDate]).not.toContainEqual({
            title: taskTitle1,
            isCompleted: false
        });
        expect(state.days[taskDate].length).toBe(1);
    });

    it("should correctly handle changing a task title", () => {
        const taskDate = Symbol();
        const taskTitle1 = Symbol("title1");
        const taskTitle2 = Symbol("title2");
        let state = {
            days: {
                [taskDate]: [
                    {
                        title: taskTitle1,
                        isCompleted: false
                    }
                ]
            }
        };

        state = taskReducer(state, {
            type: CHANGE_TASK_TITLE,
            taskDate,
            taskId: 0,
            newTitle: taskTitle2
        });
        expect(state.days[taskDate][0].title).toBe(taskTitle2);
    });

    it("should correctly handle toggling a tasks completion", () => {
        const taskDate = Symbol();
        const taskTitle = Symbol("title");

        let state = {
            days: {
                [taskDate]: [
                    {
                        title: taskTitle,
                        isCompleted: false
                    }
                ]
            }
        };

        state = taskReducer(state, {
            type: TASK_TOGGLE_COMPLETED,
            taskDate,
            taskId: 0
        });
        expect(state.days[taskDate][0].isCompleted).toBe(true);

        state = taskReducer(state, {
            type: TASK_TOGGLE_COMPLETED,
            taskDate,
            taskId: 0
        });
        expect(state.days[taskDate][0].isCompleted).toBe(false);
    });

    describe("should not modify the current state", () => {
        test("on adding tasks", () => {
            const title1 = Symbol("task1");
            const title2 = Symbol("task2");
            const taskDate = Symbol();

            const state = { days: {} };
            const state2 = taskReducer(state, {
                type: ADD_TASK,
                taskDate,
                taskTitle: title1
            });
            expect(state).toEqual({ days: {} });

            const state3 = taskReducer(state, {
                type: ADD_TASK,
                taskDate,
                taskTitle: title2
            });
            expect(state2).toEqual({
                days: {
                    [taskDate]: [
                        {
                            title: title1,
                            isCompleted: false
                        }
                    ]
                }
            });
        });

        test("on deleting tasks", () => {
            const title1 = Symbol("task1");
            const title2 = Symbol("task2");
            const taskDate = Symbol();

            const state = {
                days: {
                    [taskDate]: [
                        {
                            title: title1,
                            isCompleted: false
                        },
                        {
                            title: title2,
                            isCompleted: false
                        }
                    ]
                }
            };
            const state2 = taskReducer(state, {
                type: DELETE_TASK,
                taskDate,
                taskId: 1
            });
            expect(state).toEqual({
                days: {
                    [taskDate]: [
                        {
                            title: title1,
                            isCompleted: false
                        },
                        {
                            title: title2,
                            isCompleted: false
                        }
                    ]
                }
            });
        });

        test("on changing a task title", () => {
            const title1 = Symbol("task1");
            const title2 = Symbol("task2");
            const taskDate = Symbol();

            const state = {
                days: {
                    [taskDate]: [
                        {
                            title: title1,
                            isCompleted: false
                        }
                    ]
                }
            };
            const state2 = taskReducer(state, {
                type: CHANGE_TASK_TITLE,
                taskDate,
                taskId: 0,
                newTitle: title2
            });
            expect(state).toEqual({
                days: {
                    [taskDate]: [
                        {
                            title: title1,
                            isCompleted: false
                        }
                    ]
                }
            });
        });

        test("on toggling a tasks completion", () => {
            const title = Symbol("task");
            const taskDate = Symbol();

            const state = {
                days: {
                    [taskDate]: [
                        {
                            title: title,
                            isCompleted: false
                        }
                    ]
                }
            };
            const state2 = taskReducer(state, {
                type: TASK_TOGGLE_COMPLETED,
                taskDate,
                taskId: 0
            });
            expect(state).toEqual({
                days: {
                    [taskDate]: [
                        {
                            title: title,
                            isCompleted: false
                        }
                    ]
                }
            });
        });
    });
});
