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
            filterMethod: 'all'
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

    setFilterMethod(method) {
      this.setState(()=>{
        return {
          filterMethod: method
        }
      })
    }

    filteredList(method) {
      const methods = {
        all: (todo) => true,
        finished: (todo) => todo.completed,
        remaining: (todo) => !todo.completed,
      };
      return this.state.todos.filter(methods[method]);
    }

    swapItems = (srcItem, targetItem) => {
      let items = this.state.todos.slice();
      let srcIndex = -1;
      let targetIndex = -1;
  
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === srcItem.id) {
          srcIndex = i;
        }
        if (items[i].id === targetItem.id) {
          targetIndex = i;
        }
      }
  
      if (srcIndex != -1 && targetIndex != -1) {
        let { srcId, ...srcRest } = items[srcIndex];
        let { targetId, ...targetRest } = items[targetIndex];
        items[srcIndex] = { id: srcItem.id, ...targetRest };
        items[targetIndex] = { id: targetItem.id, ...srcRest };
  
        this.setState({ todos: items });
      }
    };

    handleDragStart = data => event => {
      let srcItem = JSON.stringify({ id: data.id });
      event.dataTransfer.setData("dragContent", srcItem);
    };

    handleDragOver = data => event => {
      event.preventDefault();
      return false;
    };

    handleDrop = data => event => {
      event.preventDefault();
    
      let srcItem = JSON.parse(event.dataTransfer.getData("dragContent"));
      let targetItem = { id: data.id };
    
      this.swapItems(srcItem, targetItem);
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
      let todoItems = this.filteredList(this.state.filterMethod)
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
      )

        return (
            <div className="todo-container">
                <Breadcrumb setFilterMethod={this.setFilterMethod} />
                {this.state.loading ? `Loading list...` : todoItems}
            </div>
        )
    }
}

export default App