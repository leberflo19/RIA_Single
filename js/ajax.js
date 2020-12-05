function loadAjaxInfo() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        $("#ajax_info").html(this.responseText);
      }
    };
    xhttp.open("GET", "data/ajax.info.txt", true);
    xhttp.send();
  }