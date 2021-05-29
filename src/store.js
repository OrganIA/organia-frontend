import { createStore } from "vuex"

const store = createStore({
    state() {
        return {
            token: "",
        }
    },
    mutations: {
        updateToken(state, newToken) {
            state.token = newToken;
        }
    },
    getters: {
        getToken(state) {
            return state.token;
        }
    }
})

export default store