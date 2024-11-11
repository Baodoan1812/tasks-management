module.exports =(query)=>{
    let object={
      keyword:"", 
    } 
    if(query.keyword)
    {
        object.keyword=query.keyword;
        const re = new RegExp(object.keyword,"i");
        object.regex=re;
    }
    return object;
}