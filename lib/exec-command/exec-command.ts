import { ExecutionContext } from '@yalp/core';
import { exec as execRaw } from 'child_process';
import { promisify } from 'util';
import { Procedure, ProcedureFunctionParams } from '@yalp/core';

const exec = promisify(execRaw);

export interface ExecCommandParams {
  command: string;
}

export interface ExecCommandResult {
  stdout: string;
  stderr: string;
}

const procedure: Procedure = {
  name: 'exec-command',
  procedureFunction: async (params: ProcedureFunctionParams) => {
    const commandParams: ExecCommandParams = <ExecCommandParams>(
      params.originalParams
    );
    const executionContext = params.executionContext;
    const { command } = commandParams;

    return execCommand(command, executionContext);
  },
};

export default procedure;

export type ExecCommandFunctionParams = ExecutionContext | any;
export async function execCommand(
  command: string,
  params: ExecCommandFunctionParams,
): Promise<ExecCommandResult> {
  const cmd = interpolate(command, params);
  const { stdout, stderr } = await exec(cmd);

  return {
    stderr,
    stdout,
  };
}

function interpolate(str, params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  // tslint:disable-next-line:function-constructor
  return new Function(...names, `return \`${str}\`;`)(...vals);
}
