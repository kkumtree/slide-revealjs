# Reveal.js 끄적여보기

## 감상

- Markup 작성이 편한 경우 재미난 기능을 쓸 수 있는 것 같음.  
- 지금은, Markdown으로 정리하고 싶어서 나중에 활용예정.

## SETUP

### Package

- yarn version: v1.22.22  

```bash
yarn init -y
yarn add reveal.js
yarn add --dev @types/reveal.js typescript webpack webpack-cli ts-loader
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "ESNext",
    "lib": ["ES2017", "DOM"],
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Webpack

- dependency

```bash
yarn add --dev html-webpack-plugin style-loader css-loader webpack-dev-server copy-webpack-plugin
```  
- webpack.config.js

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/markdown', to: 'markdown' }
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
```

### src/index.ts

```typescript
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import RevealSearch from 'reveal.js/plugin/search/search.esm';
import RevealZoom from 'reveal.js/plugin/zoom/zoom.esm'
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm'

// reveal.js 초기화
const deck = new Reveal({
  hash: true,
  transition: 'slide',
  plugins: [RevealSearch, RevealZoom, RevealMarkdown],
  view: 'scroll',
  scrollProgress: true,
  // 기타 설정 옵션들
});

deck.initialize().then(() => {
  console.log('Reveal.js 초기화 완료');
});
```  

### src/index.html

- 외부 markdown 임포트

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Presentation</title>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            <section data-markdown="markdown/slides.md" 
                     data-separator="^\n---\n$" 
                     data-separator-vertical="^\n--\n$">
            </section>
        </div>
    </div>
</body>
</html>
```  
