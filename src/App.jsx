import { useState, useEffect, Suspense } from "react";
import { Nav } from "./layouts";
import { useSelector, useDispatch } from "react-redux";
import { newGame, resetCurrentGame } from "./store/gameSlice";
import { Tray, Puzzle } from "./layouts";

// const { Puzzle } = await import("./layouts/index");

const App = () => {
  const game = useSelector(state => state.gameReducer);
  const dispatch = useDispatch();
  const [loadGame, setLoadGame] = useState(false);

  // useEffect(() => {

  // }, []);

  const newGameHandler = () => {
    dispatch(newGame(6, setLoadGame));
  };

  const resetCurrentGameHandler = () => {
    dispatch(resetCurrentGame());
  };

  return (
    <div className="container-fluid">
      <Nav
        newGame={newGameHandler}
        resetCurrentGame={resetCurrentGameHandler}
      />
      {/* {game.showPuzzle && (
				<Suspense
					children={<Puzzle board={game.board} />}
					fallback={"Loading"}
				/>
			)} */}
      {loadGame ? (
        <>
          <Puzzle board={game.board} />
          <Tray loadGame={loadGame}/>
        </>
      ) : (
        <h1 className="new-game__placeholder">Start a new game!</h1>
      )}
    </div>
  );
};

export default App;
