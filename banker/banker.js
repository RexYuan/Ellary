$( document ).ready(function () {
    $( "#depositForm" ).submit(function( event ) {
        event.preventDefault();

        $( "#groupWord" ).removeClass( "has-error" );
        $( "#groupDef" ).removeClass( "has-error" );

        var word = $( "#inputWord" ).val();
        var def = $( "#inputDef" ).val();
        var entries = [];

        if ( !(word && def) )
        {
            if ( !word )
            {
                $( "#groupWord" ).addClass( "has-error" );
            }
            if ( !def )
            {
                $( "#groupDef" ).addClass( "has-error" );
            }
        }
        else
        {
            var precursor = $( "#precursor" ).val();
            if ( precursor )
            {
                try
                {
                    entries = $.parseJSON( precursor );
                    entries.push({
                        "id": entries.length,
                        "word": word,
                        "meaning": def
                    });
                }
                catch ( error )
                {
                    alert( "invalid JSON" );
                }
            }
            else
            {
                entries.push({
                    "id": 0,
                    "word": word,
                    "meaning": def
                });
            }

            $ ( "#precursor" ).val( JSON.stringify( entries ) );
        }
    });

    $( "#precursor" ).click(function (event) {
        this.focus();
        document.execCommand('SelectAll');
        document.execCommand("Copy");
        $( "#helpBlock" ).html("content copied to clipboard!")
    });
});
