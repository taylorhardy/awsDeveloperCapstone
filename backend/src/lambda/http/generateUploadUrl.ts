import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { createLogger } from '../../utils/logger';
import * as AWSXRay from "aws-xray-sdk";

const logger = createLogger('generateUploadURL');
const XAWS = AWSXRay.captureAWS(AWS);

const s3Bucket = new XAWS.S3({
  signatureVersion: 'v4'
})

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body);
  const projectId = event.pathParameters.projectId
  const item = s3Bucket.getSignedUrl('putObject',{
    Bucket: process.env.ATTACHMENT_BUCKET,
    Key: projectId,
  }) 

  console.log(item);
  logger.info(`get upload URL: ${item}`);
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl: item
    })
  }
}
