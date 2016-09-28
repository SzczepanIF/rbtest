describe('app', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('has a title', () => {
    expect(browser.getTitle()).toEqual('Next Races Widget Prototype Index');
  });

  it('has a working link to Next Race Box', () => {
    element(by.linkText('Next Race Box (with Filters)')).click();

    browser.ignoreSynchronization = true;
    expect(browser.getCurrentUrl())
      .toMatch(/\/#\/nextraces$/);
    browser.ignoreSynchronization = false;
  });

  it('switches contents by routing', () => {
    expect(element(by.css('h2')).getText()).toEqual('Next Races box');
    expect(browser.getCurrentUrl()).toMatch(/\/#\/$/);

    element(by.linkText('Next Race Box (with Filters)')).click();
    expect(element.all(by.css('.next-races')).count()).toBe(1);
    expect(browser.getCurrentUrl()).toMatch(/\/#\/nextraces$/);
  });

  it('does not show filtered out option within NextRacesBox', () => {
    expect(element(by.css('h2')).getText()).toEqual('Next Races box');
    expect(browser.getCurrentUrl()).toMatch(/\/#\/$/);

    element(by.linkText('Next Race Box (with Filters)')).click();
    expect(element.all(by.css('.next-races')).count()).toBe(1);
    expect(browser.getCurrentUrl()).toMatch(/\/#\/nextraces$/);

/* to check
    element(by.css('.next-races__type-icon.icon-race-type-g')).click();

    expect(element.all(by.css('icon-race-type-g.active')).count()).toBe(0);
*/
  });
});
