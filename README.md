# LoginServlet - Assignment 1

## Student Information
- **Student ID**: 26450
- **Name**: Mugabo Alain
- **Group**: E
- **Branch**: LoginServlet_26450_GroupE

## Project Description
A Java Servlet application that implements a login form with password validation functionality.

## Features
- Login form with username and password fields
- Password strength validation (minimum 8 characters)
- Responsive feedback messages
- Clean and styled user interface

## How to Run

### Prerequisites
- Java 11 or higher
- Maven 3.6+
- Apache Tomcat (embedded via Maven plugin)

### Running Commands

1. **Compile the project:**
   ```bash
   mvn clean compile
   ```

2. **Package the application:**
   ```bash
   mvn clean package
   ```

3. **Run the application:**
   ```bash
   mvn tomcat7:run
   ```

4. **Access the application:**
   - Open your browser and go to: `http://localhost:8080/LoginServlet/login`

## Screenshots

### Login Form
![Login Form](screenshots/login-form.png)

### Successful Login
![Login Success](screenshots/login-success.png)

## Project Structure
```
LoginServlet/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/assignment/
│       │       └── LoginServlet.java
│       └── webapp/
│           ├── WEB-INF/
│           │   └── web.xml
│           └── index.html
├── pom.xml
└── README.md
```

## Technology Stack
- Java 11
- Maven
- Java Servlets API 4.0.1
- Apache Tomcat 7
- HTML/CSS