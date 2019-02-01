# localstack-node-example
Here is an example of using lambda's with node, aws cli, aws sam cli, and localstack

This app just connects to localstacks dynamodb and allows you to add stuff/get information using rest calls

1) Install AWS CLI  (If you have homebrew you can just do 'brew install awscli')

2) Install AWS-SAM-CLI (https://aws.amazon.com/serverless/sam/)

3) Install Docker (https://www.docker.com/)

4) Download localstack and run the localstack docker image (https://github.com/localstack/localstack) Running the docker image you are on a mac 'TMPDIR=/private$TMPDIR docker-compose up'

5) Run to add task table to the DB

aws --endpoint-url=http://localhost:4569 dynamodb create-table --table-name task --attribute-definitions AttributeName=Id,AttributeType=N --key-schema AttributeName=Id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

6) Make sure to run npm install in task directory

7) Run 'sam local start-api --docker-network localstack_default' in directory with template.yaml get the lambda running on the same network
