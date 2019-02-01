# localstack-node-example
Here is an example of using lambda's with node, aws cli, aws sam cli, and localstack

This app just connects to localstacks dynamodb and allows you to add stuff/get information using rest calls

1) Install AWS CLI  (If you have homebrew you can just do 'brew install awscli')

2) Install AWS-SAM-CLI (https://aws.amazon.com/serverless/sam/)

3) Install Docker (https://www.docker.com/)

4) Download localstack and run the localstack docker image (https://github.com/localstack/localstack) Running the docker image you are on a mac 'TMPDIR=/private$TMPDIR docker-compose up'

5) Make sure to run npm install in task directory

6) Run 'sam local start-api --docker-network localstack_default' in directory with template.yaml get the lambda running on the same network
