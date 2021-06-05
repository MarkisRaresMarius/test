function run() {
    new Vue({
        el: '#addTrot',
        data: {
            id: 'default',
            trot: {}
        },
        created: function() {},
        methods: {
            addTrot: function() {

                this.trot = {
                    "id": 0,
                    "name": document.getElementById("name").value,
                    "speed": document.getElementById("speed").value,
                    "dimensionwheels": document.getElementById("dimensionwheels").value,
                    "compressor": document.getElementById("compressor").value,
                    "collor": document.getElementById("collor").value,
                    "maxweight": document.getElementById("maxweight").value,
                    "weight": document.getElementById("weight").value,
                    "actype": document.getElementById("actype").value,
                    "autonomy": document.getElementById("autonomy").value,
                    "capacity": document.getElementById("capacity").value,
                    "power": document.getElementById("power").value,
                    "producer": document.getElementById("producer").value,
                    "price": document.getElementById("price").value    
                    
                };

                return axios.put('http://localhost:3000/trots', this.trot).then(
                    (response) => {
                        this.message = response.data;
                        console.log(this.message); // saved
                        alert("Trotineta electrica adaugata.");
                        window.location = 'index.html';
                    }
                );

            },
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    run();
});