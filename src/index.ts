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
  // 기타 설정 옵션들
  view: 'scroll',
  scrollProgress: true,
});

deck.initialize().then(() => {
  console.log('Reveal.js 초기화 완료');
});
