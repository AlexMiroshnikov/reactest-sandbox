var Modal = React.createClass({
    componentDidMount: function(){

    },
    confirmAction: function(action, message){
        message = (message || 'Confirmation required');
        this._action = action;
        this.setState({message:message});
    },
    notify: function(message){
        this.setState({message:message, confirmation: true});
    },
    getInitialState: function(){
        return {message: '', confirmation: false};
    },
    cancel: function(){
        this._action = null;
        this._hide();
    },
    proceed: function(){
        this._hide();
        this._action && this._action();
        this._action = null;
    },
    _hide: function(){
        this.setState({message:''});
    },
    render: function(){
        this.props.mountPoint.style.display = (this.state.message ? 'block' : 'none');
        var cancel = (
            this.state.confirmation ? '' : (<button className="cancel" onClick={this.cancel}>Cancel</button>)
        );
        return (
            <div id="component-modal-content"><p>{this.state.message}</p>
                <div><button className="ok" onClick={this.proceed}>Ok</button>{cancel}</div>
            </div>
        );
    }
});