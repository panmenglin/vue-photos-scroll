'use strict';

module.exports = {
    messages:{
        type: '请选择一个代码提交类型',
        scope: '选择一个当前提交所属模块',
        subject: '简短描述一下你的本次提交内容',
        body: '详细描述一下你的本次提交内容(可以跳过)',
        footer: '列出本次提交解决的Bug的Id E.g: 关闭 #32, #33'
    },
  types: [
    {
      value: 'feat',
      name : 'Feat:新功能开发'
    },
    {
      value: 'fix',
      name : 'Fix:Bug 修复'
    },
    {
      value: 'refactor',
      name : 'Refactor:代码重构'
    },
    {
      value: 'docs',
      name : 'Docs:文档调整'
    },
    {
      value: 'test',
      name : 'Test:测试用例'
    },
    {
      value: 'chore',
      name : 'Chore:修改配置文件'
    },
    {
      value: 'style',
      name : 'Style:代码格式修改'
    },
    {
      value: 'revert',
      name : 'Revert:撤销提交'
    }
  ],

  scopes: [
      {value:'base',name:'base'},
      {value:'config',name:'config'},
      {value:'doc',name:'doc'},
  ],
  allowCustomScopes: false,
  appendBranchNameToCommitMessage:true,
};