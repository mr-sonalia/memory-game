import { useState, useEffect, Suspense } from "react";
import { Nav } from "./layouts";
import { useSelector, useDispatch } from "react-redux";
import { newGame, resetCurrentGame } from "./store/gameSlice";

const { PuzzleBody } = await import("./layouts/index");

const App = () => {
	const game = useSelector(state => state.gameReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(newGame(6));
	}, []);

	const newGameHandler = () => {
		dispatch(newGame(6));
	};

	const resetCurrentGameHandler = () => {
		dispatch(resetCurrentGame());
	};

	return (
		<div className="container-fluid">
			<Nav newGame={newGameHandler} resetCurrentGame={resetCurrentGameHandler} />
			{game.showPuzzle && (
				<Suspense
					children={<PuzzleBody board={game.board} />}
					fallback={"Loading"}
				/>
			)}
			{game.moves}
		</div>
	);
};

export default App;
