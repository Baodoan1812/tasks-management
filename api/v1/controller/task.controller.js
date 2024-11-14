const Task = require("../models/tasks.model");
const helperPagination= require("../../../helper/pagination.helper")
const helperSearch= require("../../../helper/search");
const { model } = require("mongoose");
module.exports.index= async(req,res)=>{
    try {
        const find={
            $or:[
                {create_user_id:req.user.id},
                {participants:req.user.id}
            ],
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
        // const tasks=await Task.find(find); 
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
module.exports.changeStatus= async(req,res)=>{
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
module.exports.changeMulti= async(req,res)=>{
    try {
        const ids= req.body.ids;
    const key= req.body.key;
    switch (key) {
        case "status":
            await Task.updateMany({_id:ids},{status:req.body.value})
            res.json({
                code:"200",
                message:"Cap nhanh thanh cong"
            });
            break;
        case "delete":
            await Task.updateMany({_id:ids},{deleted:true})
            res.json({
                code:"200",
                message:"Xoa thanh cong"
            });
        default:
            break;
    }
    } catch (error) {
        res.json({
            code:"404",
            message:"Cap nhanh khong thanh cong"
        });
    }
}
module.exports.create= async (req,res)=>{
    try {
        req.body.create_user_id=req.user.id;
        const task= new Task(req.body);
    await task.save();
    res.json({
        code:"200",
        message:"Tao thanh cong"
    });
    } catch (error) {
        res.json({
            code:"404",
            message:"Tao khong thanh cong"
        });
    }
}
module.exports.edit= async (req,res)=>{
    try {
        const id= req.params.id;
    await Task.updateOne({_id:id},req.body);
    res.json({
        code:"200",
        message:"Cap nhat thanh cong"
    })
    } catch (error) {
        res.json({
            code:"404",
            message:"Cap nhat khong thanh cong"
        })
    }
}
module.exports.delete= async(req,res)=>{
    await Task.updateOne({_id:req.params.id},{deleted:true})
    res.json({
        code:"200",
        message:"Xoa thanh cong"
    })
}