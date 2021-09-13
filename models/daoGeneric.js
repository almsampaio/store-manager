const { ObjectId } = require('mongodb');
const connection = require('../database/connection');

const conn = async (nameCollection) => connection().then((db) => db.collection(nameCollection));
class DaoGenericMongoDB {
  constructor(nameCollection) {
    this.nameCollection = nameCollection;
    this.conn = conn(nameCollection);
  }

  createCounter() {
    connection().then(
      (db) => db.collection('counters').insertOne({ _id: this.nameCollection, autoIncrement: 1 }),
    ).catch(console.error);
  }

  async getNextSequenceId() {
    return connection().then(async (db) => {
      const { value: { autoIncrement } } = await db.collection('counters').findOneAndUpdate(
        { _id: this.nameCollection },
        { $inc: { autoIncrement: 1 } },
      );
      return autoIncrement;
    });
  }

  async getAll(options = {}) {
    const collection = await this.conn;
    return collection.find({}, options).toArray();
  }

  async getAllSkipAndLimit(skip, limit) {
    const collection = await this.conn;
    return collection.find({}).skip(skip).limit(limit).toArray();
  }

  async findByName({ name, nameColumn = 'name' }, options = {}) {
    const collection = await this.conn;
    return collection.find({ [nameColumn]: name }, options).toArray();
  }

  /**
   * Search for query in column
   * @param {object} param0 { query, nameColumn = 'name' } 
   * @param {object} options default value is {}
   * @returns 
   */
  async findByColumn({ query, nameColumn = 'name' }, options = {}) {
    const collection = await this.conn;
    return collection.find({ [nameColumn]: query }, options).toArray();
  }

  /**
   * Find by Id
   * @param {string} id 
   * @param {object} options 
   * @returns 
   */
  async findByID(id, options = {}) {
    const collection = await this.conn;
    return collection.findOne({ _id: ObjectId(id) }, options);
  }

  /**
   * Insert data
   * @param {object} data 
   * @returns data
   */
  async insertOne(data) {
    const collection = await this.conn;
    return collection.insertOne({ id: await this.getNextSequenceId(), ...data });
  }

  async updateOne(id, data) {
    const updateDoc = {
      $set: {
        ...data,
      },
    };
  
    const collection = await this.conn;
    return collection.updateOne({ _id: ObjectId(id) }, updateDoc);
  }

  async findOneAndUpdate(id, data) {
    const updateDoc = {
      $set: {
        ...data,
      },
    };
  
    const collection = await this.conn;
    return collection
      .findOneAndUpdate({ _id: ObjectId(id) }, updateDoc, { returnDocument: 'after' });
  }

  async findOneAndUpdateNotSet(id, expr) {
    const collection = await this.conn;
    return collection
      .findOneAndUpdate({ _id: ObjectId(id) }, expr, { returnDocument: 'after' });
  }

  async aggregate(pipeline) {
    const collection = await this.conn;
    return collection
      .aggregate(pipeline);
  }

  async deletebyId(id) {
    const collection = await this.conn;
    return collection.deleteOne({ _id: ObjectId(id) });
  }

  async findOneAndDelete(id) {
    const collection = await this.conn;
    return collection.findOneAndDelete({ _id: ObjectId(id) });
  }

  async deleteByQuery(query) {
    const collection = await this.conn;
    return collection.deleteMany(query);
  }
}

module.exports = DaoGenericMongoDB;