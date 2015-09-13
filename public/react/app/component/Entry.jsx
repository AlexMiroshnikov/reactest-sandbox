var Entry = React.createClass({
    handleClickDelete: function(e){
        e.preventDefault();
        Dispatcher.fire(AppEvent.CLICK_DELETE_ENTRY, this.props.obj);
    },
    render: function(){
        return (
            <div><code>{this.props.obj.prop('value')}</code><a href="#" onClick={this.handleClickDelete}>&times;</a></div>
        );
    }
});