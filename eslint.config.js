// ESLint 配置文件
// 使用 @tywd/shared-configs 中的共享配置

// 检查是否在 tywd-toolkit 工作区内
try {
  // 尝试加载工作区内的 shared-configs
  const { existsSync } = require('fs');
  const { join } = require('path');
  
  // 检查是否在 tywd-toolkit 工作区内
  const isInTywdWorkspace = () => {
    let currentDir = process.cwd();
    while (currentDir !== '/') {
      if (existsSync(join(currentDir, 'pnpm-workspace.yaml'))) {
        const workspaceContent = require('fs').readFileSync(join(currentDir, 'pnpm-workspace.yaml'), 'utf8');
        if (workspaceContent.includes('packages/*')) {
          return true;
        }
      }
      currentDir = join(currentDir, '..');
    }
    return false;
  };
  
  if (isInTywdWorkspace()) {
    // 在工作区内，使用共享配置的扁平格式（ESLint 9.0.0+）
    module.exports = require('@tywd/shared-configs/eslint/flat');
  } else {
    // 在工作区外，使用共享配置的传统格式
    module.exports = require('@tywd/shared-configs/eslint');
  }
} catch (error) {
  // 如果在工作区外或出现错误，使用基本配置
  module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {}
  };
}