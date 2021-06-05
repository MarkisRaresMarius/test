function run() {
    new Vue({
      el: '#add',
      data: {
        id: 'default',
        glass: {}
      },
      created: function () {
      },
      methods: {
        addGlass: function() {

            this.glass={"id": 0,
            "name": document.getElementById("name").value,
            "brand": document.getElementById("brand").value,
            "color": document.getElementById("color").value,
            "rama": document.getElementById("rama").value,
            "tip_fata": document.getElementById("tip_fata").value,
            "protectieUV": document.getElementById("protectieUV").value,
            "descriere": document.getElementById("descriere").value,
            "an_aparitie": document.getElementById("an_aparitie").value,
            "price": document.getElementById("price").value};
            
            return axios.put('http://localhost:3000/glasses', this.glass).then(
               (response) => {
                    this.message = response.data;
                    console.log(this.message); // saved
                }
            );      
            
          },
        }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  