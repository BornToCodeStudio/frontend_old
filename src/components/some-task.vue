<template>
    <router-link :to="'/Task/' + taskId" class="task-button">
        <span>{{ taskname }}</span>
    </router-link>
</template>

<script>   

export default{
    name: "Some-Task",
    props: {
        preview: {
            type: String,
            default: ''
        },
        author: {
            type: String,
            default: ''
        },
        completed: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            default: ''
        },
        taskname: {
            type: String,
            default: ''
        },
        taskId: {
            type: Number,
            default: 0
        }
    },
}

</script>

<style lang="scss" scoped>
    .task-button{
        border-radius: 30px;
        background-color: #FF570C;
        border-color: #1477F8;
        border-width: 10px;
        width: 300px;
        height: 220px;
        text-decoration: none;
        color: white;
        text-align: center;
        line-height: 220px;
        font-size: 34pt;
    }

    .task-button:hover{
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
</style>