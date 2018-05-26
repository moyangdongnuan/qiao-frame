/**
 * 定义操作列上的按钮
 * add by sunli 2018-5-26
 **/

const startedCond = (scope) => {
  return scope.row.category === '0'
}
const replyConfigBtnList = [
  {
    id: 'view',
    title: '查看',
    isShow: true, // 是否显示
    isPermission: true // 是否进行权限认证
  }, {
    id: 'edit',
    title: '编辑',
    isShow: true, // 是否显示
    isPermission: true // 是否进行权限认证
  }, {
    id: 'auditing',
    title: '审核',
    isShow: true, // 是否显示
    isPermission: true, // 是否进行权限认证
    cond: startedCond
  }, {
    id: 'delete',
    title: '删除',
    isShow: true, // 是否显示
    isPermission: true // 是否进行权限认证
  }]
export {replyConfigBtnList}
