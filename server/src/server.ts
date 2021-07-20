/**
 * Required External Modules
 */

 import * as path from 'path';
 import express from 'express';
 import bodyParser from 'body-parser';
 import exphbs from 'express-handlebars';
 import cors from 'cors';

 import { socketIO } from './utils/websocket';
 import db from './database/models/index';

import indexRoutes from './routes'

class Server {
  app: express.Express;
  port:string;
  http;

  constructor(){
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.http = require('http').Server(this.app);

    // Middlewares
    this.middlewares();

    // View Engine
    this.views();

    // Styles
    this.styles();

    // Database
    this.database();

    // Routes
    this.routes();

    // WebSocket
    this.webserver();
  }

  /**
   *  App Configuration
   */
  middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
  }

  /**
   * Views
   */
  views(){
    this.app.set('view engine', 'hbs');
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.engine('hbs', exphbs({
      layoutsDir: path.join(__dirname, 'views/layouts'),
      partialsDir: path.join(__dirname, 'views/state'),
      defaultLayout:'index',
      extname: 'hbs'
    }));

  }

  /**
   * Styles
   */
  styles(){
    this.app.use('/css', express.static( path.join(__dirname, '../node_modules/bootstrap/dist/css') ));
    this.app.use('/js', express.static( path.join(__dirname, '../node_modules/bootstrap/dist/js') ));
  }

  /**
   * Routes
   */
  routes(){

    this.app.get('/', (req, res) => {
      res.render('main', {
        title: 'Welcome'
      })
    });

    this.app.get('/create', (req, res) => {
      res.render('state/create', {
        title: 'States Management'
      });
    })

    this.app.get('/search', (req, res) => {
      res.render('state/search', {
        title: 'States searcher'
      });
    })

    this.app.use('/api', indexRoutes);

    this.app.get('*', (req, res) => {
      res.render('404', {layout: 'error'});
    })

  }

  /**
   * Database connection
   */
  database(){
    db.sequelize
      .authenticate()
      .then(() => {
        // tslint:disable-next-line: no-console
        console.info('\x1b[32m', `[MySQL] Connected`)
      })
      .catch((err) => {
        // tslint:disable-next-line: no-console
        console.error('\x1b[31m', '[MySQL] Can not Connect', err);
      });
  }

  /**
   * Web Server connection
   */
  webserver(){
    socketIO(this.http);
  }

  /**
   * Server Activation
   */
  listen() {
    this.http.listen( this.port, () => {
      // tslint:disable-next-line: no-console
      console.info('\x1b[32m', `[INFO] MM API Listening on port ${this.port}`);
    });
  }

}

export = Server;
