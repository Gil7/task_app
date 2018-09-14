new Vue({
    el: '#app',
    data(){
        return {
            titleTask: '',
            description: '',
            tasks: [],
            title: 'Sails - Vue - TodoApp',
            editing: false,
            index_task_editing: null,
            task_editing : {
                title: '',
                description: '',
                id: ''
            },
            message: '',
            error_message: false,
            info_message: false,
            task_will_removed : 0,
            index_task_removed: 0
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
                this.message = response.data.message
                this.info_message = true
                this.tasks.push(response.data.task)
                this.titleTask = ''
                this.description = ''
            })
            .catch(err => {
                console.log(err)
                this.error_message = true
                this.message = 'Error saving the task' 
            })
        },
        removeTask: function(){
            axios.delete(`/api/tasks/${this.task_will_removed}`)
            .then(response => {
                this.tasks.splice(this.index_task_removed, 1)
                this.hideModal();
                this.message = response.data.message
                this.info_message = true
                this.task_will_removed =0
                this.index_task_removed = 0
                
            })
            .catch(err => {
                this.error_message = true
                this.message = 'Error removing the task' 
            })
        },
        changeState: function(event,id, index){
            const done = event.target.checked
            
            axios.put(`/api/tasks/${id}`,{done : done})
            .then(response => {
                this.message = response.data.message
                this.info_message = true
                this.tasks[index].done = done
            })
            .catch(err => {
                this.error_message = true
                this.message = 'Error updating the task' 
            })
        },
        cancelEditing: function(){
            this.editing = false
        },
        changeEditingState: function(task,index){
            this.editing = true
            this.task_editing = task
            this.index_task_editing = index
        },
        updateTask: function(){
            const taskUpdated = {
                title: this.task_editing.title,
                description: this.task_editing.description
            }
            axios.put(`/api/tasks/${this.task_editing.id}`, taskUpdated)
            .then(response => {
                this.message = response.data.message
                this.info_message = true
                this.tasks[this.index_task_editing].title = this.task_editing.title
                this.tasks[this.index_task_editing].description = this.task_editing.description 
                
            })
            .catch(err => {
                this.error_message = true
                this.message = 'Error saving the task' 
                console.log(err)
            })
        },
        hideMessage: function(){
            this.message = ''
        },
        confirmWithModal: function(id, index){
            this.task_will_removed = id,
            this.index_task_removed = index
        },
        cancelModal: function(){
            this.task_will_removed = 0
            this.index_task_removed = 0
            
        },
        hideModal: function(){
            this.$refs.closemodal.click();  
        }
    },
    computed: {
        isAValidForm: function(){
            return this.titleTask == ''
        },
        tasks_organized: function(){
            return this.tasks.sort((a,b) => {
                return a.id < b.id
            })
        }
    }
    
})