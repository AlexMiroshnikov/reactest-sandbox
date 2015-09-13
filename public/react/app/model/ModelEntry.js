var ModelEntry = {
    factory: function(component){
        var _errors = [],
            _props = {
                value: (component ? component.getValue() : null)
            };

        return {
            isValid: function(){
                _errors = [];
                if (_props.value == '') {
                    _errors.push('Empty value!');
                }
                return (_errors.length == 0);
            },
            getErrors: function(){
                return _errors;
            },
            save: function(){
                AppFirebase.insertInc(
                    AppConfig.firebase.dbs.reactestDev,
                    AppConfig.firebase.dbs.reactestDevEntries,
                    this
                );
            },
            prop: function(key, value){
                if (typeof(key) == 'undefined') {
                    return _props;
                }
                if (typeof(value) == 'undefined') {
                    return _props[key];
                }
                _props[key] = value;
                return this;
            },
            delete: function(){
                AppFirebase.delete(
                    AppConfig.firebase.dbs.reactestDev,
                    AppConfig.firebase.dbs.reactestDevEntries,
                    this
                );
            },
            update: function(){
                var update = {};
                update[this.prop('uuid')] = {
                    value: this.prop('value')
                };
                AppFirebase.db([
                        AppConfig.firebase.dbs.reactestDev,
                        AppConfig.firebase.dbs.reactestDevEntries
                    ].join('/')
                ).update(update);
            }
        };
    },

    /**
     * @param {ReactComponent} component
     * @returns {boolean}
     */
    saveHandler: function(component){
        var model = this.factory(component);
        if (model.isValid()){
            try {
                model.save();
                Dispatcher.fire(AppEvent.SAVING_OK, model);
            } catch (e) {
                Dispatcher.fire(AppEvent.SAVING_ERROR, model);
                return false;
            }
        } else {
            Dispatcher.fire(AppEvent.SAVING_ERROR, model);
            return false;
        }
    }
};