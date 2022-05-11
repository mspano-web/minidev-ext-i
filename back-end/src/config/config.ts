/**
 *  config.ts : This file contains application properties.
 */

import {
  IDatabase,
  ISecurity,
  IWebServer,
  DEV,
  IRedis,
} from "../types/config.types";

/** Singleton pattern  */
let instance: Configuration | null = null;

/**
 *  The Configuration class contains the parameterization of the entire Minidev Extend I application.
 *  In the development environment it is obtained from the .env file. In the production environment,
 *  it is obtained from the configuration of the web server environment
 */

export class Configuration {
  private _iDatabase: IDatabase = {
    type: "",
    host: "",
    database: "",
    user: "",
    password: "",
    port: "",
  };
  private _iRedis: IRedis = { host: "", user: "", password: "", port: "" };
  private _iSecurity: ISecurity = { cors: "", key: "", cert: "" };
  private _iWebServer: IWebServer = { port: "", host: "" };
  private _env: string = "";
  private dotenvParsed: any;

  // ---------------------------------

  constructor() {
    this._env = process.env.NODE_ENV || DEV;
    if (this._env === DEV) {
      this.getEnvironmentDev();
    }
    this.setDatabase();
    this.setSecurity();
    this.setWebServer();
    this.setRedis();
  }

  /**
   *  Function to obtain the configuration of the development environment, from the .env file
   */

  private getEnvironmentDev() {
    const dotenv = require("dotenv");
    const result = dotenv.config();
    if (result.error) {
      throw new Error("Configuration - Gen Environment Dev Fail");
    }
    const { parsed } = result;
    this.dotenvParsed = parsed;
  }

  // ---------------------------------

  public get iDatabase() {
    return this._iDatabase;
  }

  public set iDatabase(oDatabase) {
    this._iDatabase = oDatabase;
  }

  public get iSecurity() {
    return this._iSecurity;
  }

  public set iSecurity(oSecurity) {
    this._iSecurity = oSecurity;
  }

  public get iWebServer() {
    return this._iWebServer;
  }

  public set iWebServer(oWebServer) {
    this._iWebServer = oWebServer;
  }

  public get env() {
    return this._env;
  }

  public set env(oEnv) {
    this._env = oEnv;
  }

  public get iRedis() {
    return this._iRedis;
  }

  public set iRedis(oRedis) {
    this._iRedis = oRedis;
  }

  /**
   * Function that establishes the Security configuration, from the .env file for the development environment; or from the context of the productive environment
   */
  setSecurity() {
    this.iSecurity = {
      // process.env allows you to access the system and obtain the environment variables.
      cors: this.env === "DEV" ? this.dotenvParsed.CORS : process.env.CORS,
      cert:
        this.env === "DEV" ? this.dotenvParsed.SSLCERT : process.env.SSLCERT,
      key: this.env === "DEV" ? this.dotenvParsed.SSLKEY : process.env.SSLKEY,
    };
    if (!this.iSecurity.cors || !this.iSecurity.cert || !this.iSecurity.key) {
      throw new Error("Configuration - Security Fail");
    }
  }

  /*
   * Function that establishes the database configuration, from the .env file for the development environment; or from the context of the productive environment
   */
  setDatabase() {
    this.iDatabase = {
      type:
        this.env === "DEV" ? this.dotenvParsed.DB_TYPE : process.env.DB_TYPE,
      host:
        this.env === "DEV" ? this.dotenvParsed.DB_HOST : process.env.DB_HOST,
      database:
        this.env === "DEV" ? this.dotenvParsed.DATABASE : process.env.DATABASE,
      user:
        this.env === "DEV" ? this.dotenvParsed.DB_USER : process.env.DB_USER,
      password:
        this.env === "DEV"
          ? this.dotenvParsed.DB_PASSWORD
          : process.env.DB_PASSWORD,
      port:
        this.env === "DEV" ? this.dotenvParsed.DB_PORT : process.env.DB_PORT,
    };
    if (
      !this.iDatabase.type ||
      !this.iDatabase.host ||
      !this.iDatabase.database ||
      !this.iDatabase.user ||
      !this.iDatabase.password
    ) {
      throw new Error("Configuration - Application Fail");
    }
  }

  /**
   * Function that establishes the Redisr configuration, from the .env file for the development environment; or from the context of the productive environment
   */

  setRedis() {
    this.iRedis = {
      host:
        this.env === "DEV"
          ? this.dotenvParsed.REDIS_HOST
          : process.env.REDIS_HOST,
      user:
        this.env === "DEV"
          ? this.dotenvParsed.REDIS_USER
          : process.env.REDIS_USER,
      password:
        this.env === "DEV"
          ? this.dotenvParsed.REDIS_PASSWORD
          : process.env.REDIS_PASSWORD,
      port:
        this.env === "DEV"
          ? this.dotenvParsed.REDIS_PORT
          : process.env.REDIS_PORT,
    };
    if (
      !this.iRedis.host || 
      !this.iRedis.user ||
      !this.iRedis.password ||
      !this.iRedis.port
    ) {
      throw new Error("Configuration - Application Fail");
    }
  }

  /**
   * Function that establishes the web server configuration, from the .env file for the development environment; or from the context of the productive environment
   */
  setWebServer() {
    this.iWebServer = {
      port: this.env === "DEV" ? this.dotenvParsed.PORT : process.env.PORT,
      host:
        this.env === "DEV"
          ? this.dotenvParsed.NODE_HOST
          : process.env.NODE_HOST,
    };
    if (!this.iWebServer.port || !this.iWebServer.host) {
      throw new Error("Configuration - WebServer Fail");
    }
  }

  /**
   * Function that allows creating the only Configuration instance, or returning it if it had been previously created.
   * It allows to implement the singleton pattern.
   *
   * @returns Returns the only existing configuration instance for the Minidev application
   */
  public static getInstance(): Configuration {
    if (!instance) {
      instance = new Configuration();
    }
    return instance;
  }
}

// --------------------------------------------------------------

module.exports = Configuration;

// --------------------------------------------------------------
