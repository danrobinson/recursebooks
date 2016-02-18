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

// seq
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   }, function (err) { 
//     console.log('Unable to connect to the database:', err);
//   });

var Batch = seq.define('batch', {
  "batchId": {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  "end_date": {
    type: Sequelize.DATE
  },

});

var User = seq.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

User.belongsTo(Batch);

var Author = seq.define('author', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  }
});

var Tag = seq.define('tag', {
  name: {
    type: Sequelize.STRING,
  },
});

var Category = seq.define('category', {
  name: {
    type: Sequelize.STRING,
  },
});

var Title = seq.define('title', {
	name: {
    type: Sequelize.STRING
  },
});

Title.belongsTo(Category);
Title.belongsToMany(Tag, {as: 'tags', through: 'title_tags'});

var BookEdition = seq.define('book_edition', {
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

BookEdition.belongsToMany(Author, {through: 'book_authors'});
BookEdition.belongsTo(Title);

var Copy = seq.define('copy', {
});

Copy.belongsTo(BookEdition);
Copy.belongsTo(User, {as: 'donor'});

//loans are temporary and will be deleted after books are returned, while the events hist is maintainted
//
var Loan = seq.define('loan', {
});

Loan.belongsTo(User);
Loan.belongsTo(Copy);

var Event = seq.define('event', {
  eventType: {
    type: Sequelize.ENUM('deleted', 'donated', 'borrowed', 'returned')
  }
});

Event.belongsTo(User);
Event.belongsTo(Copy);

// seq.sync()

module.exports = {
  Batch: Batch,
  User: User,
  Title: Title,
  Copy: Copy,
  Tag: Tag,
  Category: Category,
  BookEdition: BookEdition,
  Event: Event,
  Loan: Loan,
  seq: seq

};

