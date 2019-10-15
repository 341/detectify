import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {addCategories, fetchCategories, removeCategories} from "../store/app/categories";
import NewCategories from "./categories/NewCategories";
import {has} from "../utils/functions";
import CategoryForm from "./categories/CategoryForm";
import CategoryItem from "./categories/CategoryItem";
import {fetchNotes} from "../store/app/notes";

class Categories extends Component {

    state = {
        addNew: false
    }

    componentDidMount() {
        if (!this.props.categories.isFetching && !this.props.categories.isLoaded) {
            this.props.fetchCategories()
        }
    }

    addNewToggle = () => {
        let addNew = this.state.addNew;
        this.setState({addNew: !addNew});
    }

    viewCategoryPosts = (notes) => {
        this.props.fetchNotes(notes);
    }

    render() {

        let {categories, addCategories, removeCategories, isFetching, isLoaded} = this.props;
        let {addNew} = this.state;

        if (isFetching) {
            return 'Loading';
        }

        if (!categories.length && isLoaded) {
            return <div className={'categories _no_items'}>
                <div className={'_no_items-item'}>No items found</div>
                {addNew && <CategoryForm addCategories={addCategories} addNewToggle={() => this.addNewToggle()}/>}
                <NewCategories addNewToggle={this.addNewToggle}/>
            </div>
        }

        let _items = has(categories) && categories.map((item, index) => {
            return <CategoryItem item={item} key={index} viewCategoryPosts={this.viewCategoryPosts}
                                 removeCategories={removeCategories}/>
        })

        return (
            <div className="categories">
                <ul className={'categories-items'}>
                    {_items}
                </ul>
                <NewCategories addNewToggle={this.addNewToggle}/>

                {addNew && <CategoryForm addCategories={addCategories} addNewToggle={this.addNewToggle}/>}

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
        category: state.categories.category,
        isFetching: state.categories.isFetching,
        isLoaded: state.categories.isLoaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        addCategories: (value) => dispatch(addCategories(value)),
        removeCategories: (value) => dispatch(removeCategories(value)),
        fetchNotes: (value) => dispatch(fetchNotes(value)),
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Categories);