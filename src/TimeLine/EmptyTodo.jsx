import React from "react";
import PropTypes from "prop-types";

import EditableText from "../EditableText.jsx";

/**
 * An empty todo item (displays only a blank space), used to add a new task.
 */
function EmptyTodo({ addTask }) {
    return (
        <div className="list_item">
            <div className="list_item_icon">
                <i className="fas fa-plus" />
            </div>
            <div className="list_item_content">
                <div className="list_item_name">
                    <div className="list_item_name_text new_todo active">
                        <EditableText
                            text=""
                            onReturn={addTask}
                            clearOnReturn
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
EmptyTodo.propTypes = {
    /** A function to add a new task */
    addTask: PropTypes.func.isRequired
};

export default EmptyTodo;
