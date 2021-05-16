#! /usr/bin/env node

const { spawn } = require("child_process");

const name = process.argv[2];
if (!name || name.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
  return console.log(`
  Invalid directory name!
  
  Usage: crka <name>  
`);
}

const repoURL = "https://github.com/KiranCNayak/express-api-starter.git";

runCommand("git", ["clone", repoURL, name])
  .then(() => {
    console.log("Installing dependencies...");
    return runCommand("npm", ["install"], {
      cwd: process.cwd() + "/" + name,
    });
  })
  .then(() => {
    console.log("Done! Initialised the directory as a GIT Repo!");
    console.log("");
    console.log("Next Steps:");
    console.log("");
    console.log("1. cd", name);
    console.log("");
    console.log("2. npm run dev");
  });

function runCommand(command, args, options = undefined) {
  const spawned = spawn(command, args, options);

  return new Promise((resolve) => {
    spawned.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    spawned.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    spawned.on("close", () => {
      resolve();
    });
  });
}
