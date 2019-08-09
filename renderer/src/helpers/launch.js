require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const ChromeBuilder = new Builder().forBrowser('chrome');

export async function launch({ url, auth, ...rest }) {
  let driver = await ChromeBuilder.build();
  await driver.get(url);

  switch (auth) {
    case 'aad':
      console.log('[launch] aad');
      const { username, password } = rest;
      await driver.wait(until.elementLocated(By.name('loginfmt')));
      await driver.findElement(By.name('loginfmt')).sendKeys(username, Key.RETURN);
      await driver.wait(until.elementLocated(By.id('displayName')));
      await driver.findElement(By.name('passwd')).sendKeys(password, Key.RETURN);
      await driver.wait(until.elementLocated(By.id('KmsiCheckboxField')));
      await driver.findElement(By.id('idSIButton9')).click();
      break;
    case undefined:
    default:
      console.log('[launch] none');
      break;
  }
}
