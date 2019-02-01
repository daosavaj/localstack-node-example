
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
    getTask,
    putTask,
    lambdaHandler
};