import React, {Component} from 'react';

class CategoryItem extends Component {
    render() {
        return (
            <li className={'categories-item'}>
                <button className={'categories-item-action-view'}
                        onClick={() => this.props.viewCategoryPosts(this.props.item)}>
                    {this.props.item.name}
                </button>
                <button className={'categories-item-action-remove'}
                        onClick={() => this.props.removeCategories(this.props.item)}>
                    x
                </button>
            </li>
        );
    }
}

export default CategoryItem;