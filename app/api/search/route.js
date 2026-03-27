import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.WM2082_MONGODB_URI);

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) return res.status(400).json({ error: "Missing query" });

  try {
    await client.connect();
    const collection = client.db('WM2082').collection('WMState');

    // The Atlas Search Pipeline
    const results = await collection.aggregate([
      {
        $search: {
          index: "TSAState", // Must match the index name in Atlas
          text: {
            query: q,
            path: { wildcard: "*" }, // Searches all text fields
            fuzzy: { maxEdits: 2 } // Allows for typos!
          }
        }
      },
      { $limit: 10 }, // Keep it snappy
      { $project: { _id: 1, name: 1, score: { $meta: "searchScore" } } } // Returns relevance score
    ]).toArray();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

