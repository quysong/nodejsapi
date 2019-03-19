var sql = require("mssql");
var db = require("./db");
var execute = {
    async AsyncQuery(query) {
        try {
            let pool = await sql.connect(db);
            //var pool = await sql.connect(db);
            // console.log('query',query);
            // var pool = await new sql.ConnectionPool(db);
            // var request = await new sql.Request(pool).query(query);
            // console.log('request1',request);
            // //pool.close();
            // console.log('request2',request);

            let resultQuery = await pool.request().query(query);
            var result={
                success: true,
                data: { 
                    "RowsAffected": resultQuery.rowsAffected,
                    "Recordsets": resultQuery.recordset,
                }
            }
            sql.close();

// console.log("recordsets",recordsets);

            return(result);


            //pool.close();
            // Stored procedure
            
            // let result2 = await pool.request()
            //     .input('input_parameter', sql.Int, value)
            //     .output('output_parameter', sql.VarChar(50))
            //     .execute('procedure_name')
        } catch (err) {
            console.log('err',err);
            var result={
                'Success': false,
                'Error': err
            }
             console.log('err',result);  return(result);
             //pool.close();
        }
    },
      Query(query) {
        return new Promise(function (resolve, reject) {
            sql.connect(db, function (err) {
                if (err) {
                    console.log("Error while connecting database :- " + err);
                    reject({ success: false, error: err })
                }
                else {
                    // create Request object
                    var request = new sql.Request();
                    // query to the database
                    request.query(query, function (_err, result) {
                        if (_err) {
                            // console.log("Error while querying database :- " + err);
                            reject({
                                success: false,
                                error: _err
                            });
                            sql.close();
                        }
                        else {
                            resolve({
                                success: true,
                                data: { recordsets: result.recordsets, rowsAffected: result.rowsAffected }
                            });
                            sql.close();
    
                        }
                    });
                }
            });
        })
    },
    
    Proc (query) {
        return new Promise(function (resolve, reject) {
            sql.connect(db, function (err) {
                if (err) {
                    console.log("Error while connecting database :- " + err);
                    reject({ success: false, error: err })
                }
                else {
                    // create Request object
                    var request = new sql.Request();
                    // query to the database
                    request.input('param1', sql.VarChar(50), 'asd')
                        //.output('aaaa', sql.VarChar(50))
                        .execute('proctes').then(success => {
                            console.log(result.recordsets);
                            var rs = {
                                success: true,
                                data: { recordsets: result.recordsets, rowsAffected: result.rowsAffected }
                            }
                        }).catch(error => {
                            console.error(err)
                        })
                }
            });
        })
    }
}

module.exports = execute