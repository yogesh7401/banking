FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
COPY wait-for-it.sh .
COPY entryPoint.sh .
RUN chmod +x wait-for-it.sh entryPoint.sh
EXPOSE 8080
CMD ["./entryPoint.sh"]