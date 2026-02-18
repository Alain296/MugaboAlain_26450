CRUD REST API – Byiringiro Bailly (26593)
Student Information
Name: Mugabo Alain
Registration Number: 26450
Branch: CRUDassignment-api-26450
Repository:MugaboAlain_26450
Project Description
This project is a RESTful CRUD API developed using Java Spring Boot. The application allows users to perform Create, Read, Update, and Delete operations on product data stored in a PostgreSQL database. The system follows a layered architecture including Controller, Service, Repository, and Model layers.
Technologies Used
•	Java 21
•	Spring Boot
•	Spring Web
•	Spring Data JPA
•	PostgreSQL
•	Maven
•	REST API (JSON format)
Project Structure
src/main/java/
 - controller → Handles REST endpoints
 - service → Business logic
 - repository → Database operations
 - model → Entity classes
 - main class → Application entry point

src/main/resources/
 - application.properties → Database configuration
System Requirements
•	Java 17 or higher
•	Maven installed
•	PostgreSQL installed and running
•	IDE (IntelliJ, VS Code, Eclipse, etc.)
Database Configuration
Update application.properties with your PostgreSQL credentials:

spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
How to Run the Application
1.	Clone the repository and checkout the CRUD-api-26593 branch.
2.	Run 'mvn clean install' to build the project.
3.	Run 'mvn spring-boot:run' to start the application.
4.	Access the API at http://localhost:8080
API Endpoints
•	GET /products – Retrieve all products
•	GET /products/{id} – Retrieve product by ID
•	POST /products – Create a new product
•	PUT /products/{id} – Update an existing product
•	DELETE /products/{id} – Delete a product
Features
•	Create new products
•	View all products
•	View product by ID
•	Update product information
•	Delete products
•	Automatic table creation using JPA
•	JSON request and response format
Conclusion
This project demonstrates practical implementation of Spring Boot RESTful services, database integration using JPA, and layered architecture design. The application is fully functional and ready for integration with frontend systems.
