new Vue({
    el: '#app',
    data(){
        return {
            titleTask: '',
            description: '',
            tasks: [],
            title: 'Saisl - Vue - TodoApp'
        }
    },
    mounted(){
        this.getTasks()
    },
    methods: {
        getTasks: function() {
            axios.get('/api/tasks')
            .then(response => {
                console.log("response ",response.data.data)
                this.tasks = response.data.data
            })
            .catch(err => {
                console.log("error ",err)
            })
        },
        onSubmit: function(){
            const data = {
                title: this.titleTask,
                description: this.description
            }
            axios.post('/api/tasks', data)
            .then(response => {
                this.tasks.push(response.data.task)
            })
            .catch(err => {
                console.log(errr)
            })
        }
    }
})