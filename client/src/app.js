function run() {
    let indexComponent = new Vue({
        el: '#app',
        data: {
            trots: [],
            trotsService: null,
            message: ''
        },
        created: function () {
            this.trotsService = Trotinete();
            this.trotsService.get().then(response => (this.trots = response.data));
        },
        methods: {
            deleteTrot: function(id) {
                console.log('HTTP DELETE spre backend, amp: ' + id);
                this.trotsService.remove(id).then(response => {
                    this.trotsService.get().then(response => (this.trots = response.data));
                });
            },
        }
    });


}


document.addEventListener('DOMContentLoaded', () => {
    run();
});