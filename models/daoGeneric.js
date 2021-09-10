const connection = require('../database/connection');
const { ObjectId } = require('mongodb');

class DaoGenericMongoDB {
  constructor(nameCollection) {
    this.nameCollection = nameCollection;
  }

  async getAll() {
    const a = await connection()
      .then((db) => {
        const products =  db.collection(this.nameCollection).find({}).toArray();
        return products;
      });
    console.log('getALL', a);
    return a;
  }

  async getAllSkipAndLimit(skip, limit) {
    const a = await connection()
      .then((db) => {
        const b =  db.collection(this.nameCollection).find({})
          .skip(skip).limit(limit).toArray();
        return b;
      });
    console.log('getALL skip limit', a);
    return a;
  }

  async findByName({ name, nameColumn = 'name' }, options = {}) {
    const a = await connection()
      .then((db) => {
        const b =  db.collection(this.nameCollection)
          .find({ [nameColumn]: name }, options).toArray();
        return b;
      });
    console.log('findByName', a);
    return a;
  }

  /**
   * Search for query in column
   * db.collection(...)
   *      .find({ [nameColumn]: query }, options).toArray();
   *
   * @param {object} param0 { query, nameColumn = 'name' } 
   * @param {object} options options = {}
   * @returns 
   */
  async findByColumn({ query, nameColumn = 'name' }, options = {}) {
    const a = await connection()
      .then((db) => {
        const b =  db.collection(this.nameCollection)
          .find({ [nameColumn]: query }, options).toArray();
        return b;
      });
    console.log('findByColumn', a);
    return a;
  }

  /**
   * Find by Id
   * @param {string} id 
   * @param {object} options 
   * @returns 
   */
  async findByID(id, options = {}) {
    const a = await connection()
      .then((db) => {
        const b =  db.collection(this.nameCollection)
          .findOne({ _id: ObjectId(id) }, options);
        return b;
      });
    console.log('findById', a);
    return a;
  }

  /**
   * Insert data
   * @param {object} data 
   * @returns data
   */
  async insertOne(data) {
    const a = await connection()
      .then((db) => {
        const b =  db.collection(this.nameCollection).insertOne(data);
        return b;
      });
    console.log('insertOne', a.ops);
    return a;
  }

  async updateOne(id, data) {
    const updateDoc = {
      $set: {
        ...data
      },
    };
  
    const a = await connection()
      .then((db) => {
        const b =  db.collection(this.nameCollection)
          .updateOne({ _id: ObjectId(id) }, updateDoc);
        return b;
      });
    console.log('updateOne', a);
    return a;
  }

  async deletebyId(id) {
    // if (ObjectId(id)) 
    const a = await connection()
      .then((db) => {
        const b =  db.collection(this.nameCollection).deleteOne({ _id: ObjectId(id) });
        return b;
      });
    console.log('deleteById', a);
    return a;
  }

  async findOneAndDelete(id) {
    const a = await connection()
      .then((db) => {
        console.log({ _id: ObjectId(id) });
        const b =  db.collection(this.nameCollection)
          .findOneAndDelete({ _id: ObjectId(id) });
        return b;
      });
    console.log('findOneAndDelete', a);
    return a;
  }

  async deleteByQuery(query) {
    // if (ObjectId(id)) 
    const a = await connection()
      .then((db) => {
        const b =  db.collection(this.nameCollection).deleteMany(query);
        return b;
      });
    console.log('deleteByQuery', a);
    return a;
  }
}

module.exports = DaoGenericMongoDB;