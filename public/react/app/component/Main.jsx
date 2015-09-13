var Main = React.createClass({
    render: function(){
        /*
        console.log('>render');
        console.log(this.props.entries);
        */
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