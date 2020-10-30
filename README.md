# Capstone Project

This is the final project for the AWS Developer nanodegree. This project is built using Angular for the front in and a Serverless infrastructure for the backend.

## Functionality of the Application

This is a project management application. After authenticating, users will be able to view projects that have been created and see the details on the home page. Users are able to create new project, as well as edit existing ones. 

## Database Structure

Three DynamoDB tables are used in this project

Project - this is where the details of the projects are stored
Status - This is where the contents of the status drop downs are populated from
Assignee - This is where the contents of the Assigned To drop downs are populated from

## Running the Front End Application

Use the Angular CLI in order to start the application locally, but running: ng serve

## Logging

Logging is implemented using winston and XRay

## HTTP Request Validation

Request validation is enabled using a schema for HTTP request calls via API gateway

## Permissions

IAM permissions are set at the function level. 