var play_interval = null;

__global_main_video_tag__.onplay = function(){
    console.log("paly");
    cursor_paly();
}

__global_main_video_tag__.onpause = function(){
    cursor_puase();
}

function cursor_paly(){
    play_interval = setInterval(function(){
        move_cursor();
    },200);
}

function cursor_puase(){
    clearInterval(play_interval);
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