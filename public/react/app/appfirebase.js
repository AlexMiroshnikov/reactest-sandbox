var AppFirebase = function(url){
    var _url = url || '',
        _connection = null,
        _dbs = {};

    return {
        setUrl: function (url) {
            _url = url;
            return this;
        },
        connect: function () {
            if (!_connection) {
                if (!_url) {
                    throw new Error('Undefined url');
                }
                _connection = new Firebase(_url);
                if (!_connection) {
                    throw new Error('Could not connect to "' + _url + '"');
                }
            }
            return this;
        },
        db: function (dbName) {
            this.connect();

            if (!_dbs[dbName]) {
                _dbs[dbName] = _connection.child(dbName);
            }
            return _dbs[dbName];
        },
        fetch: function(dbName, fieldName, callback){
            console.log('>fetch');
            console.log(fetch);
            console.log(fieldName);
            console.log(callback);
            console.log(' call child..');
            this.db(dbName).child(fieldName).on('value', function(snapshot){
                console.log(' snaphot func');
                callback(snapshot);
            });
            console.log(' db worked out');
        }
    };
}(AppConfig.firebase.url);