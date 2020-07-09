# Procurement Simple Process With SMS Integration

This example handles a procurement request, with manager approval, quotation requests, and payment processing. Includes integration with Twilio to send an SMS to the manager that should approve the request.
For this example you will need a Twilio account, you can create one here: https://www.twilio.com/

## SMS Integration Setup

You can see a Gcloud Function code that receives a `workspace` query string and build a url to send it through the `twilio` npm package.
To set up a Twilio account and find the necessary credentials (accountSid, authToken, twilioNumber, verifiedNumber) please refer to their documentation: https://www.twilio.com/docs/sms/quickstart/node

## Setup GCloud Functions Project

In order to setup a GCloud Function you need to install the `gcloud cli`
You can do it following this official guide: https://cloud.google.com/sdk/docs/downloads-interactive?hl=en

Once you have install the `gcloud cli` you can connect it with a project running:
```
gcloud init
```
You will need to login with your Google Account and then choose an existing project or you can create a new one.

Next, you need to install dependencies:
```
npm install
```

#### Test the Function locally

You can see the code of the function in the `src/index.js` file, that logic calculates the difference between two dates.
To run the function locally run the following command in the app root
```
npm start
```
The function will be listening by default in this direction `http://localhost:8080`
Now you can test it with Postman or from a browser.

#### Deploy the GCloud Function

In order to deploy the function to GCloud you can run:
```
gcloud functions deploy 'sendSms' --runtime nodejs10 --trigger-http --entry-point=sendSms --set-env-vars ACCOUNT_SID='YOUR_ACCOUNT_SID',AUTH_TOKEN='YOUR_AUTH_TOKEN',TWILIO_NUMBER='YOUR_TWILIO_NUMBER',VERIFIED_NUMBER='YOUR_TWILIO_VERIFIED_NUMBER'
```
Here we are declaring that the function is called `sendSms` with a nodejs(version 10) runtime evironment. Also we specify that the function will be trigger by a http request and the entry point in the `index.js` file is `sendSms`. You need to replace the env variables with your `twilio credentials`.

When the deployment process is done, in the cli you can see the deployed endpoint url.
You need to copy this endpoint to call it from a Service Task in our Smartmate Process.

## Setup Smartmate Process

Before starting, please take a look at the [Getting Started](https://docs.apps.smartmate.io/getting-started/index.html "Smartmate Getting Started Guide") page to get familiar with the `smartmate-cli`.

Once you have your workspace set up, you can add this app by running: `sm add app` from inside your workspace, and selecting this app. Now you can go to the `processes/requestVacations.yml` file.

You will see the `serviceTasks` property with a `sendSms` service tasks.
Here in the `url` property you can paste the endpoint deployed to GCloud.
Also you need to fill the `workspace` property with you workspace name.
```
serviceTasks:
   sendSms:
      name: Notify Manager
      type: httpRequest
      retries: 3
      method: POST
      url: <PLACE YOUR ENDPOINT URL>
      query:
         workspace: <YOUR WORKSPACE NAME>
```
This service task will take the `workspace` name and send it to the endpoint like query string, and will proceed to build the url to send it in the SMS.

Now you can publish your app and test it in your Smartmate workspace.
```
sm publish -f
```
