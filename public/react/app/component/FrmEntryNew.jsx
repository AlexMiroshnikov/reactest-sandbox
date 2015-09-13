var FrmEntryNew = React.createClass({
    _invertDisplay: function(){
        this.state.display = !this.state.display;
    },
    componentDidUpdate: function(){
        if (this.state.display){
            var _this = this;
            setTimeout(function(){React.findDOMNode(_this.refs['input']).focus();}, 0);
        }
    },
    componentDidMount: function(){
        Dispatcher.sub(AppEvent.CLICK_BTN_ADD, this, function(_this){
            if (!_this.state.display) {
                _this.setState({display: !_this.state.display});
                setTimeout(function(){React.findDOMNode(_this.refs['input']).focus();}, 0);
            }
        });

        Dispatcher.sub(AppEvent.CLICK_LNK_CLOSE, this, function(_this){
            _this.setState({display: false});
        });

        Dispatcher.sub(AppEvent.SAVING_OK, this, function(_this, payload){
            _this.props.mainobj.props.entries[_this.props.mainobj.props.entries.length] = payload;
            /*_this.props.mainobj.forceUpdate();*/
            _this.setState({display: false});
            setTimeout(function(){React.findDOMNode(_this.refs['input']).value = '';}, 0);
        });

        Dispatcher.sub(AppEvent.SAVING_ERROR, this, function(_this, payload){
            _this.setState({errors: payload.getErrors()});
        });
    },
    getInitialState: function(){
        return {display: true, errors: []};
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
                <input type="text" name="new-entry-name" ref="input" onKeyUp={this.handleKeyup}/><button onClick={this.handleSave}>Save</button>
                <a href="#" onClick={this.hideForm} style={{marginLeft: 0.3+'em'}}>&times;</a>
            </div>
        );
    }
});