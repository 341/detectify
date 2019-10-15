import {takeEvery, put} from 'redux-saga/effects';

/********************
 ACTION TYPES
 ********************/

export const CATEGORIES_FETCH = "CATEGORIES_FETCH";
export const CATEGORIES_ADD = "CATEGORIES_ADD";
export const CATEGORIES_REMOVE = "CATEGORIES_REMOVE";

export const CATEGORIES_FETCH_SUCCESS = "CATEGORIES_FETCH_SUCCESS";
export const CATEGORIES_FETCH_FAILURE = "CATEGORIES_FETCH_FAILURE";

/********************
 ACTIONS
 ********************/

export const fetchCategories = () => ({
    type: CATEGORIES_FETCH
});

export const addCategories = (category) => ({
    type: CATEGORIES_ADD,
    category
});

export const removeCategories = (category) => ({
    type: CATEGORIES_REMOVE,
    category
});


export const fetchCategoriesSuccess = (categories) => ({
    type: CATEGORIES_FETCH_SUCCESS,
    categories
});

export const fetchCategoriesFailure = (error) => ({
    type: CATEGORIES_FETCH_FAILURE,
    error
});

/********************
 REDUCER
 ********************/

export const initialState = {
    categories: [],
    category: {notes:[]},
    isLoaded: false,
    isFetching: false
};

export const categories = (state = initialState, action) => {

    switch (action.type) {
        case CATEGORIES_FETCH:
            return {
                categories: state.categories,
                isLoaded: false,
                isFetching: true
            };

        case CATEGORIES_ADD:
            return {
                categories: state.categories,
                category: action.category
            };

        case CATEGORIES_REMOVE:

            let items = state.categories;
            let item = action.category;
            let papa = items.filter(x => x.id !== item.id);

            return {
                ...state,
                categories: [...papa]
            };

        case CATEGORIES_FETCH_SUCCESS:
            return {
                isLoaded: true,
                isFetching: false,
                categories: action.categories,
            };

        case CATEGORIES_FETCH_FAILURE:
            return {
                error: action.error
            };

        default:
            return state
    }
};

export default categories;

/********************
 SAGAS
 ********************/

// watcher
export function* categoriesWatcher() {
    yield takeEvery(CATEGORIES_FETCH, FETCH_CATEGORIES);
    yield takeEvery(CATEGORIES_ADD, ADD_CATEGORIES);
    yield takeEvery(CATEGORIES_REMOVE, REMOVE_CATEGORIES);
}

// workers

export function* REMOVE_CATEGORIES({category}) {
    try {

        let categories = yield localStorage.getItem('categories') || [];
        let categories_encode = Array.isArray(categories) ? categories : JSON.parse(categories);

        let item = category;
        let papa = yield categories_encode.filter(x => x.id !== item.id);

        yield localStorage.setItem('categories', JSON.stringify(papa));

        yield put(fetchCategoriesSuccess(papa));


    } catch (error) {

        yield put(fetchCategoriesFailure(error.response));
    }
}

export function* ADD_CATEGORIES({category}) {

    try {

        let categories = yield localStorage.getItem('categories') || [];
        let categories_encode = yield Array.isArray(categories) ? categories : JSON.parse(categories);


        let _category = yield {id: new Date(), name: category, notes: []};

        yield categories_encode.push(_category);

        yield localStorage.setItem('categories', JSON.stringify(categories_encode));

        yield put(fetchCategoriesSuccess(categories_encode));


    } catch (error) {

        yield put(fetchCategoriesFailure(error.response));
    }
}

export function* FETCH_CATEGORIES() {
    try {
        let categories = yield localStorage.getItem('categories') || [];
        let categories_encode = yield Array.isArray(categories) ? categories : JSON.parse(categories);

        yield put(fetchCategoriesSuccess(categories_encode));
    } catch (error) {
        yield put(fetchCategoriesFailure(error.response));
    }
}