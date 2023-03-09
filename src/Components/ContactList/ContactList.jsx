import { PropTypes } from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { deleteContact } from 'redux/api';
import { Button, Contact, Item, Num } from "./ContactList.styled";

export const ContactList = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const filterValue = useSelector(state => state.filter.filter).toLowerCase();

	const onFilterChange = () => {
		return contacts.filter(contact =>
			contact.name.toLowerCase().includes(filterValue)
		);
	};
	const onDeleteContact = e => {
		dispatch(deleteContact(e.target.id));
	};

	return (
		<ul>
			{onFilterChange().map(({ id, name, number }) => (
				<Item key={id}>
					<Contact>{name}:<Num>{number}</Num></Contact>
					<Button
						id={id}
						onClick={onDeleteContact}
					>
						Delete</Button>
				</Item>
			))}
		</ul>
	);
};

ContactList.propTypes = {
	contacts: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		})
	),
};
