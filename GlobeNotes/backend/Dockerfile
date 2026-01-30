FROM eclipse-temurin:17-jdk
WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy source and build
COPY . .
RUN mvn clean package -DskipTests

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "target/globenotes-0.0.1-SNAPSHOT.jar"]
