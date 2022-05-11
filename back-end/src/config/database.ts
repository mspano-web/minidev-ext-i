/**
 *  database.ts : Establish connection to the Postgres database.
 */

import { DataSource } from "typeorm";
import { RetailOutlets } from "../entities/RetailOutlets";
import { Sales } from "../entities/Sales";
import { SalesPeople } from "../entities/SalesPeople";
const Configuration = require("./config");

// --------------------------------------------------------------

// Singleton pattern
let instance: ConnectPostgres | null = null;

/**
 * Class that allows to establish and maintain the connection with the Postgres database.
 */

class ConnectPostgres {
  private host: string;
  private user: string;
  private password: string;
  private database: string;
  private cfg: any;
  private _AppDataSource: DataSource | null;

  // ---------------------------------------------

  constructor() {
    this.cfg = Configuration.getInstance();
    if (
      !this.cfg.iDatabase.host ||
      !this.cfg.iDatabase.user ||
      !this.cfg.iDatabase.password ||
      !this.cfg.iDatabase.database
    ) {
      throw new Error("Database connection failure");
    }
    this.host = this.cfg.iDatabase.host;
    this.user = this.cfg.iDatabase.user;
    this.password = this.cfg.iDatabase.password;
    this.database = this.cfg.iDatabase.database;
    this._AppDataSource = null;
  }

  // ---------------------------------------------

  /**
   * Function that allows creating the connection pool from the pre-established configuration.
   */

  private async connect(): Promise<DataSource | void> {
    try {
      const config = Configuration.getInstance();
      this._AppDataSource = new DataSource({
        type: config.iDatabase.type,
        host: config.iDatabase.host,
        port: parseInt(config.iDatabase.port),
        username: config.iDatabase.user,
        password: config.iDatabase.password,
        database: config.iDatabase.database,
        synchronize: true,
        //logging: true,
        entities: [RetailOutlets, Sales, SalesPeople],
        migrations: [],
        subscribers: [],
      });
      this._AppDataSource
        .initialize()
        .then(() => {
          console.log("Data Source has been initialized!");
        })
        .catch((err) => {
          console.error("Error during Data Source initialization", err);
          throw err;
        });
    } catch (e) {
      console.log("Error during Data Source initialization", e);
      throw e;
    }
    if (!this._AppDataSource)
      throw new Error("Fail! - Data Source not initalized!");
  }

  public get AppDataSource(): DataSource | null {
    if (!this._AppDataSource) {
      throw new Error("Fail! - Data Source not initalized!");
    }
    return this._AppDataSource;
  }

  /**
   * Function that allows creating the only Connection Postgres instance, or returning it if it had been previously created.
   * It allows to implement the singleton pattern.
   *
   * @returns Returns the only existing connection mysql instance for the Minidev application
   */
  public static async getInstance(): Promise<ConnectPostgres> {
    if (!instance) {
      instance = new ConnectPostgres();
      await instance.connect();
    }
    return instance;
  }
}

module.exports = ConnectPostgres;

// --------------------------------------------------------------
