import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger';
import { getProjects } from '../../businessLogic/projects';

const logger = createLogger('getProjects');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user = getUserId(event)

    const items = await getProjects();
    logger.info(`Retrieved Projects`)
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            items: items
        })
    }
}
