import App from './app';

describe('hello world test', () => {
  it('works', () => {
    // test 1
    expect(true).to.be.true;
  });

  it('also works', () => {
    // test 2
    expect(App).to.exist;
  });
});
