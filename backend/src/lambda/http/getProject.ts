import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger';
import { getProject } from '../../businessLogic/projects';

const logger = createLogger('getProjects');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user = getUserId(event)
    const projectId = event.pathParameters.projectId;

    const project = await getProject(projectId);
    logger.info(`Retrieved Projects`)
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            item: project
        })
    }
}
