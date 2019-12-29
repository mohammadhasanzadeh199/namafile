let features_value_collection = [];

function add_function_value( log ) {
    for (let i=0; i<log.length;i++) {
        let index = -1;
        for (let j=0; j<features_value_collection.length;j++){
            if (features_value_collection[j].key === log[i].key){
                index = j;
                break;
            }
        }
        if (index >= 0){
            features_value_collection[index].element.find(".name").text(map_key_to_name(log[i].key));
            features_value_collection[index].element.find(".value").text(log[i].value);
        }else{
            let element = $("#featuresValue table tr.source").clone(); 
            element.insertAfter("#featuresValue table tr.source");
            features_value_collection.push({
                element: element,
                key: log[i].key
            });
        }
    }
    for (let i=0;i<features_value_collection.length;i++){
        let index = -1;
        for (let j=0;j<log.length;j++){
            if (features_value_collection[i].key===log[j].key){
                index = j;
                break;
            }
        }
        if (index>=0){
            features_value_collection[i].element.remove();
            features_value_collection.splice(index,1)
        }
    }
}