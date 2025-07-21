# Banking App

A full-stack banking application with a React + TypeScript frontend and a Spring Boot (Java) backend. This project allows users to log in, view their profile, transfer money, and see recent transactions.

## Features

- User authentication (JWT-based)
- Secure login/logout
- View user profile and account balance
- Money transfer between accounts
- View last transactions
- Responsive dashboard UI
- Token refresh mechanism for seamless user experience

## Technologies Used

### Frontend ([banking-web](banking-web))
- [React](https://react.dev/) (with TypeScript)
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [React Router](https://reactrouter.com/) for routing
- [Axios](https://axios-http.com/) for HTTP requests
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for fast development/build
- [MUI X Charts](https://mui.com/x/react-charts/) for charts

### Backend ([banking-api](banking-api))
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security) (JWT authentication)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [MySQL](https://www.mysql.com/) database
- [JJWT](https://github.com/jwtk/jjwt) for JWT handling

### DevOps
- [Docker](https://www.docker.com/) for containerization
- [Docker Compose](https://docs.docker.com/compose/) for multi-service orchestration

## Getting Started

### Prerequisites
- Docker & Docker Compose installed

### Running the Project

```sh
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8080](http://localhost:8080)
- MySQL: [localhost:3307](localhost:3307)

### Sample Users

See [sample_users.sql](banking-api/sample_users.sql)