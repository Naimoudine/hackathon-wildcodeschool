const AbstractRepository = require("./AbstractRepository");

class EventRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "event" as configuration
    super({ table: "event" });
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  async create(event) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (title, description, calendar, user_id, is_validated) values (?, ?, ?, ?, ?)`,
      [
        event.title,
        event.description,
        event.calendar,
        event.userId,
        event.isValidated,
      ]
    );
    return rows.insertId;
  }

  async update(id, isValidated) {
    const [rows] = await this.database.query(
      `update ${this.table} SET is_validated = ? where id = ?`,
      [isValidated, id]
    );

    return rows;
  }
}

module.exports = EventRepository;
