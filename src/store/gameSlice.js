import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
	name: "game",
	initialState: {
		size: null,
		numbers: [],
		board: [],
		sizeMap: {
			2: 4,
			4: 8,
			6: 18,
		},
		showPuzzle: false,
		canReset: false,
		matchStack: [],
		moves: 0,
	},
	reducers: {
		generate: (state, action) => {
			state.numbers.length = 0;
			state.size = action.payload;

			while (state.numbers.length < state.sizeMap[state.size]) {
				const random = Math.floor(Math.random() * 200) + 1;
				if (state.numbers.findIndex(el => el == random) === -1)
					state.numbers.push(random);
			}

			state.numbers = state.numbers.concat(state.numbers);
		},

		shuffle: state => {
			for (let i = state.numbers.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[state.numbers[i], state.numbers[j]] = [state.numbers[j], state.numbers[i]];
			}
		},

		createBoard: state => {
			state.board.length = 0;
			state.board = state.numbers.map(value => {
				return { value, visibility: false, fix: false };
			});

			state.showPuzzle = true;
		},

		updateBoard: (state, action) => {
			let { position, visibility } = action.payload;

			state.board[position].visibility = visibility;
		},

		hide: state => {
			state.board = state.board.map(({ value, _ }) => {
				return { value, visibility: false };
			});
		},

		setCanReset: (state, action) => (state.canReset = action.payload),

		// delayFlip: (state, [i1, i2]) => {
		// 	state.board[i1].visibility = state.board[i2].visibility = false;
		// },

		updateMatchStack: (state, action) => {
			const { position, visibility } = action.payload;

			if (state.matchStack.length === 0) {
				state.matchStack.push({
					position,
					value: state.board[position].value,
					visibility,
				});
				return;
			}

			if (state.matchStack.length === 1) {
				if (
					state.board[position].value === state.matchStack[0].value &&
					state.matchStack[0].position !== position
				) {
					state.board[state.matchStack[0].position].visibility = state.board[
						position
					].visibility = true;
					state.board[state.matchStack[0].position].fix = state.board[
						position
					].fix = true;
				} 
				else {
					setTimeout(() => {}, 1000);
					state.board[state.matchStack[0].position].visibility = state.board[
						position
					].visibility = false;
				}
				state.matchStack.length = 0;
				state.moves++;

				return;
			}

			if (state.matchStack[0].position === position) state.matchStack.pop();
		},
	},
});

export const {
	generate,
	shuffle,
	createBoard,
	hide,
	setCanReset,
	updateBoard,
	updateMatchStack,
} = gameSlice.actions;

export const newGame = (size, callback) => {
	return async dispatch => {
		try {
			dispatch(generate(size));
			dispatch(shuffle());
			dispatch(createBoard());
			callback(false);
			callback(true);
		} catch (e) {}
	};
};

export const resetCurrentGame = () => {
	return async dispatch => {
		try {
			dispatch(hide());
			dispatch(shuffle());
			dispatch(setCanReset(true));
		} catch (e) {}
	};
};

export default gameSlice.reducer;
