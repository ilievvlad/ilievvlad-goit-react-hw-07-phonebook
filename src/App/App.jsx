import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Container, Title } from "./App.styled";
import { ContactForm } from "Components/ContactForm/ContactForm";
import { ContactList } from "Components/ContactList/ContactList";
import { Filter } from "Components/Filter/Filter";
import { selectIsLoading, selectError, selectContacts } from 'redux/selectors';
import { fetchContacts } from 'redux/api';

export const App = () => {
	const contacts = useSelector(selectContacts);

	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	return (
		<Container>
			<Title>Phonebook</Title>
			<ContactForm />
			<Title>Contacts</Title>
			{contacts.length > 1 && (
				<Filter />
			)}
			{isLoading && !error && (
				<p>Please wait...</p>
			)}
			<ContactList />
		</Container>
	);
}
