import { createStore } from 'vuex'

export default createStore({
  state: {
    homeTasks: [],
    authorized: false
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
