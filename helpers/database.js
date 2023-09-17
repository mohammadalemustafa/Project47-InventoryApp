import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("products.db");

export function init() {
  const promise = new Promise((res, rej) => {
    database.transaction((trx) => {
      trx.executeSql(
        `CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                image TEXT NOT NULL,
                price REAL NOT NULL,
                description TEXT NOT NULL,
                category TEXT NOT NULL
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
}

export function insertData(product) {
  const promise = new Promise((res, rej) => {
    database.transaction((trx) => {
      trx.executeSql(
        `INSERT INTO products ( title,image,price,description,category ) VALUES (?,?,?,?,?)
           `,
        [product.title, product.image, product.price, product.description, product.category],
        (_, result) => {
          res(result);
        },
        (_, err) => rej(err)
      );
    });
  });

  return promise;
}

export function fetchData() {
  const promise = new Promise((res, rej) => {
    database.transaction((trx) => {
      trx.executeSql(
        `SELECT * FROM products`,
        [],
        (_, result) => {
          const output = result.rows._array;
          const resArr = [];
          for (const prod of output) {
            resArr.push({
              title: prod.title,
              image: prod.image,
              price: prod.price,
              description: prod.description,
              category: prod.category,
              id: prod.id,
            });
          }
          res(resArr);
        },
        (_, err) => {
          rej(err);
        }
      );
    });
  });

  return promise;
}

export function updateProduct(id, data) {
  const promise = new Promise((res, rej) => {
    database.transaction((trx) => {
      trx.executeSql(
        `UPDATE products SET title=?, price=?, description=? WHERE id=?`,
        [data.title, data.price, data.description, id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            res("Successfully Updated");
          } else {
            res("Updation Failed");
          }
        },
        (_, err) => {
          rej(err);
        }
      );
    });
  });

  return promise;
}

export function deleteProduct(id) {
  const promise = new Promise((res, rej) => {
    database.transaction((trx) => {
      trx.executeSql(
        `DELETE FROM products WHERE id=?`,
        [id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            res("Successfully Deleted");
          } else {
            res("Deletion Failed");
          }
        },
        (_, err) => {
          rej(err);
        }
      );
    });
  });
  return promise;
}
