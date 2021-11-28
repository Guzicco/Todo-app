import React, { useState } from "react";

const TaskForm = (props) => {
	const [taskInput, setTaskInput] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		const taskName = event.target.taskInput.value;
		setTaskInput("");
		return taskName;
	};

	return (
		<form
			onSubmit={(event) => {
				props.onSubmit(handleSubmit(event));
			}}
		>
			<label>
				<input
					name="taskInput"
					type="text"
					placeholder="add your task"
					value={taskInput}
					onChange={(event) => {
						setTaskInput(event.target.value);
					}}
				></input>
			</label>
			<button type="submit">Add Task</button>
		</form>
	);
};

export default TaskForm;
