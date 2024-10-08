# EmployWise Assignment

This project is a React application for basic user management using the Reqres API. It includes authentication, user listing, user editing, and user deletion features. The project uses React Router for navigation between pages and Axios for API requests.

## Features
- **Login**: Authenticate using credentials (email and password).
- **User List**: Display a paginated list of users fetched from the API.
- **Edit User**: Edit user details such as first name, last name, and email.
- **Delete User**: Delete a user from the list.
- **Logout**: Logout and return to the login page.
- **Private Routes**: Users must be logged in to access the user list and edit pages.

## Prerequisites
- Node.js and npm (Node Package Manager) installed on your machine.

## Setup and Installation

Follow the steps below to download, install, and run the project:

### 1. Clone the Repository
    git clone https://github.com/your-username/employwise-assignment.git
    cd employwise-assignment


### 2. Install Dependencies
    npm install


### 3. Start the development server
    npm start


## Folder Structure
    employwise-assignment/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── UsersList.js
    │   │   ├── EditUser.js
    │   │   └── PrivateRoute.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .gitignore
    ├── package.json
    ├── README.md
    └── yarn.lock


## API Endpoints
    Login: POST https://reqres.in/api/login
    Fetch Users: GET https://reqres.in/api/users?page=1
    Update User: PUT https://reqres.in/api/users/{id}
    Delete User: DELETE https://reqres.in/api/users/{id}
    
## Assumptions and Considerations
- The login API is based on Reqres, which is a mock API. The login credentials to test are:

      Email: eve.holt@reqres.in
      Password: cityslicka
  
- Protected routes are implemented using PrivateRoute to ensure only logged-in users can access certain pages.
- The token is stored in localStorage for simplicity; in a real-world application, a more secure storage solution should be considered.
