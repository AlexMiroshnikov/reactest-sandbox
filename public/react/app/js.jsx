AppFirebase.fetch(AppConfig.firebase.dbs.reactestDev, 'entries', function(result){
    var results = result.val(),
        entries = [];

    for (var entryId in results){
        var entry = ModelEntry.factory();
        entry.prop('value', results[entryId]);
        entries.push(entry);
    }

    React.render(
        <Main entries={entries}/>,
        document.getElementById('react-container')
    );
});