import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("users.db");

const initializeUserTable = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((trx) => {
      trx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY NOT NULL,
                username TEXT NOT NULL,
                role TEXT NOT NULL,
                password TEXT NOT NULL,
                email TEXT NOT NULL
            )`,
        [],
        () => {
          res();
        },
        (_, err) => {
          rej(err);
        }
      );
    });
  });

  return promise;
};

const addUser = (username, password, email, role) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (username, password, email,role) VALUES (?, ?, ?,?)",
        [username, password, email, role],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users",
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

const updateInventoryItem = (itemId, role) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "UPDATE users SET role=? WHERE id=?",
          [role, itemId],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      null,
      null
    );
  });
};

export { initializeUserTable, addUser, getAllUsers, updateInventoryItem };
