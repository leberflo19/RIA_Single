function showNotification() {

    if (!("Notification" in window)) {
        alert("Not supported!");
      }
    
    else if (Notification.permission === "granted") {
        var notification = new Notification("Eine Benachrichtigung");
    }

    else {
    Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
            var notification = new Notification("Eine Benachrichtigung");
        }
    });
    }
 }