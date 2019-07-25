import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Tab, Row, Col, ListGroup, Button, ButtonToolbar } from 'react-bootstrap';

const CONTACTS = gql`
	{
		blockedContacts {
			id
			firstName
			lastName
			phone
			email
			isBlocked
		}
	}
`;

export default function BlockedContacts() {
	
	return (
		<div>
			<h3>List of all blocked contacts</h3>
			<Tab.Container id='list-group-tabs-example' defaultActiveKey='#link2'>
				<Row>
					<Col sm={4}>
						<ListGroup>
							<Query query={CONTACTS}>
								{({ loading, data }) =>
									loading ? (
										<h4>I am loading ...</h4>
									) : (
										data.blockedContacts.map((contact) => (
											<ListGroup.Item key={contact.id}>
												{contact.firstName} {contact.lastName}
  <Button href="#" size="sm" style={{marginLeft: '5px', float: 'right'}}>unblock</Button>
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
