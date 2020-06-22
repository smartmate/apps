const Workspace = require('smartmate-workspace-tools').Workspace;

const generateApps = async() => {
   const smPath = await Workspace.findSmartmateFilePath(__dirname);
   try {
      const exampleWorkspace = new Workspace(smPath);
      await exampleWorkspace.load();
   
      const apps = exampleWorkspace.getApps();
      
      console.log(apps);
   } catch(error) {
      console.error(`Error: ${error.message}`);
   }
};

generateApps();