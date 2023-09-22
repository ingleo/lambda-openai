# lambda-chatgpt

## AWS Lamba querying OpenAI API - ChatGPT

### Create a POST endpoint to receive a list of traits and categories and send them to OpenAI (ChatGPT) to get suggestions.

- This project is made using AWS SAM CLI, version 1.97.0
- Runtime environment nodejs18.x
- `template.yaml` creates lambda function and lambda layer
- You can add auth key from API Gateway Console and lambda authorization if you want
- Tested locally with `sam local start-api`
  - Troubleshooting: If docker container initialization is not running, please see this issue thread [aws-sam-cli](https://github.com/aws/aws-sam-cli/issues/4329)
