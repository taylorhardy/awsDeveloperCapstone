import * as AWS from 'aws-sdk';
import { StatusItem } from '../models/statusItem';
import * as AWSXRay from "aws-xray-sdk";

const XAWS = AWSXRay.captureAWS(AWS);
const docClient = new XAWS.DynamoDB.DocumentClient();

export async function getAllStatuses(): Promise<StatusItem[]> {
    const statuses = await docClient.scan({
        TableName: process.env.STATUS_TABLE,
        FilterExpression: 'isActive = :isActive',
        ExpressionAttributeValues: {
            ':isActive': 'true'
        },
    }).promise();
    return statuses.Items as StatusItem[];
};