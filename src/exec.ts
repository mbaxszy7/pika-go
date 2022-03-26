import { execSync } from "child_process"
import chalk from "chalk"

const execCmd = async (cmd: string, dir: string) => {
  return new Promise((resolve) => {
    execSync(cmd, { cwd: dir, stdio: [0, 1, 2] })
    resolve(null)
  })
}

export default execCmd
