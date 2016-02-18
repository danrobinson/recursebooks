var Sequelize = require("sequelize");

console.log(process.env.RECURSE_DB);
console.log(process.env.RECURSE_DB_USERNAME);
console.log(process.env.RECURSE_DB_PASSWORD);

var seq = new Sequelize(process.env.RECURSE_DB, process.env.RECURSE_DB_USERNAME, "badPassword", {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    freezeTableName: true,
    underscored: true,
    underscoredAll: true
  }
});

/*
seq
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });
*/

var Batch = sequelize.define('batch', {
  "id": {

  },
  "end_date": {
    type: Sequelize.DATE
  },

});

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  batch: {

  }
});

var Author = sequelize.define('author', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  }
});

var Tag = sequelize.define('tag', {
  name: {
    type: Sequelize.STRING,
  },
});

var Title = sequelize.define('title', {
	name: {
    type: Sequelize.STRING
  },
});

Title.belongsTo(Tag, {as: 'category'});
Title.belongsToMany(Tag, {as: 'tags', through: 'title_tags'});

var Book = sequelize.define('book', {
  isbn: {
    type: Sequelize.STRING
  },
  coverURL: {
    type: Sequelize.STRING
  },
  edition: {
    type: Sequelize.STRING
  }
});

Book.belongsToMany(Author);
Book.belongsTo(Title);

var Copy = sequelize.define('copy', {
});

Copy.belongsTo(Book);
Copy.belongsTo(User, {as: 'donor'});





