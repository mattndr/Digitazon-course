import { expressTodos } from './express-todos';

describe('expressTodos', () => {
  it('should work', () => {
    expect(expressTodos()).toEqual('express-todos');
  });
});
