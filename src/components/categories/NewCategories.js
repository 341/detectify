import React, {Component} from 'react';

class NewCategories extends Component {
    render() {
        return (
            <div className="categories-add-new-category">
                <button
                    type={'button'}
                    className={'add-new-category-action'}
                    onClick={() => {
                        this.props.addNewToggle();
                    }}>
                    <span className={'add-new-category-action-icon'}>+</span> New Folder
                </button>

            </div>
        );
    }
}

export default NewCategories;