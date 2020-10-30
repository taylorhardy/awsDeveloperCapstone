import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { getUserId } from '../utils'
import { createProject } from '../../businessLogic/projects';
import { createLogger } from '../../utils/logger';

const logger = createLogger('createProject');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const item = JSON.parse(event.body);
  const user = getUserId(event)

  const newItem = await createProject(user, item);

  logger.info(`Created a new project: ${newItem}`)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: newItem
    })
  }
}
