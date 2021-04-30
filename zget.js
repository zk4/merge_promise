
let cachePromises = new LRU(3);

function genKey(url, param) {
  if (!url) throw "url must exist!";
  return url + JSON.stringify(param);
}
// 检查
function checkPromise(url, param) {
  let res = cachePromises.read(genKey(url, param));
  if (res) {
    return res;
  } else {
    return false;
  }
}

function zGet(url, param) {
  let cachePromise = checkPromise(url, param);
  if (cachePromise) {
    log("hit promise cache:", url);
    return cachePromise;
  }

  let promise = axios.get(url, { params: param });
  cachePromises.write(genKey(url, param), promise);
  return promise;
}
