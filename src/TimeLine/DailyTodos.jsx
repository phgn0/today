import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Todo from "./Todo.jsx";
import EmptyTodo from "./EmptyTodo.jsx";
import {
    addTask,
    deleteTask,
    changeTaskTitle,
    toggleCompleted
} from "../store/taskActions";

/**
 * Displays a list of todos that are planned for one specific day, alongside the
 * day's basic information and methods to add new tasks.
 */
function DailyTodos({
    dayName,
    tasks,
    addTask,
    toggleCompleted,
    deleteTask,
    changeTitle
}) {
    return (
        <section className="day">
            <h1 className="day_name today_name">{dayName}</h1>
            <div className="day_content">
                <ul className="list">
                    {tasks.map((taskData, taskId) => {
                        return (
                            <li key={taskId}>
                                <Todo
                                    {...taskData}
                                    isCompleted={taskData.isCompleted}
                                    toggleCompleted={() =>
                                        toggleCompleted(taskId)
                                    }
                                    deleteTask={() => deleteTask(taskId)}
                                    changeTitle={title =>
                                        changeTitle(taskId, title)
                                    }
                                />
                            </li>
                        );
                    })}
                    <li className="list_item">
                        <EmptyTodo addTask={addTask} />
                    </li>
                </ul>
            </div>
        </section>
    );
}
DailyTodos.propTypes = {
    /** The name of the day to be displayed, usually the corresponding weekday */
    dayName: PropTypes.string.isRequired,
    /** The specific date of the day in the format "DD.MM.YYYY" */
    date: PropTypes.string.isRequired,
    /** The tasks to display for this day */
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            isCompleted: PropTypes.bool.isRequired
        })
    ).isRequired,
    /** A function to toggle a tasks completion state*/
    toggleCompleted: PropTypes.func.isRequired,
    /** A function to delete a task permanently */
    deleteTask: PropTypes.func.isRequired,
    /** A function to change a tasks title*/
    changeTitle: PropTypes.func.isRequired,
    /** A function to add a task to this day */
    addTask: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    // get the tasks for today
    return {
        tasks: state.days[ownProps.date] || []
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleCompleted: taskId =>
            dispatch(toggleCompleted(ownProps.date, taskId)),
        deleteTask: taskId => dispatch(deleteTask(ownProps.date, taskId)),
        changeTitle: (taskId, newTitle) =>
            dispatch(changeTaskTitle(ownProps.date, taskId, newTitle)),
        addTask: title => dispatch(addTask(ownProps.date, title))
    };
};

/**
 * Connect the component to the redux data store, so the tasks for each day are
 * inserted automatically, and only information about the represented day has to
 * be provided.
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DailyTodos);
