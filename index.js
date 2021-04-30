function log(val) {
  if (val instanceof Object) {
    val = JSON.stringify(val.data, null, 2);
  }
  let node = document.createElement("li");
  let textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}


// test
//let url = "https://jsonplaceholder.typicode.com/posts";
zGet("http://localhost:5000/data.json").then((res) => {
  log(res);
});

// should hit cache
zGet("http://localhost:5000/data.json").then((res) => {
  log(res);
});

zGet("http://localhost:5000/data1.json").then((res) => {
  log(res);
});

zGet("http://localhost:5000/data2.json").then((res) => {
  log(res);
});

zGet("http://localhost:5000/data3.json").then((res) => {
  log(res);
});

// no cache , because lru is limited to 3
zGet("http://localhost:5000/data.json").then((res) => {
  log(res);
});

setTimeout(() => {
  zGet("http://localhost:5000/data.json").then((res) => {
    log(res);
  });
}, 2000);

