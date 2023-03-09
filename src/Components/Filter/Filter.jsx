import { PropTypes } from "prop-types";
import { Input, Label, Title } from "./Filter.styled";
import { useDispatch } from "react-redux";
import { setFilter } from "redux/filterSlice";

export const Filter = () => {
	const dispatch = useDispatch();

	const onChange = e => {
		const value = e.target.value.toLowerCase();
		dispatch(setFilter(value));
	};

	return (
		<Label>
			<Title>Find contacts by name</Title>
			<Input
				type="text"
				name="filter"
				placeholder="Enter contact name"
				onChange={onChange}
			/>
		</Label>
	);
};

Filter.propTypes = {
	value: PropTypes.string,
};