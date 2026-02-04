# Java Servlet Projects - Group E (26450)

This repository contains two Java servlet projects:

## 1. LoginServlet
- **Location**: `LoginServlet/`
- **Purpose**: Handles user authentication with login form
- **Port**: http://localhost:8080/LoginServlet/

### Quick Start - LoginServlet
```bash
cd LoginServlet
mvn clean package
mvn tomcat7:run
```
### Login Form
The main login interface with username and password input fields. Users can enter their credentials and click the Login button to authenticate.
### Login Form
The main login interface with username and password input fields. Users can enter their credentials and click the Login button to authenticate.
![image alt](https://github.com/Alain296/MugaboAlain_26450/blob/5ed7771d448a16ba4c35bcbd5975e3d64b779c64/loginInsertioncredential.png)
### Successful Login
After entering valid credentials with a strong password (8+ characters), users see a success message with a personalized welcome and option to try again.

![image alt](https://github.com/Alain296/MugaboAlain_26450/blob/8e786bd637052942461a368c22d7694bab6d9c96/Loginsuccessfully.png)
## login failed
After entering less (characters under 8) user receives message your password is weak ,Try again strong one 
![image alt](https://github.com/Alain296/MugaboAlain_26450/blob/1575965c96253c06ff3c069318440ca8b678590a/validationresultpasswordweak.png)
## 2. SearchServlet  
- **Location**: `SearchServlet_Project/`
- **Purpose**: Handles search queries and redirects to Google
- **Port**: http://localhost:8081/SearchServlet/

### Quick Start - SearchServlet
```bash
cd SearchServlet_Project
mvn clean package
mvn tomcat7:run
```
## SearchServlet Application Demo

### Application Interface:
The SearchServlet provides a clean and simple web interface for users to enter search queries. Below is the main search page:
![image alt](https://github.com/Alain296/MugaboAlain_26450/blob/e7ccab35c32bdf7607467bc2353bf8d0d44edc57/howmany.png)

### Search Functionality:
When a user enters a search query and clicks "Fetch", the servlet redirects to Google with the search term. Here's an example of the redirect in action:
![image alt](https://github.com/Alain296/MugaboAlain_26450/blob/e7ccab35c32bdf7607467bc2353bf8d0d44edc57/googlepic.png)


## Notes
- Both projects are independent and can be run simultaneously on different ports
- Each project has its own Maven configuration and dependencies
- Projects follow standard Maven directory structure
