import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Tab, Row, Col, ListGroup, Button, Form, InputGroup, Collapse, Accordion } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import AddContact from './AddContact';

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
	const [open, setOpen] = useState(false);
	function openContact(e) {
		return setOpen(!open);
	}

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
															<Button variant='outline-primary' size='sm'>
																Edit
															</Button>
															<Button variant='outline-warning' size='sm'>
																Block
															</Button>
															<Button variant='outline-danger' size='sm'>
																Delete
															</Button>
														</div>
													</Collapse>
												</ListGroup.Item>
											))
										)
									}
								</Query>
							</div>
						</ListGroup>
					</Col>
					<Col sm={8}>
						<ListGroup.Item>
							<AddContact></AddContact>
						</ListGroup.Item>
					</Col>
				</Row>
			</Tab.Container>
		</div>
	);
}
