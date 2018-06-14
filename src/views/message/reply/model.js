const FormModel = {
  id: null,
  username: null, // 回复人姓名
  content: null, // 回复内容
  postId: null, // 发帖id
  forumTitle: null, // 所属帖子标题
  isLeaf: '1', // 是否子节点
  category: '0', // 审核标识
  parentId: null, // 父节点ID
  parentName: null, // 上级回复人姓名
  parentContent: null // 上级回复内容
}
export default FormModel
