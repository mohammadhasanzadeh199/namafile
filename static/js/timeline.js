let frame_height = 100;
let min_space_between_frames = 80;
let min_space_between_indexes = 100;


function render(){
    $("#timeline").removeClass("source");
    // -------- remove pre elements from last render ----------------------------------
    $("#timeline .timeline-container .frame-keeper video:not(.source)").remove();
    $("#timeline .timeline-container .time-index h6:not(.source)").remove();
    $("#waveform").empty();
    // -------- render frames ---------------------------------------------------------
    width = __global_main_video_tag__.videoWidth;
    height = __global_main_video_tag__.videoHeight;
    let container_width = $("#timeline .timeline-container .timeline-viewport").width();
    __global_timeline_content_width__ = __global_video_duration__/__global_viewport_capacity__ * container_width;
    let frame_width = frame_height*width/height;
    let frames_num = Math.floor( (__global_timeline_content_width__ + min_space_between_frames)/(frame_width+min_space_between_frames) );
    min_space_between_frames = (__global_timeline_content_width__ - (frames_num*frame_width))/(frames_num-1);
    let time_interval = __global_video_duration__ * (min_space_between_frames + frame_width ) / (__global_timeline_content_width__);
    $("#timeline .timeline-container .frame-keeper .source").css({"width":frame_width+"px","height":frame_height+"px"});
    let time = frame_width/2/__global_timeline_content_width__*__global_video_duration__;
    for (let i=0; i<frames_num;i++){
        console.log("frame time ", time)
        let vid = $("#timeline .timeline-container .frame-keeper .source").clone();
        vid.removeClass("source");
        if (i){
            vid.css("margin-left",min_space_between_frames+"px");
        }
        vid.attr("id","fameShow"+i)
        vid.insertBefore($("#timeline .timeline-container .frame-keeper .source"))
        document.getElementById("fameShow"+i).currentTime = time;
        time += time_interval;
    }
    // -------- rendoer time indexes --------------------------------------------------
    let source_width = 64;
    let num_of_indexes = Math.floor((__global_timeline_content_width__ - source_width + min_space_between_indexes)/(source_width+min_space_between_indexes));
    min_space_between_indexes += ( __global_timeline_content_width__ - (num_of_indexes + 1)*(source_width+min_space_between_indexes) )/ (num_of_indexes+1);
    time_interval = __global_viewport_capacity__ * (min_space_between_indexes+source_width)/__global_timeline_content_width__;
    console.log(__global_timeline_content_width__,(num_of_indexes+1)*(min_space_between_indexes+source_width))
    time = time_interval;
    for (let i=0; i<num_of_indexes;i++){
        let index = $("#timeline .timeline-container .time-index .source").clone()
        index.removeClass("source");
        index.css({
            "margin-left":min_space_between_indexes + (!i?source_width/2:0) + 'px',
            "width":source_width + "px"
        });
        index.text(timeWrapper(time));
        time+= time_interval;
        index.insertBefore($("#timeline .timeline-container .time-index .source"));
    }
    // -------- wave form renderer ----------------------------------------------------
    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#320387',
        progressColor: '#320387',
        barHeight: 0.7  ,
        height: 60,
        cursorWidth: '0'
    });
    wavesurfer.load(document.getElementsByTagName("video")[0].src);
    // features_error_rendering($("#timeline .timeline-container .scroll-manager").width(), ["mohammad","hossein"]);
    // let timeeee = 0;
    // setInterval(function(){
    //     fe_add_diagram_data("mohammad",timeeee,Math.random());
    //     timeeee += 0.1
    // },100)
    // let start = 0;
    // setInterval(function(){
    //     let diff = Math.random()/2;
    //     fe_add_barcode_data("mohammad",start,start+diff)
    //     start = start+diff + Math.random()/4;
    // },100)
}


function timeWrapper(time){
    time = Math.floor(time);
    let second = time%60;
    let min = Math.floor(time/60)%60;
    let hour = Math.floor(time/3600);
    
    return time_digit(hour)+":"+time_digit(min)+":"+time_digit(second);
}


function time_digit( time_value ){
    if (time_value/10<1){
        return "0"+time_value;
    } else {
        return time_value;
    }
}

console.log($("#timeline"))
$("#timeline .interval button").click(function(){
    let duration = $(this).attr("duration");
    let vp_duration = __global_viewport_capacity__;
    switch (duration){
        case "1m":
            vp_duration = 60;
            break;
        case "5m":
            vp_duration = 300;
            break;
        case "15m":
            vp_duration = 900;
            break;
        case "30m":
            vp_duration = 1800;
            break;
        case "1h":
            vp_duration = 3600;
            break;
        case "all":
            vp_duration = __global_video_duration__;
            break;
    }
    if (__global_video_duration__ === null) {
        alert("first open video");
    } else if (vp_duration > __global_video_duration__) {
        alert("it's wrong");
    } else if (vp_duration != __global_viewport_capacity__){
        __global_viewport_capacity__ = vp_duration;
        alert("that's right!");
        render();
    }
})