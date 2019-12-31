var play_interval = null;

// __global_main_video_tag__.onplay = function(){
//     console.log("paly");
//     cursor_paly();
// }


__global_main_video_tag__.addEventListener("timeupdate", cursor_paly);

function cursor_paly(event){
    let cursor_width =$("#timeline .timeline-container .cursor").width()
    let left = __global_main_video_tag__.currentTime/__global_video_duration__*__global_timeline_content_width__ - cursor_width/2;
    $("#timeline .timeline-container .cursor").css("left",left+"px")
}
function move_cursor(){
    let timelind_cursor = $("#timeline .timeline-container .cursor");
    let movement_diff = __global_timeline_content_width__ / __global_video_duration__ / 5;
    console.log(timelind_cursor.css("left").match(/\d+/)[0]+movement_diff+"px")
    timelind_cursor.css("left",(Number(timelind_cursor.css("left").match(/\d+/)[0])+movement_diff)+"px");
    for (let i=0; i<__global_features_list__.length;i++){
        let id = "#fe"+__global_features_list__[i];
        let elem = $(id+" .cursor")
        elem.css("left",(Number(elem.css("left").match(/\d+/)[0])+movement_diff)+"px");
    }
}

$("#timeline .timeline-container .scroll-manager .click-area").click(function(event){
    let position = (event.pageX - $(this).offset().left) + $(this).scrollLeft();
    let time = position/__global_timeline_content_width__ * __global_video_duration__;
    __global_main_video_tag__.currentTime = time;
})