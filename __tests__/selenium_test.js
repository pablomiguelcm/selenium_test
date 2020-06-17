//IMPORT JEST-CUCUMBER
const { loadFeature, defineFeature } = require('jest-cucumber');
const feature = loadFeature('./features/selenium_test.feature', { loadRelativePath: true, errors: true });
jest.setTimeout(100000);


//IMPORT SELENIUM
const { Builder, By, Key, until, WebElement} = require('selenium-webdriver');
require('selenium-webdriver/chrome');
require('selenium-webdriver/firefox');
require('chromedriver');
require('geckodriver');

//CHAI
var expect = require('chai').expect;

//INIT BROWSER
const URL = 'http://www.google.com/';
const driver = new Builder().forBrowser('chrome').build();



defineFeature(feature, test => {
    test('Scenario Test in Selenium', ({given, when, then}) => {
        given('Given the URL of Google', async () => {
            await driver.get(URL);
        });
        when('Write IoT news', async () => {
            let iotNews = await driver.wait(until.elementLocated(By.name('q')), 30000);
            await iotNews.sendKeys('IoT news');
            await iotNews.sendKeys(Key.ENTER);
            await driver.sleep(2000);
        });
        when('Open the URL of Iottechnews', async () => {
            let urliotNews = await driver.wait(until.elementLocated(By.className('LC20lb DKV0Md')), 30000);
            await urliotNews.click();
        });
        when('Open any news', async () => {
            var anyNew = await driver.wait(until.elementLocated(By.linkText('The Parking App: Learn how to leverage IoT with low code tools')), 30000);
            await anyNew.click();
        });
        when('Check that news name in news same as in main page', async () => {

            var title = await driver.wait(until.elementLocated(By.className('entry-title')), 30000);
            var textTitle = await title.getText();
            console.log("TITLE: " + textTitle);
            expect(textTitle).to.equal('The Parking App: Learn how to leverage IoT with low code tools');
        });
        when('Check author photo exist on page', async () => {
            var photo = await driver.findElement(By.className('avatar-left'));
            expect(photo).to.exist;
        });
        when('Open author site and check that site is open in new tap and the same as at news page', async () => {
            await driver.executeScript('window.open("https://www.objectivity.co.uk/");');
        });
        then('Close tap', async () => {
            await driver.sleep(2000);
            await driver.close();
        });
        then('Close browser', async () => {
            await driver.sleep(2000);
            await driver.quit();
        });
    });
});

