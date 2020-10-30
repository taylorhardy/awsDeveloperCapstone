import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { UpdateProjectRequest } from '../../requests/UpdateProjectRequest';
import { getUserId } from '../utils';
import { updateProject } from '../../businessLogic/projects';
import { createLogger } from '../../utils/logger';

const logger = createLogger('updateTodo');;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const projectId = event.pathParameters.projectId;
    const updatedProject: UpdateProjectRequest = JSON.parse(event.body);
    const user = getUserId(event);

    const item = await updateProject(projectId, updatedProject);
    logger.info(`update project: ${item}`)
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: ''
    }
}
