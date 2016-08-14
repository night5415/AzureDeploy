define(['jquery'], function($){
    return {
        setup: function(){
            var nav = $("#navigation");
            var loader = $("#loader");
            var loadVisible = false;
            function changeScene(url) {
                if(!loadVisible){
                    loader.fadeIn('slow');
                    loadVisible = true;
                }
                $("#main-content").hide().load(url + "?l=0" , function(response, status) {
                    if ( status === "error" ) {
                        //ajax load didn't work, try normal browser navigation
                        window.location = url;
                    }else{
                        loader.hide();
                        loadVisible = false;
                        $(this).fadeIn('slow');
                    }
                });
            }

            nav.find("a").click(function(event){
                //load content with jquery instead!
                event.preventDefault();
                history.pushState({}, "", this.href);
                changeScene(this.href);
                //remove previous focus
                nav.find(".active").removeClass("active");
                //add new focus
                $(this).parent().addClass("active");
                //if toolbar is open, close it
                if(nav.find('.navbar-collapse').hasClass("in")){
                    nav.find('.navbar-toggle').click();
                }
            });
            window.onpopstate = function() {
                changeScene(document.location);
            };
        }
    };
});
