const checkNotNull = (data) => {
    if(data == null || data == undefined || data == "")
    {
        return false; //if null
    } else {
        return true; //if not null
    }
};

module.exports = {checkNotNull};