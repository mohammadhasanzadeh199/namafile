var side_menu_status = false;

$("#sideMenu").click(function(){
    open_side_menu();
});


$("#sideMenu .items span[duty='video']").click(function(){
    side_menu_items_pre_open();
    $("#sideBarVideo").removeClass("d-none");
    $(this).addClass("active");
})
$("#sideMenu .items span[duty='audio']").click(function(){
    side_menu_items_pre_open()
    $("#sideBarAudio").removeClass("d-none");
    $("#sideMenu .items .row-tabs span[duty='audio").addClass("active");
    
})
$("#sideMenu .items span[duty='setting']").click(function(){
    $("#sideMenu .items .row-tabs span").removeClass("active")
    $("#sideMenu .items .row-tabs span[duty='setting'").addClass("active");
})
$("#sideMenu .items span[duty='theme']").click(function(){
    $("#sideMenu .items .row-tabs span").removeClass("active")
    $("#sideMenu .items .row-tabs span[duty='theme").addClass("active");
})

$("#sideMenuTrans").click(function(){
    close_side_menu()
});

$(document).keyup(function(e) {
    if (e.key === "Escape" && side_menu_status) {
        close_side_menu()
   }
});


function close_side_menu(){
    $("#sideMenu .items .row-tabs span").removeClass("active")
    $("#sideMenu .side-bar-content").css("height","0");
    $("#sideMenu").css({"width":"72px","box-shadow":"none"});
    // $("#sideMenu .items").css("height","175px")
    $("#sideMenu .items span:not(.row-tabs span)").css({"font-size":"34px","margin-bottom":"12px"});
    $("#sideMenu .items .row-tabs span:nth-child(1)").removeClass("open-state-tabs")
    side_menu_status = false;
    $("#sideMenuTrans").css("opacity","0");
    setTimeout(() => {
        $("#sideMenuTrans").addClass("d-none")
    }, 300);
}

function open_side_menu(){
    $("#sideMenu").css({"width":"300px","box-shadow":"black 20px 0 40px"});
    // $("#sideMenu .items").css("height","36px")
    $("#sideMenu .items .col-tabs span").css({"font-size":"0","margin-bottom":"0"});
    $("#sideMenu .items .row-tabs span:nth-child(1)").addClass("open-state-tabs")
    side_menu_status = true;
    $("#sideMenuTrans").removeClass("d-none")
    setTimeout(() => {
        $("#sideMenuTrans").css("opacity","0.7");
    }, 100);
}


function side_menu_items_pre_open(){
    $("#sideMenu .items .row-tabs span").removeClass("active");
    $("#sideBarAudio").addClass("d-none");
    $("#sideBarVideo").addClass("d-none");
    $("#sideMenu .side-bar-content").css("height","auto");
}