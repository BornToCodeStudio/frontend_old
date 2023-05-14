<template>
        <button @click="changeTasks()" class="number">{{number}}</button>
</template>


<script>
export default {
    name: "Item-Switcher-Button",
    props: { 
        number: {
            type: Number,
            default: null
        }
    },
    methods: {
        changeTasks() {
            let page = this.number;
            this.$store.state.startIndex = (page - 1) * 2;
            if(this.$store.state.homeTasks[this.$store.state.startIndex ])
                this.$store.state.endIndex = (page - 1) * 2 + 1;
      }
    }
}
</script>

<style lang="scss" scoped>
    .number {
        align-self: center;
        width: 80%;
        height: 80%;
        text-align: center;
        border-radius: 35px;
        background-color: #ECF4FE;
        border: 1px dashed #7AA7E2;
    }
</style>