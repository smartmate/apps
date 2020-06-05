# Vacation Approval App example using GCloud Functions

With Smartmate you have the ability to call custom endpoints in order to have manage custom logic outside the Smartmate environment.

This example explains how to setup a Smartmate App using GCloud Functions.

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

You can see the code of the function in the `index.js` file, that logic calculates the difference between two dates.
To run the function locally run the following command in the app root
```
npm start
```
The function will be listening by default in this direction `http://localhost:8080`
Now you can test it with Postman or from a browser.

#### Deploy the GCloud Function

In order to deploy the function to GCloud you can run:
```
gcloud functions deploy 'calculateDaysOff' --runtime nodejs10 --trigger-http --entry-point=calculatedDaysOff
```
Here we are declaring that the function is called `calculateDaysOff` with a nodejs(version 10) runtime evironment. Also we specify that the function will be trigger by a http request and the entry point in the `index.js` file is `calculatedDaysOff`.

When the deployment process will be done, in the cli you can see the deployed endpoint url.
You need to copy this endpoint for call it from a Service Task in our Smartmate Process.

## Setup Smartmate Process

Before starting, please take a look at the [Getting Started](https://docs.apps.smartmate.io/getting-started/index.html "Smartmate Getting Started Guide") page to get familiar with the `smartmate-cli`.

Once you have your workspace set up, you can add this app by running: `sm add app` from insider your workspace, and selecting this app. Now you can go to the `processes/requestVacations.yml` file.

You will see the `serviceTasks` property with a `calculateDaysOff` service tasks.
Here in the `url` property you can paste the endpoint deployed to GCloud.
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
