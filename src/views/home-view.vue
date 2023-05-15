<template>
    <main>
      <div class="main__upper">
        <input type="text" id="search__bar" placeholder="Search..">
        <div id="create__task">Создать задачу</div>
      </div>
      <hr>
      <div class="main__body">
        <div class="filters">
          <div class="left__filters">
            <div id="filter__new">Новое</div>
            <div id="filter__solutions">Решения</div>
            <div id="filter__likes">Лайки</div>
          </div>
          <span id="tasks">Задания </span>
          <div class="right__filters">
            <div id="filter__html">HTML</div>
            <div id="filter__css">CSS</div>
            <div id="filter__js">JavaScript</div>
          </div>
        </div>
        <div class="filtered__tasks">
           <HomeTask v-bind:key="index" v-for="(task, index) in getTasks()" :task="task"/>
        </div>
        <div v-show="tasks.length > 0" class="pages">
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
        tasks: [],
      }
  },
  mounted() {
    this.verifySignIn();
  },
  methods: {
      async verifySignIn() {
        try {
          await axios({
            method: "post",
            url: process.env.VUE_APP_API_URL + "/users/verifySignIn",
            withCredentials: true
          }).then((response) => {
            if (response.status == 200)
              this.$store.state.authorized = true;
            else
              this.$store.state.authorized = false;
          });
        }
        catch (error) {
          this.$store.state.authorized = false;

          console.log(error);
        }
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
        width: 60%;
        height: 44px;
        border-radius: 15px;
        border-width: 1px;
        border-color: #7AA7E2;
        background-color: #ECF4FE;
      }

      #create__task {
        width: 15%;
        height: 40px;
        margin-left: 50%;
        border-radius: 20px;
        border-width: 0px;
        background-color: #FF570C;
        opacity: 80%;
        line-height: 40px;
        text-align: center;
        align-items: center;
        white-space: nowrap;

        &:hover {
          background-color: #d45013;
        }
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
            background-color: #FF570C;
            opacity: 80%;
            border-width: 0px;
            border-radius: 15px;
            width: 26%;
            line-height: 30px;
            text-align: center;
          }

          #filter__new:hover, #filter__solutions:hover, #filter__likes:hover{
            background-color:#d45013;
          }
        }

        #tasks {
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
            background-color: #FF570C;
            opacity: 80%;
            border-width: 0px;
            border-radius: 15px;
            width: 26%;
            line-height: 30px;
            text-align: center;
          }
          #filter__html:hover , #filter__css:hover, #filter__js:hover{
            background-color: #d45013;
          }
        }
      }
    }
  }
</style>