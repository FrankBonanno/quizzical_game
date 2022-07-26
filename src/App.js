import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import Start from "./components/Start";
import Question from "./components/Question";

function App() {
	// all Questions data
	const [questions, setQuestions] = useState([]);

	// Switch Screens state var
	const [isStarted, setIsStarted] = useState(false);

	// Check switch state var
	const [isChecked, setIsChecked] = useState(false);

	// Correct answer num
	const [correctNum, setCorrectNum] = useState(0);

	// Get 5 questions from api
	useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
			.then((res) => res.json())
			.then((data) =>
				setQuestions(
					data.results.map((question) => ({
						question: question.question,
						id: nanoid(),
						correctAnswer: question.correct_answer,
						answers: [
							question.correct_answer,
							...question.incorrect_answers,
						].sort((a, b) => 0.5 - Math.random()),
						submittedAnswer: "",
					}))
				)
			);
	}, []);

	// Click Start Button
	function clickStart() {
		setIsStarted((oldIsStarted) => !oldIsStarted);
	}

	// Handle checking all answers
	function checkAnswers() {
		const allAnswered = questions.every(
			(question) => question.submittedAnswer
		);

		let count = 0;
		for (let i = 0; i < questions.length; i++) {
			const question = questions[i];
			if (question.submittedAnswer === question.correctAnswer) {
				count++;
			}
		}

		setCorrectNum(count);
	}

	// Handle selecting an answer
	function handleAnswerClick(event, questionID) {
		const { value } = event.target;

		setQuestions((oldQuestions) => {
			return oldQuestions.map((question) => {
				return questionID === question.id
					? {
							...question,
							submittedAnswer: value,
					  }
					: question;
			});
		});
	}

	/*** Question Elements ***/
	const questionElements = questions.map((question) => (
		<Question
			question={question.question}
			key={question.id}
			correctAnswer={question.correctAnswer}
			answers={question.answers}
			handleAnswerClick={(event) => handleAnswerClick(event, question.id)}
		/>
	));

	return (
		<div className="App flex-center-col">
			{!isStarted ? (
				<Start clickStart={clickStart} />
			) : (
				<div className="quiz">
					{questionElements}
					<button
						className="btn-start btn-check"
						onClick={checkAnswers}
					>
						Check Answers
					</button>
					<p>{correctNum}</p>
				</div>
			)}
		</div>
	);
}

export default App;
