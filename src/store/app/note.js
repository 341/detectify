import {takeEvery, put} from 'redux-saga/effects';
import {has} from "../../utils/functions";
import {fetchCategories} from "./categories";
import {fetchNotes} from "./notes";

/********************
 ACTION TYPES
 ********************/

export const SET_NOTE = "SET_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const TRANSFER_NOTE = "TRANSFER_NOTE";

/********************
 ACTIONS
 ********************/

export const setNote = (note, category) => ({
    type: SET_NOTE,
    note,
    category
});

export const updateNote = (note, category) => ({
    type: UPDATE_NOTE,
    note,
    category
});

export const transferNote = (note, category, next_category) => ({
    type: TRANSFER_NOTE,
    note,
    category,
    next_category
});

/********************
 REDUCER
 ********************/

export const initialState = {
    category: {
        notes: []
    },
    next_category: {
        notes: []
    },
    note: null,
    isLoaded: false,
    isFetching: false
};

export const note = (state = initialState, action) => {

    switch (action.type) {
        case SET_NOTE:
            return {
                ...state,
                note: action.note,
                category: action.category
            };

        case UPDATE_NOTE:
            return {
                ...state,
                note: action.note,
                category: action.category
            };

        case TRANSFER_NOTE:

            return {
                ...state,
                note: action.note,
                category: action.category,
                next_category: action.next_category
            };

        default:
            return state
    }
};

export default note;

/********************
 SAGAS
 ********************/

// watcher
export function* noteWatcher() {
    yield takeEvery(UPDATE_NOTE, NOTE_UPDATE);
    yield takeEvery(TRANSFER_NOTE, NOTE_TRANSFER);
}

// workers

export function* NOTE_UPDATE({note, category}) {

    try {
        //Load Categories from localStorage
        let categories = yield localStorage.getItem('categories') || [];

        // Check if is array
        let categories_encode = yield Array.isArray(categories) ? categories : JSON.parse(categories);

        //remove current category
        let temp_categories = yield categories_encode.filter(data => data.id !== category.id);

        let temp_notes_of_cat = yield category.notes.filter(data => data.id !== note.id);

        yield temp_notes_of_cat.push(note);

        yield category.notes = temp_notes_of_cat;

        //re-add category
        yield temp_categories.push(category);

        //store categories in localStorage
        yield localStorage.setItem('categories', JSON.stringify(temp_categories));
        
        // yield put(fetchPostsSuccess(category.notes, category));

    } catch (error) {

        // yield put(fetchPostsFailure(error.response));
    }
}

export function* NOTE_TRANSFER({note, category, next_category}) {

    try {
        let categories = yield localStorage.getItem('categories') || [];
        let categories_encode = yield Array.isArray(categories) ? categories : JSON.parse(categories);
        //
        let temp_cats = yield categories_encode.filter(data => data.id === category.id && data.id === next_category.id);

        let note_to_remove = has(category.notes) && category.notes.filter(data=>data.id !== note.id);

        category.notes = [...note_to_remove];

        let note_to_be_add_exists = has(next_category.notes) && next_category.notes.find(data=>data.id === note.id);

        if(!note_to_be_add_exists){
            next_category.notes.push(note);
        }

        temp_cats.push(next_category)
        temp_cats.push(category);

         //store categories in localStorage
         yield localStorage.setItem('categories', JSON.stringify(temp_cats));
        
        yield put(fetchCategories());
        yield put(fetchNotes(next_category));
    } catch (error) {
        // yield put(fetchPostsFailure(error.response));
    }
}