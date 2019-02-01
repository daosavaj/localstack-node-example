
const axios = require('axios');
const url = 'http://checkip.amazonaws.com/';
const AWSXRay = require('aws-xray-sdk-core');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT,
    convertEmptyValues:true});

const dynamoPut = async (params) => {
    return documentClient.put(params).promise()
};

const dynamoQuery = async (params) => {
    return documentClient.query(params).promise()
};


const getTask = async (event, context) => {
    try {

        let check = await dynamoQuery({
            TableName:process.env.DYNAMODB_TABLE,
            KeyConditionExpression: 'Id = :id',
            ExpressionAttributeValues: {
                id: parseInt(event.pathParameters.taskId)
            }
        });

        return generateResponse(200, {
                check:check
            });

    } catch (err) {
        console.log(err);
        return err;
    }

};

const putTask = async (event, context) => {
    try {
        let check = await dynamoPut({
            TableName:process.env.DYNAMODB_TABLE,
            Item: {
                Id:parseInt(event.pathParameters.taskId)
            }
        });

        return generateResponse(200, {
            check: check
        });

    } catch (err) {
        console.log(err);
        return err;
    }

};


const generateResponse = (statusCode, body) => {
    return {
        'statusCode':statusCode,
        'body': JSON.stringify(body)
    }
};


const handler = async (event, context) => {
    try {

        let check = await dynamoPut({
            TableName:"task",
            Item: {id:'1'}
        });

        let response = generateResponse(200, {
            hello:"world",
            check: check
        });

    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};


let response;

const lambdaHandler = async (event, context) => {
    try {
        const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world hahaha',
                location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

module.exports = {
    handler,
    getTask,
    putTask,
    lambdaHandler
};

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {string} event.resource - Resource path.
 * @param {string} event.path - Path parameter.
 * @param {string} event.httpMethod - Incoming request's method name.
 * @param {Object} event.headers - Incoming request headers.
 * @param {Object} event.queryStringParameters - query string parameters.
 * @param {Object} event.pathParameters - path parameters.
 * @param {Object} event.stageVariables - Applicable stage variables.
 * @param {Object} event.requestContext - Request context, including authorizer-returned key-value pairs, requestId, sourceIp, etc.
 * @param {Object} event.body - A JSON string of the request payload.
 * @param {boolean} event.body.isBase64Encoded - A boolean flag to indicate if the applicable request payload is Base64-encode
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 * @param {string} context.logGroupName - Cloudwatch Log Group name
 * @param {string} context.logStreamName - Cloudwatch Log stream name.
 * @param {string} context.functionName - Lambda function name.
 * @param {string} context.memoryLimitInMB - Function memory.
 * @param {string} context.functionVersion - Function version identifier.
 * @param {function} context.getRemainingTimeInMillis - Time in milliseconds before function times out.
 * @param {string} context.awsRequestId - Lambda request ID.
 * @param {string} context.invokedFunctionArn - Function ARN.
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * @returns {boolean} object.isBase64Encoded - A boolean flag to indicate if the applicable payload is Base64-encode (binary support)
 * @returns {string} object.statusCode - HTTP Status Code to be returned to the client
 * @returns {Object} object.headers - HTTP Headers to be returned
 * @returns {Object} object.body - JSON Payload to be returned
 *
 */