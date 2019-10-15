import {all} from 'redux-saga/effects';

import {categoriesWatcher} from './app/categories';
import {notesWatcher} from './app/notes';
import {noteWatcher} from "./app/note";

export function* rootSaga() {
    yield all([
        categoriesWatcher(),
        notesWatcher(),
        noteWatcher(),
    ])
}

export default rootSaga;