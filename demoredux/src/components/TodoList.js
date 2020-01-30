import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../actions';
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.renderList = this.renderList.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    } 
    renderList() {
        return this.props.items.map((item, index) => {
            return (
                <div key={index}>
                    {item.title}
                    <button onClick={(event)=>this.deleteItem(index)}>Delete</button>
                </div>
            );
        });
    }
    addItem() {
        const newList = [...this.props.items, {title:this.state.text}];
        this.props.createTodo(newList);
        this.setState({
            text:''
        })
    }
    deleteItem(index) {
        const deleteList = this.props.items.filter((i,j) => j!=index);
        this.props.createTodo(deleteList);
    }
    render() {
        return (
            <div>
                <textarea value={this.state.text} onChange={(event) => this.setState({text: event.target.value})}>
                </textarea>
                <button onClick={() => this.addItem()}>
                    Add
                </button>
                <button onClick={() => this.props.createTodo([])}>
                    reset
                </button>
                {this.renderList()}
            </div>                
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.todo.items
    };
}
export default connect(mapStateToProps, {
    createTodo
})(TodoList);
