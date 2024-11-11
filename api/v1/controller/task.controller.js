const Task = require("../models/tasks.model");
const helperPagination= require("../../../helper/pagination.helper")
const helperSearch= require("../../../helper/search");
const { model } = require("mongoose");
module.exports.index= async(req,res)=>{
    try {
        const find={
            deleted:false
        }
        const object=helperSearch(req.query);
        let keyword=object.keyword;
        if(object.regex)
        find.title=object.regex;

        if(req.query.status){
            find.status= req.query.status
        }
        let sort={
            title: 'asc'
        }
        let sortKey;
        let sortValue;
        if(req.query.sortKey&&req.query.sortValue){
            sortKey=req.query.sortKey;
            sortValue=req.query.sortValue;
            delete sort.title;
            sort[`${sortKey}`]=sortValue
        }
        let objectPagination={
            limitItem: 2,
            currentPage: 1
        }
        const totalItem= await Task.countDocuments({deleted:false})
        objectPagination= helperPagination(objectPagination,req.query,totalItem);
        const tasks= await Task.find(find).skip(objectPagination.skipIndex).limit(objectPagination.limitItem).sort(sort)
        res.json(tasks);
    } catch (error) {
        res.json("Khong tim thay")
    }
    
};
module.exports.detail= async(req,res)=>{
    try {
        const task= await Task.findOne({deleted:false,_id:req.params.id})
    res.json(task);
    } catch (error) {
        res.json("Ko tim thay")
    }
    
};
module.exports.editPatch= async(req,res)=>{
    try {
        await Task.updateOne({_id:req.params.id},{status:req.body.status});
    res.json({
        code: 200,
        message:"Cap nhat thanh cong"
    })
    } catch (error) {
        res.json({
            code: 404,
            message:"Cap nhat khong thanh cong"
        })
    }
}