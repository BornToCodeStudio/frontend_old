import { createStore } from 'vuex'

export default createStore({
  state: {
    homeTasks: [{"id":2,"title":"Начало","author":"horex","shortDescription":"Знакомство с BornToCode","fullDescription":"Нужно вывести в заголовке h1 текст - \"Привет, мир!\"","codeExample":"1+1=2","htmlStruct":{"checkElementRules":[{"element":"h1","value":"Привет, мир!"}]}}],
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
  },
  modules: {
  }
})
