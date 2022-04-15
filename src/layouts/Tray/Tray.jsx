import { Timer } from "../../components";
import { useSelector } from "react-redux";

const Moves = props => {
  return (
    <div className="tray__item">
      <span className="tray__label">Moves</span>
      <h2 className="tray__value">{props.moves}</h2>
    </div>
  );
};

const Tray = (props) => {
  const game = useSelector(state => state.gameReducer);

  return (
    <div className="tray__container">
      <Timer loadNewGame={props.loadGame}/>
      <Moves moves={game.moves} />
    </div>
  );
};

export default Tray;
