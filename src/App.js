import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./Task";
import TaskForm from "./TaskForm";

const TODO_LIST_STORAGE_KEY = "TODO_LIST_STORAGE_KEY";

const DISPLAYED_LISTS = {
	FINISHED: "FINISHED",
	UNFINISHED: "UNFINISHED",
	ALL: "ALL",
};

function App() {
	const initialState =
		JSON.parse(localStorage.getItem(TODO_LIST_STORAGE_KEY)) || [];

	const [taskList, setTaskList] = useState(initialState);

	// DO ZOSTAPIENIA DISPLAYED LIST
	const [displayFinished, setDisplayFinished] = useState(false);
	const [displayedList, setDisplayedList] = useState(
		DISPLAYED_LISTS.UNFINISHED
	);

	const addNewTask = (taskValue) => {
		const taskName = taskValue;
		if (!taskName) {
			return;
		}
		const newItem = {
			id: new Date(),
			taskInfo: taskName,
			isDone: false,
		};
		setTaskList([...taskList, newItem]);
		setDisplayFinished(false);
	};

	const handleToggleTask = (id) => {
		const updatedToDoList = taskList.map((item) => {
			if (item.id === id) {
				return { ...item, isDone: !item.isDone };
			}
			return item;
		});
		setTaskList(updatedToDoList);
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

	const unfinishedTask = taskList.filter((item) => !item.isDone);
	const finishedTask = taskList.filter((item) => item.isDone);

	return (
		<div className="App">
			<div className="flex-container">
				<div className="flex-item" id="todo-header">
					<h1>Todo</h1>
					<TaskForm onSubmit={addNewTask} />
				</div>
				<div className="flex-item" id="todo-viewer">
					<div className="list-switcher">
						{/* {Object.keys(DISPLAYED_LISTS).map((sth) => {
							console.log(sth);
						})} */}
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
						unfinishedTask.length ? (
							<ol className="list-viewer">
								{unfinishedTask.map((item) => (
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
						finishedTask.length ? (
							<ol className="list-viewer">
								{finishedTask.map((item) => {
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
