require.config({
    paths:{
        "jquery": "lib/jquery-1.11.0",
        "bootstrap": "lib/bootstrap"
    },
    shim:{
        "bootstrap": ["jquery"]
    }
});
require(['NavigationBar', "bootstrap"], function(NavigationBar){
    NavigationBar.setup();
});
