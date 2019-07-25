import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Tab, Row, Col, ListGroup, Button } from 'react-bootstrap';

const CONTACTS = gql`
	{
		contacts {
			id
			firstName
			lastName
			phone
			email
			isBlocked
		}
	}
`;

export default function Contacts() {
	const [contact, setContact] = useState({
		firstName: 'Dlamini',
		lastName: 'Fishbourn',
		phone: '+2348056431780',
		email: 'ochukoe@yah.com',
	});
	function contactDetails(e) {
		let exactContact;
	}

	return (
		<div>
			<h3>List of all non-blocked contacts</h3>
			<Tab.Container id='list-group-tabs-example' defaultActiveKey='#link2'>
				<Row>
					<Col sm={4}>
						<ListGroup>
							<ListGroup.Item>
							<Button href="#" size="lg" style={{marginLeft: '5px', float: 'right'}}><span style={{color: 'white'}} class="glyphicon glyphicon-plus" aria-hidden="true">Add</span></Button>
							</ListGroup.Item>
							<Query query={CONTACTS}>
								{({ loading, data }) =>
									loading ? (
										<h4>I am loading ...</h4>
									) : (
										data.contacts.map(contact => (
											<ListGroup.Item key={contact.id} action onClick={contactDetails}>
												{contact.firstName} {contact.lastName} <i>{contact.phone}</i>
											</ListGroup.Item>
										))
									)
								}
							</Query>
						</ListGroup>
					</Col>
					<Col sm={8}>
						<Tab.Content>
							<Tab.Pane eventKey='#link1'>{/* <Sonnet /> */}</Tab.Pane>
							<Tab.Pane eventKey='#link2'>{/* <Sonnet /> */}</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</div>
	);
}
