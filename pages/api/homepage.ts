import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';

let cachedDb: Db = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('bv_moveis');

  cachedDb = db;

  return db;
}

export default async (request: NowRequest, response: NowResponse) => {
  const db = await connectToDatabase();

  const items = db.collection('items').find({ isHomepage: true });
  const images = db.collection('images').find({ isHomepage: true });

  const data = {
    items,
    images,
  }

  return response.status(200).json(items);
}