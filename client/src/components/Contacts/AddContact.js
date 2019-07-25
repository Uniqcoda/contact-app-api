import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default function AddContact() {
	return (
		<div>
			<Form>
				<Form.Group controlId='formBasicName'>
					<Form.Label>First Name</Form.Label>
					<Form.Control type='text' placeholder='Enter first name' required />
				</Form.Group>
				<Form.Group controlId='formBasicName'>
					<Form.Label>Last Name</Form.Label>
					<Form.Control type='email' placeholder='Enter last name' />
				</Form.Group>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control type='email' placeholder='Enter email' />
				</Form.Group>

				<Form.Group controlId='formBasicPhone'>
					<Form.Label>Phone</Form.Label>
					<Form.Control type='text' placeholder='Phone' required />
				</Form.Group>
				<Button variant='primary' type='submit'>
					Add
				</Button>
			</Form>
		</div>
	);
}
