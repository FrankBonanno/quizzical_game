import React from "react";
import { nanoid } from "nanoid";

function Question(props) {
	// mix up answers in an array
	const answers = props.answers;

	// array of objects used for answers
	const answerObjectsArray = answers.map((answer) => ({
		value: answer,
		isCorrect: props.correctAnswer === answer,
		id: nanoid(),
	}));

	const answerElements = answerObjectsArray.map((answer) => (
		<button
			key={answer.id}
			className="btn-answer"
			onClick={props.handleAnswerClick}
			value={answer.value}
		>
			{answer.value}
		</button>
	));

	return (
		<div className="question">
			<h1
				dangerouslySetInnerHTML={{ __html: props.question }}
				className="question--text"
			></h1>
			<div className="question--btn-container">{answerElements}</div>
			<hr />
		</div>
	);
}

export default Question;
