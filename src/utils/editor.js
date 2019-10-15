import {stateFromHTML} from "draft-js-import-html";
import {stateToHTML} from 'draft-js-export-html';
import {EditorState} from "draft-js";

export const toState = (value) => {
    return value ? EditorState.createWithContent(stateFromHTML(value)) : new EditorState.createEmpty();
};

export const toHtml = (value) => {
    return stateToHTML(value);
};