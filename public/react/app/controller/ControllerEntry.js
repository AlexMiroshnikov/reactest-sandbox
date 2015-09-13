var ControllerEntry = {
    /**
     * @param {ReactComponent} component
     */
    create: function(component){
        ModelEntry.saveHandler(component);
    },

    /**
     * @param {ModelEntry} model
     * @param {Object} data
     */
    update: function(model, data){
        for (var prop in data){
            model.prop(prop, data[prop]);
        }
        model.update();
    },

    /**
     * @param {ModelEntry} model
     */
    delete: function(model){
        model.delete();
    }
};