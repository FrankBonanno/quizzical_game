import React from 'react';
import Answer from './Answer';

function Question(props) {
	const answerElements = props.answers.map((answer) => (
		<Answer
			key={answer.id}
			questionID={props.id}
			id={answer.id}
			handleClick={props.handleAnswerClick}
			value={answer.value}
			correctAnswer={props.correctAnswer}
			isSelected={answer.isSelected}
			isChecking={props.isChecking}
		/>
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
