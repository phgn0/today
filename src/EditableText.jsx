import React, { Component } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { Editor, EditorState, ContentState, Modifier } from "draft-js";

/**
 * Displays text that the user can edit in-place by simply clicking on it.
 * The text looks like normal, exept with a cursor if the user is editing it.
 */
class EditableText extends Component {
    /**
     * Uses draft-js internall to implement the editable text.
     * A draft-js "Editor" generally behaves like a controlled input component,
     * so its state (text, cursor position) is dependent on this component class.
     */

    constructor(props) {
        super(props);

        // debounce the text update callback
        if (this.props.textUpdatedDebounced) {
            this.textUpdateCallback = debounce(
                this.props.textUpdatedDebounced,
                250
            );
        }

        // the internal draft-js editor field state
        this.state = {
            editorState: EditorState.createWithContent(
                ContentState.createFromText(this.props.text)
            )
        };
    }

    /** Called when the editor state (text,cursor) changes */
    onChange(editorState) {
        // save this new field state
        this.setState({ editorState }, () => {
            // wait until the new state is set
            // then call the debounced text update callback
            if (this.textUpdateCallback) {
                this.textUpdateCallback(
                    this.state.editorState.getCurrentContent().getPlainText()
                );
            }
        });
    }

    /** Handle the users press of the return/enter key */
    handleReturn() {
        // call the onReturn callback
        if (this.props.onReturn) {
            this.props.onReturn(
                this.state.editorState.getCurrentContent().getPlainText()
            );
        }
        // clear the internal editor state?
        // this may be necessary when this EditableText field changes its
        // "meaning" / the data it represents on an enter key hit
        if (this.props.clearOnReturn) {
            this.resetEditor();
        }
        // abort normal event action (insert newline)
        return "handled";
    }

    /** Reset the draft-js editor state */
    resetEditor() {
        // best solution to clear all text/cursor position without issues
        // see https://github.com/facebook/draft-js/issues/410

        const editorState = this.state.editorState;

        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();

        const isBackward = selectionState.getIsBackward();

        const firstBlock = contentState.getFirstBlock();
        const lastBlock = contentState.getLastBlock();

        const leftmostBlock = !isBackward ? firstBlock : lastBlock;
        const rightmostBlock = !isBackward ? lastBlock : firstBlock;

        const rightmostBlockLength = rightmostBlock.getLength();

        const anchorKey = leftmostBlock.getKey();
        const anchorOffset = !isBackward ? 0 : rightmostBlockLength;

        const focusKey = rightmostBlock.getKey();
        const focusOffset = !isBackward ? rightmostBlockLength : 0;

        const newSelectionState = selectionState.merge({
            anchorKey,
            anchorOffset,
            focusKey,
            focusOffset,
            hasFocus: true
        });

        const newEditorState = EditorState.push(
            EditorState.moveFocusToEnd(editorState),
            Modifier.replaceText(contentState, newSelectionState, "")
        );
        this.setState({
            editorState: newEditorState
        });
    }

    render() {
        return (
            <Editor
                editorState={this.state.editorState}
                onChange={this.onChange.bind(this)}
                handleReturn={this.handleReturn.bind(this)}
            />
        );
    }
}
EditableText.propTypes = {
    /** The text to display (and edit) */
    text: PropTypes.string.isRequired,
    /** A function that will be called to update the displayed text.
     *  The function invocation is debounced, so it will not be called at each keystroke,
     *  but when the editing is done or at least paused.
     */
    textUpdatedDebounced: PropTypes.func,
    /** A function that will be called when the user hits the enter/return key
     *  (to signal that he is done editing)
     */
    onReturn: PropTypes.func,
    /** Wheather to delete the displayed internal text state after the user has
     * hit return */
    clearOnReturn: PropTypes.bool
};
export default EditableText;
