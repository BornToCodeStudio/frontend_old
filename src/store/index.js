import { createStore } from 'vuex'

export default createStore({
  state: {
    homeTasks: [],
    startIndex: 0,
    endIndex: 0,
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
