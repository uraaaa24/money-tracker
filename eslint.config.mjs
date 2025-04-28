
// eslint.config.mjs
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import eslintPluginImport from 'eslint-plugin-import'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  /* --- 以下のファイルは ESLint の対象外 --- */
  {
    ignores: ['**/components/ui/**'],
  },

  /* --- Next.js 推奨設定 (FlatCompat で旧extendsを取り込む) --- */
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  /* --- 共通ルール (TypeScript ファイル対象) --- */
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      /* ----- import 並べ替え＆空行グループ ----- */
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'type',
            'object',
          ],
          pathGroups: [
            { pattern: 'react', group: 'builtin', position: 'before' },
            { pattern: '@/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',           // ← グループ間 1 行空ける
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
]

export default eslintConfig
