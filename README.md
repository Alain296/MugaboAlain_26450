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

## Notes
- Both projects are independent and can be run simultaneously on different ports
- Each project has its own Maven configuration and dependencies
- Projects follow standard Maven directory structure