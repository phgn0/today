import React from "react";
import PropTypes from "prop-types";

import EditableText from "../EditableText.jsx";

/**
 * Represents a single todo/task item. It displays the tasks title, its status
 * (completed or not) and an optional comment, alongside actions to change its state.
 */
function Todo({
    title,
    comment,
    isCompleted,
    toggleCompleted,
    deleteTask,
    addComment,
    changeComment,
    changeTitle
}) {
    const onTitleUpdate = (newTitle) => {
        if (newTitle.trim() !== "") {
            changeTitle(newTitle);
        } else {
            deleteTask();
        }
    }

    return (
        <div className={"list_item " + (isCompleted ? "completed" : "active")}>
            <div className="list_item_icon">
                <i className="fas fa-check " onClick={toggleCompleted} />
            </div>
            <div className="list_item_content">
                <div className="list_item_name">
                    <div
                        className={
                            "list_item_name_text " +
                            (isCompleted ? "completed" : "active")
                        }
                    >
                        <EditableText
                            text={title}
                            textUpdatedDebounced={onTitleUpdate}
                        />
                    </div>
                    <div className="list_item_actions">
                        <span>
                            <i
                                className="fas fa-trash-alt"
                                onClick={deleteTask}
                            />
                        </span>
                        <span>
                            {!comment && (
                                <i
                                    className="far fa-comment"
                                    onClick={addComment}
                                />
                            )}
                        </span>
                    </div>
                </div>
                {comment && (
                    <div className="list_item_comment">
                        <EditableText
                            text={comment}
                            textUpdatedDebounced={changeComment}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
Todo.propTypes = {
    /** The task objective */
    title: PropTypes.string.isRequired,
    /** An optional comment to explain the task further */
    comment: PropTypes.string,
    /** Whether the task has been completed*/
    isCompleted: PropTypes.bool.isRequired,
    /** A function to change the task title*/
    changeTitle: PropTypes.func.isRequired,
    /** A function to toggle the task completion state*/
    toggleCompleted: PropTypes.func.isRequired,
    /** A function to delete the task permanently */
    deleteTask: PropTypes.func.isRequired,
    /** A function to add a comment to the task */
    addComment: PropTypes.func.isRequired
};

export default Todo;
