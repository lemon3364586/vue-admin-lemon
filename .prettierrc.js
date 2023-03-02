// 使用默认值的都注释掉了，需要修改可自行打开
module.exports = {
  // 单行最大长度 default:80
  printWidth: 120,
  // 缩进是否使用 tab
  useTabs: false,
  // 一个tab对应的空格数
  tabWidth: 2,
  // 语句行末是否添加分号
  semi: true,
  // 是否使用单引号 default:false
  singleQuote: true,
  // 对象元素是否需要引号 default:"as-needed"
  // quoteProps: 'as-needed',
  // jsx单引号 default:false
  // jsxSingleQuote: true,
  // 最后一个对象元素加逗号 <es5|none|all>,default:"es5"
  trailingComma: 'none',
  // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格 default:true
  // bracketSpacing: false,
  // 将 > 多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）。default:false
  // jsxBracketSameLine: false,
  // 单个参数的箭头函数使用括号 <always|avoid>,default:"always"
  // arrowParens: 'always',
  // 是否仅格式化文件开始位置存在特殊注释的代码
  requirePragma: false,
  // 在已被 preitter 格式化的文件顶部加上标注
  insertPragma: false,
  // 文章换行,默认会对markdown文件换行format在printwidth以内 <always|never|preserve>
  proseWrap: 'never',
  // HTML空白敏感性 <css/ignore/strict>,default:"css"
  htmlWhitespaceSensitivity: 'ignore',
  // 在 *.vue 文件中 Script 和 Style 标签内的代码是否缩进 default:false
  vueIndentScriptAndStyle: false,
  // 末尾换行符 <lf|crlf|cr|auto>,default:"lf"
  endOfLine: 'lf',
  // 对引用代码进行格式化
  embeddedLanguageFormatting: 'auto'
  // 在Html，Vue，JSX中是否强制每条属性占用一行,default:false
  // singleAttributePerLine:false
};
