import { Procedure, ProcedureFunctionParams } from '@yalp/core';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

const defaultParams = {
  whenDev: false,
  whenProd: true,
};

export default <Procedure>{
  name: 'change-dependency',
  procedureFunction: changeDependency,
};

export interface ChangeDependencyParams {
  dependencyName: string;
  newValue: string;
}
export async function changeDependency(
  incommingParams: ProcedureFunctionParams,
) {
  const params = {
    ...defaultParams,
    ...incommingParams.originalParams,
    ...incommingParams.executionContext,
    ...(incommingParams.currentParams as ChangeDependencyParams),
  };
  const { whenDev, whenProd, dependencyName, newValue } = params;
  const packageJsonPath = path.join(params.path, 'package.json');
  const packageJsonStr = readFileSync(packageJsonPath, 'utf-8');
  const packageJsonObj = JSON.parse(packageJsonStr);

  const depKeys = [];
  if (whenDev) depKeys.push('devDependencies');
  if (whenProd) depKeys.push('dependencies');

  for (let depKey of depKeys) {
    if (!packageJsonObj[depKey][dependencyName]) {
      console.log(`${dependencyName} is not listed in ${depKey}, skipping`);
    } else {
      packageJsonObj[depKey][dependencyName] = newValue;

      const updatedPackageJsonStr =
        JSON.stringify(packageJsonObj, null, 2) + '\n';

      writeFileSync(packageJsonPath, updatedPackageJsonStr, 'utf-8');
      console.log(`${dependencyName} updated in ${depKey}`);
    }
  }
}
