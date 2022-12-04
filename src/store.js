import {createStore} from "vuex"

const store = createStore({
    state() {
        return {
            id: 0,
            email: "",
            role_id: 0,
            role: [],
        }
    },
    mutations: {
        updateID(state, newID) {
            state.id = newID;
        },
        updateEmail(state, newEmail) {
            state.email = newEmail;
        },
        updateRole(state, newRole) {
            state.role = newRole;
        },
        login(state, payload) {
            state.id = payload.id;
            state.email = payload.email;
            state.role = payload.role;
        },
        logout(state) {
            state.id = 0;
            state.email = "";
            state.role_id = 0;
            state.role = [];
        }
    },
    getters: {
        getID(state) {
            return state.id;
        },
        getEmail(state) {
            return state.email;
        },
        getRole(state) {
            return state.role;
        },
    }
})

export default store