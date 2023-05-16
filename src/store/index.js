import { createStore } from 'vuex'

export default createStore({
  state: {
    homeTasks: [],
    authorized: false,
    startIndex: 0,
    endIndex: 0,
    loader: false
  },
  getters: {
    getTask: (state) => (id) => {
      return state.homeTasks.find(t => t.id === id);
    }
  },
  mutations: {
  },
  actions: {
    async loadTasks() {
      let data = await axios({
          method: 'get',
          url: "/tasks/getAll",
          responseType: 'json'
      }).then(function (response) {
          if (response.status == 200) {
              return response.data;
          }

          return [];
      });
      this.$store.state.homeTasks = data;
    },
  },
  modules: {
  }
})
