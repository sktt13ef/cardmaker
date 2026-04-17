// 测试 JSON 格式解析
const testJson = `{
  "mainTitle": "图吧工具箱程序简介",
  "cards": [
    {
      "title": "工具定位",
      "desc": "图吧工具箱是开源免费的硬件检测工具合集，面向硬件极客、DIY 爱好者及各类用户。",
      "icon": "memory"
    },
    {
      "title": "专业属性",
      "desc": "专注收集各类硬件检测、评分、测试工具，市面上常见相关工具均有收录。",
      "icon": "analytics"
    },
    {
      "title": "绿色便捷",
      "desc": " 提供<code>Rar</code>压缩包，解压即可使用，无需安装、注册与卸载操作。",
      "icon": "archive"
    }
  ]
}`;

// 模拟 parseMarkdownToContent 函数
function parseJsonToContent(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== 'object') return null;
  const mainTitle = typeof parsed.mainTitle === 'string' ? parsed.mainTitle.trim() : '';
  if (!mainTitle || !Array.isArray(parsed.cards)) return null;

  const ICON_PATTERN = /^[a-z0-9][a-z0-9_,\-\s]{1,150}$/i;
  
  const cards = parsed.cards
    .map((card) => {
      if (!card || typeof card !== 'object') return null;
      const title = typeof card.title === 'string' ? card.title.trim() : '';
      const desc = typeof card.desc === 'string' ? card.desc.trim() : '';
      const iconValue = typeof card.icon === 'string' ? card.icon.trim() : '';
      if (!title || !desc) return null;

      return {
        title,
        desc,
        icon: ICON_PATTERN.test(iconValue) ? iconValue : 'article',
      };
    })
    .filter((card) => card !== null);

  if (cards.length === 0) return null;
  return { mainTitle, cards: cards.slice(0, 8) };
}

// 测试
const result = parseJsonToContent(testJson);
console.log('解析结果:');
console.log(JSON.stringify(result, null, 2));
