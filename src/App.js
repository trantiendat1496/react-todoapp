import React from 'react';

//components
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
//css
import './App.css';
import './css/Todo.css';


const isNotCheckAll = (todo = []) => todo.find(todo => !todo.isCompleted)

const filterByStatus = (todo = [], status = '', id= '') => {
  switch (status) {
    case 'ACTIVE':
      return todo.filter(todo => !todo.isCompleted)
      
    case 'COMPLETED':
      return todo.filter(todo => todo.isCompleted)
    case 'REMOVE':
      return todo.filter(todo => todo.id !== id)  
    default:
      return todo
      
  }
}
class App extends React.PureComponent {
  state = {
    todosList: [{
      id: 1,
      text: 'todo 1',
      isCompleted: true
    }, {
      id: 2,
      text: 'todo 2',
      isCompleted: false
    }], 
    todoEditingId: '',
    isCheckedAll: false,
    status: 'ALL'
  }

  componentWillMount() {
    this.setState({
      isCheckedAll: !isNotCheckAll(this.state.todosList)
    })
  }

  addTodo = (todo = {}) => {
    this.setState(preState => ({
      todosList: [...preState.todosList, todo]
    }))
  }

  getTodoEditingId = (id = '') => {
    this.setState({todoEditingId: id})
  }

  onEditTodo = (todo = {}, index = -1) => {
    if (index >= 0) {
      const { todosList: list } = this.state;
      list.splice(index, 1, todo)
      this.setState({
        TodoList: list,
        todoEditingId: ''
      })
    }
  }

  markComplete = (id = '') => {
    const { todosList } = this.state
    const updatedList = todosList.map(todo => todo.id === id ? ({ ...todo, isCompleted: !todo.isCompleted }) : todo)
    this.setState(preState => ({
      todosList: updatedList,
      isCheckedAll: !isNotCheckAll(updatedList)
    }))
  }

  checkAllTodos = () => {
    const { todosList, isCheckedAll } = this.state
    this.setState(preState => ({
      todosList: todosList.map(todo => ({ ...todo, isCompleted: !isCheckedAll})),
      isCheckedAll: !preState.isCheckedAll
    }))
  }

  setStatusFilter = (status = '') => {
    this.setState({
      status
    })
  }

  clearCompleted = () => {
    const { todosList } = this.state
    this.setState({
      todosList: filterByStatus(todosList, 'ACTIVE')
    })
  }

  removeTodo = (id = '') => {
    const { todosList } = this.state
    this.setState({
      todosList: filterByStatus(todosList, 'REMOVE', id)
    })
  }

  render () {
    const {todosList, todoEditingId, isCheckedAll, status} = this.state;

    return (
      <div className="todoapp">
        <Header 
          addTodo={this.addTodo}
        />
        <TodoList 
          todosList={filterByStatus(todosList, status)} 
          getTodoEditingId={this.getTodoEditingId}
          todoEditingId={todoEditingId}
          onEditTodo={this.onEditTodo}
          markComplete={this.markComplete}
          isCheckedAll={isCheckedAll}
          checkAllTodos={this.checkAllTodos}
          removeTodo={this.removeTodo}
        />
        <Footer 
          setStatusFilter = {this.setStatusFilter}
          status={status}
          clearCompleted = {this.clearCompleted}
          numOfTodos={todosList.length}
          numOftodosLeft={filterByStatus(todosList, 'ACTIVE').length}
        />
      </div>
    );
  }
}

export default App;
