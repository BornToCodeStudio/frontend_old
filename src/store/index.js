import { createStore } from 'vuex'

export default createStore({
  state: {
    homeTasks: []
  },
  getters: {
    getTask: (state) => (id) => {
      return state.homeTasks.find(t => t.taskId === id);
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
