# Vacation Approval App example using AWS Lambdas

With Smartmate you have the ability to call custom endpoints in order to manage custom logic outside the Smartmate environment.
This example explains how to setup a Smartmate App using a AWS Lambda.

## Setup AWS Lambda Project

In order to setup a AWS Lambda function, first you need to install the `AWS CLI`.
You can do it following this official guide: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

Next, you need to install the `AWS SAM CLI`: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

The next step is to configure the `AWS Credentials`, for this you can use the following command:
```
aws configure
AWS Access Key ID [None]: your_access_key_id
AWS Secret Access Key [None]: your_secret_access_key
Default region name [None]: 
Default output format [None]: 
```

Next, initialize the project:
```
sam init
```
You can choose a template to edit it later.
This process will generate a `template.yml` file where you can see the definition and rules of your project.
In the `template.yml` you will see a resource where you can define the event type and also you can see where the code for the function is, in this case is in the `calculateDaysOff` directory.

#### Test locally

To test the function locally run:
```
sam local start-api
```
This will setup a service in your local machine.
Now you can test the function with Postman or Website.

#### Deploy the AWS

To deploy the function use the following command, here you can choose different options for the service:
```
sam deploy --guided
```

When the process is done, you will see the `Invoke Url`.
You need to copy this url to call it from a Service Task in your Smartmate Process.

## Setup Smartmate Process

Before starting, please take a look at the [Getting Started](https://docs.apps.smartmate.io/getting-started/index.html "Smartmate Getting Started Guide") page to get familiar with the `smartmate-cli`.

Once you have your workspace set up, you can add this app by running: `sm add app` from inside your workspace, and selecting this app. Now you can go to the `processes/requestVacations.yml` file.

You will see the `serviceTasks` property with a `calculateDaysOff` service tasks.
Here in the `url` property you can paste the endpoint deployed to AWS.
```
serviceTasks:
  calculateDaysOff:
    name: Calculate Days Off
    type: httpRequest
    retries: 3
    method: GET
    url: <PLACE YOUR ENDPOINT URL>
    query:
      startDate: "{{startDate}}" 
      endDate: "{{endDate}}"
    resultMapping:
      body.data: daysOff
```
This service task will take the values of `startDate` and `endDate` fields and send it to the endpoint like query strings.
The response of the call will fill the `daysOff` field so it can be visibly in the process.

Now you can publish your app and test it in your Smartmate workspace.
```
sm publish -f
```
