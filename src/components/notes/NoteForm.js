import React, {Component} from 'react';

class NoteForm extends Component {

    input = null;
    state = {value: ''};

    constructor(props){
        super(props);
        this.input = React.createRef();
    }

    handleChange(event) {
        // console.log(event);
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleKeyUp(event) {
        if(event.keyCode===13){

            event.preventDefault();
            this.props.addNotes(this.state.value, this.props.category);
            this.props.addNewToggle();
        }
    }

    componentDidMount() {
        this.input.current.focus();
    }

    componentWillUnmount() {
        this.input.current.blur();
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)} className={'notes-form'}>

                <input type="text" value={this.state.value}
                       ref={this.input}
                       className={'notes-form-input'}
                       onKeyUp={(e) => this.handleKeyUp(e)}
                       onChange={(e) => this.handleChange(e)}/>

            </form>
        );
    }
}

export default NoteForm;