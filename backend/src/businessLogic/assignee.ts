import * as AWS from 'aws-sdk';
import { AssigneeItem } from '../models/assigneeItem';
import * as AWSXRay from "aws-xray-sdk";

const XAWS = AWSXRay.captureAWS(AWS);
const docClient = new XAWS.DynamoDB.DocumentClient();

export async function getAllAssignees(): Promise<AssigneeItem[]> {
    const assignees = await docClient.scan({
        TableName: process.env.ASSIGNEE_TABLE,
        FilterExpression: 'isActive = :isActive',
        ExpressionAttributeValues: {
            ':isActive': 'true'
        },
    }).promise();
    return assignees.Items as AssigneeItem[];
};