import { Procedure } from '../../lib/procedure';
import { promisify } from 'util';
import { exec as execRaw } from 'child_process';
const exec = promisify(execRaw);

export default <Procedure>{
  name: 'git-status',
  procedureFunction: gitStatus,
};

export async function gitStatus() {
  const { stdout } = await exec('git status');
  const isClear = isWorkingDirClear(stdout);
  console.info(isClear);

  return { isClear };
}

export const isWorkingDirClear = msg =>
  msg.includes('nothing to commit, working tree clean');
