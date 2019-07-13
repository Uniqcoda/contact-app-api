# CONTACT APP API

## 1. To view all contacts

```
GET /contacts
```

Returns status code `200` with the data,

```json
[
	{
		"id": "1",
		"createdAt": "today",
		"isBlocked": false,
		"value": {
			"firstName": "Ochuko",
			"lastName": "Ekrresa",
			"phone": "+2348056431780",
			"email": "ochukoe@yah.com"
		}
	},
	{
		"id": "2",
		"createdAt": "today",
		"isBlocked": false,
		"value": {
			"firstName": "Dan",
			"lastName": "Abramov",
			"phone": "+2348055481764",
			"email": "dana@yah.com"
		}
	},
	...,
]
```

Note that the `isBlocked` property set to `false` by default. \
Also, the blocked contacts will not be displayed by default.

## 2. To view a single contact by id

```
GET /contacts/:contactID

For example

GET /contacts/1
```

Returns status code `200` with the data below, if the contact was found and the `isBlocked` property is `false`

```json
{
	"id": "1",
	"createdAt": "today",
	"isBlocked": false,
	"value": {
		"firstName": "Ochuko",
		"lastName": "Ekrresa",
		"phone": "+2348056431780",
		"email": "ochukoe@yah.com"
	}
}
```

Returns status code `404` if contact was not found or the `isBlocked` property is `true`.

## 3. To add a contact

```
POST /contacts
```

The request body should be in the format,

```ts
interface ICreateContact {
	firstName: string;
	lastName?: string;
	phone: string; //This should be of the international format
	email?: string;
}
```

The `isBlocked` property is set to `false` by default. \
For example, to create a contact with `firstName` Bill and `lastName` Gates,

```json
{
	"firstName": "Bill",
	"lastName": "Gates",
	"phone": "+234701008173",
	"email": "billg@yah.com"
}
```

Returns status code of `200` if contact was successfully created. \
The response body should contain

```ts
interface ICreateContactResponse {
	id: string; // the auto generated id of the new contact
	createdAt: string; // the ISO date of when the contact was created
	isBlocked: boolean;
	value: ICreateContact;
}
```

Returns status code `400` if contact was not successfully created.

## 4. To update/block a contact by id

```
PATCH /contacts/:contactID
```

The request body should be in the format below, with one or more of these properties and their new values.

```ts
{
	firstName?: string;
	lastName?: string;
	phone?: string;
	email?: string;
	block?: boolean;
}
```

For example, to update the Bill Gates contact for only `first name` and `email`,

```
PATCH /contacts/3
```

```json
{
	"firstName": "Melinda",
	"email": "melindag@yah.com"
}
```

To block the Bill Gates contact

```json
{ "block": true }
```

Returns status code `200` if contact was successfully updated. \
Returns status code `404` if contact was not found.

## 5. To delete a contact by id

```
DELETE /contacts/:contactID

For example

DELETE /contacts/1
```

Returns status code `200` if contact was successfully deleted, and an array of all contacts that are not blocked. \
Returns status code `404` if contact was not found.


## 6. To view all blocked contacts

```
GET /contacts/blocked
```

Returns status code `200` with the data

```json
[
{
    "firstName": "Melinda",
    "lastName": "Gates",
    "phone": "+234701008173",
    "email": "melindag@yah.com",
    "isBlocked": false,
    "id": 3,
},
  ...,
]
```

## 7. To unblock a contact by id

```
PATCH /contacts/:contactID
```

The request body should be the the format below, with the `isBlocked` property set to `false`

```ts
{
	isBlocked: boolean;
}
```

For example, to unblock the Bill Gates contact,

```
PATCH /contacts/3
```

```json
{
	"isBlocked": false
}
```

Returns status code `200` if contact was successfully unblocked. \
Returns status code `404` if contact was not found.
