var app = (function(global){
    
    var onDeviceReady = function()
    {
        window.connectionInfo = new ConnectionApp();
        window.connectionInfo.checkConnection();
        
        window.cameraInfo = new cameraApp();
    };
    
    function ConnectionApp(){}
    function cameraApp() { }
    
    cameraApp.prototype = {
        capturePhoto: function ()
        {
            var that = this;
            navigator.camera.getPicture(that.successCallback, that.errorCallback, {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA
            });
        },

        successCallback: function (imageData)
        {
            var uploadimgbtn = document.getElementById('uploadimgbtn');
            uploadimgbtn.src = "data:image/jpeg;base64," + imageData;

            $('#updbtn').css({ 'display': 'block', 'margin': '0px auto'});
           // $('#dftbtn').css('display', 'none');
            sessionStorage.setItem("image64Code", imageData);
        },

        errorCallback: function (message)
        {
            alert(message);
        }
    }
    
    ConnectionApp.prototype = {
        checkConnection:function()
        {
            if (typeof navigator.connection.type !== "undefined") {
                var networkState = navigator.connection.type;
                var states = {};
                states[Connection.UNKNOWN] = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI] = 'WiFi connection';
                states[Connection.CELL_2G] = 'Cell 2G connection';
                states[Connection.CELL_3G] = 'Cell 3G connection';
                states[Connection.CELL_4G] = 'Cell 4G connection';
                states[Connection.CELL] = 'Cell generic connection';
                states[Connection.NONE] = 'No network connection';
                if (states[networkState] === 'No network connection')
                {
                    return false;
                }
            }

            return true;
        }
    }
    
    document.addEventListener('deviceready',onDeviceReady,false);
    
    /*Initialize the everlive sdk*/
    var el = new Everlive({
        apiKey: 'a21GgIUlEwSME2mR',
        scheme:'https'
    });
    
    var apps = new kendo.mobile.Application(document.body,
                                                        {
                                                            skin:'flat',
                                                            initial:'views/dashboard.html',
                                                            transition:'fade'
                                                        }
    );
    return{
      mobileApp:apps,
      everlive:el
    };
}(window));