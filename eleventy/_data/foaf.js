const { Client } = require("graphql-ld");
const { QueryEngineComunica } = require("graphql-ld-comunica");
const { format } = require('date-fns');

module.exports = async () => {
    const context = {
        "@context": {
            "foaf": "http://xmlns.com/foaf/0.1/",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "schema": "http://schema.org/",
            "label": "rdfs:label",
            "name": "foaf:name",
            "phone": "foaf:phone",
            "email": "foaf:mbox",
            "img": "foaf:img",
            "account": "foaf:account",
            "birthDate": "schema:birthDate",
            "provider": "schema:provider"
        }
    };

    const comunicaConfig = {
        sources: [
            { type: "file", value: "https://julianrojas.org" },
        ],
    };

    const client = new Client({ context, queryEngine: new QueryEngineComunica(comunicaConfig) });
    const query = `
    query @single(scope:all) {   
        id
        name
        phone
        email
        birthDate
        img
        account @plural {
            id
            provider
        }
    }`;

    const { data } = await client.query({ query });

    // Format birth date
    let bd = new Date(data.birthDate);
    data.birthDate = format(bd, "MMMM do, yyyy");

    return data;
};
