const executeQuery= require('../db/executeQuery');
var util = require('util');
var _ = require('lodash');
var ResultCode = require('../ResultCode.js');

//test proc
const sql = require('mssql');
var config=require('../db/db.js');

userController=function(req,res){
    var request = req.body;
    var data={success: false};

    console.log(request);
    switch (request.act) {
        case "GetAll":
            GetAllRecord(res);
            break;
        case "UserInfo":
            GetUserInfo(request,res);
            break;  
        case "GetUserById":
            GetUserById(res,request);
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

// function GetRecordById(res,_request){
//     var _id=_request.id;
//     if(_id)
//         {
//             var query =util.format(
//                 "select * "+
//                 "from ChatLuongGiaoDuc "+
//                 "where machatluonggiaoduc='%s'",
//                 _id);
//             // Return if can do query or not
//             executeQuery.Query(query).then(success=>{console.log(success);
//                 res.json(success);
//             }).catch(error=>{
//                 res.json(error);
//             })
//         }
//         else
//     {
//         res.json({succees:false,Code:ResultCode.ERR_ID_EMPTY});
//     }        
// }

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

function UpdateRecord(res,_request){
    var tenhienthi=_request.tenhienthi;
    var tieude=_request.tieude;
    var id=_request.id;

    var query =util.format(
    "UPDATE ChatLuongGiaoDuc "+
    "SET tenhienthi = N'%s', tieude = N'%s' "+
    "WHERE machatluonggiaoduc='%s'",
    tenhienthi,tieude,id);
    
    // Return if can do query or not
    executeQuery.Query(query).then(success=>{
        res.json(success);
    }).catch(error=>{
        res.json(error);
    })
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
                "delete from ChatLuongGiaoDuc "+
                "where machatluonggiaoduc='%s'",
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
                "INSERT INTO ChatLuongGiaoDuc ( "+
                "[tieude],"+
                "[tenhienthi],"+
                "[mangonngu],"+
                "[ngaytao],"+
                "[ngaycapnhat],"+
                "[id], [maloai]) "+
            "VALUES ( N'%s', N'%s', N'%s', '%s', '%s', NULL, 1)",
        _request.tieude,
        _request.tenhienthi,
        _request.mangonngu,
        _request.ngaytao,
        _request.ngaycapnhat);
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
async function GetAllRecord(res){
    try {
        // var query='select * from ChatLuongGiaoDuc';
        var query='select * from admin_account';
        var result =  await executeQuery.AsyncQuery(query);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
}

async function GetUserInfo(req,res){
    try {
        var _uname=req.username;
        var _upwd=req.pwd;
        var query=util.format
        ("select * from admin_account where username='%s' and password='%s'",_uname,_upwd);
        // var query=util.format("select * from admin_account");
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
module.exports = userController