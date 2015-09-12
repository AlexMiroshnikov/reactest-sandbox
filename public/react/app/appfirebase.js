var AppFirebase = function(){
    var _url = '',
        _connection = null,
        _dbs = {};

    this.setUrl = function(url){
        _url = url;
        return this;
    };

    this.connect = function(){
        if (!_connection) {
            _connection = new Firebase(_url);
        }
        return this;
    };

    this.db = function(dbName){
        if (!_dbs[dbName]) {
            _dbs[dbName] = _connection.child(dbname);
        }
        return _dbs[dbName];
    };

    return this;
}();