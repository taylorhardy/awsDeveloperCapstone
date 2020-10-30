import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import * as AWSXRay from "aws-xray-sdk";
import { ProjectItem } from '../models/projectItem'
import { CreateProjectRequest } from '../requests/createProjectRequest';
const XAWS = AWSXRay.captureAWS(AWS);
const docClient = new XAWS.DynamoDB.DocumentClient();

export async function createProject(user, item: ProjectItem): Promise<ProjectItem> {
    const recordId = uuid.v4();
    const newRecord: CreateProjectRequest = {
        projectId: recordId,
        projectName: item.projectName,
        assignedTo: item.assignedTo,
        statusName: item.statusName,
        startDate: item.startDate,
        endDate: item.endDate,
        notes: item.notes,
        createdBy: user
    };

    await docClient.put({
        TableName: process.env.PROJECT_TABLE,
        Item: newRecord
    }).promise()

    return newRecord as ProjectItem;
};

export async function getProjects(): Promise<ProjectItem[]> {
    const projects = await docClient.scan({
        TableName: process.env.PROJECT_TABLE,
    }).promise();
    return projects.Items as ProjectItem[];
};

export async function getProject(projectId: string): Promise<ProjectItem> {
    const projects = await docClient.query({
        TableName: process.env.PROJECT_TABLE,
        KeyConditionExpression: 'projectId = :projectId',
        ExpressionAttributeValues: {
            ':projectId': projectId
        },
    }).promise();
    return projects.Items as ProjectItem;
};

export async function updateProject(projectId: string, updatedProject) {
    const item = await docClient.update({
        TableName: process.env.PROJECT_TABLE,
        Key: {
            projectId: projectId
        },
        UpdateExpression: "set projectName = :projectName, assignedTo = :assignedTo,  statusName = :statusName, startDate = :startDate, endDate = :endDate, notes = :notes ",
        ExpressionAttributeValues: {
            ":projectName": updatedProject.projectName,
            ":assignedTo": updatedProject.assignedTo,
            ":statusName": updatedProject.statusName,
            ":startDate": updatedProject.startDate,
            ":endDate": updatedProject.endDate,
            ":notes": updatedProject.notes,
        }
    }).promise();
};