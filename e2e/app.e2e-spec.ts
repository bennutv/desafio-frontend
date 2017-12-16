import { BennutvProvaPage } from './app.po';

describe('bennutv-prova App', () => {
  let page: BennutvProvaPage;

  beforeEach(() => {
    page = new BennutvProvaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
