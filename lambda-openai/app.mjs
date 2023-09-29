/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

import OpenAI from 'openai';

import { createMessages } from './helpers/message-creator.mjs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const lambdaHandler = async (event, context) => {
  try {
    const { traits, categories } = JSON.parse(event.body);
    const messages = createMessages(traits, categories);

    const completion = await openai.chat.completions.create({
      messages,
      temperature: 0.7,
      model: 'gpt-3.5-turbo',
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      },
      body: JSON.stringify(completion),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 503,
      body: JSON.stringify(err.message),
    };
  }
};
