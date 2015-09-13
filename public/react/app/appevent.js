var AppEvent = {
    /**
     * @param handler
     * @param options
     * @returns {{option: Function, handle: Function}}
     */
    factory: function(handler, options){
        return {
            option: function(option) {
                return options[option];
            },
            handle: function(payload){
                return handler(options['component'], payload);
            }
        };
    },
    CLICK_BTN_ADD: 'clickbtnadd',
    CLICK_LNK_CLOSE: 'clicklnkclose',
    CLICK_BTN_SAVE: 'clickbtnsave',
    SAVE_ENTRY: 'saveentry',
    SAVING_OK: 'savingok',
    SAVING_ERROR: 'savingerror',
    CLICK_DELETE_ENTRY: 'clickdeleteentry',
    CLICK_EDIT_ENTRY: 'clickeditentry'
};