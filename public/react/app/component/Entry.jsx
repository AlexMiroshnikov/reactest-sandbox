var Entry = React.createClass({
    handleClickDelete: function(){

    },
    render: function(){
        return (
            <div><code>{this.props.obj.prop('value')}</code><a href="#" onClick={this.handleClickDelete}>&times;</a></div>
        );
    }
});