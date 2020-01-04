let websocket = null;

let send_json = {
    "Video_addr":"C:\\Users\\Administrator\\namafile\\videos\\video30.mp4",
    "brightness":"1",
    "contrast":"0",
    "chroma":"0",
    "colorfulness":"0",
    "color_gamut":"0",
    "chroma_imbalance":"0",
    "loss_of_chroma":"0",
    "blurriness":"0",
    "blockiness":"0",
    "noise_estimation":"0",
    "stripe_noise":"0",
    "scene_change":"0",
    "blooming":"0",
    "frame_freezing":"0",
    "black_frame":"0",
    "pillar_boxing":"0",
    "window_boxing":"0",
    "letter_boxing":"0",
    "frame_drop":"0",
    "photosensitive_epilepsy":"0",
    "saturated_red_epilepsy":"0",
    "luminance_change":"0",
    "momentary_loudness":"0",
    "integrated_loudness":"0",
    "shortterm_loudness":"0",
    "loudness_range":"0",
    "true_peak_level":"0",
    "loudness_mismatch":"0",
    "audio_contrast":"0",
    "audio_constant":"0",
    "mute_detection":"0",
    "noise_detection":"0",
    "phase_distortion":"0",
    "phase_coherence":"0",
    "clipping_detection":"0",
    "thdn":"0",
    "sinad":"0",
    "snr":"0",
    "mos":"0",
    "duplicate":"0",
    "clicks_and_pops":"0",
    "low_luminance":"0"
}

console.log(JSON.stringify(send_json))

// ====================================================================================================================
// ------- websocket handler ------------------------------------------------------------------------------------------
// ====================================================================================================================
function init_connection(){
    websocket = new WebSocket("ws://213.233.161.125:8007/");
    websocket.onopen = function(evt) { 
        console.log("open")
    };
    websocket.onclose = function(evt) { 
        // init_connection();
        console.log("close")
    };
    websocket.onmessage = function(evt) {
        websocket_onmessage_handler(evt);
    };
    websocket.onerror = function(evt) {
        console.log("error",evt);
    };
}

function send_inital_message(){
    websocket.send("initialize:"+JSON.stringify(send_json));
}

let doFirst = true;
// ====================================================================================================================
// ------- websocket given data handler (check is header or log data) -------------------------------------------------
// ====================================================================================================================
function websocket_onmessage_handler(evt){
    let geted_data = JSON.parse(evt.data);
    if (geted_data.type == "header"){
        add_video_imformation(geted_data.data)
    } else if (geted_data.type == "warning"){
        // let warn_element = $(".video-container .alert-warning");
        // warn_element.text(geted_data.message);
        // warn_element.css("display","block");
        // setTimeout(() => {
        //     warn_element.css("display","none");            
        // }, __backend_warning_display_timeout__);
    }  else if (geted_data.type == "error"){
        // let error_element = $(".video-container .alert-danger");
        // error_element.text(geted_data.message);
        // error_element.css("display","block");
        // setTimeout(() => {
        //     error_element.css("display","none");            
        // }, __backend_error_display_timeout__);
    } else {
        sotore_data_in_db(geted_data).then(function(result){
            if (result){
                fe_add_log_to_diagram(geted_data);
            }
            if (geted_data.islast == 1&&doFirst){
                doFirst = false;
                add_error_logs()
                // log_extractor(0,10).then(function(result){
                //     console.log("errrrrrrrrrror",result);
                // })
            }
        });
    }
}

init_connection()
