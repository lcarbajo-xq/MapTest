const csv = require('csvtojson');
const fs = require('fs');


const FILE = '../public/record-stores.csv'
const catalog_countries = require('../catalogs/countries.json')
const catalog_stores = require('../catalogs/stores.json')
const countries_data = './countries_data/'


function filterByCountry (content) {
    catalog_countries.map( country => {
        let countryRow = content;
        if ( country != 'All') {
            countryRow = content.filter ( row => row['Country code'] === country );
        }

        let getRowData = countryRow.map ( row => {
            return { 
                name: row['Name'],
                lat: row['Latitude'],
                long: row['Longitude'],
                store_key: catalog_stores.indexOf(row['Name']),
                city: row['City']
            }        
        })
        fs.writeFileSync(
            `${ countries_data }${country.replace(/ /g, '')}.json`, 
            JSON.stringify( getRowData ))
        console.log(`${ country } generated` )
    })
}

async function init() {
    let rows = await csv({ delimiter: ';'}).fromFile(FILE);

    filterByCountry( rows )
}

init();
