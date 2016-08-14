define([
    'jquery',
    'NavigationBar',
    'Handlebars',
    'text!/base/views/partials/nav.handlebars'
], function ($, NavigationBar, Handlebars, navTemplate) {
    var temp = navTemplate.replace('images', 'base/public/images');
    describe("Navigation bar", function () {
        beforeEach(function () {
            //load fixture
            $("body").append("<div id='sandbox'></div>");
            var template = Handlebars.compile(temp);
            var view = {
                title: "Navigation test",
                isIndex: true
            };
            $("#sandbox").append(template(view));
            spyOn($.prototype, "load");
            spyOn(history, "pushState");
        });

        it("changes the active item when a menu item is clicked", function () {
            NavigationBar.setup();
            var homeListItem = $("li:contains('Home')");
            var aboutListItem = $("li:contains('About')");

            expect(homeListItem.hasClass('active')).toBeTruthy();
            expect(aboutListItem.hasClass('active')).toBeFalsy();

            aboutListItem.find("a").click();

            expect(aboutListItem.hasClass('active')).toBeTruthy();
            expect(homeListItem.hasClass('active')).toBeFalsy();
        });

        it("loads content via jquery.load when a menu item is clicked", function () {
            NavigationBar.setup();
            $("li:contains('About') a").click();
            expect($.prototype.load).toHaveBeenCalled();
        });

        afterEach(function () {
            //destroy fixture
            $("#sandbox").remove();
        });
    });
});