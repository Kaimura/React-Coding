import React from "react";
import ToDoItems from "./Components/ToDoItems";
import Breadcrumb from "./Components/Breadcrumb";
// import AddToDo from "./Components/AddToDo";

// import todosData from "./Data/todosData";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            todos: [],
            filterMethod: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.filteredList = this.filteredList.bind(this);
        this.setFilterMethod = this.setFilterMethod.bind(this);
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

    setFilterMethod(method){
      this.setState(()=>{
        return {
          filterMethod: method
        }
      })
    }

    filteredList(method) {

      if(method == 'finished') {
          const finishedTasks = this.state.todos
          .filter((todo) => {
            if(todo.completed) {
              return todo;
            }
          })
          return finishedTasks
      }

      if(method == 'remaining') {
          const remainingTasks = this.state.todos
          .filter((todo) => {
            if(!todo.completed) {
              return todo;
            }
          })
          return remainingTasks
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

      if(!this.state.filterMethod) { //filterMethod is null -> render all
        todoItems = this.state.todos.map(item => <ToDoItems key={item.id} item={item} handleChange={this.handleChange} deleteHandler={this.deleteHandler}/>);
      } else { //render filtered
        todoItems = this.filteredList(this.state.filterMethod).map(item => <ToDoItems key={item.id} item={item} handleChange={this.handleChange} deleteHandler={this.deleteHandler}/>);
      }
        return (
            <div className="todo-container">
                <Breadcrumb setFilterMethod={this.setFilterMethod} />
                {this.state.loading ? `Loading list` : todoItems}
            </div>
        )
    }
}

export default App