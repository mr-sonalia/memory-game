import classes from "./Puzzle.module.scss";
import { Chip } from "../../components";
import { generateID } from "../../helpers";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBoard, updateMatchStack } from "../../store/gameSlice";

const Puzzle = () => {
	const game = useSelector(state => state.gameReducer);
	const dispatch = useDispatch();

	const updateChipStateHandler = (position, visibility) => {
		dispatch(updateBoard({ position, visibility }));
		dispatch(updateMatchStack({ position, visibility }));
	};

	const [chips, setChips] = useState([]);
	useEffect(() => {
		setChips(
			game.board.map((element, i) => {
				return (
					<Chip
						key={generateID()}
						position={i}
						updateChipState={updateChipStateHandler}
					/>
				);
			}),
		);
	}, [null]);

	return (
		<section className="container-fluid">
			<div className={`${classes.puzzle__body}`}>{chips}</div>
		</section>
	);
};

export default Puzzle;
