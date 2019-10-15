import React, {Component} from 'react';
import {addCategories} from "../store/app/categories";
import {addNotes, removeNote} from "../store/app/notes";
import {compose} from "redux";
import {connect} from "react-redux";
import {has} from "../utils/functions";

import NoteForm from "./notes/NoteForm";
import NoteItem from "./notes/NoteItem";
import NewNote from "./notes/NewNote";

import {setNote} from "../store/app/note";

class Notes extends Component {

    state = {
        addNew: false
    }

    addNewToggle = () => {
        let addNew = this.state.addNew;
        this.setState({addNew: !addNew});
    }

    render() {

        let {isFetching, isLoaded, addNotes, removeNote, setNote, notes, category} = this.props;

        let {addNew} = this.state;

        if (!isFetching && !isLoaded) {
            return <div className={'notes _no_items'}>
                <div className={'_no_items-item'}>No items found</div>
            </div>
        }

        if (notes.length === 0) {
            return <div className={'notes _no_items'}>
                <div className={'_no_items-item'}>No items found</div>
                {addNew && <NoteForm addNotes={addNotes} category={category} addNewToggle={() => this.addNewToggle()}/>}
                <NewNote addNewToggle={this.addNewToggle}/>
            </div>
        }

        let _notes = has(notes) && notes.map((item, index)=>{
            return <NoteItem item={item} key={index} category={category} setNote={setNote} removeNote={removeNote}/>
        })

        return (
            <div className={'notes'}>
                <div className="notes-items">
                    {_notes}
                </div>
                <NewNote addNewToggle={this.addNewToggle}/>

                {addNew && <NoteForm addNotes={addNotes} category={category} addNewToggle={() => this.addNewToggle()}/>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes.notes,
        category: state.notes.category,
        isFetching: state.notes.isFetching,
        isLoaded: state.notes.isLoaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNotes: (note, category) => dispatch(addNotes(note, category)),
        addCategories: (value) => dispatch(addCategories(value)),
        removeNote: (value) => dispatch(removeNote(value)),
        setNote: (value, category) => dispatch(setNote(value, category)),
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Notes);