#!/bin/bash

# 最终修复国际化样式集成

cd "/workspace/ff_-/仓储小程序/pages"

echo "🔧 开始最终修复..."

# 获取所有有国际化支持的页面
pages=$(grep -l "import.*zh.*from.*language" */*.vue | grep -v "index/index.vue" | grep -v "login/login.nvue")

for page in $pages; do
    echo "修复 $page..."
    
    pageName=$(echo "$page" | cut -d'/' -f1)
    
    # 1. 确保模板有 :class="languageClass" 绑定
    if ! grep -q ":class=\"languageClass\"" "$page"; then
        # 查找第一个 <view> 并添加绑定
        sed -i '0,/<view[^>]*>/{s/<view\([^>]*\)>/<view\1 :class="languageClass">/}' "$page"
        echo "  ✅ 添加了 languageClass 绑定"
    fi
    
    # 2. 确保data中有languageClass
    if ! grep -q "languageClass:" "$page"; then
        sed -i "/lang: zh/a\\				languageClass: 'lang-zh lang-transition page-$pageName'," "$page"
        echo "  ✅ 添加了 languageClass 数据属性"
    fi
    
    # 3. 添加语义化CSS类名
    # 替换常见的字体大小类名
    sed -i 's/class="\([^"]*\)font-30\([^"]*\)"/class="\1input-text\2"/g' "$page"
    sed -i 's/class="\([^"]*\)font-28\([^"]*\)"/class="\1label-text\2"/g' "$page"
    sed -i 's/class="\([^"]*\)font-34\([^"]*\)"/class="\1button-text\2"/g' "$page"
    sed -i 's/class="\([^"]*\)font-32\([^"]*\)"/class="\1content-text\2"/g' "$page"
    sed -i 's/class="\([^"]*\)font-26\([^"]*\)"/class="\1small-text\2"/g' "$page"
    sed -i 's/class="\([^"]*\)font-36\([^"]*\)"/class="\1title-text\2"/g' "$page"
    
    # 为常见元素添加语义化类名
    sed -i 's/<input\([^>]*\)class="\([^"]*\)"/<input\1class="\2 input-text"/g' "$page"
    sed -i 's/<button\([^>]*\)class="\([^"]*\)"/<button\1class="\2 button-text"/g' "$page"
    sed -i 's/<text\([^>]*\)class="\([^"]*\)"/<text\1class="\2 label-text"/g' "$page"
    
    # 清理重复的类名
    sed -i 's/input-text input-text/input-text/g' "$page"
    sed -i 's/button-text button-text/button-text/g' "$page"
    sed -i 's/label-text label-text/label-text/g' "$page"
    sed -i 's/content-text content-text/content-text/g' "$page"
    
    echo "  ✅ 添加了语义化CSS类名"
    echo ""
done

echo "🎉 最终修复完成！"

# 运行测试验证
echo "🔍 运行验证测试..."
cd /workspace/ff_-
node test_i18n_integration.js