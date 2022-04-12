import { Icon } from "../";
import classes from "./Button.module.scss";

const Button = ({ label, callback }) => {
	return (
		<button onClick={callback} className={classes.button}>
			{label}
		</button>
	);
};

Button.Primary = ({ label, callback }) => {
	return (
		<button
			onClick={callback}
			className={`${classes.button} ${classes.button__primary}`}>
			{label}
		</button>
	);
};

Button.Secondary = ({ label, callback }) => {
	return (
		<button
			onClick={callback}
			className={`${classes.button} ${classes.button__primary}`}>
			{label}
		</button>
	);
};

Button.Secondary.Medium = ({ callback }) => {
	return (
		<button
			onClick={callback}
			className={`${classes.button} ${classes.button__secondary} ${classes.button__medium}`}>
			<Icon.Reset />
		</button>
	);
};

export default Button;
