function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        trot: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/trots/'+this.id).then(
            (response) => {
                this.trot = response.data;
            }
        );
      },
      methods: {
        update: function(){
         

            return axios.post('http://localhost:3000/trots', this.trot).then(
                (response) => {
                   this.message = response.data; // saved
                }
            );


        }
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  