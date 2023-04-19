import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import TaskDetails from './components/TaskDetails'


const App= () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

//on page load, it will fetch the data down for us 
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await
      //when page loads, call fetchTasks to grab the task list form the server and plug it in as a starting state
      fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  },[])

//Fetch Tasks
const fetchTasks = async() => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  return data
}

//Fetch Task
const fetchTask = async(id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data
}

//Add Task 
const addTask = async(task) => {
  //make the post request containing the body of the new tasks that we're adding
  const res= await fetch(`http://localhost:5000/tasks`, {
    method:'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  //get a response that contains the task that was just added 
  const data = await res.json()
  //take that data and add it to the task state to the existing state list 
  setTasks([...tasks,data])

//   const id= Math.floor(Math.random() * 10000) +1
//   const newTask = {id, ...task}
//   //taking the existing task list, breaking it apart and adding the new task
//   setTasks([...tasks,newTask])
}


//Delete Task 
const deleteTask = async(id) => {
  //make delete request , manually building the request information ourselves 
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'DELETE',
  })

  //setting a new state called setTasks
  setTasks(tasks.filter((task) => task.id !== id))
}


//Toggle reminder, if double click matches the id, then set the reminder to the opposite
const toggleReminder = async (id) => {
  //fetching a singular task and assign it to variable 
  const taskToToggle = await fetchTask(id)
 //taking the singular task and spreading into individual components updating the one that has to do with reminders 
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
  //sending data 
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'PUT',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })
  //get a response that contains the task that was just added 
  const data = await res.json()

  setTasks(
    tasks.map((task) => 
    task.id === id ? {...task, reminder: data.reminder}:task
    )
  )
}

  return (
    <Router>
      <div className="container">
        <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Routes>
        <Route 
          path="/"
          element = {
            <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No tasks to display"}
            </>
          }
          />
          <Route path='/about' element={<About />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
