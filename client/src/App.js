import React from 'react';
import { Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import MenuBar from './components/MenuBar/MenuBar';
import Contacts from './components/Contacts/Contacts';
import BlockedContacts from './components/BlockedContacts/BlockedContacts';

function App() {
	return (
		<>
			<Container>
				<MenuBar></MenuBar>
				<Route path='/' exact component={Contacts}></Route>
				<Route path='/blocked-contacts' component={BlockedContacts}></Route>
			</Container>
		</>
	);
}

export default App;
