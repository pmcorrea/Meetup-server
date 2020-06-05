# Project Name

-   **Live App Link**:
-   **Client Repo**:
-   **Server Repo**:

## Summary

Blah blah blah.

## Technologies

-   **React**: building user interface
-   **Node**: JavaScript runtime enviroment
-   **Express**: web application framework
-   **express-graphql**: GraphQL server
-   **Apollo**: GraphQL client
-   **Knex**: SQL query builder
-   **Postgres**: relational database
-   **Mocha**: test framework
-   **Chai**: assertion library
-   **Supertest**: endpoint testing library
-   **bcrypt**: implementation of bcrupt hashing function
-   **JSON Web Token**: authorization implementation via JWTs
-   **Postgrator**: database migration handleing
-   **Testing Library**: testing React components
-   **XSS**: sanitizing user inputs
-   **date-fs**: date utility library
-   **cors**: express middleware for CORS configuration
-   **helmet**: express middleware for securing HTTP headers
-   **morgan**: express middleware for logging
-   **nodemon**: server hot-reload

## API

### Endpoints

```
.
├── /graphql
│   └── POST
```

### Types

##### Some Type

```
id: { type: GraphQLString },
user_name: { type: GraphQLString },
user_password: { type: GraphQLString },
token: { type: GraphQLString }
```

### Queries

#### someQuery

Retrieves a user given a username as an argument.

```
query getUserByName($user_name: String!){
		getUserByName(user_name: $user_name) {
			user_name
		}
	}
```

## Screenshots

## Credits

Images and assests are credited to...

## Usage

Not intended for personal or commerical use. Use at your own risk.
