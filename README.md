CRUD REST API Assignment 
Student Information
Name: Mugabo ALain
Registration Number: 26450
Branch: CRUDassignment-api-26450
Repository:MugaboAlain_26450
Project Description
This project is a RESTful CRUD API developed using Java Spring Boot. The application performs full CRUD (Create, Read, Update, Delete) operations on product data stored in a PostgreSQL database. The system follows a layered architecture including Controller, Service, Repository, and Model layers.
CRUD Operations Implemented
CREATE – Implemented using @PostMapping to add new products to the database.
READ – Implemented using @GetMapping to retrieve all products and retrieve a product by ID.
UPDATE – Implemented using @PutMapping to modify existing product details.
DELETE – Implemented using @DeleteMapping to remove products from the database.
The controller class inside the 'controller' package handles all HTTP requests, while the repository layer (JpaRepository) manages database interactions. Therefore, the project fully satisfies the requirements of a CRUD REST API.
Technologies Used
Java 17
Spring Boot
Spring Web
Spring Data JPA
PostgreSQL
Maven
REST API (JSON format)
Project Structure
src/main/java/
 - controller → Handles REST endpoints
 - service → Business logic
 - repository → Database operations
 - model → Entity classes
 - main class → Application entry point

src/main/resources/
 - application.properties → Database configuration
How to Run the Application
1.Clone the repository and checkout the CRUD-api-26593 branch.
2.Run 'mvn clean install' to build the project.
3.Run 'mvn spring-boot:run' to start the application.
4.Access the API at http://localhost:8080
Conclusion
This project successfully demonstrates the implementation of a Spring Boot REST API with full CRUD functionality. It follows best practices of layered architecture and database integration using JPA, making it ready for integration with frontend systems.
