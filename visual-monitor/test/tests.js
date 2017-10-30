'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=iphone5 mocha

var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  },
  'nexus4': {
    'browser' : 'Chrome',
    'browser_version' : '61.0',
    'os' : 'Windows',
    'os_version' : '10',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Nexus 4'
      }
    }
  },
  'nexus5': {
    'browser' : 'Chrome',
    'browser_version' : '61.0',
    'os' : 'Windows',
    'os_version' : '10',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Nexus 5'
      }
    }
  },
  'nexus6': {
    'browser' : 'Chrome',
    'browser_version' : '61.0',
    'os' : 'Windows',
    'os_version' : '10',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Nexus 6'
      }
    }
  },
  'nexus7': {
    'browser' : 'Chrome',
    'browser_version' : '61.0',
    'os' : 'Windows',
    'os_version' : '10',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Nexus 7'
      }
    }
  },
  'iphone6': {
    'browser' : 'Chrome',
    'browser_version' : '61.0',
    'os' : 'Windows',
    'os_version' : '10',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'iPhone 6'
      }
    }
  },
  'galaxyS5': {
    'browser' : 'Chrome',
    'browser_version' : '61.0',
    'os' : 'Windows',
    'os_version' : '10',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Galaxy S5'
      }
    }
  },
  'galaxyNote3': {
    'browser' : 'Chrome',
    'browser_version' : '61.0',
    'os' : 'Windows',
    'os_version' : '10',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Galaxy Note 3'
      }
    }
  },
  'ipad': {
    'browser' : 'Chrome',
    'browser_version' : '61.0',
    'os' : 'Windows',
    'os_version' : '10',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'iPad'
      }
    }
  },
  'iPhone6Plus': {
    'browser' : 'Chrome',
    'browser_version' : '61.0',
    'os' : 'Windows',
    'os_version' : '10',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'iPhone 6 Plus'
      }
    }
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://qa.shop.onefc.com/';

var resultsCallback = process.env.DEBUG ? console.log : shoovWebdrivercss.processResults;

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  // Method to take HomePage screenshots
  it('should open OneChampionShip homepage',function(done) {
    client
      .url(baseUrl)      
      .webdrivercss(testName + '.home_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Method to take login page screenshots
  it('should open OneChampionShip login page',function(done) {
    client
      .url(baseUrl + 'customer/account/login/')      
      .webdrivercss(testName + '.login_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of T-SHIRT category page after login
  it('should redirect on t-shirt page after login',function(done) {
    client
      .url(baseUrl + 'customer/account/login/')
      .setValue('.//*[@id="email"]','nitesh.sharma@incedoinc.com')
      .setValue('.//*[@id="pass"]','asl@12345')
      .submitForm('.//*[@id="send2"]')
      .pause(5000)
      .webdrivercss(testName + '.tshirt_category_page_after_login', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of MENS category page after login
  it('should redirect on mens category page after login',function(done) {
    client
      .url(baseUrl)
      .click('.navbar-toggler.navbar-toggler-right')
      .pause(5000)
      .click('.//*[@id="navbarSupportedContent"]/ul/li[1]/a')
      .pause(5000)
      .webdrivercss(testName + '.mens_category_page_after_login', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of WOMEN category page after login
  it('should redirect on women category page after login',function(done) {
    client
      .url(baseUrl)
      .click('.navbar-toggler.navbar-toggler-right')
      .pause(5000)
      .click('.//*[@id="navbarSupportedContent"]/ul/li[2]/a')
      .pause(5000)
      .webdrivercss(testName + '.women_category_page_after_login', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });
});

