var Entry = React.createClass({
    render: function(){
        return (
            <div><code>{this.props.obj.prop('value')}</code><a href="#">&times;</a></div>
        );
    }
});