function map_key_to_name(key){
    for (let i=0; i<__log_key_value_map__.length;i++){
        if (__log_key_value_map__[i].key === key){
            return __log_key_value_map__[i].value;
        }
    }
    return "";
}