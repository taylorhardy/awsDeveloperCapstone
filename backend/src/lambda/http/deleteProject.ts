import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import { deleteProject } from '../../businessLogic/projects';
import { createLogger } from '../../utils/logger';

const logger = createLogger('deleteTodo');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const projectId = event.pathParameters.projectId
  const user = getUserId(event)
  const item = await deleteProject(user, projectId);

  logger.info(`Deleted project: ${item}`);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: item
    })
  }
}
