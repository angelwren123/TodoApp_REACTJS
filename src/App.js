// import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import Control from "./components/Control";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import _ from 'lodash'
function App() {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  const generateID = () => {
    return s4() + s4() + s4() + s4(); // Example => 'e014026082e6237b'
  }
  const tasksMain = {
    tasks: [{
      id: generateID(),
      name: 'Học REACTJS',
      status: true
    },
    {
      id: generateID(),
      name: 'Đi bơi',
      status: false
    },{
      id: generateID(),
      name: 'Ngủ',
      status: false
    }],
  }
  const filter = {
    status: -1,
    name: '',
  }
  const sort = {
    by:'',
    value:1
  }
  const [stateTasks, setstateTasks] = useState(tasksMain);
  const [stateIsDisplayForm, setStateIsDisplayForm] = useState(false);
  const [stateTaskEditing, setStateTaskEditing] = useState(null)
  const [stateFilter, setStateFilter] = useState(filter);
  const [keyword, setKeyword] = useState('')
  const [ stateSort, setStateSort ] = useState(sort)
  useEffect(() => {
    if (localStorage.getItem('tasks')) {
      var taskItem = JSON.parse(localStorage.getItem('tasks'));
      setstateTasks({
        tasks: taskItem
      })
    } else {
      localStorage.setItem('tasks', JSON.stringify(stateTasks.tasks))
    }

    // console.log(stateTasks)
  }, [])

  const onToggleForm = () => {
    setStateIsDisplayForm(true)
    setStateTaskEditing(null)

    // console.log(stateIsDisplayForm)
  }
  const onCloseForm = (value) => {
    console.log(value);
    setStateIsDisplayForm(value)
  }

  //luu
  const valueForm = (data) => {
    console.log(data)
    let results
    if (data.id === undefined) {
      var task = {
        id: generateID(),
        name: data.name,
        status: data.status,
      }
      results = [...stateTasks.tasks, task];
      setstateTasks({
        tasks: results
      })
      localStorage.setItem('tasks', JSON.stringify(results))
    } else {
      stateTasks.tasks.forEach((task, index) => {
        if (task.id === data.id) {
          stateTasks.tasks[index] = data;
        }
      })
      setstateTasks({
        tasks: stateTasks.tasks
      })
      localStorage.setItem('tasks', JSON.stringify(stateTasks.tasks))
      setStateTaskEditing(null)
      // onCloseForm(false)
    }
  }

  const onUpdateStatus = (id) => {
    // console.log(id);
    console.log(stateTasks.tasks)
    stateTasks.tasks = JSON.parse(localStorage.getItem('tasks'))
    stateTasks.tasks.forEach((task, index) => {
      if (task.id === id) {
        task.status = !task.status;
        console.log(task.status);
      }
    })
    localStorage.setItem('tasks', JSON.stringify(stateTasks.tasks))
    setstateTasks({
      tasks: JSON.parse(localStorage.getItem('tasks'))
    })
    
    
  }

  const onDelete = (id) => {
    console.log(id);
      stateTasks.tasks.forEach((task, index) => {
        if (task.id === id) {
          console.log(task)
          stateTasks.tasks.splice(index, 1);
        }
      })
      setstateTasks({
        tasks: stateTasks.tasks
      })
      localStorage.setItem('tasks', JSON.stringify(stateTasks.tasks))
      console.log(stateTasks.tasks)
  }

  const onUpdate = (data) => {
    setStateTaskEditing(data)
    onShowForm()
  }

  const onShowForm = () => {
    setStateIsDisplayForm(true)
  }
  // console.log(stateTasks.tasks)
  const onFilter = (name, status) => {
    // console.log(name+ ': '+status);
    // console.log(stateTasks.tasks)
    status = parseInt(status, 10)
    setStateFilter({
      name: name.toLowerCase(),
      status: status,
    })
  }
  
  if(localStorage.getItem('tasks')){
    if (stateFilter) {
      if (stateFilter.name !== '') {
        // stateTasks.tasks = JSON.parse(localStorage.getItem('tasks')).filter((task, index) => {
        //   return task.name.toLowerCase().indexOf(stateFilter.name) !== -1
        // })
        // lodash
        stateTasks.tasks = _.filter(JSON.parse(localStorage.getItem('tasks')),(task)=>{
          return task.name.toLowerCase().indexOf(stateFilter.name) !== -1
        })
      }else{
        stateTasks.tasks = JSON.parse(localStorage.getItem('tasks'))
      }
      stateTasks.tasks = stateTasks.tasks.filter((task, index) => {
        if (stateFilter.status === -1) {
          return task
        } else {
          return task.status === (stateFilter.status === 0 ? true :  false)
        }
      })
    }
    // 
    if(keyword){
      stateTasks.tasks = JSON.parse(localStorage.getItem('tasks')).filter((task, index) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1
      })
    }

    // 
    if(stateSort){
      if(stateSort.by === 'name'){
        stateTasks.tasks.sort((a,b)=>{
          if(a.name > b.name) return stateSort.value;
          else if(a.name < b.name) return -stateSort.value;
          else return 0;
        })
      }
      if(stateSort.by === 'status'){
        stateTasks.tasks.sort((a,b)=>{
          if(a.status < b.status) return stateSort.value;
          else if(a.status > b.status) return -stateSort.value;
          else return 0;
        })
      }
    } 
  }
  const onSearch = (keyWord) =>{
    console.log(keyWord.valueKeyword);
    setKeyword(keyWord.valueKeyword);
  }
  const onSort= (sortBy, sortValue) => {
    console.log(sortBy, sortValue)
    setStateSort({
      by:sortBy,
      value:sortValue
    })
  }
  return (
    <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
        <div className={stateIsDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
          {stateIsDisplayForm ?
            <TaskForm
              onCloseForm={onCloseForm}
              valueForm={valueForm}
              taskEditing={stateTaskEditing}
            />
            : ''}
        </div>
        <div className={stateIsDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
          <button type="button" className="btn btn-dark" onClick={() => onToggleForm()} >
            <i className="fa fa-plus mr-2"></i>Thêm Công Việc
          </button>
          <br />
          <hr />
          {/* Search, Sort */}
          <div className="row mt-15">
            <Control 
            onSearch={onSearch}
            onSort={onSort} />
          </div>
          {/* LIST */}
          <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <TaskList
                stateTasks={stateTasks}
                onUpdateStatus={onUpdateStatus}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onFilter={onFilter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
