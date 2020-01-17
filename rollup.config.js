import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: 'app.js',
  output: {file: 'bundle.js', format: 'esm'},
  plugins: [nodeResolve()]
}