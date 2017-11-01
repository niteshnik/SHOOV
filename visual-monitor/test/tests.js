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
        'deviceName': 'Nexus 5X'
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
        'deviceName': 'iPad Pro'
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
  },
  'iphone5': {
    'browser' : 'Chrome',
    'browser_version' : '61.0',
    'os' : 'Windows',
    'os_version' : '10',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'iPhone 5'
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
  it('should open t-shirt page after login',function(done) {
    client
      .url(baseUrl + 'customer/account/login/')
      .setValue('.//*[@id="email"]','shoov.test@ui.com')
      .setValue('.//*[@id="pass"]','asl@12345')
      .submitForm('.//*[@id="send2"]')
      .pause(5000)
      .webdrivercss(testName + '.tshirt_category_page_after_login', {
        name: '1',
        //exclude: ['.//*[@id="category-products"]/div/div/div/ol/li'],
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of MENS category page after login
  it('should open mens category page after login',function(done) {
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
  it('should open women category page after login',function(done) {
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

  //Methods to take sceenshot of OTHERS category page after login
  it('should open others category page after login',function(done) {
    client
      .url(baseUrl)
      .click('.navbar-toggler.navbar-toggler-right')
      .pause(5000)
      .click('.//*[@id="navbarSupportedContent"]/ul/li[4]/a')
      .pause(5000)
      .webdrivercss(testName + '.others_category_page_after_login', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of product detail page after adding product into cart
  it('should open product details page and adding product into cart',function(done) {
    client
      .url(baseUrl + 'logo-unisex-sleeves-ragan')      
      .pause(50000)
      .scroll('.//*[@id="product_addtocart_form"]/div[2]/div/div/div/div[1]')
      .click('.//*[@id="product_addtocart_form"]/div[2]/div/div/div/div[1]')
      .click('.//*[@id="product-addtocart-button"]')
      .pause(50000)
      .webdrivercss(testName + '.product_detail_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of shopping cart page
  it('should open shopping cart page',function(done) {
    client
      .url(baseUrl + 'checkout/cart/')
      .pause(10000)
      .webdrivercss(testName + '.shopping_cart_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of checkout page
  it('should open checkout page',function(done) {
    client
      .url(baseUrl + 'checkout/')   
      .pause(50000)   
      .webdrivercss(testName + '.checkout_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of My Account page
  it('should open my account page',function(done) {
    client
      .url(baseUrl + 'customer/account/')   
      .pause(50000)   
      .webdrivercss(testName + '.my_account_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of Account Info page
  it('should open account info page',function(done) {
    client
      .url(baseUrl + 'customer/account/edit/')   
      .pause(50000)   
      .webdrivercss(testName + '.account_info_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of Address Book page
  it('should open address book page',function(done) {
    client
      .url(baseUrl + 'customer/address/')   
      .pause(50000)   
      .webdrivercss(testName + '.address_book_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of My Orders page
  it('should open my orders page',function(done) {
    client
      .url(baseUrl + 'sales/order/history/')   
      .pause(50000)   
      .webdrivercss(testName + '.my_orders_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });
  

  //Methods to take sceenshot of Newsletter Subscription page
  it('should open newsletter subscription page',function(done) {
    client
      .url(baseUrl + 'newsletter/manage/')   
      .pause(50000)   
      .webdrivercss(testName + '.newsletter_subscription_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of wishlist page
  it('should open wishlist page',function(done) {
    client
      .url(baseUrl + 'wishlist/')   
      .pause(50000)   
      .webdrivercss(testName + '.wishlist_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of payment method page
  it('should open payment method page',function(done) {
    client
      .url(baseUrl + 'checkout/#payment')   
      .pause(50000)   
      .scroll('.//*[@id="adyen_hpp"]')
      .click('.//*[@id="adyen_hpp"]') 
      .pause(50000)      
      .webdrivercss(testName + '.payment_method_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of adyen payment method page
  it('should open adyen payment method page',function(done) {
    client
      .url(baseUrl + 'checkout/#payment')   
      .pause(50000)        
      .scroll('.//*[@id="checkout-payment-method-load"]/div/div/div[2]/div[2]/div[3]/div/button')
      .click('.//*[@id="checkout-payment-method-load"]/div/div/div[2]/div[2]/div[3]/div/button')
      .pause(50000) 
      .webdrivercss(testName + '.adyen_payment_method_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });


  //Methods to take sceenshot of select master card method page
  it('should open select master card payment method page',function(done) {
    client
      //.url(baseUrl + 'checkout/#payment')      
      .scroll('.//*[@id="paymentMethods"]/li[7]/input')
      .click('.//*[@id="paymentMethods"]/li[7]/input')
      .pause(50000) 
      .webdrivercss(testName + '.mastercard_payment_method_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  //Methods to take sceenshot of thank you for your order page
  it('should open thank you for your order page',function(done) {    
    client
      .scroll('.//*[@id="card.cardNumber"]')
      .setValue('.//*[@id="card.cardNumber"]','2223000048410010')
      .setValue('.//*[@id="card.cardHolderName"]','SHOOV TEST')
      .selectByVisibleText('.//*[@id="card.expiryMonth"]','08')
      .selectByVisibleText('.//*[@id="card.expiryYear"]','2018')
      .setValue('.//*[@id="card.cvcCode"]','737')
      .scroll('.//*[@id="mainSubmit"]')
      .submitForm('.//*[@id="mainSubmit"]')
      .pause(10000) 
      .scroll('.//*[@id="mainSubmit"]')
      .submitForm('.//*[@id="mainSubmit"]')
      .pause(50000) 
      .webdrivercss(testName + '.thankyou_for_your_order_page', {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });



});

