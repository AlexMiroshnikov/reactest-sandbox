var MsgError = React.createClass({
    render: function(){
        return (
            <ul className="error" style={{display: (this.props.errors.length ? 'block' : 'none')}}>{this.props.errors.map(function(error, key){
                return <MsgErrorItem key={key} error={error}/>
            })}</ul>
        );
    }
});