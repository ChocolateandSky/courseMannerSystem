const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  user: state => state.user.user,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  roleNum: state => state.user.roleNum,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  loginCount: state => state.user.loginCount,
  notice: state => state.user.notice
  // collegeList: state => state.user.collegeList
}
export default getters
