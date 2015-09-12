var Main = React.createClass({
    render: function(){
        return (
            <div>
                {this.props.entries.map(function(entry, key){
                    return <Entry obj={entry} key={key} />
                })}
                <FrmEntryNew mainobj={this}/>
                <BtnEntryAdd/>
            </div>
        );
    }
});