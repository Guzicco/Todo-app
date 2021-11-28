import React from "react";

const Task = ({ id, taskInfo, onToggle, isDone, onRemove }) => {
	return (
		<li>
			{taskInfo}
			<input
				type="checkbox"
				onChange={() => {
					onToggle(id);
				}}
				checked={isDone}
			/>
			<button
				onClick={() => {
					onRemove(id);
				}}
			>
				Delete
			</button>
		</li>
	);
};

export default Task;
