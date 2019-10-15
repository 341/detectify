import { combineReducers } from 'redux';

import categories from './app/categories';
import notes from './app/notes';
import note from "./app/note";

const rootReducer = combineReducers({
    categories,
    notes,
    note,
});

export default rootReducer;