//Simple event emitter

function EventEmitter() {
    this.map = {};
}

EventEmitter.prototype.on = function(eventName, callback) {
    if(!this.map[eventName]) this.map[eventName] = [];
    this.map[eventName].push(callback);
};

EventEmitter.prototype.emit = function(eventName, data) {
    var subscribers = this.map[eventName];
    if(subscribers.length === 0) return;
    subscribers.map(cb => cb(data));
};