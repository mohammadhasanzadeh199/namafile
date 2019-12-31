let active_features = [];
let min_barcode_width = 2;
let num_of_barcode_sections = 150;
let num_of_diagram_nodes = 50;

//TODO: set contenet_width and duration

let chart_options = {
    legend:{
        display:false
    },
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                min:0,
                max:1,
                stepSize: 0.25
            },
            gridLines: {
                scaleLabel:false,
                zeroLineColor:"#bd99fd",
                color:"rgba(255,255,255,0.2)"
            },
        }],
        xAxes: [{
            ticks: {
                display:false,
                min:0,
                max:100,
                stepSize: 5
            },
            scaleLabel: {
                display: false,
            },
            gridLines: {
                display: false
            },
            type: 'linear',
            position: 'bottom',
        }]
    }
}


//TODO: get content-width and time diuration and set to xAxsis max
function features_error_rendering(){
    active_features = [];
    $(".features-error:not(.source)").remove();
    $(".features-error.source .error-content .barcode-keeper").css("width",__global_timeline_content_width__+"px");
    $(".features-error.source .error-content .scroll-manager .diagram-keeper").css("width",__global_timeline_content_width__+"px");
    __global_features_list__.length?$("#featuresErrorSectionTitile").removeClass("d-none"):null;
    let gradientFill = document.getElementsByTagName("canvas")[0].getContext("2d").createLinearGradient(0, 70, 0, 200);
    gradientFill.addColorStop(0, "#bd99fd");
    gradientFill.addColorStop(1, "#320387");
    for (let i=0;i<__global_features_list__.length;i++){
        let source = $(".features-error.source").clone();
        let id = "fe"+__global_features_list__[i];
        source.removeClass("source");
        source.attr("id",id);
        source.find(".expand-controler div").click(function(){fe_click_handler(id)});
        source.find(".expand-controler span").text(__global_features_list__[i]);
        let ctx = source.find("canvas");

        let diagram = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    data: [],
                    backgroundColor: gradientFill
                }]
            },
            options: chart_options
        });
        // diagram.canvas.parentNode.style.height = '100%';
        diagram.canvas.parentNode.style.width = __global_timeline_content_width__+'px';
        source.insertBefore($(".features-error.source"));
        active_features.push({
            id: id,
            diagram: diagram,
            expand:false,
            nodes_num:0,
            nodes_sum:0,
            pre_time:0
        });
    }
}


function fe_add_diagram_data( feature_name, time, value ){
    let id = "fe"+feature_name;
    let feature = null;
    for (let i=0; i<active_features.length;i++){
        if (active_features[i].id == id){
            feature = active_features[i];
        }
    }
    if ( feature!=null ){
        let diff = time - feature.pre_time;
        let min_diff = $("#"+id+" .barcode-keeper").width() /__global_timeline_content_width__ * __global_video_duration__ /num_of_diagram_nodes;
        console.log("noeee",min_diff,diff)
        if ( diff >= min_diff ){
            let new_value = ( feature.nodes_sum + value )/( feature.nodes_num + 1 );
            feature.diagram.data.datasets[0].data.push({
                x:time,
                y:new_value
            });
            feature.diagram.update();
            feature.nodes_num = 0;
            feature.nodes_sum = 0;
            feature.pre_time = time;
        }
    }
}


function fe_add_barcode_data( feature_name, start, end ){
    let id = "fe"+feature_name;
    let diff = end - start;
    let min_diff = $("#"+id+" .barcode-keeper").width() /__global_timeline_content_width__ * __global_video_duration__ /num_of_barcode_sections;
    console.log(diff,min_diff)
    if ( diff >= min_diff ){
        let elem = $("#"+id+" .error-content .scroll-manager .barcode-keeper .error.source").clone();
        elem.removeClass("source");
        elem.css("left",(start*__global_timeline_content_width__/__global_video_duration__)+"px");
        elem.css("width",(diff*__global_timeline_content_width__/__global_video_duration__)+"px")
        elem.insertBefore("#"+id+" .error-content .scroll-manager .barcode-keeper .error.source");
    }

}

//TODO: closing action
function fe_click_handler(id){
    let index = 0;
    for (let i=0; i<active_features.length; i++){
        if (active_features[i].id === id){
            index = i;
            break;
        }
    }
    let status = active_features[index].expand;
    if (!status){
        $("#"+id+" .cursor span").css("height",140+"px");
        $("#"+id).css("height",190+"px");
        $("#"+id).find(".error-content .barcode-keeper").css("margin-top",-50+"px");
        $("#"+id).find(".expand-controler i").text("remove");
        active_features[index].expand = true;
    } else {
        $("#"+id+" .cursor span").css("height",35+"px");
        $("#"+id).css("height",70+"px");
        $("#"+id).find(".error-content .barcode-keeper").css("margin-top",10+"px");
        $("#"+id).find(".expand-controler i").text("add");
        active_features[index].expand = false;
    }
}