import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./Task";

const TODO_LIST_STORAGE_KEY = "TODO_LIST_STORAGE_KEY";

function App() {
	const initialState =
		JSON.parse(localStorage.getItem(TODO_LIST_STORAGE_KEY)) || [];

	const [taskList, setTaskList] = useState(initialState);
	const [toDoInput, setToDoInput] = useState("");
	const [displayFinished, setDisplayFinished] = useState(false);

	const handleToggleTask = (id) => {
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
			return;
		}
		const newItem = {
			id: new Date(),
			taskInfo: taskname,
			isDone: false,
		};
		setTaskList([...taskList, newItem]);
		setToDoInput("");
		setDisplayFinished(false);
	};

	const handleRemoveTask = (id) => {
		const updatedToDoList = taskList.filter((item) => {
			return item.id !== id;
		});
		setTaskList(updatedToDoList);
	};

	useEffect(() => {
		localStorage.setItem(TODO_LIST_STORAGE_KEY, JSON.stringify(taskList));
	}, [taskList]);

	const unfinishedToDo = taskList.filter((item) => !item.isDone);
	const finishedToDo = taskList.filter((item) => item.isDone);

	return (
		<div className="App">
			<div className="flex-container">
				<div className="flex-item" id="todo-header">
					<h1>Todo</h1>
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
				<div className="flex-item" id="todo-viewer">
					<div className="list-switcher">
						<button
							className={displayFinished ? "" : "active-button"}
							onClick={() => {
								setDisplayFinished(false);
							}}
						>
							UnFinished
						</button>
						<button
							className={displayFinished ? "active-button" : ""}
							onClick={() => {
								setDisplayFinished(true);
							}}
						>
							Finished
						</button>
					</div>

					{!displayFinished ? (
						unfinishedToDo.length ? (
							<ol className="list-viewer">
								{unfinishedToDo.map((item) => (
									<Task
										key={item.id}
										id={item.id}
										taskInfo={item.taskInfo}
										onToggle={handleToggleTask}
										onRemove={handleRemoveTask}
										isDone={item.isDone}
									/>
								))}
							</ol>
						) : (
							<p>No Task</p>
						)
					) : null}
					{displayFinished ? (
						finishedToDo.length ? (
							<ol className="list-viewer">
								{finishedToDo.map((item) => {
									return (
										<Task
											key={item.id}
											id={item.id}
											taskInfo={item.taskInfo}
											onToggle={handleToggleTask}
											onRemove={handleRemoveTask}
											isDone={item.isDone}
										/>
									);
								})}
							</ol>
						) : (
							<p>No Task</p>
						)
					) : null}
				</div>
			</div>
		</div>
	);
}

export default App;
