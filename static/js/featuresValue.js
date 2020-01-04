let features_value_collection = [];

function show_features_value( log ) {
    for (let i=0; i<log.length;i++) {
        if (__global_features_list__.includes(log[i].key)){
            let index = -1;
            for (let j=0; j<features_value_collection.length;j++){
                if (features_value_collection[j].key === log[i].key){
                    index = j;
                    break;
                }
            }
            if (index >= 0){
                $("#featuresValue table tr."+features_value_collection[index].elementClass).find(".name").text(map_key_to_name(log[i].key));
                $("#featuresValue table tr."+features_value_collection[index].elementClass).find(".value").text(log[i].value);
            }else{
                console.log("start")
                let element = $("#featuresValue table tr.source").clone(); 
                element.addClass("fv-"+log[i].key)
                element.removeClass("source");
                element.find(".name").text(map_key_to_name(log[i].key));
                element.find(".value").text(log[i].value);
                element.insertBefore("#featuresValue table tr.source");
                let obj = {
                    elementClass: "fv-"+log[i].key,
                    key: log[i].key
                };
                features_value_collection.push(obj);
                console.log("end",element,features_value_collection,obj);
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
            if ( index == -1 ){
                $("#featuresValue table tr."+features_value_collection[i].elementClass).remove();
                features_value_collection.splice(index,1);
            }
        }
    }
}