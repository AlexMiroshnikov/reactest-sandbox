var ModelEntry = {
    factory: function(component){
        var _errors = [],
            _props = {
                value: component.getValue()
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

            },
            prop: function(key, value){
                if (typeof(value) == 'undefined') {
                    return _props[key];
                }
                _props[key] = value;
                return this;
            }
        };
    },
    saveHandler: function(component){
        var model = this.factory(component);
        if (model.isValid()){
            model.save();
            Dispatcher.fire(AppEvent.SAVING_OK, model);
        } else {
            Dispatcher.fire(AppEvent.SAVING_ERROR, model);
            return false;
        }
    }
};