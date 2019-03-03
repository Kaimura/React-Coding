import React from 'react';
import ToDoItems from './ToDoItems';

class ToDoList extends React.Component {
    render() {
        // console.log(this.props.todos);
        return (
                this.props.todos
                .map((todo) => (
                    <ToDoItems key={todo.id} todo={todo} completedTask={this.props.completedTask} removeToDoItem={this.props.removeToDoItem} />
                ))
        );
    }
}

export default ToDoList;