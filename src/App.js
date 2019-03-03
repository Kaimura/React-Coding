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
      if(method === 'finished') {
          const finishedTasks = this.state.todos
          .filter((todo) => {
            if(todo.completed) {
              return todo;
            }
          })
          return finishedTasks
      }

      if(method === 'remaining') {
          const remainingTasks = this.state.todos
          .filter((todo) => {
            if(!todo.completed) {
              return todo;
            }
          })
          return remainingTasks
      }

    }

    swapItems = (fromItem, toItem) => {
      let items = this.state.todos.slice();
      let fromIndex = -1;
      let toIndex = -1;
  
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === fromItem.id) {
          fromIndex = i;
        }
        if (items[i].id === toItem.id) {
          toIndex = i;
        }
      }
  
      if (fromIndex != -1 && toIndex != -1) {
        let { fromId, ...fromRest } = items[fromIndex];
        let { toId, ...toRest } = items[toIndex];
        items[fromIndex] = { id: fromItem.id, ...toRest };
        items[toIndex] = { id: toItem.id, ...fromRest };
  
        this.setState({ todos: items });
      }
    };

    handleDragStart = data => event => {
      let fromItem = JSON.stringify({ id: data.id });
      event.dataTransfer.setData("dragContent", fromItem);
    };

    handleDragOver = data => event => {
      event.preventDefault();
      return false;
    };

    handleDrop = data => event => {
      event.preventDefault();
    
      let fromItem = JSON.parse(event.dataTransfer.getData("dragContent"));
      let toItem = { id: data.id };
    
      this.swapItems(fromItem, toItem);
      return false;
    };


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
        todoItems = this.state.todos
        .map(item => 
          <ToDoItems 
            key={item.id} 
            item={item} 
            handleChange={this.handleChange} 
            deleteHandler={this.deleteHandler} 
            draggable="true"
            onDragStart={this.handleDragStart}
            onDragOver={this.handleDragOver}
            onDrop={this.handleDrop}
            />
        );
      } else { //render filtered
        todoItems = this.filteredList(this.state.filterMethod)
        .map(item => 
          <ToDoItems 
            key={item.id} 
            item={item} 
            handleChange={this.handleChange} 
            deleteHandler={this.deleteHandler}
            draggable="true"
            onDragStart={this.handleDragStart}
            onDragOver={this.handleDragOver}
            onDrop={this.handleDrop}
          />
        );
      }
        return (
            <div className="todo-container">
                <Breadcrumb setFilterMethod={this.setFilterMethod} />
                {this.state.loading ? `Loading list...` : todoItems}
            </div>
        )
    }
}

export default App