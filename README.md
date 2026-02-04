SearchServlet - Assignment 2: Send Redirect

Quick start

1. Build:

   mvn clean package

2. Run with embedded Tomcat (Maven plugin):

   mvn tomcat7:run

   The plugin is configured to start at http://localhost:8081/SearchServlet/

3. Open the app:

   http://localhost:8081/SearchServlet/

Notes

- The servlet `com.assignment.SearchServlet` handles POST requests to `/search` and uses `response.sendRedirect()` to redirect to Google with the provided query.
- This project is independent from your `LoginServlet` project. Keep each project in its own folder.
