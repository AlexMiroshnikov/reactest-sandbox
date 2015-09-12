var Dispatcher = {
    _events: {},
    _breakFlow: false,
    fire: function(eventName, payload){
        this._breakFlow = false;

        if (!this._events[eventName]) {
            return false;
        }
        for (var i=0; i<this._events[eventName].length; i++){
            this._events[eventName][i].handle(payload);
            if (this._events[eventName][i].option('breaking') || this._breakFlow){
                break;
            }
        }
    },
    sub: function(eventName, component, handler){
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }
        var event = AppEvent.factory(handler, {'component':component});
        this._events[eventName].push(event);
    },
    breakFlow: function(){
        this._breakFlow = true;
        return this;
    }
};