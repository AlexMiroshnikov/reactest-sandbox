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
            this.db(dbName).child(fieldName).on('value', function(snapshot){
                callback(snapshot);
            });
        },
        insertInc: function(dbName, tableName, obj, onFinish){
            var _this = this,
                refIncrements = this.db(dbName).child('increments'),
                refObjs = this.db(dbName).child(tableName);

            refIncrements.child(tableName).transaction(function(curVal){
                return curVal;
            }, function(error, commited, snapshot){
                if (error){
                    return false;
                }

                var curVal = snapshot.val(),
                    inc = {};

                inc[tableName] = curVal+1;
                if (curVal === null) {
                    refIncrements.set(inc);
                } else {
                    refIncrements.update(inc);
                }

                obj.id = inc[tableName];
                var ref = refObjs.push(obj, function(error){
                    console.log('onPush, this:');
                    console.log(this);
                    if (!error){
                        console.log('no error, proceed, obj:');
                        /*obj.prop();*/
                        console.log(obj);
                        console.log('ref:');
                        console.log(ref.key());
                    }
                    onFinish && onFinish(error);
                });
                console.log('ref after call:');
                console.log(ref);
            });
        },
        delete: function(dbName, tableName, obj, onFinish){
            this.db([dbName, tableName, obj.prop('uuid')].join('/')).set(null);
        }
    };
}(AppConfig.firebase.url);