const input = require('sync-input');

class CurrencyConvertor {
    constructor(baseCurrency) {
        this.base = baseCurrency;
        this.currencies = [];
        this.welcome();
    }
    showRates(currencies) {
        this.currencies = currencies;
        currencies.map(currency => {
            console.log(`1 ${this.base.code} equals ${currency.rate} ${currency.code}`);
        });
    }
    convert(from, to, amount) {
        //converting
        let sum = (amount / from.rate) * to.rate;
        this.show(amount, to, from, sum.toFixed(4));
    }
    checkCurrencyType(currency) {
        let curr = this.findCurrency(currency.toUpperCase());
        if (curr === undefined) {
            console.log(`Unknown currency`);
            return undefined;
        }
        return curr;
    }
    checkAmountType(amount) {
        let number = Number(amount);
        if (!isNaN(number)) {
           if (number < 0) {
               console.log(`The amount cannot be less than 1`);
               return undefined;
           }
           return number;
        }
        console.log(`The amount has to be a number`);
        return undefined;
    }
    findCurrency(currency) {
        return this.currencies.find(c => c.code === currency);
    }
    processInput() {
        console.log(`1-Convert currencies 2-Exit program`);
        return input();
    }
    show(amount, to, from, sum) {
        console.log(`Result: ${amount} ${from.code} equals ${sum} ${to.code}`);
    }
    convertMessage() {
        console.log(`What do you want to convert?`);
    }
    goodbye() {
        console.log(`Have a nice day!`);
    }
    welcome() {
        console.log(`Welcome to Currency Converter!`);
    }
    info() {
        console.log(`What do you want to do?`);
    }
}

class Currency {
    constructor(code, rate) {
        this.code = code;
        this.rate = rate;
    }
}

class USD extends Currency {
    constructor(rate) {
        super('USD', rate);
    }
}

class JPY extends Currency {
    constructor(rate) {
        super('JPY', rate);
    }
}

class EUR extends Currency {
    constructor(rate) {
        super('EUR', rate);
    }
}

class RUB extends Currency {
    constructor(rate) {
        super('RUB', rate);
    }
}

class GBP extends Currency {
    constructor(rate) {
        super('GBP', rate);
    }
}

//create currencies and rates
let cUSD = new USD(1);
let cJPY = new JPY(113.5);
let cEUR = new EUR(0.89);
let cRUB = new RUB(74.36);
let cGBP = new GBP(0.75);

//create currency converter with base currency as USD
let cc = new CurrencyConvertor(cUSD);
cc.showRates([cUSD, cJPY, cEUR, cRUB, cGBP]);

//info
cc.info();

while (true) {
    //process
    let process = cc.processInput();

    //exit
    if (process === '1') {
        //get input from user
        cc.convertMessage();
        let from = cc.checkCurrencyType(input(`From: `));
        while (from === undefined) {
            from = cc.checkCurrencyType(input(`From: `));
        }
        let to = cc.checkCurrencyType(input(`To: `));
        while (to === undefined) {
            to = cc.checkCurrencyType(input(`To: `));
        }
        let amount = cc.checkAmountType(input(`Amount: `));
        while (amount === undefined) {
            amount = cc.checkAmountType(input(`Amount: `));
        }
        //convert
        cc.convert(from, to, amount);
    }
    else if (process === '2') {
        cc.goodbye();
        break;
    }
    else {
        console.log(`Unknown input`);
    }
}