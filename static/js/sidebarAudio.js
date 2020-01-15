function render_audio_features_checkbox() {
    $("#sideBarAudio .feature:not(.source)").remove();
    let data = __log_key_value_map__;
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "audio"){
            let element = $("#sideBarAudio .feature.source").clone();
            element.attr("key",data[i].key);
            element.removeClass("source");
            element.find(".nama-icon-pack").html(data[i].icon);
            element.find("h6").text(data[i].value);
            element.click(function(){
                on_af_checkbox_click(element)
            })
            element.find("input").change(function(){
                on_af_checkbox_change(element);
            })
            element.insertBefore("#sideBarAudio .feature.source");
        }
    }
}

function on_af_checkbox_click(element){
    element.find("input").click();
}


$("#sideBarAudio .select-all").click(function(){
    let isAllSelected = true;
    for (let i=0; i<__log_key_value_map__.length; i++){
        if (__log_key_value_map__[i].type === "audio" && !__global_features_list__.includes(__log_key_value_map__[i].key)){
            isAllSelected = false;
            break;
        }
    }
    $(this).find("input").click();
    for (let i=0; i<__log_key_value_map__.length; i++){
        if ( isAllSelected && __log_key_value_map__[i].type === "audio" && __global_features_list__.includes(__log_key_value_map__[i].key)){
            $("#sideBarAudio .feature[key|='"+__log_key_value_map__[i].key+"']").click();
        } else if ( !isAllSelected && __log_key_value_map__[i].type === "audio" && !__global_features_list__.includes(__log_key_value_map__[i].key)){
            $("#sideBarAudio .feature[key|='"+__log_key_value_map__[i].key+"']").click();
        }
    }

})


function on_af_checkbox_change(element){
    let id = element.attr("key");
    if (element.find("input").prop("checked") && !__global_features_list__.includes(id)){
        __global_features_list__.push(id);
    } else if (!element.find("input").prop("checked") && __global_features_list__.includes(id)){
        __global_features_list__.splice(__global_features_list__.indexOf(id),1);
    }
    console.log(__global_features_list__)
    if (!element.find("input").prop("checked") && $("#sideBarAudio .select-all input").prop("checked")){
        $("#sideBarAudio .select-all input").click();
    }
}

render_audio_features_checkbox();