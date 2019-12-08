var side_menu_status = false;

$("#sideMenu").click(function(){
    $(this).css({"width":"300px","box-shadow":"black 20px 0 40px"});
    // $("#sideMenu .items").css("height","36px")
    $("#sideMenu .items .icon-c").css({"width":"0","height":"0"});
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
    if (e.key === "Escape" && side_menu_status) { // escape key maps to keycode `27`
        close_side_menu()
   }
});


function close_side_menu(){
    $("#sideMenu").css({"width":"56px","box-shadow":"none"});
    // $("#sideMenu .items").css("height","175px")
    $("#sideMenu .items .icon-c").css({"width":"36px","height":"36px"});

    side_menu_status = false;
    $("#sideMenuTrans").css("opacity","0");
    setTimeout(() => {
        $("#sideMenuTrans").addClass("d-none")
    }, 300);
}