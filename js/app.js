var w;

function startWorker() {
  if(typeof(Worker) !== "undefined") {
    if(typeof(w) == "undefined") {
      w = new Worker("js/worker.js");
    }
    w.onmessage = function(event) {
      $("#result").html(event.data);
    };
  }
}

function stopWorker() { 
  w.terminate();
  w = undefined;
}
