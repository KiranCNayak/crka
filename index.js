#! /usr/bin/env node
/* eslint-disable no-console */

const { spawn } = require('child_process')
const cp = require('child_process')

const name = process.argv[2]

let errorInFileName = false

// eslint-disable-next-line no-control-regex
if (!name || name.match(/[<>:"/\\|?*\x00-\x20]/)) {
  console.log(`
  Invalid directory name!
  
  Usage: crka <name>  
`)
  errorInFileName = true
}

const repoURL = 'https://github.com/KiranCNayak/express-api-starter.git'

function runCommand(command, args, options = undefined) {
  const spawned = spawn(command, args, options)

  return new Promise((resolve) => {
    spawned.stdout.on('data', (data) => {
      console.log(data.toString())
    })

    spawned.stderr.on('data', (data) => {
      console.error(data.toString())
    })

    spawned.on('close', () => {
      resolve()
    })
  })
}

if (!errorInFileName) {
  runCommand('git', ['clone', repoURL, name])
    .then(() => {
      console.log('Installing dependencies...')
      return runCommand('npm', ['install'], {
        cwd: `${process.cwd()}/${name}`,
      })
    })
    .then(() => {
      console.log('Done! Initialised the directory as a GIT Repo!')
      console.log('')
      console.log('Next Step - Run the app')
      console.log('')
      console.log('npm run dev')
      cp.exec('cd', [name], {
        cwd: `${process.cwd()}/${name}`,
      })
    })
    .then(() => {
      console.log('🎊🎊🎊🎊🎊🎊🎊')
    })
}
