<template>
    <main>
      <div class="main__upper">
        <input type="text" id="search__bar" placeholder="Search..">
        <button id="create__task">Create Task</button>
      </div>
      <hr>
      <div class="main__body">
        <div class="filters">
          <div class="left__filters">
            <button id="filter__new">New</button>
            <button id="filter__solutions">Solutions</button>
            <button id="filter__likes">Likes</button>
          </div>
          <span id="tasks">Tasks</span>
          <div class="right__filters">
            <button id="filter__html">HTML</button>
            <button id="filter__css">CSS</button>
            <button id="filter__js">JavaScript</button>
          </div>
        </div>
        <div class="filtered__tasks">
           <HomeTask v-bind:key="index" v-for="(task, index) in getTasks()" :task="task"/>
        </div>
        <div class="pages">
          <ItemSwitcher :pagesCount="calculatePages(tasks.length)"/>
        </div>
      </div>
    </main>
</template>

<script>

import axios from 'axios';
import previewImageDefault from '../assets/default_preview_solution.png';
import HomeTask from '../components/home-task.vue';
import ItemSwitcher from '../components/item-switcher.vue'

export default {
  name: "home-view",
  components: {
    HomeTask,
    ItemSwitcher,
},
  data() {
      return {
        tasks: [{author: "helicopter123", isTried: false, name: "работа с JSON", description: "aboba", previewimage: previewImageDefault, taskId: 1},
        {author: "cowfucker", isTried: true, name: "Hello world!", description: "display the 'Hello world' message at the local page", previewimage: previewImageDefault, taskId: 2},
        {author: "Bob", isTried: true, name: "работа с JSON1", description: "Создайте страницу, которая отобразит сообщение «Я JavaScript!».", previewimage: previewImageDefault, taskId: 3},
        {author: "Bob", isTried: true, name: "работа с JSON1", description: "Создайте страницу, которая отобразит сообщение «Я JavaScript!».", previewimage: previewImageDefault, taskId: 3},
        {author: "cowfucker", isTried: true, name: "Hello world!", description: "display the 'Hello world' message at the local page", previewimage: previewImageDefault, taskId: 2},
        {author: "Bob", isTried: true, name: "работа с JSON1", description: "Создайте страницу, которая отобразит сообщение «Я JavaScript!».", previewimage: previewImageDefault, taskId: 3},
        {author: "Bob", isTried: true, name: "работа с JSON1", description: "Создайте страницу, которая отобразит сообщение «Я JavaScript!».", previewimage: previewImageDefault, taskId: 3},
        {author: "cowfucker", isTried: true, name: "Hello world!", description: "display the 'Hello world' message at the local page", previewimage: previewImageDefault, taskId: 2},
        {author: "Bob", isTried: true, name: "работа с JSON1", description: "Создайте страницу, которая отобразит сообщение «Я JavaScript!».", previewimage: previewImageDefault, taskId: 3},
        {author: "Bob", isTried: true, name: "работа с JSON1", description: "Создайте страницу, которая отобразит сообщение «Я JavaScript!».", previewimage: previewImageDefault, taskId: 3},
        {author: "Bob", isTried: true, name: "работа с JSON1", description: "Создайте страницу, которая отобразит сообщение «Я JavaScript!».", previewimage: previewImageDefault, taskId: 3},
        {author: "Bob", isTried: true, name: "работа с JSON1", description: "Создайте страницу, которая отобразит сообщение «Я JavaScript!».", previewimage: previewImageDefault, taskId: 3},
        {author: "cowfucker", isTried: true, name: "Hello world!", description: "display the 'Hello world' message at the local page", previewimage: previewImageDefault, taskId: 2},
        {author: "Bob", isTried: true, name: "работа с JSON1", description: "Создайте страницу, которая отобразит сообщение «Я JavaScript!».", previewimage: previewImageDefault, taskId: 3},
        {author: "Bob", isTried: true, name: "работа с JSON1", description: "Создайте страницу, которая отобразит сообщение «Я JavaScript!».", previewimage: previewImageDefault, taskId: 3}],
      }
  },
  mounted() {
    this.test();
  },
  methods: {
      test() {
        this.$store.state.homeTasks = this.tasks;
      },
      getTasks() {
        let i = 0;
        let maxI = this.tasks.length >= 2 ? 2 : this.tasks.length;
        let arr = [];
        if (this.$store.state.endIndex == 0)
        {
          this.tasks.forEach(function(item) {
            if (i == maxI)
              return arr;
            else
              i++;
            arr.push(item);
        });

          return arr;
        }

        else {
          arr.push(this.tasks[this.$store.state.startIndex]);
          arr.push(this.tasks[this.$store.state.endIndex]);

          return arr
        }
      },     
      calculatePages(length) {
        return length != 0 ? Math.ceil(length / 2) : 0;
      },
      async loadTasks() {
        let data = await axios({
            method: 'get',
            url: process.env.VUE_APP_API_URL,
            responseType: 'json'
        }).then(function (response) {
            if (response.status == 200) {
                return response.data;
            }

            return [];
        });
        this.tasks = data;
      },
      getPreview(id) {
        let task = this.tasks.find(t => t.id == id);
        if (!task)
          return previewImageDefault;
          
        return task.previewimage;
      }
  }
};
</script>

<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    user-select: none;

    hr {
        background-color: #A0C6F8;
        height: 0.4px;
        width: 100%;
    }
      
    .main__upper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      #search__bar {
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        width: 60%;
        height: 44px;
        border-radius: 15px;
        border-width: 1px;
        border-color: #7AA7E2;
        background-color: #ECF4FE;
      }

      #create__task {
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        width: 15%;
        height: 40px;
        margin-left: 50%;
        border-radius: 20px;
        border-width: 0px;
        background-color: #FF570C;
        opacity: 80%;
      }

      #create__task:hover{
        background-color: #d45013;
      }
    }

    .main__body{
      .pages {
        display: flex;
        justify-content: space-evenly;
      }

      .filtered__tasks{
        margin: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }

      .filters {
        display: flex;
        flex-direction: row;
        height: 30px;
        justify-content: space-evenly;

        .left__filters {
          display:flex;
          flex-direction: row;
          justify-content: space-evenly;
          background-color: #EFEFEF;
          border-radius: 15px;
          width: 20%;


          #filter__new , #filter__solutions, #filter__likes{
            font-family:Verdana, Geneva, Tahoma, sans-serif;
            background-color: #FF570C;
            opacity: 80%;
            border-width: 0px;
            border-radius: 15px;
            width: 26%;
          }

          #filter__new:hover, #filter__solutions:hover, #filter__likes:hover{
            background-color:#d45013;
          }
        }

        #tasks {
          font-family:Verdana, Geneva, Tahoma, sans-serif;
          display: flex;
          justify-content: center;
          text-align: center;
          background-color: #9AA5AC;
          color: white;
          border-radius: 15px;
          width:10%;
          padding-top: 5px;
        } 

        

        .right__filters {
          display:flex;
          flex-direction: row;
          justify-content: space-evenly;
          background-color: #EFEFEF;
          border-radius: 15px;
          width: 20%;

          #filter__html , #filter__css, #filter__js{
            font-family:Verdana, Geneva, Tahoma, sans-serif;
            background-color: #FF570C;
            opacity: 80%;
            border-width: 0px;
            border-radius: 15px;
            width: 26%;
          }
          #filter__html:hover , #filter__css:hover, #filter__js:hover{
            background-color: #d45013;
          }
        }
      }
    }
  }
</style>