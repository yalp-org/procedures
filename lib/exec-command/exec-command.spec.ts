import { execCommand } from './exec-command';

describe('exec-command', () => {
  it('should return object desribing command executed', async () => {
    const params = { name: 'developer' };
    const result = await execCommand(
      // tslint:disable-next-line:no-invalid-template-strings
      'echo hello world, dear ${name}!',
      params,
    );

    expect(result.stdout).toContain('hello world, dear developer!');
    expect(result.stderr).toBe('');
  });
});
