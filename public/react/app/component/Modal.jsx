var Modal = React.createClass({
    componentDidMount: function(){

    },
    confirmAction: function(action, message){
        message = (message || 'Confirmation required');
        this._action = action;
        this.setState({message:message});
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