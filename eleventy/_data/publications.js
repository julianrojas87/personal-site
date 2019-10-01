const { Client } = require("graphql-ld");
const { QueryEngineComunica } = require("graphql-ld-comunica");

module.exports = async () => {
    let context = {
        "@context": {
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "schema": "http://schema.org/",
            "type": "rdf:type",
            "first": "rdf:first",
            "rest": "rdf:rest",
            "title": "rdfs:label",
            "abstract": "rdfs:description",
            "datePublished": "schema:datePublished",
            "publisher": "schema:publisher",
            "authored": { "@reverse": "schema:author" },
            "author": "schema:author",
            "name": "rdfs:label",
            "Publication": "http://schema.org/ScholarlyArticle",
            "Person": "http://xmlns.com/foaf/0.1/Person"
        }
    };

    const comunicaConfig = {
        sources: [
            //{ type: "file", value: "https://julianrojas.org" },
            { type: "file", value: "http://localhost:8080" }
        ],
    };

    let client = new Client({ context, queryEngine: new QueryEngineComunica(comunicaConfig) });

    // Query to get all the papers and their info.
    const papersQuery = `
    query {
        id(type:Publication) @single
        title @single
        datePublished @single
        publisher @single
        abstract @single
    }`;

    // Query to get the rdf ordered list chains defined by rdf:first, rdf:rest and rdf:nil.
    let authorsQuery = `
    query {
        firstAuthor: id {
            id @single
            authored @single
            rest @single
            first @single {
                id(type:Person) @single
                name @single
            }
        }
        all: id {
            id @single
            rest @single
            first @single {
                id(type:Person) @single
                name @single
            }
        }
    }`;

    const [papers, authors] = await Promise.all([client.query({ query: papersQuery }), client.query({ query: authorsQuery })]);
    let data = [];

    // Get an index of papers
    let papersMap = getIndex(papers.data);
    // Get an index of authors
    let authorsMap = getIndex(authors.data[0].all);

    // Set the correspondent list of authors to every paper
    for (let i = 0; i < authors.data[0].firstAuthor.length; i++) {
        let firstAuthor = authors.data[0].firstAuthor[i];
        let paper = papersMap.get(firstAuthor.authored);
        paper['authors'] = getOrderedAuthors(firstAuthor, authorsMap);
        data.push(paper);
    }

    // Sort the papers from the newest to the oldest
    data.sort(function (b, a) {
        return parseInt(a.datePublished) - parseInt(b.datePublished);
    });

    return data;
};

function getIndex(array) {
    let map = new Map();
    for (let i = 0; i < array.length; i++) {
        map.set(array[i]['id'], array[i]);
    }
    return map;
}

function getOrderedAuthors(first, index) {
    let authors = [];
    let auth = first;
    while (auth.rest !== 'http://www.w3.org/1999/02/22-rdf-syntax-ns#nil') {
        authors.push(auth.first);
        auth = index.get(auth.rest);
    }
    authors.push(auth.first);
    return authors;
} 
