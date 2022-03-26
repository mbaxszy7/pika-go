import inquirer from "inquirer"
import fs from "fs"
import path from "path"
import { Project } from "./Project"
import execCmd from "./exec"

class ProjectCreator {
  public async create() {
    const result = await inquirer.prompt<{ name: string; type: string }>([
      {
        type: "list",
        choices: ["react-ts", "node-server-ts"],
        message: "please select project type:",
        name: "type",
      },
      {
        type: "input",
        name: "name",
        message: "please input project name",
        default: "pika-project",
      },
    ])

    const project = new Project(result.type, result.name)
    return {
      emitPath: this.createProjectFromTemplate(project),
      name: result.name,
    }
  }

  createProjectFromTemplate(project: Project): string {
    const templateDir = path.resolve(
      __dirname,
      "../templates",
      project.getType(),
    )

    if (!fs.existsSync(templateDir)) {
      throw new Error(`Project Type ${project.getType()} not supported`)
    }

    const to = path.resolve(process.cwd(), project.getName())
    this.recursiveCopy(templateDir, to, {
      PROJECT_NAME: project.getName(),
    })

    return to
  }

  private recursiveCopy(
    from: string,
    to: string,
    envs: Record<string, string>,
  ) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to)
    }

    const files = fs.readdirSync(from)

    files.forEach((file) => {
      const fullnameFrom = path.resolve(from, file)
      const fullnameTo = path.resolve(to, file)

      if (fs.statSync(fullnameFrom).isDirectory()) {
        this.recursiveCopy(fullnameFrom, fullnameTo, envs)
        return
      }

      if (fullnameFrom.match(/.(json|js|jsx|ts|tsx)/)) {
        const content = fs
          .readFileSync(fullnameFrom, "utf-8")
          .replace(/\{\{.*\}\}/g, (x) => {
            x = x.replace("{{", "")
            x = x.replace("}}", "")

            x = x.trim()
            return envs[x]
          })

        fs.writeFileSync(fullnameTo, content, "utf-8")
      } else {
        fs.copyFileSync(fullnameFrom, fullnameTo)
      }
    })
  }

  async npmInstall(dir: string) {
    await execCmd("npm install", dir)
  }

  async openVScode(name: string) {
    await execCmd(`code ./${name}`, process.cwd())
  }
}

export default ProjectCreator
