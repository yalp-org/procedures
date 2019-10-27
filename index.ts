import changeDependecy from './lib/change-dependency';
import execCommand from './lib/exec-command';
import gitStatus from './lib/git-status';

export default {
  [changeDependecy.name]: changeDependecy,
  [execCommand.name]: execCommand,
  [gitStatus.name]: gitStatus,
};
