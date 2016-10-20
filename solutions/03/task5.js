var Promis = function(func) {
    this._resolve = null;
    this._reject = null;
    this._next = null;

    var success = data => {
        if(!this._resolve) return;
        var result = this._resolve(data);
        if(!this._next) return;

        /* *
         * f handles the case when a function that returns a promis is canined with then.
         * Basically we insert the new promise in the chain.
         * */

        (function f(result) {
            if(result instanceof Promis) {
                result._resolve = this._next._resolve;
                if(this._next._reject) result._reject = this._next._reject;
                result._next = this._next._next;
                this._next = result;
            } else { 
                if(this._next && this._next._resolve) f.bind(this._next)(this._next._resolve(result));
            }
        }.bind(this)(result));
    };

    var failure = err => {
        var next = this;

        /* *
         * Check if there are any chained catch functions and when you find the first one call it.
         * */ 

        while(next) {
            if(next._reject) { next._reject(err); break; }
            next = next._next;
        }
    };

    /* *
     * The Promis function will be called in the async function. We will receive func but if we don't use the setTimeout bellow
     * func will be called with success and failure. If in the async function we don't have a async operation and we are just calling
     * resolve with an argumen our success will be called but _resolve won't be there yet. So basically we are saying call func after 
     * you finish everything. (Google Even Loop if you don't understand)
     * */

    setTimeout(() => { if(func) func(success, failure); } , 0);
};


/* Another way to start a chain and no ... I didn't forget prototype */
Promis.resolve = function(val) {
    /* Just resolve it */
    return new Promis((r) => r(val));
};

Promis.prototype.then = function(func) {
    this._resolve = func;
    /* We want to be able to chain so just return a promise */
    return (this._next = new Promis());
};

Promis.prototype.catch = function(func) {
    this._reject = func;
    return this;
};

var asyncError = function() {
    return new Promis(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error('Error 599!'));
        }, 1000);
    });
};

var asyncValue = function() {
    return new Promis(function(resolve, reject) {
        setTimeout(function() {
            resolve(2000);
        }, 1000);
    });
};

var sync = function() {
    return new Promis(function(resolve, reject) {
        resolve(2000);
    });
};

var addOneAsync = function(data) {
    return new Promis(function(resolve, reject) {
        setTimeout(() => resolve(++data), 1000);
    });
};

asyncError().then(x => x + 1).then(console.log).catch(function(err) {
    console.log('Test1: ', err);
});

asyncValue().then(addOneAsync).then(addOneAsync).then(x => x + 1).then(addOneAsync).then(val => console.log('Test2: ', val)).catch(console.error);

sync().then(x => x + 1).then(val => console.log('Test3: ', val));

/* Why bother even write sync function when we can ... */

Promis.resolve(3).then(x => x + 1).then(val => console.log('Test4:', val));