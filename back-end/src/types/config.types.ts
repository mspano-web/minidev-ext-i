// config.types.ts 
// --------------------------------------------------------------

// ----------------------------

export interface  IDatabase  {
    type: string,
    host: string,
    database: string, 
    user: string ,
    password: string,
    port: string
} 

// ----------------------------

export interface  IRedis  {
    host: string,
    user: string ,
    password: string,
    port: string
} 

// ----------------------------

export interface ISecurity {
    cors: string,
    key: string,
    cert: string
}

// ----------------------------

export interface IWebServer {
    port: string,
    host: string
}
 
// ----------------------------


// Basic configuration control ------------------------------------

export const DEV: string    = "DEV"       // NODE_ENV (shell) 

