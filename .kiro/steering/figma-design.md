---
inclusion: always
---

# Figma 设计稿转换规范

## 一、基本原则

Figma 设计稿使用 2x 倍率，代码实现时需要进行相应换算。

## 二、需要 ÷2 的属性

以下属性从 Figma 获取数值后，必须除以 2：

**尺寸类**
- width（宽度）
- height（高度）
- min-width / max-width
- min-height / max-height

**间距类**
- margin（外边距）
- padding（内边距）
- gap（间隙）

**定位类**
- top / right / bottom / left
- inset

**边框与圆角**
- border-width（边框宽度）
- border-radius（圆角）
- outline-width

**其他**
- font-size（字号）
- line-height（行高，数值型）
- letter-spacing（字间距）
- text-indent（文本缩进）
- box-shadow 中的偏移量和模糊半径

## 三、不需要 ÷2 的属性

以下属性直接使用 Figma 中的原始值：

- font-weight（字重）
- opacity（透明度）
- z-index（层级）
- flex 相关比例值（flex-grow / flex-shrink）
- transform 中的 scale / rotate 值
- 百分比单位的值（如 width: 50%）
- line-height 为比例值时（如 1.5）

## 四、换算示例

Figma 标注：
```
width: 200px
height: 100px
padding: 32px
font-size: 28px
font-weight: 500
border-radius: 16px
```

代码实现：
```css
width: 100px;      /* 200 ÷ 2 */
height: 50px;      /* 100 ÷ 2 */
padding: 16px;     /* 32 ÷ 2 */
font-size: 14px;   /* 28 ÷ 2 */
font-weight: 500;  /* 不变 */
border-radius: 8px; /* 16 ÷ 2 */
```

## 五、注意事项

- 遇到奇数值时，优先使用 `0.5px` 或四舍五入
- 如设计稿标注不清晰，主动确认后再实现
- 组件库已有的标准尺寸优先使用，避免自定义
