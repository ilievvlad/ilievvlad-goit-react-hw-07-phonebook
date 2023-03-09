import { PropTypes } from "prop-types";
import { getContacts, deleteContact } from 'redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Contact, Item, Num } from "./ContactList.styled";

export const ContactList = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(getContacts);
	const filterValue = useSelector(state => state.filter.filter).toLowerCase();

	const onFilterChange = () => {
		return contacts.filter(contact =>
			contact.name.toLowerCase().includes(filterValue)
		);
	};
	const onDeleteContact = id => {
		dispatch(deleteContact(id));
	};

	return (
		<ul>
			{onFilterChange().map(({ id, name, number }) => (
				<Item key={id}>
					<Contact>{name}:<Num>{number}</Num></Contact>
					<Button onClick={() => onDeleteContact(id)}>Delete</Button>
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
