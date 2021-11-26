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
  const queryParams = [];
  let queryString = `
      SELECT properties.*, avg(property_reviews.rating) as average_rating
      FROM properties
      JOIN property_reviews ON properties.id = property_id
  `;

  // Function to add the correct prefix in front of the current option's queryString
  let firstOption = true;
  const queryPrefix = () => {
    if (firstOption) {
      firstOption = false;
      queryString += 'WHERE';
      return;
    }
    queryString += 'AND';
  };

  // If city is provided, add city condition to query
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryPrefix();
    queryString += ` city LIKE $${queryParams.length} `;
  }

  // If minimum per night is provided, add minimum price condition to query
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryPrefix();
    queryString += ` cost_per_night >= $${queryParams.length} `;
  }

  // If maximum per night is provided, add maximum price condition to query
  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryPrefix();
    queryString += ` cost_per_night <= $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryPrefix();
    queryString += ` properties.owner_id = $${queryParams.length} `;
  }

  queryString += ' GROUP BY properties.id ';

  // If minimum rating is provided, add minimum rating condition to query
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  // Order by cost, and limit the search results to the limit provided
  // defaulted to 10.
  queryParams.push(limit);
  queryString += `
      ORDER BY cost_per_night
      LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);
};

exports.getAllProperties = getAllProperties;

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
};
exports.addProperty = addProperty;