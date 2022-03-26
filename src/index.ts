#!/usr/bin/env node

import parser from "yargs-parser";
import chalk from "chalk";
import path from "path";
import figlet from "figlet";
import fs from "fs";
import ProjectCreator from "./ProjectCreator";

const cheers = chalk.hex("#EDBC06");
const args = parser(process.argv);
const cmd = args._[2] as string;

function help() {
  console.log(
    chalk.whiteBright(
      fs.readFileSync(path.resolve(__dirname, "../helper.txt"), "utf-8")
    )
  );
}

async function create() {
  const creator = new ProjectCreator();
  const { emitPath, name } = await creator.create();
  await creator.npmInstall(emitPath);
  console.log(cheers(figlet.textSync("Cheers", { horizontalLayout: "full" })));
  try {
    await creator.openVScode(name);
  } catch (e) {}
}

function welcome() {
  console.log(cheers(figlet.textSync("pika-go", { horizontalLayout: "full" })));
}

async function run(cmd: string) {
  switch (cmd) {
    case "help":
      help();
      break;
    case "create":
      await create();
      break;
    case "dev":
      break;
    default:
      welcome();
      await create();
      break;
  }
}

(async () => {
  try {
    await run(cmd);
  } catch (e) {
    const err = e as Error;
    console.log(chalk.redBright(err));
  }
})();
