import React, {Component} from 'react';
import WysiwygEditor from "./editor/wysiwyg_editor";
import {toHtml, toState} from "../utils/editor";
import {connect} from "react-redux";
import {updateNote} from "../store/app/note";
import {Form, withFormik} from "formik";
import * as Yup from 'yup';
import {EditorState} from 'draft-js';
import {fetchCategories} from "../store/app/categories";
import {transferNote} from "../store/app/note";
import { has } from '../utils/functions';

class Note extends Component {
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(prevProps.note.id !==this.props.note.id){
    //
    //     }
    // }

    render() {
        const {
            values,
            errors,
            setFieldValue,
            handleBlur,
            touched,
            dirty,
            category            ,
            categories
        } = this.props;

        let hasError = Object.keys(errors).length === 0 && true;
        let canSubmit = hasError && dirty;

        let formClasses = ['config-form'].join(' ');

        if (values.id === '') {
            return null;
        }

        let move_cat = categories.filter(item => item.id !== category.id);

        
        let _options = has(move_cat) && move_cat.map((item, index) => {
            return <option key={index} value={item.id}>{item.name}</option>
        })

        return (
            <div className={formClasses}>

                <Form>
                    <WysiwygEditor
                        editorState={values.content}
                        attr={'content'}
                        touched={touched}
                        errors={errors}
                        onChange={setFieldValue}
                        placeholder={'Some Text'}
                        onBlur={handleBlur}
                    />
                    <button className={'btn btn-submit'}>Save</button>
                </Form>

                
                <select name='move-to-new-cat' className='move-to-new-cat' onChange={((e)=>{

                    let next_cat = e.target.value;
                    let note = {
                        id: this.props.values.id,
                        name: this.props.values.name,
                        content: toHtml(values.content.getCurrentContent())
                    };
                    let category = this.props.category;

                    let cat = this.props.categories.find(item => item.id === next_cat);
                    

                    this.props.transferNote(note, category, cat);

                })}>
                    <option value=''>Select One</option>
                    {_options}
                </select>
                

            </div>
        );
    }
}

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        content: Yup.string().ensure()
            .required('content is required'),
    }),
    enableReinitialize: true,

    mapPropsToValues({note}) {

        if (!note) {
            return {
                id: '',
                name: '',
                content: new EditorState.createEmpty(),
            }
        }

        let content = toState(note.content);

        return {
            id: note.id || '',
            name: note.name || '',
            content: content || new EditorState.createEmpty(),
        }

    },

    handleSubmit: (values, {props, setSubmitting}) => {

        let content = toHtml(values.content.getCurrentContent());

        let note = {
            id: values.id,
            name: values.name,
            content: content,
        };

        props.updateNote(note, props.category);

    },
    displayName: 'Note'

})(Note);

const mapStateToProps = state => {
    return {
        note: state.note.note,
        category: state.note.category,
        categories: state.categories.categories,
        isFetching: state.categories.isFetching,
        isLoaded: state.categories.isLoaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        updateNote: (note,category) => dispatch(updateNote(note,category)),
        transferNote: (note, category, next_category) => dispatch(transferNote(note, category, next_category)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(formikEnhancer);