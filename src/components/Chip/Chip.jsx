import { useState } from "react";
import classes from "./Chip.module.scss";
import { useSelector } from "react-redux";

const Chip = ({ position, updateChipState }) => {
	const chip = useSelector(state => state.gameReducer.board[position]);

	const { value, visibility, fix } = chip;

	const setIsActiveHandler = event => {
		updateChipState(position, !visibility);
	};

	return (
		<div className="chip">
			<label className={`${classes.label} ${fix ? classes.fix : ""}`}>
				<input
					onChange={setIsActiveHandler}
					checked={visibility}
					type="checkbox"
					className={`${classes.input} ${visibility ? classes.active : ""}`}
					disabled={fix}
				/>
				<div className={classes.card}>
					<div className={classes.front}></div>
					<div className={classes.back}>
						<h2
							className={`${classes.value} ${
								value > 99 ? classes.large__values : ""
							}`}>
							{value}
						</h2>
					</div>
				</div>
			</label>
		</div>
	);
};

export default Chip;
