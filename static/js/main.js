var side_menu_status = false;

$("#sideMenu").click(function(){
    $(this).css({"width":"300px","box-shadow":"black 20px 0 40px"});
    // $("#sideMenu .items").css("height","36px")
    $("#sideMenu .items .col-tabs span").css({"font-size":"0"});
    $("#sideMenu .items .row-tabs span:nth-child(1)").addClass("open-state-tabs")
    side_menu_status = true;
    $("#sideMenuTrans").removeClass("d-none")
    setTimeout(() => {
        $("#sideMenuTrans").css("opacity","0.7");
    }, 100);
});

$("#sideMenuTrans").click(function(){
    close_side_menu()
});

$(document).keyup(function(e) {
    if (e.key === "Escape" && side_menu_status) {
        close_side_menu()
   }
});


function close_side_menu(){
    $("#sideMenu").css({"width":"72px","box-shadow":"none"});
    // $("#sideMenu .items").css("height","175px")
    $("#sideMenu .items span:not(.row-tabs span)").css({"font-size":"34px"});
    $("#sideMenu .items .row-tabs span:nth-child(1)").removeClass("open-state-tabs")
    side_menu_status = false;
    $("#sideMenuTrans").css("opacity","0");
    setTimeout(() => {
        $("#sideMenuTrans").addClass("d-none")
    }, 300);
}