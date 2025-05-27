import js from '@eslint/js'; // 匯入 ESLint 的 JavaScript 規則
import globals from 'globals'; // 匯入全域變數設定
import reactHooks from 'eslint-plugin-react-hooks'; // 匯入 React Hooks 的 ESLint 插件
import reactRefresh from 'eslint-plugin-react-refresh'; // 匯入 React Refresh 的 ESLint 插件
import tseslint from 'typescript-eslint'; // 匯入 TypeScript ESLint 解析器與規則

export default tseslint.config(
  { ignores: ['dist'] }, // 忽略 dist 資料夾中的檔案
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended], // 繼承 ESLint 推薦規則與 TypeScript ESLint 推薦規則
    files: ['**/*.{ts,tsx}'], // 指定 ESLint 作用的檔案類型為 .ts 與 .tsx
    languageOptions: {
      ecmaVersion: 2020, // 設定 ECMAScript 版本為 2020
      globals: globals.browser, // 設定全域變數為瀏覽器環境
    },
    plugins: {
      'react-hooks': reactHooks, // 啟用 React Hooks 插件
      'react-refresh': reactRefresh, // 啟用 React Refresh 插件
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // 套用 React Hooks 推薦規則
      'react-refresh/only-export-components': [
        // 設定 React Refresh 規則
        'warn', // 若違反規則，顯示警告
        { allowConstantExport: true }, // 允許匯出常數
      ],
    },
  }
);
