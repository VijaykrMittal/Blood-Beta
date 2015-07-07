var app = app || {};

app.signup = (function () {
    'use strict';

    var signupViewModel = (function () {

        var bindingValue;

        var show = function (e)
        {
          //  $(".km-scroll-container").css("-webkit-transform", "");
            $('#signupCity').val(0);
            
            bindingValue = kendo.observable({
                signupUsername: '',
                signupEmailAddress: '',
                signupPassword: '',
                signupContact: '',
                signupDob: '0',
                signupState: '0',
                signupCity: '0',
                signupArea: '',
                signupGroup: '0',
                userImage:'style/images/profile icon.PNG'
            });
            kendo.bind($('#signup_form'), bindingValue);      
            
            $("#uploadimgbtn").unbind('.myPlugin');
            
            $('#uploadimgbtn').on("click.myPlugin",function(){
                window.cameraInfo.capturePhoto();
            });
            $('#uploadimgbtn').attr("src",'style/images/profile icon.PNG');
            e.view.scroller.scrollTo(0, 0)
        };

        var signupSubmit = function ()
        {
            var that = this;
            var mailFormat = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            var pwdFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            var imageStatus = $("#uploadimgbtn").attr('src');
            
            if (!window.connectionInfo.checkConnection()) {
                navigator.notification.confirm('No Active Connection Found.', function (confirmed) {
                    if (confirmed === true || confirmed === 1) {
                        that.signupSubmit();
                    }

                }, 'Connection Error?', 'Retry,Cancel');
            }
            else
            {
                if(imageStatus === "style/images/profile icon.PNG")
                {
                    navigator.notification.alert("Please Capture your image", function () {}, "Notification", "OK");
                    return;
                }
                
                if (bindingValue.signupUsername === "" || bindingValue.signupUsername === 'undefined' || bindingValue.signupUsername === undefined) {
                    navigator.notification.alert("Please enter your name", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupUsername').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (isNaN(bindingValue.signupUsername) === "fasle" || isNaN(bindingValue.signupUsername) === false) {
                    navigator.notification.alert("Please enter your name in character format.", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupUsername').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (bindingValue.signupEmailAddress === "") {
                    navigator.notification.alert("Please enter your email address", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupEmailAddress').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (!mailFormat.test(bindingValue.signupEmailAddress)) {
                    navigator.notification.alert("Please enter valid email address", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupEmailAddress').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (bindingValue.signupPassword === "") {
                    navigator.notification.alert("Please enter your password", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupPassword').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (!pwdFormat.test(bindingValue.signupPassword))
                {
                    navigator.notification.alert("Please enter your password [6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter]", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupPassword').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (bindingValue.signupContact === "") {
                    navigator.notification.alert("Please enter your Mobile Number", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupContact').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (($('#signupContact').val()).length !== 10) {
                    navigator.notification.alert("Mobile number should be 10 digit", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupContact').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (bindingValue.signupDob === "0" || bindingValue.signupDob === "Select D.O.B") {
                    navigator.notification.alert("Please select your D.O.B", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupDob').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (bindingValue.signupState === "" || bindingValue.signupState === "0") {
                    navigator.notification.alert("Please select your state", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupState').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (bindingValue.signupCity === "" || bindingValue.signupCity === "0") {
                    navigator.notification.alert("Please select your city", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupCity').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (bindingValue.signupArea === "") {
                    navigator.notification.alert("Please enter your location", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupArea').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                if (bindingValue.signupGroup === "" || bindingValue.signupGroup === "0") {
                    navigator.notification.alert("Please select your Blood Group", function (confirm) {
                        if (confirm === true || confirm === 1) {
                            $('#signupGroup').focus();
                        }
                    }, "Notification", "OK");
                    return;
                }
                else
                {
                    var dataParam = {};
                   // dataParam['Username'] = bindingValue.signupEmailAddress,
                    dataParam['Email'] = bindingValue.signupEmailAddress,
                    dataParam['DisplayName'] = bindingValue.signupUsername,
                    dataParam['Password'] = bindingValue.signupPassword,
                    dataParam['contact'] = bindingValue.signupContact,
                    dataParam['dob'] = bindingValue.signupDob,
                    dataParam['state'] = bindingValue.signupState,
                    dataParam['city'] = bindingValue.signupCity,
                    dataParam['area'] = bindingValue.signupArea,
                    dataParam['group'] = bindingValue.signupGroup;
                    if(sessionStorage.getItem('image64Code') === null || sessionStorage.getItem('image64Code') === 'null')
                    {
                      dataParam['image'] = 'style/images/profile icon.PNG';  
                    }
                    else
                    {
                        dataParam['image'] = sessionStorage.getItem('image64Code');
                    }

                    app.mobileApp.showLoading();
                    insertNewUserData(dataParam);
                }
            }
        };

        var insertNewUserData = function (insertData)
        {
            console.log("signup");
            console.log(insertData);
            
            var username = insertData['Email'],
                password = insertData['Password'],
                attrs = {
                Email : insertData['Email'],
                DisplayName : insertData['DisplayName'],
                contact : insertData['contact'],
                dob : insertData['dob'],
                state : insertData['state'],
                city : insertData['city'],
                area: insertData['area'],
                group: insertData['group'],
                image:insertData['image']
            };
            
            app.everlive.Users.register(username, password, attrs,
            function (data)
            {
                console.log(data);
                if (data['result']['Id']) {
                    app.mobileApp.hideLoading();
                    $('#uploadimgbtn').attr("src",'style/images/profile icon.PNG');
                    window.plugins.toast.show('Registration Successfull','long','bottom', onSuccess, onError);
                    sessionStorage.removeItem('image64Code');
                    app.mobileApp.navigate("views/home.html");
                }
            },
            function (error)
            {
                app.mobileApp.hideLoading();
                navigator.notification.alert(error.message, function () { }, 'Notification', 'OK');
            });
            
            
            
            /*$.ajax({
                type: 'POST',
                url: 'http://api.everlive.com/v1/a21GgIUlEwSME2mR/Users',
                contentType: 'application/json',
                data: JSON.stringify(dataItem),
                success:function(data)
                {
                    if (data['Result']['Id']) {
                        app.mobileApp.hideLoading();
                        app.mobileApp.navigate("#loginView");
                    }
                },
                error:function(error)
                {
                    app.mobileApp.hideLoading();
                    alert(error['responseText']);
                }
            });*/
        };
        
        var onSuccess =  function(msg) {
            console('Toast shown: ' + msg);
        };

        var onError =  function(msg) {
            alert('Toast error: ' + msg);
        };

        var captureCameraEvent = function ()
        {
            window.cameraInfo.capturePhoto();
        };

        var deleteCameraEvent = function ()
        {
            alert("delete item");
        };

        return {
            show: show,
            signupSubmit: signupSubmit,
            captureCameraEvent: captureCameraEvent,
            deleteCameraEvent: deleteCameraEvent
        };
    }(window));

    return signupViewModel;
}());