import mongoose from 'mongoose';
class DBService {
    static db = null;
    constructor() {
    }
    static connectionString(dbName = 'test') {
        return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${dbName}`
    }

    static connect(DBName) {
        return new Promise(async (resolve, reject) => {
            try {console.log(`connection string ${DBService.connectionString(DBName)}`);
                await mongoose.connect(DBService.connectionString(DBName)); // await on a step makes process to wait until it's done/ err'd out.
                DBService.db = mongoose.connection;
                resolve(this.db);
            } catch (error) {
                reject(error);
            }
        });
    }

    static disConnect(obj) {
        try {
            DBService.db.close();
        } catch (error) {
            console.log('db connection close error-->', error);
            throw error;
        }
    }

    static find(dataModel, query = {}) {
        return new Promise(async (resolve, reject) => {
            if (
                typeof dataModel.find === "undefined" ||
                typeof dataModel.find !== "function"
            ) {
                reject({
                    message: "Not a valid data model",
                });
            } else {
                try {
                    const response = await dataModel.find(query);
                    resolve(response);
                } catch (err) {
                    reject({
                        message: err.message,
                        status: err.code === 11000 ? 409 : 500,
                    });
                }
            }
        });
    }

    static save(dataModel) {
        return new Promise(async (resolve, reject) => {
            if (typeof dataModel.save === "undefined" || typeof dataModel.save !== "function") {
                reject({
                    message: "Not a valid data model",
                });
            } else {
                try {
                    let dbResp = await dataModel.save();
                    resolve(dbResp);
                } catch (err) {
                    console.log(err);
                    reject({ message: err.message, status: (err.code === 11000) ? 409 : 500 });
                }
            }
        });
    }

    static findAndDelete(dataModel, query = {}) {
        return new Promise(async (resolve, reject) => {
            if (
                typeof dataModel.delete === "undefined" ||
                typeof dataModel.find !== "function"
            ) {
                reject({
                    message: "Not a valid data model",
                });
            } else {
                try {
                    const response = await dataModel.find(query).remove();
                    resolve(response);
                } catch (err) {
                    reject({
                        message: err.message,
                        status: err.code === 11000 ? 409 : 500,
                    });
                }
            }
        });
    }
}
export default DBService;