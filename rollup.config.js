import svelte from 'rollup-plugin-svelte';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'renderer/src/main.js',
  output: {
    sourcemap: true,
    format: 'cjs',
    name: 'app',
    file: 'renderer/dist/bundle.js',
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('renderer/dist/bundle.css');
      },
    }),
    production && terser(),
    nodeResolve(),
    json(),
  ],
  watch: {
    clearScreen: false,
  },
};
