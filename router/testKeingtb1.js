const executeQuery= require('../db/executeQuery');
var util = require('util');
var _ = require('lodash');
var ResultCode = require('../ResultCode.js');

//test proc
const sql = require('mssql');
var config=require('../db/db.js');

testKeingtb1Controller=function(req,res){
    var request = req.body;
    var data={success: false};

    switch (request.act) {
        case "GetAllTb1":
            GetAllTable1(res);
            break;
        case "GetTb1ById":
            GetTb1ById(request,res);
            break;  
        case "GetRecordById":
            GetRecordById(res,request);
            break;
        case "UpdateRecord":
            UpdateRecord(res,request);
            break;
        case "DeleteRecordById":
            DeleteRecordById(res,request);
            break;
        case "AddRecord":
            AddRecord(res,request);
            break;
        case "procAdd":
            procAdd(res,request);
            break;
        case "testAsync":
            testAsync(res);
            break;
        case "GetTest1":
            GetTest1(res);
            break;
        default:
        res.status(405).send({
            success: false,
            message: 'Status 405: Method not supported.'
        });
            break;
    }
}
async function GetUserById(res,_request){
    try {
        console.log("_request",_request);
        var _id=_request.id;
        if(_id){
            var query=util.format("select * from admin_account where id='%d'",_id);
            var result =  await executeQuery.AsyncQuery(query);
            res.json(result);
            console.log('result',result);
        }else{
            res.json({succees:false,Code:ResultCode.ERR_ID_EMPTY});
        }
    } catch (error) {
        res.json(error);
    }
}

/**
 * @api {post} /api/user/ Request User information
 * @apiName DeleteRecord
 * @apiGroup User
 *
 * @apiParam {string} act Method Action.
 * @apiParam {string} id Users unique ID.
 *
 * @apiSuccess {String} success:true Request success.
 * @apiSuccess {String} data  Data from query.
 */
function DeleteRecordById(res,_request){
    var _id=_request.id;
    if(_id)
        {
            var query =util.format(
                "delete from table1 "+
                "where id='%s'",
                _id);
            // Return if can do query or not
            executeQuery.Query(query).then(success=>{console.log(success);
                res.json(success);
            }).catch(error=>{
                res.json(error);
            })
        }
        else
    {
        res.json({succees:false,Code:ResultCode.ERR_ID_EMPTY});
    }   
}
function AddRecord(res,_request){
    if(_request)
        {
            var query =util.format(
            "INSERT INTO table1([uname],[upass],[ten]) "+
            "VALUES ('%s','%s',N'%s')",
            _request.uname,_request.upass,_request.ten);

            // Return if can do query or not
            executeQuery.Query(query).then(success=>{console.log(success);
                res.json(success);
            }).catch(error=>{
                res.json(error);
            })
        }
        else
    {
        res.json({succees:false,Code:ResultCode.ERR_ID_EMPTY});
    }
}

function UpdateRecord(res,_request){
    var _uname=_request.uname;
    var _upass=_request.upass;
    var _ten=_request.ten;
    var _id=_request.id;

    var query =util.format(
    "UPDATE table1 "+
    "SET uname = '%s', upass = '%s', ten=N'%s' "+
    "WHERE id='%s'",
    _uname,_upass,_ten,_id);
    
    // Return if can do query or not
    executeQuery.Query(query).then(success=>{
        res.json(success);
    }).catch(error=>{
        res.json(error);
    })
}

function procAdd(res,_request){
    if(_request)
        {
            sql.connect(config).then(pool => {
                // Stored procedure
                return pool.request()
                .input('param1', sql.VarChar(50), 'asd')
                //.output('aaaa', sql.VarChar(50))
                .execute('proctes')
            }).then(result => {
                var rs={
                    success: true,
                    data: {recordsets:result.recordsets,rowsAffected:result.rowsAffected}
                }
                    console.log(result.recordsets);
                
                //{recordsets:result.recordsets,rowsAffected:result.rowsAffected}
            }).catch(err => {
                // ... error checks
                console.dir(err)
            })
        }
        else
    {
        res.json({succees:false,Code:ResultCode.ERR_ID_EMPTY});
    }
}
async function GetAllTable1(res){
    try {
        // var query='select * from ChatLuongGiaoDuc';
        var query='select * from table1';
        var result =  await executeQuery.AsyncQuery(query);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
}

async function GetTb1ById(req,res){
    try {
        // var _uname=req.username;
        // var _upwd=req.pwd;
        var _uid=req.id;
        var query=util.format("select * from table1 where id=%s",_uid);
        var result =  await executeQuery.AsyncQuery(query);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
}


async function GetRecordById(res,_request){
    try {
        var _id=_request.id;
        if(_id){
            var query=util.format("select * from ChatLuongGiaoDuc where ngaytao='%s'",_id);
            var result =  await executeQuery.AsyncQuery(query);
            // var _RowsAffected= result.data.RowsAffected;//[ Value ]
            // var _NumberRowsAffected=parseInt(_RowsAffected); // NumberValue
            res.json(result);
            console.log('result',result);
        }else{
            res.json({succees:false,Code:ResultCode.ERR_ID_EMPTY});
        }
    } catch (error) {
        res.json(error);
    }
}
module.exports = testKeingtb1Controller