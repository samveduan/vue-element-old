const state = {
    name: "Green",
    age: 28,
    address: '湖南长沙',
    job: '书记'
}

const getters = {
    getName(state){
        return state.name;
    },
    getAge(state){
        return state.age;
    },
    getAddress(state){
        return state.address;
    },
    getJob(state){
        return state.job;
    }
}

const mutations = {
    setName(state){
        state.name = 'Jim Green';
    },
    setAge(state, value){
        state.age += value;
    },
    setAddress(state, value){
        state.address = value
    },
    setJob(state, value){
        state.job = value;
    }
}

const actions = {
    asyncSetName(context){
        context.commit("setName");
    },
    asyncSetAge(context, value){
        context.commit("setAge", value);
    },
    asyncSetAddress(context, value){
        context.commit("setAddress", value);
    },
    asyncSetJob(context, value){
        context.commit("setJob", value);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}