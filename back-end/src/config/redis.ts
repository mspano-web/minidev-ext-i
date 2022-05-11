const { createClient } = require("redis");
const Configuration = require("./config");

// --------------------------------------------------------------

// Singleton pattern
let instance: connectionRedis | null = null;

/**
 * Class that allows to establish and maintain the connection with Redis.
 */

class connectionRedis {
  private host: string;
  private port: string;
  private user: string;
  private password: string;
  private cfg: any;
  private clientRedis: any;

  // ---------------------------------------------

  constructor() {
    this.cfg = Configuration.getInstance();
    if (
      !this.cfg.iRedis.host ||
      !this.cfg.iRedis.port ||
      !this.cfg.iRedis.user ||
      !this.cfg.iRedis.password
    ) {
      throw new Error("Incorrect configuration in Redis");
    }
    this.host = this.cfg.iRedis.host;
    this.port = this.cfg.iRedis.port;
    this.user = this.cfg.iRedis.user;
    this.password = this.cfg.iRedis.password;
  }

  // ---------------------------------------------

  private async connect(): Promise<any> {
    try {
      const config = Configuration.getInstance();

      this.clientRedis = await createClient(
        {
          url: `redis://${config.iRedis.host}:${config.iRedis.port}`,
        }
      );
      await this.clientRedis.connect();
    } catch (e) {
      console.log("ERROR CONENCT REDIS: (", e, ")");
      throw e;
    }
    if (!this.clientRedis) throw new Error("Fail! - CONNECT REDIS");
  }

  public get ClientRedis(): any {
    if (!this.clientRedis) {
      throw new Error("Fail! - Get Client REDIS");
    }
    return this.clientRedis;
  }

  /**
   * Function that allows creating the only Connection Redis instance, or returning it if it had been previously created.
   * It allows to implement the singleton pattern.
   *
   * @returns Returns the only existing connection Postgres instance for the Minidev application
   */
  public static async getInstance(): Promise<connectionRedis> {
    if (!instance) {
      instance = new connectionRedis();
      instance.connect();
    }
    return instance;
  }
}

module.exports = connectionRedis;

// --------------------------------------------------------------
