#!/usr/bin/env node

import parser from "yargs-parser"
import chalk from "chalk"
import path from "path"
import figlet from "figlet"
import fs from "fs"
import ProjectCreator from "./ProjectCreator"

const cheers = chalk.hex("#EDBC06")
const args = parser(process.argv)
const cmd = args._[2] as string

function help() {
  console.log(
    chalk.whiteBright(
      fs.readFileSync(path.resolve(__dirname, "../helper.txt"), "utf-8"),
    ),
  )
}

function welcome() {
  console.log(cheers(figlet.textSync("pika-go", { horizontalLayout: "full" })))
}

function sleep() {
  return new Promise<null>((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 3000)
  })
}

async function run(cmd: string) {
  const creator = new ProjectCreator()
  switch (cmd) {
    case "help":
      help()
      break
    case "create": {
      await creator.create()
      const projectName = creator.getProject()?.getName()
      if (projectName) {
        await creator.npmInstall(path.resolve(process.cwd(), projectName))
        console.log(
          cheers(figlet.textSync("Cheers", { horizontalLayout: "full" })),
        )
        console.log(
          cheers(
            `You can now run 'pika-go dev ${projectName}' to start yout journey!`,
          ),
        )
      }
      break
    }
    case "dev":
      {
        const projectName = args._[3] + ""
        if (projectName) {
          try {
            console.log(cheers("Opening vscode & starting dev server..."))
            await sleep()
            await creator.openVScode(projectName).catch(console.log)
            await creator.runDev(projectName)
          } catch (e) {
            console.log(e)
          }
        }
      }
      break
    default:
      welcome()
      run("create")
      break
  }
}

// eslint-disable-next-line @typescript-eslint/no-extra-semi
;(async () => {
  if (args.v) {
    const pkgJSON = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf-8"),
    )
    return console.log(pkgJSON.version)
  }
  try {
    await run(cmd)
  } catch (e) {
    const err = e as Error
    console.log(chalk.redBright(err))
  }
})()
