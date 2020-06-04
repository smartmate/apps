# Vacation Approval App example using Serverless Framework

With Smartmate you have the abillity to call custom endpoints in order to have manage custom logic outside the Smartmate enviroment.

This example explains how to setup a Smartmate App using Serverless Framework.


`Note`: With Serveless Framework you can use many Cloud Providers, in this case we will be using AWS.
## Setup Serveless

In order to setup a Serverless funtion, first you need to install the Serverless Framework:
```
   npm install -g serverless
```

Then you need to create an `IAM USER and Access Key` in your AWS Console, for this you can follow the steps describe in this link: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

The next step is to setup your credentials in the serveless cli:
```
serverless config credentials --provider aws --key <YOUR ACCESS KEY> --secret <YOUR SECREET ACCESS KEY>
```
Now you can edit the file `serverless.yml` if you want to add more functions.
We will upload our function called `calculatedDaysOff`. This funciton recives two dates like query strings and calculated the difference in days beetween the two dates.

You can see the code in the `handler.js` file.

#### Test the Funtion locally

To run the function locally run the following command in the app root
```
serverless offline 
```
or
```
sls offline
```
The function will be listening by default in this direction `http://localhost:3000/dev/daysoff`

Now you can test it with Postman or from a browser.
`Note`: You can change the path in the `serverless.yml` file.

#### Deploy the Serverless Function
In order to deploy the funtion to AWS you can run:
```
sls deploy
```
When the process will be done, in the cli you can see the deployed endpoint.
You need to copy this endpoint for call it from a Service Task in the Smartmate Process.

If you need to look this information again, you can run:
```
sls info
```

## Setup Smartmate Process

Now you can go to the `processes/requestVacations.yml` file.
Here you will see the `serviceTasks` property with a `calculateDaysOff` service tasks.

Here in the `url` property you can paste the endpoint deployed to AWS.
```
serviceTasks:
  calculateDaysOff:
    name: Calculate Days Off
    type: httpRequest
    retries: 3
    method: GET
    url: <YOUR URL>
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
