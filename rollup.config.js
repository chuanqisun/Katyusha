import svelte from 'rollup-plugin-svelte';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'cjs',
    name: 'app',
    file: 'dist/bundle.js',
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('dist/bundle.css');
      },
    }),
    production && terser(),
    nodeResolve(),
  ],
  watch: {
    clearScreen: false,
  },
};
