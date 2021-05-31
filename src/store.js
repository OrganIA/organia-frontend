import { createStore } from "vuex"

const store = createStore({
    state() {
        return {
            token: "",
            name: "",
            email: "",
        }
    },
    mutations: {
        updateToken(state, newToken) {
            state.token = newToken;
        },
        updateName(state, newName) {
            state.name = newName;
        },
        updateEmail(state, newEmail) {
            state.email = newEmail;
        },
        login(state, newEmail, newName, newToken) {
            state.token = newToken;
            state.name = newName;
            state.email = newEmail;
        },
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getName(state) {
            return state.name;
        },
        getEmail(state) {
            return state.email;
        },
    }
})

export default store