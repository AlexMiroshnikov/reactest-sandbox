var ControllerEntry = {
    create: function(component){
        ModelEntry.saveHandler(this);
    },
    update: function(model, component){

    },
    /**
     *
     * @param ModelEntry model
     */
    delete: function(model){
        model.delete();
    }
};