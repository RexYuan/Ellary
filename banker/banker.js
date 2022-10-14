$( document ).ready(function () {
    $( "#depositForm" ).submit(function( event ) {
        event.preventDefault();

        $( "#groupQ" ).removeClass( "has-error" );
        $( "#groupA" ).removeClass( "has-error" );

        var question = $( "#inputQ" ).val();
        var info = $( "#inputI" ).val();
        var answer = $( "#inputA" ).val();
        var entries = [];

        if ( !(question && answer) )
        {
            if ( !question )
            {
                $( "#groupQ" ).addClass( "has-error" );
            }
            if ( !answer )
            {
                $( "#groupA" ).addClass( "has-error" );
            }
        }
        else
        {
            var precursor = $( "#precursor" ).val();
            if ( precursor )
            {
                try
                {
                    entries = $.parseJSON( precursor.substr(9) );
                    if (info)
                    {
                        entries.push({
                            "id": entries.length,
                            "question": question,
                            "info": info,
                            "answer": answer
                        });
                    }
                    else
                    {
                        entries.push({
                            "id": entries.length,
                            "question": question,
                            "answer": answer
                        });
                    }
                }
                catch ( error )
                {
                    alert( "invalid JSON" );
                }
            }
            else
            {
                if (info)
                {
                    entries.push({
                        "id": 0,
                        "question": question,
                        "info": info,
                        "answer": answer
                    });
                }
                else
                {
                    entries.push({
                        "id": 0,
                        "question": question,
                        "answer": answer
                    });
                }
            }

            $ ( "#precursor" ).val( "var bank=" + JSON.stringify( entries ) );
        }
    });

    $( "#precursor" ).click(function (event) {
        this.focus();
        document.execCommand( "SelectAll" );
        document.execCommand( "Copy" );
        $( "#preHelp" ).html( "content copied to clipboard!" )
    });
});
