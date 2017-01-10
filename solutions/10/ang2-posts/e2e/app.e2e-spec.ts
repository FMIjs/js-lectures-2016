import { Ang2PostsPage } from './app.po';

describe('ang2-posts App', function() {
  let page: Ang2PostsPage;

  beforeEach(() => {
    page = new Ang2PostsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
