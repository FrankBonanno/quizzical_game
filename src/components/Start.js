import React from "react";

function Start(props) {
	return (
		<div className="start flex-center-col">
			<h1 className="start--title">Quizzical</h1>
			<p className="start--info">5 Questions from OTDB API</p>
			<button className="btn-start" onClick={props.clickStart}>
				Start Quiz
			</button>
		</div>
	);
}

export default Start;
