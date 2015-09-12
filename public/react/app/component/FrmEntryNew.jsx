var FrmEntryNew = React.createClass({
    _invertDisplay: function(){
        this.state.display = !this.state.display;
    },
    componentDidMount: function(){
        Dispatcher.sub(AppEvent.CLICK_BTN_ADD, this, function(_this){
            if (!_this.state.display) {
                _this.setState({display: !_this.state.display});
                React.findDOMNode(_this.refs['input']).focus();
            }
        });

        Dispatcher.sub(AppEvent.CLICK_LNK_CLOSE, this, function(_this){
            _this.setState({display: false});
        });

        Dispatcher.sub(AppEvent.SAVING_OK, this, function(_this, payload){
            console.log('existing:');
            console.log(_this.props.mainobj.props.entries);
            /*_this.props.mainobj.props.entries.push(payload);*/
            _this.props.mainobj.props.entries[_this.props.mainobj.props.entries.length] = payload;
            _this.props.mainobj.forceUpdate();
            _this.setState({display: false});
            React.findDOMNode(_this.refs['input']).value = '';
        });

        Dispatcher.sub(AppEvent.SAVING_ERROR, this, function(_this, payload){
            _this.setState({errors: payload.getErrors()});
        });
    },
    getInitialState: function(){
        return {display: false, errors: []};
    },
    hideForm: function(e){
        e.preventDefault();
        Dispatcher.fire(AppEvent.CLICK_LNK_CLOSE);
    },
    handleKeyup: function(e){
        if (e.keyCode == 13) {
            ModelEntry.saveHandler(this);
        }
    },
    getValue: function(){
        return React.findDOMNode(this.refs['input']).value;
    },
    handleSave(e){
        e.preventDefault();
        ModelEntry.saveHandler(this);
    },
    render: function(){
        var style = {
                display: (this.state.display ? 'block' : 'none')
            };

        return (
            <div style={style} ref="root">
                <MsgError errors={this.state.errors} />
                <input type="text" name="new-entry-name" ref="input"/><button onClick={this.handleSave}>Save</button>
                <a href="#" onClick={this.hideForm} onKeyup={this.handleKeyup} style={{marginLeft: 0.3+'em'}}>&times;</a>
            </div>
        );
    }
});