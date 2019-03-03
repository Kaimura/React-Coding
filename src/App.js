import React from "react";
import ToDoItems from "./Components/ToDoItems";
import Breadcrumb from "./Components/Breadcrumb";
// import todosData from "./Data/todosData";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            todos: [],
            isFiltered: false,
            filteredTodos: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.filteredList = this.filteredList.bind(this);
    }
    
    handleChange(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
            return {
                todos: updatedTodos
            };
        });
    }

    deleteHandler(id) {
      this.setState(() => {
        const remainingItems = this.state.todos
        .filter((todo) => {
          if(todo.id !== id) {
            return todo;
          }
        })
        return {
          todos: remainingItems
        }
      })
    }

    filteredList(method) {
      if(method == 'all') {
        this.setState(() => {
          return {
            isFiltered: false,
          }
        })
      }

      if(method == 'finished') {
        this.setState(() => {
          const finishedTasks = this.state.todos
          .filter((todo) => {
            if(todo.completed) {
              return todo;
            }
          })
          return {
            isFiltered: true,
            filteredTodos: finishedTasks
          }
        })
      }

      if(method == 'remaining') {
        this.setState(() => {
          const remainingTasks = this.state.todos
          .filter((todo) => {
            if(!todo.completed) {
              return todo;
            }
          })
          return {
            isFiltered: true,
            filteredTodos: remainingTasks
          }
        })
      }

    }
    
    componentDidMount() {
      this.setState({
        loading: true
      });
  
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=8')
      .then(response => response.json())
      .then(data => {
        this.setState( () => {
          return {
            loading: false,
            todos: data
          }
        })
      })
    }

    render() {
      let todoItems;
      if(this.state.isFiltered) {
         todoItems = this.state.filteredTodos.map(item => <ToDoItems key={item.id} item={item} handleChange={this.handleChange} deleteHandler={this.deleteHandler}/>);
      } else {
         todoItems = this.state.todos.map(item => <ToDoItems key={item.id} item={item} handleChange={this.handleChange} deleteHandler={this.deleteHandler}/>);
      }

        return (
            <div className="todo-container">
                <Breadcrumb filteredList={this.filteredList}/>
                {this.state.loading ? `Loading list` : todoItems}
            </div>
        )
    }
}

export default App