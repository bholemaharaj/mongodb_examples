import { MongoClient } from "mongodb";

await main().catch(console.error);

async function main() {
    const uri = process.env.CONN_STR;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        //await listDatabases(client);
        await listDocuments(client);
    }
    catch (e) {
        console.error(e.message);
    }
    finally {
        await client.close();
    }
}

async function listDatabases(client) {
    const dbList = await client.db().admin().listDatabases();
    console.log("DATABASES:");

    dbList.databases.forEach(db => {
        console.log(`-- ${db.name}`);
    });
}

async function listDocuments(client) {
    const curser = await client.db("apiToolkit").collection("test").find();
    console.log("Documents:");
    const results = await curser.toArray();
    results.forEach(d => {
        if (d.versionDetails){
            d.versionDetails.forEach(v =>{
                console.log(v.openApiSpec);
            })
        }
    });
}
