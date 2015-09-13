AppFirebase.fetch(AppConfig.firebase.dbs.reactestDev, 'entries', function(result){
    var results = result.val(),
        entries = [];

    console.log('results');
    console.log(results);

    for (var entryUUID in results){
        var entry = ModelEntry.factory();
        entry.prop('value', results[entryUUID]);
        entry.prop('uuid', entryUUID);
        entries.push(entry);
    }

    React.render(
        <Main entries={entries}/>,
        document.getElementById('react-container')
    );
});
var entries = [];
React.render(
    <Main entries={entries}/>,
    document.getElementById('react-container')
);