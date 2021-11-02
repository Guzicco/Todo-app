import React from "react";

const Task = ({ id, taskInfo, onToggle, isDone, onRemove }) => {
	return (
		<li key={id}>
			{taskInfo}{" "}
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
				Usuń mnie
			</button>
		</li>
	);
};

export default Task;
