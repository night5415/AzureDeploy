var isProduction = false;

function makeRoute(template){
    return function (req, res) {
        var model = {
            title: 'Project Title',
            isProduction: isProduction,
            isIndex: template === 'index',
            isContact: template === 'contact',
            isAbout: template === 'about',
            isLogin: template === 'login'
        };
        if (model.isLogin) {
            model.layout = '_blank';
        }
        if(req.query.l === '0'){
            view.layout = false;
        } 
        res.render(template, model); //render can't have a callback and model??
    };
}

/* GET home page. */
exports.index = makeRoute('index');
/* GET contact page. */
exports.contact = makeRoute('contact');
/* GET about page. */
exports.about = makeRoute('about');
//GET Login page
exports.login = makeRoute('login');

exports.setProductionMode = function(){
    isProduction = true;
};