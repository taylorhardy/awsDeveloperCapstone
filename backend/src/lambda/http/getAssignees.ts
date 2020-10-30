import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger';
import { getAllAssignees } from '../../businessLogic/assignee';

const logger = createLogger('getAssignees');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user = getUserId(event)

    const items = await getAllAssignees();
    logger.info(`Retrieved All Assignees`)
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
