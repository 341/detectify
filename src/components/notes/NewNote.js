import React, {Component} from 'react';

class NewNote extends Component {
    render() {
        return (
            <div className="notes-add-new-note">
                <button
                    type={'button'}
                    className={'add-new-note-action'}
                    onClick={() => {
                        this.props.addNewToggle();
                    }}>
                    <span className={'add-new-note-action-icon'}>+</span> New Note
                </button>

            </div>
        );
    }
}

export default NewNote;