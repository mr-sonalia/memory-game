import { Button } from "../../components";
import classes from "./Nav.module.scss";

const Nav = ({ newGame, resetCurrentGame }) => {
	return (
		<nav className={`container-fluid ${classes.nav}`}>
			<Nav.Header />
			<Nav.Links newGame={newGame} resetCurrentGame={resetCurrentGame} />
		</nav>
	);
};

Nav.Header = () => {
	return (
		<h1 className={`${classes.nav__header}`}>
			{/* <span>m</span>emory. */}
			memory
			<span>.</span>
		</h1>
	);
};

Nav.Links = ({ newGame, resetCurrentGame }) => {
	return (
		<ul className={`${classes.nav__list}`}>
			{/* <li className="nav__link">
				<Button.Secondary.Medium callback={resetCurrentGame} />
			</li> */}
			<li className="nav__link">
				<Button.Primary label={"new game"} callback={newGame} />
			</li>
		</ul>
	);
};

export default Nav;
