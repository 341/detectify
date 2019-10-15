import {takeEvery, put} from 'redux-saga/effects';
import {has} from "../../utils/functions";

/********************
 ACTION TYPES
 ********************/

export const NOTES_FETCH = "NOTES_FETCH";
export const NOTES_ADD = "NOTES_ADD";
export const NOTES_REMOVE = "NOTES_REMOVE";

export const NOTES_FETCH_SUCCESS = "NOTES_FETCH_SUCCESS";
export const NOTES_FETCH_FAILURE = "NOTES_FETCH_FAILURE";

/********************
 ACTIONS
 ********************/

export const fetchNotes = (category) => ({
    type: NOTES_FETCH,
    category
});

export const addNotes = (note, category) => ({
    type: NOTES_ADD,
    note,
    category
});

export const removeNote = (note, category) => ({
    type: NOTES_REMOVE,
    note,
    category
});


export const fetchNotesSuccess = (notes, category) => ({
    type: NOTES_FETCH_SUCCESS,
    notes,
    category
});

export const fetchNotesFailure = (error) => ({
    type: NOTES_FETCH_FAILURE,
    error
});

/********************
 REDUCER
 ********************/

export const initialState = {
    notes: [],
    category: {
        notes: []
    },
    note: null,
    isLoaded: false,
    isFetching: false
};

export const notes = (state = initialState, action) => {

    switch (action.type) {
        case NOTES_FETCH:
            return {
                category: action.category,
                notes: state.notes,
                isLoaded: false,
                isFetching: true
            };

        case NOTES_ADD:
            return {
                ...state,
                note: action.note,
                category: action.category
            };

        case NOTES_REMOVE:

            return {
                ...state,
                category: action.category,
                note: action.note,
            };

        case NOTES_FETCH_SUCCESS:
            return {
                isLoaded: true,
                isFetching: false,
                notes: action.notes,
                category: action.category
            };

        case NOTES_FETCH_FAILURE:
            return {
                error: action.error
            };

        default:
            return state
    }
};

export default notes;

/********************
 SAGAS
 ********************/

// watcher
export function* notesWatcher() {
    yield takeEvery(NOTES_FETCH, FETCH_NOTES);
    yield takeEvery(NOTES_ADD, ADD_NOTES);
    yield takeEvery(NOTES_REMOVE, REMOVE_NOTES);
}

// workers

export function* REMOVE_NOTES({note, category}) {
    try {

        //Load Categories from localStorage
        let categories = yield localStorage.getItem('categories') || [];

        //Check if is array
        let categories_encode = yield Array.isArray(categories) ? categories : JSON.parse(categories);

        //remove current category
        let temp_categories = yield categories_encode.filter(data => data.id !== category.id);

        //remove current note
        let temp_notes = yield category.notes.filter(data => data.id !== note.id);

        //assign notes to category_notes
        yield category.notes = temp_notes;

        //re-add category
        yield temp_categories.push(category);

        //store categories in localStorage
        yield localStorage.setItem('categories', JSON.stringify(temp_categories));

        //Reload notes of category in front
        yield put(fetchNotesSuccess(category.notes, category));

    } catch (error) {

        yield put(fetchNotesFailure(error.response));
    }
}

export function* ADD_NOTES({note, category}) {

    try {
        //Load Categories from localStorage
        let categories = yield localStorage.getItem('categories') || [];

        //Check if is array
        let categories_encode = yield Array.isArray(categories) ? categories : JSON.parse(categories);

        //remove current category
        let temp_categories = yield categories_encode.filter(data => data.id !== category.id);

        //creat note
        let _note = yield {id: new Date(), name: note, content: ''};

        //push note to array
        yield category.notes.push(_note);

        //re-add category
        yield temp_categories.push(category);

        //store categories in localStorage
        yield localStorage.setItem('categories', JSON.stringify(temp_categories));

        //Reload notes of category in front
        yield put(fetchNotesSuccess(category.notes, category));
        yield put(fetchNotesSuccess(category.notes, category));

    } catch (error) {

        yield put(fetchNotesFailure(error.response));
    }
}

export function* FETCH_NOTES({category}) {

    try {
        let categories = yield localStorage.getItem('categories') || [];
        let categories_encode = yield Array.isArray(categories) ? categories : JSON.parse(categories);

        let selected_category = yield categories_encode.find(data => data.id === category.id);

        let notes = yield has(selected_category.notes) ? selected_category.notes : [];

        yield put(fetchNotesSuccess(notes, category));
    } catch (error) {
        yield put(fetchNotesFailure(error.response));
    }
}