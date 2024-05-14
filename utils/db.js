import { MongoClient } from 'mongodb';

/**
 * Represents a MongoDB client.
 */


class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        this.dbClient = false;
      } else {
        this.dbClient = client.db(database);
      }
    });
  }

/**
   * Checks if this client's connection to the MongoDB server is active.
   */


  isAlive() {
    return !!this.dbClient;
  }

  async nbUsers() {
    return this.dbClient.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.dbClient.collection('files').countDocuments();
  }
}

export default new DBClient();
