import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('index test', () => {
  describe('hello world', () => {
    it('should say Hello guys!', () => {
      const sayHello = () => 'Hello guys!';
      const str = sayHello();
      expect(str).to.equal('Hello guys!');
    });
  });
});
