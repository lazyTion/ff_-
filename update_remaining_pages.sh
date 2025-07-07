#!/bin/bash

# 更新剩余的国际化页面

cd "/workspace/ff_-/仓储小程序/pages"

# 获取所有有国际化支持的页面
pages=$(grep -l "import.*zh.*from.*language" */*.vue | grep -v "index/index.vue" | grep -v "login/login.nvue")

for page in $pages; do
    echo "Processing $page..."
    
    # 获取页面名称
    pageName=$(echo "$page" | cut -d'/' -f1)
    
    # 1. 添加 getLanguageClass 导入
    if grep -q "import { getLanguageClass }" "$page"; then
        echo "  - getLanguageClass import already exists"
    else
        sed -i '/import.*ru.*from.*language\/ru/a\import { getLanguageClass } from '\''@/utils/i18n.js'\'';' "$page"
        echo "  - Added getLanguageClass import"
    fi
    
    # 2. 在模板中添加 :class="languageClass"
    if grep -q ":class=\"languageClass\"" "$page"; then
        echo "  - languageClass binding already exists in template"
    else
        # 查找第一个 <view> 标签并添加 :class
        sed -i '0,/<view>/{s/<view>/<view :class="languageClass">/}' "$page"
        echo "  - Added languageClass binding to template"
    fi
    
    # 3. 在data中添加languageClass
    if grep -q "languageClass:" "$page"; then
        echo "  - languageClass already exists in data"
    else
        sed -i "/lang: zh/a\\				languageClass: 'lang-zh lang-transition page-$pageName'" "$page"
        echo "  - Added languageClass to data"
    fi
    
    # 4. 在onShow中添加languageClass更新
    if grep -q "this.languageClass = getLanguageClass" "$page"; then
        echo "  - languageClass update already exists in onShow"
    else
        sed -i "/this.lang = this.currentLang === 'zh' ? zh : ru;/a\\			this.languageClass = getLanguageClass(this.currentLang, 'page-$pageName');" "$page"
        echo "  - Added languageClass update to onShow"
    fi
    
    # 5. 在onLoad中添加languageClass初始化（如果存在onLoad）
    if grep -q "onLoad" "$page"; then
        if grep -A5 -B5 "onLoad" "$page" | grep -q "this.languageClass = getLanguageClass"; then
            echo "  - languageClass initialization already exists in onLoad"
        else
            # 在onLoad中的语言初始化后添加
            sed -i "/onLoad.*{/,/}/ { /this.lang = this.currentLang === 'zh' ? zh : ru;/a\\			this.languageClass = getLanguageClass(this.currentLang, 'page-$pageName'); }" "$page"
            echo "  - Added languageClass initialization to onLoad"
        fi
    fi
    
    # 6. 在样式部分添加国际化样式导入
    if grep -q "@import.*i18n-styles" "$page"; then
        echo "  - i18n styles import already exists"
    else
        sed -i '/<style[^>]*>/a\/* 导入国际化样式 */\n@import '\''@/styles/i18n-styles.css'\'';' "$page"
        echo "  - Added i18n styles import"
    fi
    
    # 7. 替换固定的字体大小类名为语义化类名
    sed -i 's/font-30/input-text/g' "$page"
    sed -i 's/font-28/label-text/g' "$page"
    sed -i 's/font-34/button-text/g' "$page"
    sed -i 's/font-32/content-text/g' "$page"
    sed -i 's/font-26/small-text/g' "$page"
    
    echo "  - Completed $page"
    echo ""
done

echo "All remaining pages updated successfully!"