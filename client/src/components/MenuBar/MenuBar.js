import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { IoMdPersonAdd } from 'react-icons/io';

export default function MenuBar() {
	return (
		<>
			<Navbar bg='primary' variant='dark'>
				<Navbar.Brand as={Link} to='/'>
					<IoMdPersonAdd/>Contactica
				</Navbar.Brand>
				<Nav className='mr-auto'>
					<Nav.Link as={Link} to='/'>
						All
					</Nav.Link>
					<Nav.Link as={Link} to='/blocked-contacts'>
						Blocked
					</Nav.Link>
				</Nav>
			</Navbar>
		</>
	);
}
