# Build Instructions

## Prerequisites
1. Java Development Kit (JDK) 8 or higher
2. Apache Tomcat server
3. SQLite JDBC driver (included in WEB-INF/lib)

## Steps to Build and Deploy

1. Make sure all files are in the correct structure:
   ```
   restaurant/
   ├── WEB-INF/
   │   ├── lib/
   │   │   └── sqlite-jdbc-3.42.0.0.jar
   │   ├── classes/
   │   └── data/
   ├── *.html files
   └── *.java files
   ```

2. Create the classes directory if it doesn't exist:
   ```
   mkdir -p WEB-INF/classes
   ```

3. Compile the Java files:
   ```
   javac -cp "WEB-INF/lib/*:$CATALINA_HOME/lib/*" -d WEB-INF/classes *.java
   ```

4. Deploy to Tomcat:
   Copy the entire restaurant directory to Tomcat's webapps folder.

5. Database:
   The application will automatically create the SQLite database in WEB-INF/data when first accessed.

## Troubleshooting

1. If you see "SQLite JDBC driver not found":
   - Verify sqlite-jdbc-3.42.0.0.jar is in WEB-INF/lib
   - Restart Tomcat

2. If database operations fail:
   - Check that WEB-INF/data directory exists and is writable
   - Check logs for specific error messages

3. For compilation errors:
   - Ensure JDK is properly installed and in PATH
   - Verify all required JAR files are in the classpath