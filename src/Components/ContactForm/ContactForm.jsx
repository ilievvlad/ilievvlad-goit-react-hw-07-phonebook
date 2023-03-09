import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import { getContacts } from 'redux/contactsSlice';
import { Form, Title, Input, Button } from "./ContactForm.styled";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const ContactForm = () => {
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');
	const dispatch = useDispatch();
	const contacts = useSelector(getContacts);

	const handleSubmit = e => {
		e.preventDefault();

		if (contacts.some(contact => contact.name === name)) {
			Notify.failure(`${name} is already in contacts !`);
		} else {
			dispatch(addContact({ id: nanoid(), name, number }));
		}

		reset();
	};

	const reset = () => {
		setName('');
		setNumber('');
	};


	const handleChangeName = e => {
		if (e.target.type === 'text') {
			setName(e.target.value);
		}
	};
	const handleChangeNumber = e => {
		if (e.target.type === 'tel') {
			setNumber(e.target.value);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<label>
				<Title>Name</Title>
				<Input
					type="text"
					name="name"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
					placeholder="Enter your name"
					value={name}
					onChange={handleChangeName}
				/>
			</label>
			<label>
				<Title>Number</Title>
				<Input
					type="tel"
					name="number"
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					required
					placeholder="Enter your phone"
					value={number}
					onChange={handleChangeNumber}
				/>
			</label>
			<Button type="submit" onSubmit={handleSubmit}>Add contact</Button>
		</Form>
	);
};