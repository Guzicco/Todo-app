import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./Task";
import TaskForm from "./TaskForm";

const TODO_LIST_STORAGE_KEY = "TODO_LIST_STORAGE_KEY";

const DISPLAYED_LISTS = {
	UNFINISHED: "UNFINISHED",
	FINISHED: "FINISHED",
	ALL: "ALL",
};

function App() {
	const initialState =
		JSON.parse(localStorage.getItem(TODO_LIST_STORAGE_KEY)) || [];

	const [taskList, setTaskList] = useState(initialState);
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
		setDisplayedList(DISPLAYED_LISTS.UNFINISHED);
	};

	const handleToggleTask = (id) => {
		const updatedTaskList = taskList.map((item) => {
			if (item.id === id) {
				return { ...item, isDone: !item.isDone };
			}
			return item;
		});
		setTaskList(updatedTaskList);
	};

	const handleRemoveTask = (id) => {
		const updatedTaskList = taskList.filter((item) => {
			return item.id !== id;
		});
		setTaskList(updatedTaskList);
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
						{Object.keys(DISPLAYED_LISTS).map((key) => {
							return (
								<button
									className={displayedList === key ? "active-button" : ""}
									onClick={() => {
										setDisplayedList(key);
									}}
								>
									{key}
								</button>
							);
						})}
					</div>
					{displayedList === DISPLAYED_LISTS.FINISHED ? (
						finishedTask.length ? (
							<ol className="list-viewer">
								{finishedTask.map((item) => (
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
							<p>Congrat's! Your job is done!</p>
						)
					) : null}
					{displayedList === DISPLAYED_LISTS.UNFINISHED ? (
						unfinishedTask.length ? (
							<ol className="list-viewer">
								{unfinishedTask.map((item) => {
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
							<p>There's no way You don't have any work to do...</p>
						)
					) : null}
					{displayedList === DISPLAYED_LISTS.ALL ? (
						taskList.length ? (
							<ol className="list-viewer">
								{taskList.map((item) => {
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
							<p>Your workflow is empty</p>
						)
					) : null}
				</div>
			</div>
		</div>
	);
}

export default App;
