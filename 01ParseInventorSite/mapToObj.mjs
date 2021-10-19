const mapToObj = function(m){
    return Array.from(m).reduce( (obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
}

export {mapToObj};