import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import Start from "./components/Start";
import Question from "./components/Question";

function App() {
	/* STATE VARIABLES */
	// all Questions data
	const [questions, setQuestions] = useState([]);

	// Switch Screens state var
	const [isStarted, setIsStarted] = useState(false);

	// Check switch state var
	const [isChecking, setIsChecking] = useState(false);

	// Correct answer num
	const [correctNum, setCorrectNum] = useState(0);

	/* GATHER API DATA */
	// Get 5 questions from api
	useEffect(() => {
		if (!isStarted) {
			return;
		}
		fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
			.then((res) => res.json())
			.then((data) =>
				setQuestions(
					data.results.map((question) => {
						const answersArray = [
							question.correct_answer,
							...question.incorrect_answers,
						].sort((a, b) => 0.5 - Math.random());

						const answers = createAnswersObjects(
							question,
							answersArray
						);

						return {
							question: question.question,
							id: nanoid(),
							correctAnswer: question.correct_answer,
							answers: answers,
							submittedAnswer: "",
						};
					})
				)
			);
	}, [isStarted]);

	// Creates array of object from the given question
	function createAnswersObjects(question, arrayOfStrings) {
		return arrayOfStrings.map((answer) => ({
			value: answer,
			isCorrect: question.correctAnswer === answer,
			id: nanoid(),
			isSelected: false,
		}));
	}

	// Click Start Button
	function clickStart() {
		setIsStarted((oldIsStarted) => !oldIsStarted);
	}

	// Handle checking all answers
	function checkAnswers() {
		// check if all questions were answered
		const allAnswered = questions.every(
			(question) => question.submittedAnswer
		);

		if (!allAnswered) {
			return;
		}

		if (isChecking) {
			setIsChecking(false);
			setIsStarted(false);
			setCorrectNum(0);
			return;
		}

		setIsChecking(true);

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
				let selectedAnswers = question.answers.map((answer) => {
					return value === answer.value
						? { ...answer, isSelected: true }
						: {
								...answer,
								isSelected: false,
						  };
				});

				return questionID === question.id
					? {
							...question,
							submittedAnswer: value,
							answers: selectedAnswers,
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
			id={question.id}
			correctAnswer={question.correctAnswer}
			answers={question.answers}
			handleAnswerClick={(event) => handleAnswerClick(event, question.id)}
			isChecking={isChecking}
		/>
	));

	return (
		<div className="App flex-center-col">
			{!isStarted ? (
				<Start clickStart={clickStart} />
			) : (
				<div className="quiz">
					{questionElements}
					<div className="flex-row">
						{isChecking && (
							<p className="correct-guesses">{`You scored ${correctNum}/5 correct answers`}</p>
						)}
						<button
							className="btn-start btn-check"
							onClick={checkAnswers}
						>
							{isChecking ? "Play Again" : "Check Answers"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
