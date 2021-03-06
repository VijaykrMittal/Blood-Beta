var app = app || {};

app.dashboard = (function(){
    'use strict';
    
    var dashboardViewModel = (function(){
        var donnarData= [];
        var show = function()
        {
            app.mobileApp.showLoading();
            getApiData(); 
        };
        
        var getApiData = function()
        {
            app.everlive.Users.get().then(function(data){
                for(var i=0;i<data['count'];i++)
                {
                    if(sessionStorage.getItem('PrincipalId') === data['result'][i]['Id'])
                    {
                        continue;
                    }
                    donnarData.push({ name: data['result'][i]['DisplayName'], group: data['result'][i]['group'], url: data['result'][i]['image'], letter: data['result'][i]['group']});
                }
                createListViewHtml();
            },
            function(error){
                alert(JSON.stringify(error));
            });
        };
        
        var createListViewHtml = function()
        {
            donnarData.sort()
            console.log(donnarData);
            
            $("#donnar-list").kendoMobileListView({
                dataSource: kendo.data.DataSource.create({data: donnarData}),
                template: $("#customListViewTemplate").html()
            });
            app.mobileApp.hideLoading();
        };
        
        var logout = function()
        {
            
        };
        
        return {
          show:show,
            logout:logout
        };
    }());
    return dashboardViewModel;
}());