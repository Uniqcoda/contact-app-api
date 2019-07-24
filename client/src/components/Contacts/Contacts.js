import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap';

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
	return (
		<div>
			<h3>List of all non-blocked contacts</h3>
			<Tab.Container id='list-group-tabs-example' defaultActiveKey='#link2'>
				<Row>
					<Col sm={4}>
						<ListGroup>
							<Query query={CONTACTS}>
								{({ loading, data }) =>
									loading ? (
										<h4>I am loading ...</h4>
									) : (
										data.contacts.map((contact, index) => (
											<ListGroup.Item key={index} action href='#link1' onClick={contactDetails}>
												{contact.firstName}
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
