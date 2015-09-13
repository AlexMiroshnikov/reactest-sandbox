var Entry = React.createClass({
    componentDidMount: function(){

    },
    getInitialState: function(){
        return {inEdit: false};
    },
    handleClickDelete: function(e){
        e.preventDefault();
        var _this = this;
        Modal.confirmAction(function(){
            ControllerEntry.delete(_this.props.obj);
            Modal.notify('Deleted');
        }, 'Confirm deleting the message');
    },
    showEdit: function(){
        this.setState({inEdit: true}, function(){
            React.findDOMNode(this.refs.fieldEdit).focus();
        });
    },
    handleClickEdit: function(e){
        e.preventDefault();
        ControllerEntry.update(this.props.obj, {
            value: React.findDOMNode(this.refs.fieldEdit).value
        });
        Modal.notify('Edited');
        this.setState({inEdit: false});
    },
    handleClickCancel: function(e){
        e.preventDefault();
        this.setState({inEdit: false}, function(){
            React.findDOMNode(this.refs.fieldEdit).value = this.props.obj.prop('value');
        });
    },
    handleKeyup: function(e){
        if (e.keyCode == 13) {
            this.handleClickEdit(e);
        }
        if (e.keyCode == 27) {
            this.handleClickCancel(e);
        }
    },
    render: function(){
        return (
            <li>
                <span style={{display: (this.state.inEdit ? 'none' : 'block')}}>
                    <code onClick={this.showEdit}>{this.props.obj.prop('value')}</code>
                    <a href="#" onClick={this.handleClickDelete}>&times;</a>
                </span>
                <span style={{display: (this.state.inEdit ? 'block' : 'none')}}>
                    <input defaultValue={this.props.obj.prop('value')} ref='fieldEdit' onKeyUp={this.handleKeyup}/>
                    <button onClick={this.handleClickEdit}>Save</button>
                    <a href="#" onClick={this.handleClickCancel}>Don't edit</a>
                </span>
            </li>
        );
    }
});