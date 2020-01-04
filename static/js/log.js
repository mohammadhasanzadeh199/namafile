let history_obj = [];

function history_obj_creator(){
    for (let i=0; i<__global_features_list__.length; i++){
        history_obj.push({
            key: __global_features_list__[i],
            start: 0,
            error_border: null,
            end: 0,
            storage: []
        })
    }
}

function add_error_logs(){
    log_extractor(0,20).then(function(result){
        console.log(result);

        for (let i=0; i<result.length; i++){
            fe_add_barcode_data(result[i].key,result[i].start,result[i].end)
            let element = $("#errorLog .scroll-controler .source").clone();
            element.removeClass("source");
            element.find(".name").text(map_key_to_name(result[i].key));
            element.find(".start").text(result[i].start);
            element.find(".end").text(result[i].end);
            element.find(".duration").text(result[i].end-result[i].start);
            element.insertAfter("#errorLog .scroll-controler .source")
        }
    })
}

function log_extractor(start_time, num_of_data){
    let result = [];
    let bridge_func = function(returend_data){
        if (num_of_data>=0){
            forward_error_data_proccess(returend_data);
            let goOn = true;
            while (goOn){
                let new_result = collect_error_data(JSON.parse(JSON.stringify(result)));
                if (new_result.length>=Math.abs(num_of_data)||new_result.length == result.length){
                    goOn = false;
                }
                result = new_result;
            }
            if (result.length < Math.abs(num_of_data)){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    return new Promise(function(resolve,reject){
        remote_get_data_from_db(start_time,bridge_func,num_of_data < 0).then(function(staus){
            resolve(result);
        });
    });
}

function forward_error_data_proccess(returend_data){
    for (let i=0; i<returend_data.data.length; i++){
        let index = -1;
        for (let j=0; j<history_obj.length; j++){
            if (returend_data.data[i].key == history_obj[j].key){
                index = j;
            }
        }
        if ( index >=0 ){
            if ( returend_data.data[i].value > 0.4 && history_obj[index].error_border == null ){
                history_obj[index].error_border = returend_data.data_time;
            } else if (returend_data.data[i].value >= 0.4 && returend_data.data_time - history_obj[index].error_border >= __log_waiting_time__ ) {
                history_obj[index].storage.push({
                    start:history_obj[index].error_border,
                    end: returend_data.data_time,
                });
                history_obj[index].error_border = null;
            } else if (returend_data.data[i].value < 0.4 && history_obj[index].error_border != null){
                history_obj[index].storage.push({
                    start:history_obj[index].error_border,
                    end: returend_data.data_time,
                });
                history_obj[index].error_border = null;
            }
        }
    }
}

function collect_error_data(result) {
    let closest_time = null;
    let closest_position = null;
    for (let i=0; i<history_obj.length; i++){
        if (closest_time == null || (history_obj[i].error_border != null && closest_time > history_obj[i].error_border)){
            closest_time = history_obj[i].error_border;
            closest_position = null;
        }
        for (let j=0; j<history_obj[i].storage.length; j++){
            if (history_obj[i].storage[j].start <= closest_time ){
                closest_time = history_obj[i].storage[j].start;
                closest_position = [i,j];
            }
        }
    }
    if (closest_position != null){
        result.push({
            key:history_obj[closest_position[0]].key,
            start:history_obj[closest_position[0]].storage[closest_position[1]].start,
            end: history_obj[closest_position[0]].storage[closest_position[1]].end
        });
        history_obj[closest_position[0]].storage.splice(closest_position[1],1);
    }
    return result;
}