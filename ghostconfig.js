// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

require('./ghostHelpers')();

var path = require('path'),
	config;

config = {
	// ### Production
	// When running Ghost in the wild, use the production environment
	// Configure your URL and mail settings here
	production: {
		url: 'http://infocinc.com/blog',
		mail: {},
		database: {
			client: 'postgres',
			connection: {
				host: process.env.POSTGRES_HOST,
				user: process.env.POSTGRES_USER,
				password: process.env.POSTGRES_PASSWORD,
				database: process.env.POSTGRES_DATABASE,
				port: '5432'
			},
			debug: false
		},
		fileStorage: false,
		server: {
			// Host to be passed to node's `net.Server#listen()`
			host: '0.0.0.0',
			// Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
			port: process.env.PORT
		},
		paths: {
			contentPath: path.join(__dirname, '/content/')
		}
	},

	// ### Development **(default)**
	development: {
		// The url to use when providing links to the site, E.g. in RSS and email.
		// Change this to your Ghost blogs published URL.
		url: 'http://192.168.1.5:3000/blog',

		// Example mail config
		// Visit http://support.ghost.org/mail for instructions
		// ```
		//  mail: {
		//      transport: 'SMTP',
		//      options: {
		//          service: 'Mailgun',
		//          auth: {
		//              user: '', // mailgun username
		//              pass: ''  // mailgun password
		//          }
		//      }
		//  },
		// ```

		database: {
			client: 'mysql',
			connection: {
				host     : '127.0.0.1',
				user     : 'root',
				password : 'root',
				database : 'ghost_db',
				charset  : 'utf8'
			},
			debug: false
		},
		server: {
			// Host to be passed to node's `net.Server#listen()`
			host: '192.168.1.5',
			// Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
			port: '3000'
		},
		paths: {
			contentPath: path.join(__dirname, '/content/')
		}
	}

	// **Developers only need to edit below here**

	// ### Testing
	// Used when developing Ghost to run tests and check the health of Ghost
	// Uses a different port number
/*
	testing: {
		url: 'http://127.0.0.1:2369',
		database: {
			client: 'sqlite3',
			connection: {
				filename: path.join(__dirname, '/content/data/ghost-test.db')
			}
		},
		server: {
			host: '127.0.0.1',
			port: '2369'
		},
		logging: false
	},
*/

	// ### Testing MySQL
	// Used by Travis - Automated testing run through GitHub
/*
	'testing-mysql': {
		url: 'http://127.0.0.1:2369',
		database: {
			client: 'mysql',
			connection: {
				host     : '127.0.0.1',
				user     : 'root',
				password : '',
				database : 'ghost_testing',
				charset  : 'utf8'
			}
		},
		server: {
			host: '127.0.0.1',
			port: '2369'
		},
		logging: false
	},

	// ### Testing pg
	// Used by Travis - Automated testing run through GitHub
	'testing-pg': {
		url: 'http://127.0.0.1:2369',
		database: {
			client: 'pg',
			connection: {
				host     : '127.0.0.1',
				user     : 'postgres',
				password : '',
				database : 'ghost_testing',
				charset  : 'utf8'
			}
		},
		server: {
			host: '127.0.0.1',
			port: '2369'
		},
		logging: false
	}
*/
};

// Export config
module.exports = config;