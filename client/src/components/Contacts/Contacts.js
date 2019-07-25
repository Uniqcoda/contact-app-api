import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Tab, Row, Col, ListGroup, Button, Form, InputGroup, Accordion, Card } from 'react-bootstrap';
import { IoIosMail, IoIosCall, IoIosPerson, IoMdPersonAdd } from 'react-icons/io';

import CreateContact from './CreateContact';

export const CONTACTS = gql`
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
		<div style={{ marginTop: '5px' }}>
			<Tab.Container id='list-group-tabs-example' defaultActiveKey="#createContact">
				<Row>
					<Col sm={4}>
						<ListGroup>
							<InputGroup className='mb-3'>
								<Form.Control
									type='text'
									placeholder='Search'
									aria-label='Default'
									aria-describedby='inputGroup-sizing-default'
								/>
								<Button href="#createContact" style={{ marginLeft: '5px', float: 'right' }}>
									<IoMdPersonAdd />
								</Button>
							</InputGroup>
							<Accordion defaultActiveKey={0} style={{ overflowY: 'scroll', height: '500px' }}>
								<Card>
									<Query query={CONTACTS}>
										{({ loading, error, data }) => {
											if (loading) return <p>Contacts Loading...</p>;
											if (error) return <p>Error :(</p>;

											return data.contacts.map((contact, index) => (
												<div key={index}>
													<Accordion.Toggle style={{ cursor: 'pointer' }} as={Card.Header} eventKey={index}>
														<IoIosPerson />
														{contact.firstName} {contact.lastName}
														<IoIosCall />
														<i>{contact.phone}</i>
													</Accordion.Toggle>
													<Accordion.Collapse eventKey={index}>
														<Card.Body>
															{(() => {
																if (contact.email) {
																	return <IoIosMail />;
																}
															})()}
															{contact.email}

															<Button href="#updateContact" variant='outline-primary' size='sm'>
																Edit
															</Button>
															<Button style={{ marginLeft: '5px' }} variant='outline-warning' size='sm'>
																Block
															</Button>
															<Button style={{ marginLeft: '5px' }} variant='outline-danger' size='sm'>
																Delete
															</Button>
														</Card.Body>
													</Accordion.Collapse>
												</div>
											));
										}}
									</Query>
								</Card>
							</Accordion>
						</ListGroup>
					</Col>
					<Col sm={8}>
						<Tab.Content>
						<Tab.Pane eventKey="#createContact">
						<CreateContact ></CreateContact>
        </Tab.Pane>
        <Tab.Pane eventKey="#updateContact">
          {/* <Sonnet /> */}
        </Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</div>
	);
}
