import * as sqlite from 'sqlite3';

/**
 * Database caching class for caching json requests in a database temoporarily.
 */
export class DbCache {
 
    /**
     * Database.
     */
    private db: sqlite.Database;
    /**
     * Constructor for creating a db cache object. will create a database file if it does not exist.
     * 
     * @param fileName Specific file path, default is enviroment variable SQLITE_FILE or "database.sqlite"
     */
    constructor(fileName = process.env.SQLITE_FILE || "database.sqlite") {
        this.db = new sqlite.Database(fileName, () => {
            this.createTable();
        });
        this.db.configure("busyTimeout", 1000);
    }

    /**
     * Creates a new database table for database caching.
     */
    private createTable() {
        this.db.run(
            "CREATE TABLE IF NOT EXISTS `storage` (" +
            "`id` INTEGER PRIMARY KEY AUTOINCREMENT," +
            "`key` varchar(64)," +
            "`value` json," +
            "`expires` timestamp)"
        );
    }
    
    /**
     * This will get a entry from the database if it has not expired.
     * 
     * @param key Lookup storage key
     */
    public async get(key: string) {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.get('SELECT * FROM storage WHERE `key` = ?', [key], (err, row) => {
                    if (row) {
                        // console.log(row.value);
                        if(Date.now() / 1000 < row.expires) {
                            resolve(row.value);
                            return;
                        }
                        this.delete(row.id);
                    } 
                    resolve(undefined);
                });
            })
        })
    }
    /**
     * This will delete a index in the database.
     * 
     * @param id Id index in database to delete
     */
    private delete(id: number) {
        this.db.run(`DELETE FROM storage WHERE id=?`, id, (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Deleted expired index at id: ${id}`);
          });
    }

    /**
     * Stores a new json object in the database to be accessed 
     * for a specified amount of time before becomming invalid.
     * 
     * @param key The key to find the index by
     * @param value Json object array with values that should be stored.
     * @param ttl "Time to live" a number of milliseconds that this data is valid for.
     */
    public put(key: string, value: any, ttl: number = 0) {
        if (value.length > 0) {
            this.db.run(
                'INSERT INTO storage (key, value, expires) VALUES (?, ?, ?)', [
                key, value, (Date.now() + ttl) / 1000]
            );
        }
    }
}