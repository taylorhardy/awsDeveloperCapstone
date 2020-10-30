import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger';
import { getAllStatuses } from '../../businessLogic/status'

const logger = createLogger('getStatuses');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event);
    const user = getUserId(event)

    const items = await getAllStatuses();
    logger.info(`Retrieved All Statuses`)
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
