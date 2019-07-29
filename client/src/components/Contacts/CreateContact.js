import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CONTACTS } from './Contacts';

const CREATE_CONTACT = gql`
	mutation CreateContact($firstName: String!, $lastName: String, $phone: String!, $email: String) {
		createContact(input: { firstName: $firstName, lastName: $lastName, phone: $phone, email: $email }) {
			id
			firstName
			lastName
			phone
			email
			isBlocked
		}
	}
`;

export default function CreateContact(props) {
	const [input, setInput] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
	});

	const onChange = event => {
		setInput({ ...input, [event.target.name]: event.target.value });
	};

	return (
		<Mutation
			mutation={CREATE_CONTACT}
			variables={input}
			update={(cache, { data: { createContact } }) => {
				const { contacts } = cache.readQuery({ query: CONTACTS });
				cache.writeQuery({
					query: CONTACTS,
					data: { contacts: contacts.concat([createContact]) },
				});
			}}
			refetchQueries={[{ query: CONTACTS }]}
		>
			{createContact => (
				<div>
					<Form
						onSubmit={e => {
							e.preventDefault();
							console.log(input);

							createContact({ variables: { input } });
							setInput({
								firstName: '',
								lastName: '',
								phone: '',
								email: '',
							});
						}}
					>
						<h4 style={{ textAlign: 'center' }}>Add New Contact</h4>
						<Form.Group controlId='formBasicName'>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter first name'
								name='firstName'
								value={input.firstName}
								onChange={onChange}
								required
							/>
						</Form.Group>
						<Form.Group controlId='formBasicName'>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter last name'
								name='lastName'
								value={input.lastName}
								onChange={onChange}
							/>
						</Form.Group>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								name='email'
								value={input.email}
								onChange={onChange}
							/>
						</Form.Group>

						<Form.Group controlId='formBasicPhone'>
							<Form.Label>Phone</Form.Label>
							<Form.Control
								type='text'
								placeholder='+234'
								name='phone'
								value={input.phone}
								onChange={onChange}
								required
							/>
						</Form.Group>
						<Button variant='primary' type='submit' style={{ float: 'right' }}>
							Add
						</Button>
					</Form>
				</div>
			)}
		</Mutation>
	);
}
