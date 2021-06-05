function Trotinete() {
  get = function () {
    return axios.get('http://localhost:3000/trots');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/trots/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
