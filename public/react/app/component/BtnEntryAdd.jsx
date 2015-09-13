var BtnEntryAdd = React.createClass({
    _invertDisplay: function(){
        this.setState({display: !this.state.display});
    },
    componentDidMount: function(){
        Dispatcher.sub(AppEvent.CLICK_BTN_ADD, this, function(_this){
            _this._invertDisplay();
        });
        Dispatcher.sub(AppEvent.CLICK_LNK_CLOSE, this, function(_this){
            _this._invertDisplay();
        });
        Dispatcher.sub(AppEvent.SAVING_OK, this, function(_this){
            _this.setState({display: true});
        });
    },
    handleClick: function(e){
        e.preventDefault();
        Dispatcher.fire(AppEvent.CLICK_BTN_ADD);
    },
    getInitialState: function(){
        return {display: false};
    },
    render: function(){
        var style = {
            display: (this.state.display ? 'block' : 'none')
        };
        return (
            <button onClick={this.handleClick} style={style}>Add</button>
        );
    }
});