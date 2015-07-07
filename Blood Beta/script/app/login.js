var app = app || {};

app.login = (function () {
    'use strict';

    var loginViewModel = (function () {

        var loginBindingValue;
        var forgotBindingValue;

        var show = function ()
        {
            //app.mobileApp.showLoading();
            loginBindingValue = kendo.observable({
                loginUsername: '',
                loginPassword:''
            });

            kendo.bind($('#login_frm'), loginBindingValue);
            
            forgotBindingValue = kendo.observable({
                forgotPassword:''
            });
            
            kendo.bind($('#forgot_frm'), forgotBindingValue);
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
        
        var forgotSubmit = function()
        {
            if(forgotBindingValue.forgotPassword === "")
            {
                navigator.notification.alert("Please enter Email Address", function (confirm) {
                    if (confirm === true || confirm === 1) {
                        $('#forgot-password').focus();
                    }
                }, "Notification", "OK");
                return;
            }
            
            if(forgotBindingValue.forgotPassword !=="")
            {
                app.mobileApp.showLoading();
                var object = {
                    "Email": forgotBindingValue.forgotPassword
                };
                $.ajax({
                    type: "POST",
                    url: 'http://api.everlive.com/v1/rsSvQnPLv6ep1Exv/Users/resetpassword',
                    contentType: "application/json",
                    data: JSON.stringify(object),
                    success: function(data) {
                       // navigator.notification.alert("Reset password request Successfull, Please check your mail",function(){},"Notification","OK");
                        window.plugins.toast.show('Please check your mail for Reset password','long','bottom', onSuccess, onError);
                        setTimeout(function(){
                            app.mobileApp.hideLoading();
                            app.mobileApp.navigate("views/home.html");
                        },500);
                        
                    },
                    error: function(error) {
                        console.log(error);
                        navigator.notification.alert("User with the specified email was not found.", function () { }, 'Notification', 'OK');
                        app.mobileApp.hideLoading();
                    }
                });
            }
        };
        
        var onSuccess =  function(msg) {
            console('Toast shown: ' + msg);
        };

        var onError =  function(msg) {
            alert('Toast error: ' + msg);
        };
        
        var navigateToSignup = function()
        {
            app.mobileApp.navigate("#signup-view");
        };
        
        var navigateToForgot = function()
        {
            app.mobileApp.navigate("#forgot-pwd");
        };

        return {
            show: show,
            loginSubmit: loginSubmit,
            navigateToSignup:navigateToSignup,
            navigateToForgot:navigateToForgot,
            forgotSubmit:forgotSubmit
        };
    }());
    return loginViewModel;
}());