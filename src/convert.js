const csv = require('csvtojson');
const fs = require('fs');

const files = '../public/record-stores.csv'
const RUTA = '../catalogs/'

async function init() {
    let rows = await csv({ delimiter: ';'}).fromFile(files);
    build( { rows, 
            item: 'Country code', 
            fileName: 'countries'} );
    build( { rows, 
            item: 'City', 
            fileName: 'Cities'} );
    build( { rows, 
        item: 'Name', 
        fileName: 'stores'} )
}

function build ( { rows, item, fileName } ) {
    let buildedFile_full = rows.map( (eachItem ) => {
        return eachItem[item]
    })
    let buildedFile = [ ...new Set(buildedFile_full )]
    fs.writeFileSync( `${ RUTA }${fileName }.json`, JSON.stringify(buildedFile) );
}

init();
 