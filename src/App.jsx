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

  const [allPoints, setAllPoints] = useState([]);

  useEffect(() => {
    fetch("https://63a63506f8f3f6d4ab081b51.mockapi.io/api/v1/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [tasks]);

  function createNewTask() {
    const newTask = {
      name: name,
      description: description,
      date: date,
      points: points,
      category: category
    };

    fetch("https://63a63506f8f3f6d4ab081b51.mockapi.io/api/v1/tasks", {
      method: "POST", // or 'PUT'
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

  const taskList = tasks.map((item) => (
    <Task
      name={item.name}
      description={item.description}
      points={item.points}
      key={item.id}
      category={item.category}
      date={item.date}
    />
  ));

  return (
    <div className="App">
      <Navbar />

      <TemporaryDrawer
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
      />
    </div>
  );
}
