import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	// Next.js recommended + TS support (via compat)
	...compat.extends('next/core-web-vitals', 'next/typescript'),

	// Prettier plugin
	prettierPlugin,
];

export default eslintConfig;
