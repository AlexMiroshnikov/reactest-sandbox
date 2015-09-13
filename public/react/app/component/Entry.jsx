var Entry = React.createClass({
    handleClickDelete: function(){

    },
    render: function(){
        var obj = this.props.obj,
            text = obj.prop('value');
        /*
        var text = this.props.obj.prop('value');
        return (
            <div><code>{text}</code><a href="#" onClick={this.handleClickDelete}>&times;</a></div>
        );
        */
        return (
            <div><code>{text}</code><a href="#" onClick={this.handleClickDelete}>&times;</a></div>
        );
    }
});