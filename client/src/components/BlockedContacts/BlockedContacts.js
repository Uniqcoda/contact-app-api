import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Tab, Row, Col, ListGroup, Button, InputGroup, Form } from 'react-bootstrap';

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
		<div style={{ marginTop: '5px' }}>
			<Tab.Container id='list-group-tabs-example'>
				<Row>
					<Col sm={4}>
						<ListGroup>
							<div>
								<InputGroup className='mb-3'>
									<Form.Control
										type='text'
										placeholder='Search'
										aria-label='Default'
										aria-describedby='inputGroup-sizing-default'
									/>
									<Button href='#' style={{ marginLeft: '5px', float: 'right' }}>
										Unblock All{' '}
									</Button>
								</InputGroup>
							</div>
							<div style={{ overflowY: 'scroll', height: '500px' }}>
								<Query query={CONTACTS}>
									{({ loading, data }) =>
										loading ? (
											<h4>I am loading ...</h4>
										) : (
											data.blockedContacts.map(contact => (
												<ListGroup.Item key={contact.id}>
													{contact.firstName} {contact.lastName}
													<Button href='#' size='sm' style={{ marginLeft: '5px', float: 'right' }}>
														unblock
													</Button>
												</ListGroup.Item>
											))
										)
									}
								</Query>
							</div>
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
