# Vacation Approval App example using Azure Functions

With Smartmate you have the ability to call custom endpoints in order to manage custom logic outside the Smartmate environment.

This example explains how to set up a Smartmate App that uses an Azure function.

## Setup Azure Functions Project

In order to setup a Azure Function you need to install the `Azure Cli` and the `Azure Functions Core Tools`
This tools brings the ability to create a function project and setup the resources.
To install `Azure cli` follow this guide: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-macos?view=azure-cli-latest
To install `Azure Functions Core Tools` follow this guide: https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos%2Ccsharp%2Cbash#v2

Once you have these tools installed, you can proceed to login in the `azure cli`:
```
az login
```
This will redirect you to a login page. Enter your credentials and you will be logged in.

Next, you need to initialize the function project.
Run the `func init` command, as follows, to create a functions project in a folder named `VacationsApproval` with the specified runtime:
```
func init VacationsApproval --javascript
```
Navigate into the project folder:
```
cd VacationsApproval
```
Now, you need to add a function to your project by using the following command, `--name` argument is the unique name of your function and `--template` argument specifies the function's trigger.
```
func new --name calculateDaysOff --template "HTTP trigger"
```
`func new` creates a subfolder matching the function name that contains a code file appropriate to the project's chosen language and a configuration file named function.json.

In the `index.js` file you can see the logic for this funciton, and in the `function.json` you can see the configuration options for the funtion.

Next, you need to install dependencies:
```
npm install
```

#### Test the Function locally

Run the following command to run the function locally:
```
func start
```
You will see the url to test the function.
Now you can test it with Postman or from a browser.

#### Deploy the Azure Function

In order to deploy the function to Azure, first you need to create a resorce group and specify the location:
```
az group create --name CalculateDaysOff-rg --location eastus
```

Next, you need to create a general-purpose storage account for the resource group and region:
```
az storage account create --name <STORAGE_NAME> --location westeurope --resource-group AzureFunctionsQuickstart-rg --sku Standard_LRS
```
Then, create the function app, in the following command, replace <STORAGE_NAME> with the name of the account you used in the previous step, and replace <APP_NAME> with a globally unique name appropriate to you. The <APP_NAME> is also the default DNS domain for the function app.
```
az functionapp create --resource-group CalculateDaysOff-rg --consumption-plan-location eastus --runtime node --runtime-version 10 --functions-version 2 --name <APP_NAME> --storage-account <STORAGE_NAME>
```

The last step is deploy the function:
```
func azure functionapp publish <APP_NAME>
```
When the process is done, you will see the `Invoke url`, the url include a `code` query string. You should keep this code so you can use it with the smartmate process.

## Setup Smartmate Process

Before starting, please take a look at the [Getting Started](https://docs.apps.smartmate.io/getting-started/index.html "Smartmate Getting Started Guide") page to get familiar with the `smartmate-cli`.

Once you have your workspace set up, you can add this app by running: `sm add app` from inside your workspace, and selecting this app. Now you can go to the `processes/requestVacations.yml` file.

You will see the `serviceTasks` property with a `calculateDaysOff` service tasks.
Here in the `url` property you can paste the endpoint deployed to Azure.
```
serviceTasks:
  calculateDaysOff:
    name: Calculate Days Off
    type: httpRequest
    retries: 3
    method: GET
    url: <PLACE YOUR ENDPOINT URL>
    query:
      code: "{{_secrets.azureCode}}"
      startDate: "{{startDate}}" 
      endDate: "{{endDate}}"
    resultMapping:
      body.data: daysOff
```
This service task will take the values of `startDate` and `endDate` fields and send it to the endpoint like query strings. Also you need to set the `azureCode` secret to be used in the process.
The response of the call will fill the `daysOff` field so it can be visibly in the process.

Now you can publish your app.
```
sm publish -f
```

Before you can test the Smarmate process you need to set the secret `azureCode`.
For that you need to login in your Smartmate page(should be `https://<your-workspace>.smartmate.io`).
Then click in the app icon in the sidebar menu. You will see a `Settings` menu item.
In this `Settings screen` you can see the `secrets` that can be set for this app.
Finally you can set the `azureCode` secret.

After you set this secret you can test the Smartmate Process.
