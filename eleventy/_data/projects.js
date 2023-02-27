const { Client } = require("graphql-ld");
const { QueryEngineComunica } = require("graphql-ld-comunica");
const { format } = require('date-fns');

module.exports = async () => {
    const context = {
        "@context": {
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "schema": "http://schema.org/",
            "type": "rdf:type",
            "name": "schema:name",
            "url": "schema:url",
            "image": "schema:image",
            "description": "schema:description",
            "keywords": "schema:keywords",
            "startDate": "schema:startDate",
            "endDate": "schema:endDate",
            "funder": "schema:funder",
            "Project": "schema:Project"
        }
    };

    const comunicaConfig = {
        sources: [
            { type: "file", value: "https://julianrojas.org" }
        ],
    };

    const client = new Client({ context, queryEngine: new QueryEngineComunica(comunicaConfig) });

    // Query to get all the projects and their info.
    const query = `
    query {
        id(type:Project) @single
        name @single
        url @single
        image @single
        description @single
        startDate @single
        endDate @optional @single
        keywords @plural
        funder @single {
            id @single
            name @single
        }
    }`;

    const { data } = await client.query({ query });

    // Set proper dates
    data.forEach(proj => {
        proj.startDate = new Date(proj.startDate);
        if (proj.endDate) {
            proj.endDate = new Date(proj.endDate);
        }
    });

    // Sort by date from the newest to the oldest
    data.sort((b, a) => {
        return a.startDate - b.startDate;
    });

    // Format dates
    data.forEach(proj => {
        proj.startDate = format(proj.startDate, "MMM yyyy");
        if (proj.endDate) {
            proj.endDate = format(proj.endDate, "MMM yyyy");
        }
    });

    return data;
};