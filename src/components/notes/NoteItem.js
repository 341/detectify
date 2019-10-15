import React, {Component} from 'react';

class NoteItem extends Component {

    
    render() {

        return (
            <li className={'notes-item'}>
                <button className={'notes-item-action-view'}
                        onClick={() => this.props.setNote(this.props.item, this.props.category)}>
                    {this.props.item.name}
                </button>
                <button className={'notes-item-action-remove'}
                        onClick={() => this.props.removeNote(this.props.item)}>
                    x
                </button>
            </li>
        );
    }
}

export default NoteItem;