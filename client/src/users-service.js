function users() {
  get = function () {
    return axios.get('http://localhost:3000/glasses');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/glasses/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
