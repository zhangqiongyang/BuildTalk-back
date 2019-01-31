tinymce.PluginManager.add('example', function(editor, url) {
    function showDialog() {
        var wins = editor.windowManager.open({
            autoScroll: true,
            width: 800,
            height: 600,
            title: 'example Emoji',
            bodyType: 'container',
            layout: 'fit',
            items: [
                {
                    type: 'container',
                    html: '<p>14545555555</p>',
                    onclick: function (e) {
                        var target = e.target;
                    }
                }
            ],
            buttons: [{
                text: 'Close',
                onclick: () => {
                    wins.close()
                }
            }]
        })
    }

    editor.addCommand('exampleShowDialog', showDialog);

    editor.addButton('example', {
        text: 'example ',
        icon: false,
        cmd: 'exampleShowDialog'
    });

    editor.addMenuItem('example', {
        text: 'example',
        icon: 'emoticons',
        context: 'insert',
        cmd: 'exampleShowDialog'
    });
})
