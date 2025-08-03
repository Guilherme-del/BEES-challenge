import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormStyled } from "./FormStyled";
import useStore from "stores/useStore";

const ALPHABETICAL_REGEX = /^[a-zA-Z ]*$/;

interface ICompaniesState {
	fullName: string;
	moreThanEighteenYearsOld: boolean;
	isButtonDisabled: boolean;
}

export const Form = () => {
	const { setFullName } = useStore();
	const navigate = useNavigate();

	const [state, setState] = useState<ICompaniesState>({
		fullName: "",
		moreThanEighteenYearsOld: false,
		isButtonDisabled: true
	});

	const handleName = (typedName: string) => {
		setState(prev => ({ ...prev, fullName: typedName }));
		setFullName(typedName);
	};

	const handleCheckBox = () => {
		setState(prev => ({
			...prev,
			moreThanEighteenYearsOld: !prev.moreThanEighteenYearsOld
		}));
	};

	const isValidFullName = (name: string) => {
		if (!ALPHABETICAL_REGEX.test(name)) return false;

		const parts = name.trim().split(/\s+/);
		if (parts.length < 2) return false;

		return parts.every(part => part.length >= 2);
	};

	useEffect(() => {
		const validName = isValidFullName(state.fullName);

		setState(prev => ({
			...prev,
			isButtonDisabled: !(validName && state.moreThanEighteenYearsOld)
		}));
	}, [state.fullName, state.moreThanEighteenYearsOld]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate("/companies");
	};

	return (
		<FormStyled data-testid="form-component" data-cy="form-component">
			<form className="home" onSubmit={handleSubmit}>
				<p>Please, enter your full name below</p>
				<p>Only alphabetical characters are accepted</p>

				<input
					data-testid="full-name-input"
					data-cy="full-name-input"
					className="home__input-name"
					type="text"
					id="full-name-input"
					name="full-name-input"
					placeholder="Full name"
					value={state.fullName}
					onChange={e => handleName(e.target.value)}
				/>

				<div className="home__input-checkbox">
					<input
						data-testid="home-input-checkbox"
						data-cy="home-input-checkbox"
						type="checkbox"
						id="moreThanEighteenYearsOld"
						name="moreThanEighteenYearsOld"
						checked={state.moreThanEighteenYearsOld}
						onChange={handleCheckBox}
					/>
					<label htmlFor="moreThanEighteenYearsOld">Are you older than 18 years old?</label>
				</div>

				<button
					type="submit"
					data-testid="enter-button"
					data-cy="enter-button"
					aria-label="Enter Button"
					disabled={state.isButtonDisabled}
				>
					Enter
				</button>
			</form>
		</FormStyled>
	);
};
