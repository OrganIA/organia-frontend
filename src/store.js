import { createStore } from "vuex"

const store = createStore({
    state() {
        return {
            email: "",
            role_id: 0,
            role: [],
        }
    },
    mutations: {
        updateEmail(state, newEmail) {
            state.email = newEmail;
        },
        updateRoleID(state, newRoleID) {
            state.role_id = newRoleID;
        },
        updateRole(state, newRole) {
            state.role = newRole;
        },
        login(state, payload) {
            console.log("TEST store.js");
            state.email = payload.email;
            state.role = payload.role;
            state.role_id = payload.role.id;
            console.log(state);
        },
        logout(state) {
            state.email = "";
            state.role_id = "";
            state.role = [];
        }
    },
    getters: {
        getEmail(state) {
            return state.email;
        },
        getRoleID(state) {
            return state.role_id;
        },
        getRole(state) {
            return state.role;
        },
    }
})

export default store