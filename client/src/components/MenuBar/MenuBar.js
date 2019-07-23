import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function MenuBar() {
	return (
		<>
			<Navbar bg='primary' variant='dark'>
				<Navbar.Brand as={Link} to='/'>
					Contactica
				</Navbar.Brand>
				<Nav className='mr-auto'>
					<Nav.Link as={Link} to='/'>
						All Contacts
					</Nav.Link>
					<Nav.Link as={Link} to='/blocked-contacts'>
						Blocked Contacts
					</Nav.Link>
				</Nav>
				<Form inline>
					<Form.Control type='text' placeholder='Search Contacts' className='mr-sm-2' />
					<Button variant='outline-light'>Search</Button>
				</Form>
			</Navbar>
		</>
	);
}
