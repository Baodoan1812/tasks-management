module.exports =(objectPagination,query,totalItem)=>{
    if(query.page)
        {
            objectPagination.currentPage=parseInt(query.page);
        }
    if(query.limit)
        {
            objectPagination.limitItem=parseInt(query.limit);
        }
        objectPagination.skipIndex = (objectPagination.currentPage - 1) * objectPagination.limitItem;
        const totalPage=Math.ceil(totalItem/objectPagination.limitItem);
        objectPagination.totalPage=totalPage;
    return objectPagination;    
}