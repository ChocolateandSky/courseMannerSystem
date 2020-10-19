// eslint-disable-next-line no-unused-vars
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  user: {},
  loginCount: 1
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_LOGINCOUNT: (state, loginCount) => {
    state.loginCount = loginCount
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    console.log('开始登陆')
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data.token)
        commit('SET_LOGINCOUNT', data.loginCount)
        setToken(data.token)
        resolve()
      }).catch(error => {
        console.log('登陆失败', error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        console.log(data)
        // eslint-disable-next-line no-unused-vars
        data.avatar = `https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif`
        const { roles, realName, avatar, introduction } = data
        // roles must be a non-empty array
        const role = [roles]
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        // eslint-disable-next-line no-const-assign
        commit('SET_USER', data)
        commit('SET_ROLES', role)
        commit('SET_NAME', realName)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // logout({ commit, state, dispatch }) {
  //   console.log(state.token)
  //   const token = state.token
  //   return new Promise((resolve, reject) => {
  //     logout(token).then(() => {
  //       console.log('sssssssssssssssssss')
  //       commit('SET_TOKEN', '')
  //       commit('SET_ROLES', [])
  //       commit('SET_USER', {})
  //       removeToken()
  //       resetRouter()
  //       // reset visited views and cached views
  //       // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
  //       dispatch('tagsView/delAllViews', null, { root: true })
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  logout({ commit, dispatch }) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve) => {
      localStorage.clear()
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_USER', {})
      removeToken()
      resetRouter()
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
      await dispatch('settings/changeSetting', { key: 'activeRole', value: [] }, { root: true })
      resolve()
    })
  },
  setUser({ commit }, user) {
    commit('SET_USER', user)
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
