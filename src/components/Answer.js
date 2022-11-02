import React from "react";

function Answer(props) {
	let style;
	if (props.isSelected) {
		style = "btn-guess";
	}
	if (props.isChecking) {
		if (props.correctAnswer === props.value) {
			style = "btn-correct";
		} else if (props.isSelected) {
			style = "btn-incorrect";
		}
	}

	return (
		<button
			dangerouslySetInnerHTML={{ __html: props.value }}
			key={props.id}
			className={`btn-answer ${style}`}
			onClick={props.handleClick}
			value={props.value}
		></button>
	);
}

export default Answer;
