import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./Task";
const initialToDo = { id: 0, taskInfo: "task", isDone: false };
const initialToDo1 = { id: 1, taskInfo: "task", isDone: true };

function App() {
	const [taskList, setTaskList] = useState([initialToDo, initialToDo1]);
	const [toDoInput, setToDoInput] = useState("");

	const handleToggle = (id) => {
		const updatedToDoList = taskList.map((item) => {
			if (item.id === id) {
				return { ...item, isDone: !item.isDone };
			}
			return item;
		});
		setTaskList(updatedToDoList);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const taskname = event.target.taskInput.value;
		if (!taskname) {
			console.error("puściutko");
			return;
		}
		const newItem = {
			id: new Date(),
			taskInfo: taskname,
			isDone: false,
		};
		setTaskList([...taskList, newItem]);
		setToDoInput("");
	};

	const handleRemove = (id) => {
		const updatedToDoList = taskList.filter((item) => {
			return item.id !== id;
		});
		setTaskList(updatedToDoList);
	};

	const unfinishedToDo = taskList.filter((item) => !item.isDone);
	const finishedToDo = taskList.filter((item) => item.isDone);

	return (
		<div className="App">
			<div className="flex-container">
				<h1 className="flex-item">Todo</h1>
				<div className="flex-item">
					<form onSubmit={handleSubmit}>
						<label>
							<input
								name="taskInput"
								type="text"
								placeholder="add your task"
								value={toDoInput}
								onChange={(event) => {
									setToDoInput(event.target.value);
								}}
							></input>
						</label>
						<button type="submit">Add Task</button>
					</form>
				</div>
				<div className="flex-item">
					<h1>UnFinished</h1>
					{unfinishedToDo.length ? (
						<ol>
							{unfinishedToDo.map((item) => (
								<Task
									key={item.id}
									id={item.id}
									taskInfo={item.taskInfo}
									onToggle={handleToggle}
									onRemove={handleRemove}
									isDone={item.isDone}
								/>
							))}
						</ol>
					) : (
						<p> Brak Tasków</p>
					)}
					<h1>Finished</h1>
					{finishedToDo.length ? (
						<ol>
							{finishedToDo.map((item) => {
								return (
									<Task
										key={item.id}
										id={item.id}
										taskInfo={item.taskInfo}
										onToggle={handleToggle}
										onRemove={handleRemove}
										isDone={item.isDone}
									/>
								);
							})}
						</ol>
					) : (
						<p>Brak Tasków</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
