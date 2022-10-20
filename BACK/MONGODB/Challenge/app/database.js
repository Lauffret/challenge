import { MongoClient } from "mongodb";

export const DB_NAME = 'ny';
export const DB_COLLECTION = 'restaurants';

// Déclaration de la connectionString
const CONNECTION_STRING = "mongodb://root:example@mongo:27017"; // Avec Docker
// const CONNECTION_STRING = 'mongodb://localhost:27017'; // Installation locale de MongoDB

// Initialise une connexion à la base MongoDB
export const client = new MongoClient(CONNECTION_STRING);
let db = null;

export function openDatabase() {
    return client.connect().then(() => {
        db = client.db(DB_NAME);

        return db;
    });
};



export async function getRestaurants(findName) {
    const collection = await db.collection("restaurants");
    let restos = await collection.find({name: { $regex:".*"+findName+".*" }});
    restos = await restos.toArray();

    return restos.map(r => ({ name : r.name, address : r.address, borough: r.borough, cuisine: r.cuisine}));
};

export async function getRestaurant(borough,cuisine) {
    const collection = await db.collection("restaurants");
    let restos = await collection.find({borough:borough, cuisine:cuisine});
    restos = await restos.toArray();

    return restos.map(r => ({ name : r.name, address : r.address, borough: r.borough, cuisine: r.cuisine}));
};

export async function getCuisine() {
    return client.connect().then(() => {
        let db = client.db(DB_NAME);
        const restaurants = db.collection("restaurants");
        const cuisine = restaurants.distinct("cuisine");
        return cuisine
    });
};

export async function getBorough() {
    return client.connect().then(() => {
        let db = client.db(DB_NAME);
        const restaurants = db.collection("restaurants");
        const borough = restaurants.distinct("borough");
        return borough
    });
};

async function getCity() {
    return client.connect().then(() => {
        let db = client.db(DB_NAME);
        const restaurants = db.collection("restaurants");
        const city = restaurants.distinct("address.zipcode");
        return city
    });
};

export async function bestRestaurantByBorough(boroughName) {
    return client.connect().then(() => {
        let db = client.db(DB_NAME);
        const restaurants = db.collection("restaurants");
        const restos =  restaurants.find( { "borough": boroughName}, {sort: { "grades.date": -1 },
        projection: { "grades.1": 1 }});

        console.log(restos);

        // restos.forEach(resto => {
        //     const grade = restaurants.find( { "name": resto.name});

        //     restaurants.find().sort({"datetime": -1}).limit(1)
        // });

        // return resto
    });
};