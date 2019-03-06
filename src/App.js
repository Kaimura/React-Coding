import React from "react";
import ToDoItems from "./Components/ToDoItems";
import FilterBar from "./Components/FilterBar";
import AddToDo from "./Components/AddToDo";
// import todosData from "./Data/todosData";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 8,
            loading: false,
            todos: [],
            filterMethod: 'all'
        };
    }

    handleChange = id => {
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

    deleteHandler = id => {
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

    setFilterMethod = method => {
      this.setState(()=> {
        return {
          filterMethod: method
        }
      })
    }

    filteredList = method => {
      const methods = {
        all: (todo) => true,
        finished: (todo) => todo.completed, //(todo) only works since it is called via this.state.todos
        remaining: (todo) => !todo.completed,
      };
      return this.state.todos.filter(methods[method]);
    }

    swapItems = (srcItemId, targetItemId) => { //no 'this' binding in constructor necessary since arrow function
      let items = this.state.todos.slice();
      let srcIndex = -1;
      let targetIndex = -1;
  
      items.map((todo, index) => {
        if(todo.id === srcItemId) srcIndex = index
        if(todo.id === targetItemId) targetIndex = index 
      })
  
      if (srcIndex != -1 && targetIndex != -1) {
        let {...srcRest} = items[srcIndex]; //save attributes of src data at position srcIndex before it is overwritten with target data
        let {...targetRest} = items[targetIndex];
        items[srcIndex] = {...targetRest}; //...targetRest means pass the rest of the attributes from the object - target overwrites position and data of src with own attributes
        items[targetIndex] = {...srcRest};

        this.setState({ todos: items });
      }
    };

    handleDragStart = srcItemId => event => { //arrow function inside arrow function makes acess to event possible (when event needs to be acessed in direct parent component)
      event.dataTransfer.setData("dragContent", srcItemId); //alternatively save as object { "id" : scrItemId}
    };

    handleDragOver = () => event => {
      event.preventDefault();
      return false;
    };

    handleDrop = targetItemId => event => {
      event.preventDefault();
      let srcItemId = JSON.parse(event.dataTransfer.getData("dragContent")); //parse since getData retrieves content (a string) from the dragContent key - converts it to a number
      this.swapItems(srcItemId, targetItemId);
      return false;
    };

    addItem = title => {

      if(!title) {
        alert("Please enter text");
        return;
      }

      // fetch('https://jsonplaceholder.typicode.com/todos', {
      //   method: 'POST',
      //   headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     userId: 1,
      //     // id: this.state.counter + 1, //id always 201??? same as status number.. Also not incrementing..
      //     title: title,
      //     completed: false
      //   })
      // })
      // .then(response => response.json())
      // .then(response => {
      //   console.log(response);
      //   this.setState(()=> {
      //     return {
      //       todos: [...this.state.todos, response] // ',' means add this to the already spreaded array
      //     }
      //   })
      // })

      const newTodo = {
        userId: 1,
        id: this.state.counter + 1,
        title: title,
        completed: false
      }

      this.setState(()=> {
        return {
          counter: this.state.counter + 1,
          todos: [...this.state.todos, newTodo] // ',' means add this to the already spreaded array
        }
      })

    }

    componentDidMount() {
      this.setState({
        loading: true
      });
  
      fetch('https://jsonplaceholder.typicode.com/todos?_limit='+ this.state.counter)
      .then(response => response.json())
      .then(response => {
        this.setState( () => {
          return {
            loading: false,
            todos: response
          }
        })
      })
    }

    render() {
      let todoItems = this.filteredList(this.state.filterMethod)
      .map(item =>
        <ToDoItems 
          key={item.id} //returns new instance for every rendered component instead of just mutating already existing one (makes react treat every object individually)
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
              <FilterBar setFilterMethod={this.setFilterMethod} method={this.state.filterMethod} />
              <AddToDo addItem={this.addItem}/>
              {this.state.loading ? `Loading list...` : todoItems}
            </div>
        )
    }
}

export default App