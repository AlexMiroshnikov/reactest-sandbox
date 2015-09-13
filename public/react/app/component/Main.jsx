var Main = React.createClass({
    render: function(){
        return (
            <ul>
                {this.props.entries.map(function(entry, key){
                    return <Entry obj={entry} key={key} />
                })}
                <FrmEntryNew mainobj={this}/>
                <BtnEntryAdd/>
            </ul>
        );
    }
});