var play_interval = null;


__global_main_video_tag__.addEventListener("timeupdate", cursor_paly);

function cursor_paly(event){
    let cursor_width =$("#timeline .timeline-container .cursor").width()
    let left = __global_main_video_tag__.currentTime/__global_video_duration__*__global_timeline_content_width__ - cursor_width/2;
    play_data()
    auto_scroll_check(left);
    $("#timeline .timeline-container .cursor").css("left",left+"px");
    $(".features-error .error-content .scroll-manager .cursor").css("left",left+"px");
}

$("#timeline .timeline-container .scroll-manager .click-area").click(function(event){
    let position = (event.pageX - $(this).offset().left) + $(this).scrollLeft();
    let time = position/__global_timeline_content_width__ * __global_video_duration__;
    __global_main_video_tag__.currentTime = time;
    $("#timeline .timeline-container .scroll-manager").scrollLeft(200)
})

function play_data(){
    let start = __global_main_video_tag__.currentTime -0.3;
    let end = __global_main_video_tag__.currentTime + 0.3;
    get_range_data_from_db (start,end).then(function (data){
        let index = 0;
        let diff;
        for (let i=0; i<data.lenght; i++){
            let new_diff = Math.abs(__global_main_video_tag__.currentTime - data[i].data_time);
            if (!diff||new_diff>diff){
                diff = new_diff;
                index = i;
            }
        }
        show_features_value(data[index].data);
    })
}

function auto_scroll_check(left){

}