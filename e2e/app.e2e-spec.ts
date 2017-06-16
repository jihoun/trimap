import { TrimapPage } from './app.po';

describe('trimap App', () => {
  let page: TrimapPage;

  beforeEach(() => {
    page = new TrimapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
