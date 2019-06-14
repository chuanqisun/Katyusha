require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const ChromeBuilder = new Builder().forBrowser('chrome');

export async function launch({ url, username, password }) {
  let driver = await ChromeBuilder.build();
  await driver.get(url);
  await driver.wait(until.elementLocated(By.name('loginfmt')));
  await driver.findElement(By.name('loginfmt')).sendKeys(username, Key.RETURN);
  await driver.wait(until.elementLocated(By.id('displayName')));
  await driver.findElement(By.name('passwd')).sendKeys(password, Key.RETURN);
  await driver.wait(until.elementLocated(By.id('KmsiCheckboxField')));
  await driver.findElement(By.id('idSIButton9')).click();
}
