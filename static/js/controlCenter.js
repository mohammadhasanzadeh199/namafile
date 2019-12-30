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
})
