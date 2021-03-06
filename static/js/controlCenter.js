$("#main_video_player").css("height",$("#main_video_player").width()*9/16);

$("#videoInput").change(function(){ 
    let src = URL.createObjectURL(document.getElementById('videoInput').files[0]);
    $("video").attr("src",src);
    __global_main_video_tag__.onloadedmetadata = function (e){
        __global_video_duration__ = __global_main_video_tag__.duration;
        __global_viewport_capacity__ = __global_video_duration__;
        $("#controlCenter .control-buttons button[duty|='start']").prop("disabled",false);
        render();
    }
});


$("#controlCenter .control-buttons button[duty|='import']").click(function(){
    $("#videoInput").click();
});

$("#controlCenter .control-buttons button[duty|='start']").click(function(){
    send_inital_message();
    history_obj_creator();
});

function add_video_imformation(data){
    for (let  i=0; i<data.length; i++){
        let element = $("#informationModal table tr.source").clone();
        element.removeClass("source");
        element.find(".key").text(data[i].key);
        element.find(".value").text(data[i].value);
        element.insertBefore("#informationModal table tr.source");
    }
    $("#controlCenter .control-buttons button[duty|='imformation']").prop("disabled",false);
}
