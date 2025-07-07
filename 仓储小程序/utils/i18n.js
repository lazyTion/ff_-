// 国际化工具函数
import zh from '../pages/language/zh.js';
import ru from '../pages/language/ru.js';

/**
 * 获取当前语言包
 * @returns {Object} 语言包对象
 */
export function getCurrentLang() {
    const currentLang = uni.getStorageSync('lang') || 'zh';
    return currentLang === 'zh' ? zh : ru;
}

/**
 * 设置页面标题（支持国际化）
 * @param {string} titleKey - 标题在语言包中的键名
 * @param {Object} lang - 可选的语言包对象，如果不传则自动获取
 */
export function setPageTitle(titleKey, lang = null) {
    if (!lang) {
        lang = getCurrentLang();
    }
    
    // 支持嵌套键名，如 'pageTitle.warehouseManagement'
    const keys = titleKey.split('.');
    let title = lang;
    
    for (const key of keys) {
        if (title && typeof title === 'object' && title.hasOwnProperty(key)) {
            title = title[key];
        } else {
            console.warn(`Title key '${titleKey}' not found in language pack`);
            return;
        }
    }
    
    if (typeof title === 'string') {
        uni.setNavigationBarTitle({
            title: title
        });
    } else {
        console.warn(`Title key '${titleKey}' does not resolve to a string`);
    }
}

/**
 * 页面混入对象，提供通用的国际化功能
 */
export const i18nMixin = {
    data() {
        return {
            currentLang: 'zh',
            lang: zh
        };
    },
    
    methods: {
        /**
         * 初始化语言设置
         * @param {string} titleKey - 页面标题的键名
         */
        initI18n(titleKey = null) {
            this.currentLang = uni.getStorageSync('lang') || 'zh';
            this.lang = this.currentLang === 'zh' ? zh : ru;
            
            if (titleKey) {
                setPageTitle(titleKey, this.lang);
            }
        },
        
        /**
         * 更新语言设置（在onShow中调用）
         * @param {string} titleKey - 页面标题的键名
         */
        updateI18n(titleKey = null) {
            const newLang = uni.getStorageSync('lang') || 'zh';
            if (newLang !== this.currentLang) {
                this.currentLang = newLang;
                this.lang = this.currentLang === 'zh' ? zh : ru;
                
                if (titleKey) {
                    setPageTitle(titleKey, this.lang);
                }
            }
        }
    }
};