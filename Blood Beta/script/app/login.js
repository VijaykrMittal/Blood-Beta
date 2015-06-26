var app = app || {};

app.login = (function () {
    'use strict';

    var loginViewModel = (function () {

        var loginBindingValue;

        var show = function ()
        {
            loginBindingValue = kendo.observable({
                loginUsername: '',
                loginPassword:''
            });

            kendo.bind($('#login_frm'), loginBindingValue);
        };

        var loginSubmit = function ()
        {
            var that = this;

            if (!window.connectionInfo.checkConnection()) {
                navigator.notification.confirm('No Active Connection Found.', function (confirmed) {
                    if (confirmed === true || confirmed === 1) {
                        loginSubmit();
                    }

                }, 'Connection Error?', 'Retry,Cancel');
            }
            else
            {
                if (loginBindingValue.loginUsername === "") {
                    navigator.notification.alert("Please enter Username", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#loginUsername').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }

                if (loginBindingValue.loginPassword === "") {
                    navigator.notification.alert("Please enter Password", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#loginPassword').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }

                if(loginBindingValue.loginUsername !== "" &&  loginBindingValue.loginPassword !== "")
                {
                    var dataParam = {};

                    dataParam['username'] = loginBindingValue.loginUsername,
                    dataParam['password'] = loginBindingValue.loginPassword;
                    dataParam['grant_type'] = "password";

                    app.mobileApp.showLoading();
                    getLoginStatus(dataParam);
                }
            }
        };

        var getLoginStatus = function (data)
        {
            var username = data['username'],
                password = data['password'];

            app.everlive.Users.login(username, password).then(function (data) {
                if (data['result']['access_token'] && data['result']['principal_id'])
                {
                    console.log(data);
                    sessionStorage.setItem("PrincipalId",data['result']['principal_id']);
                    app.mobileApp.hideLoading();
                    app.mobileApp.navigate("views/dashboard.html");
                }
            },
            function(error)
            {
                app.mobileApp.hideLoading();
                navigator.notification.alert(error.message, function () { }, 'Notification', 'OK');
            });
            
           /* $.ajax({
                type: "POST",
                url: 'http://api.everlive.com/v1/a21GgIUlEwSME2mR/oauth/token',
                contentType: "application/json",
                data: JSON.stringify(dataItem),
                success: function (data) {
                   
                    console.log("Login");
                    console.log(data);
                        app.mobileApp.hideLoading();
                        app.mobileApp.navigate("#forgot-pwd");
                   
                },
                error: function (error) {
                    console.log("Login");
                    try
                    {
                        console.log(JSON.stringify(error));
                    }
                    catch(e)
                    {
                        console.log(e);
                    }
                    
                    alert(JSON.stringify(error));
                    app.mobileApp.hideLoading();
                    alert(error['responseText']);
                }
            });*/
        };

        return {
            show: show,
            loginSubmit: loginSubmit
        };
    }());
    return loginViewModel;
}());