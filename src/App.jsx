import './index.css'

import React, { useState, useEffect } from "react";

import Main from "./components/Main";
import Navbar from "./components/Navbar";
import TemporaryDrawer from "./components/SideNav";
import Task from "./components/Task";


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [points, setPoints] = useState(null);
  const [category, setCategory] = useState("");
  const [drawerOpen, setDrawerOpen] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const [allPoints, setAllPoints] = useState([]);

  
/* Creates new Task to send to API*/
  function createNewTask() {
    const newTask = {
      name: name,
      description: description,
      date: date,
      points: points,
      category: category
    };

    fetch("https://63a63506f8f3f6d4ab081b51.mockapi.io/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setTasks([...tasks, newTask]);
    console.log(newTask);
  }

  /* Deletes Task to delete from API */
  async function deleteTask(taskId) {
    try {
      const response = await fetch(`https://63a63506f8f3f6d4ab081b51.mockapi.io/api/v1/tasks/${taskId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      console.log(data);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Deletion Failed");
    }
    
  }

  /* Edits Task to update from API */

  async function editTask(taskId){
    const prevTask = {
      name: name,
      description: description,
      date: date,
      points: points,
      category: category
    };


    try{
      const response = await fetch(`https://63a63506f8f3f6d4ab081b51.mockapi.io/api/v1/tasks/${taskId}`, {
        method: 'PUT', 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(prevTask)
      });
      const data = await response.json();
      console.log(data);
    }
    catch (error) {
      console.log("Edit Failed")
    }
  }



  useEffect(() => {
    fetch("https://63a63506f8f3f6d4ab081b51.mockapi.io/api/v1/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const totalPoints = tasks.reduce((sum, task) => sum + Number(task.points), 0);

  const editDrawer = () => {
    console.log("it ran")
  }


  const taskList = tasks.map((item) => (
    <Task
      name={item.name}
      description={item.description}
      points={item.points}
      key={item.id}
      category={item.category}
      date={item.date}
      id={item.id}
      deleteTask={deleteTask}
      editTask={editTask}
      editDrawer={editDrawer}
      
    />
  ));

  return (
    <div className="App">
      <Navbar 
      
      points={totalPoints}
      
      />

      <TemporaryDrawer
        taskList={taskList}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        points={points}
        setPoints={setPoints}
        category={category}
        setCategory={setCategory}
        allPoints={allPoints}
        createNewTask={createNewTask}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
  />


      <Main
        name={name}
        description={description}
        date={date}
        points={points}
        category={category}
        allPoints={allPoints}
        createNewTask={createNewTask}
        taskList={taskList}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      
    </div>
  );
}
