AppFirebase.fetch(AppConfig.firebase.dbs.reactestDev, 'entries', function(result){
    var results = result.val(),
        entries = [];

    for (var entryUUID in results){
        var entry = ModelEntry.factory();
        entry.prop('value', results[entryUUID].value);
        entry.prop('id', results[entryUUID].id);
        entry.prop('uuid', entryUUID);
        entries.push(entry);
    }

    React.render(
        <Main entries={entries}/>,
        document.getElementById('react-container')
    );
});

var modalMountPoint = document.getElementById('react-modal-container');
Modal = React.render(
    <Modal mountPoint={modalMountPoint} />,
    modalMountPoint
);