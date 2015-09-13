var Modal = React.createClass({
    _action: null,
    componentDidMount: function(){
        Dispatcher.sub(AppEvent.CLICK_DELETE_ENTRY, this, function(_this, payload){
            console.log('>caught delete');
            console.log(payload);
            _this.setState({message: 'Please confirm deleting'});
            _this._action = function(){
                payload.delete();
            };
        });
    },
    getInitialState: function(){
        return {message: ''};
    },
    cancel: function(){
        this._action = null;
        this._hide();
    },
    proceed: function(){
        this._hide();
        this._action && this._action();
    },
    _hide: function(){
        this.setState({message:''});
    },
    render: function(){
        this.props.mountPoint.style.display = (this.state.message ? 'block' : 'none');
        return (
            <div id="component-modal-content"><p>{this.state.message}</p>
                <div><button onClick={this.proceed}>Ok</button> <button onClick={this.cancel}>Cancel</button></div>
            </div>
        );
    }
});