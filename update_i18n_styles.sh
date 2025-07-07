#!/bin/bash

# 批量更新所有页面的国际化样式支持

# 页面列表
pages=(
    "rfid/rfid.vue"
    "rfidCheck/rfidCheck.vue"
    "rfidNoCheck/rfidNoCheck.vue"
    "rfidYC/rfidYC.vue"
    "selectResult/selectResult.vue"
    "selectCard/selectCard.vue"
    "cangk/cangk.vue"
    "updatemi/updatemi.vue"
)

cd "/workspace/ff_-/仓储小程序/pages"

for page in "${pages[@]}"; do
    echo "Processing $page..."
    
    # 添加 getLanguageClass 导入
    if grep -q "import { getLanguageClass }" "$page"; then
        echo "  - getLanguageClass import already exists"
    else
        sed -i '/import.*ru.*from.*language\/ru/a\import { getLanguageClass } from '\''@/utils/i18n.js'\'';' "$page"
        echo "  - Added getLanguageClass import"
    fi
    
    # 在data中添加languageClass
    if grep -q "languageClass:" "$page"; then
        echo "  - languageClass already exists in data"
    else
        # 获取页面名称
        pageName=$(echo "$page" | cut -d'/' -f1)
        sed -i "/lang: zh/a\\				languageClass: 'lang-zh lang-transition page-$pageName'" "$page"
        echo "  - Added languageClass to data"
    fi
    
    # 在onShow中添加languageClass更新
    if grep -q "this.languageClass = getLanguageClass" "$page"; then
        echo "  - languageClass update already exists in onShow"
    else
        pageName=$(echo "$page" | cut -d'/' -f1)
        sed -i "/this.lang = this.currentLang === 'zh' ? zh : ru;/a\\			this.languageClass = getLanguageClass(this.currentLang, 'page-$pageName');" "$page"
        echo "  - Added languageClass update to onShow"
    fi
    
    # 在onLoad中添加languageClass初始化（如果存在onLoad）
    if grep -q "onLoad" "$page"; then
        if grep -q "this.languageClass = getLanguageClass.*onLoad" "$page"; then
            echo "  - languageClass initialization already exists in onLoad"
        else
            pageName=$(echo "$page" | cut -d'/' -f1)
            sed -i "/this.lang = this.currentLang === 'zh' ? zh : ru;/a\\			this.languageClass = getLanguageClass(this.currentLang, 'page-$pageName');" "$page"
            echo "  - Added languageClass initialization to onLoad"
        fi
    fi
    
    # 在样式部分添加国际化样式导入
    if grep -q "@import.*i18n-styles" "$page"; then
        echo "  - i18n styles import already exists"
    else
        sed -i '/<style[^>]*>/a\/* 导入国际化样式 */\n@import '\''@/styles/i18n-styles.css'\'';' "$page"
        echo "  - Added i18n styles import"
    fi
    
    echo "  - Completed $page"
    echo ""
done

echo "All pages updated successfully!"