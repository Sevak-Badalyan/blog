Prerequisites
Node.js
MongoDB 

Install dependencies
npm install

Fill in .env file

Usage
Endpoints
/auth/register - Register a new user

/auth/login - Log in to the application and receive an access token

/auth/logout - Log out and clear the access token

/auth/deleteAccount/:id - Delete a user account

/auth/updateUsername/:id - Update a user's username

/auth/updatePassword/:id - Update a user's password

/auth/protected - A protected route that requires a valid access token

/post/posts - Get all posts

/post/posts/:id - Get a specific post

/post/posts - Create a new post (requires authentication)

/post/posts/:postId - Update a post (requires authentication)

/post/posts/:postId - Delete a post (requires authentication)

/comment/comment - Get all comments

/comment/comment/:id - Get comments for a specific post

/comment/comment/:postId - Create a new comment (requires authentication)

/comment/comment/:postId - Update a comment (requires authentication)

/comment/comment/:postId - Delete a comment (requires authentication)

Authentication
The application uses JSON Web Tokens (JWT) for authentication.
The access token is required for protected routes and should be included in the Authorization header.
Refresh tokens are not implemented in this example but can be added for a more secure authentication flow.