# Vacation Approval App example using GCloud Functions

With Smartmate you have the abillity to call custom endpoints in order to have manage custom logic outside the Smartmate enviroment.

This example explains how to setup a Smartmate App using GCloud Functions.

## Setup GCloud Functions Project

In order to setup a GCloud Funtion you need to install the `gcloudcli`
Yo can do it following this official guide: https://cloud.google.com/sdk/docs/downloads-interactive?hl=en

Once you install the `gcloud cli` you can connect the cli with a project running:
```
  gcloud init
```
You will need to login with your Google account and then choose a project or you can create a new one.

Next install dependencies:
```
  npm install
```

#### Test the Funtion locally

To run the function locally run the following command in the app root
```
  npm start
```

You can see the code of the function in the `index.js` file, that code calculate the difference between two dates.

The function will be listening by default in this direction `http://localhost:8080`
Now you can test it with Postman or from a browser.

#### Deploy the GCloud Function
In order to deploy the funtion to GCloud you can run:
```
  gcloud functions deploy 'calculateDaysOff' --runtime nodejs10 --trigger-http --entry-point=calculatedDaysOff
```
Here we are declaring that our function is called `calculateDaysOff` and runtime eviroment is nodejs version 10. Also we specify that our function will be trigger by a http request and our entry point in the `index.js` file is `calculatedDaysOff`.

When the process will be done, in the cli you can see the deployed endpoint url.
You need to copy this endpoint for call it from a Service Task in the Smartmate Process.

## Setup Smartmate Process

Now you can go to the `processes/requestVacations.yml` file.
Here you will see the `serviceTasks` property with a `calculateDaysOff` service tasks.

Here in the `url` property you can paste the endpoint deployed to GCloud.
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
