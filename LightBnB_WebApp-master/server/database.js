const properties = require('./json/properties.json');
const users = require('./json/users.json');
const {
  Pool
} = require('pg');

const pool = new Pool({
  user: 'jonsu',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

pool.connect(() => {
  console.log('Connected to the database');
});


/// Users

/**
 * Get a single user from the database given their email.
 */
const getUserWithEmail = function (email) {
  const queryString = `SELECT * FROM users WHERE users.email = $1`;
  const values = [email];

  return pool
    .query(queryString, values)
    .then((result) => {
      if (result.rows) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getUserWithEmail = getUserWithEmail;

// Get a single user from the database given their id.

const getUserWithId = function (id) {
  const queryString = `SELECT * FROM users WHERE users.id = $1`;
  const values = [id];

  return pool
    .query(queryString, values)
    .then((result) => {
      if (result.rows) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.error('query error', err);
    });
};
exports.getUserWithId = getUserWithId;

// Add a user to the Database.

const addUser = function (user) {

  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [user.name, user.email, user.password];

  return pool
    .query(queryString, values)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.error('query error', err);
    });

};
exports.addUser = addUser;

/// Reservations


// Get all reservations for a single user.

const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `
  SELECT reservations.*, properties.*
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  WHERE guest_id = $1
  LIMIT $2;
  `;
  const values = [guest_id, limit];
  return pool
    .query(queryString, values)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.error('query error', err);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.error('query error', err);
    });
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;