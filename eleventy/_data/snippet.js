const { Client } = require("graphql-ld");
const { QueryEngineComunica } = require("graphql-ld-comunica");

module.exports = async () => {
    const context = {
        "@context": {
            "foaf": "http://xmlns.com/foaf/0.1/",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "schema": "http://schema.org/",
            "name": "rdfs:label",
            "phone": "foaf:phone",
            "email": "foaf:mbox",
            "img": "foaf:img",
            "birthDate": "schema:birthDate",
            "birthPlace": "schema:birthPlace"
        }
    };

    const comunicaConfig = {
        sources: [
            { type: "file", value: "https://julianrojas.org" }
        ],
    };

    const client = new Client({ context, queryEngine: new QueryEngineComunica(comunicaConfig) });
    const foafQuery = `
        query @single(scope:all) {   
            id
            name
            phone
            email
            birthDate
            img
            birthPlace
        }
    `;

    const foaf = (await client.query({ query: foafQuery })).data;
    return {
        "@context": "http://schema.org/",
        "@type": "Person",
        "@id": foaf.id,
        "name": foaf.name,
        "image": foaf.img,
        "email": foaf.email.substring(7),
        "telephone": foaf.phone,
        "birthDate": foaf.birthDate,
        "birthPlace": foaf.birthPlace,
        "gender": "http://schema.org/Male",
    };
};