import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

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
			</Navbar>
		</>
	);
}
