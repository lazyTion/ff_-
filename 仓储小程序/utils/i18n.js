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
 * 应用语言相关的样式类
 * @param {string} lang - 语言代码 ('zh' 或 'ru')
 * @param {string} pageClass - 页面特定的类名（可选）
 * @returns {string} 组合的CSS类名
 */
export function getLanguageClass(lang = 'zh', pageClass = '') {
    const langClass = `lang-${lang}`;
    const transitionClass = 'lang-transition';
    
    if (pageClass) {
        return `${langClass} ${transitionClass} ${pageClass}`;
    }
    
    return `${langClass} ${transitionClass}`;
}

/**
 * 获取文本样式类
 * @param {string} textType - 文本类型 ('title', 'content', 'button', 'label', 'input')
 * @param {string} lang - 语言代码
 * @returns {string} 文本样式类名
 */
export function getTextClass(textType = 'content', lang = 'zh') {
    return `${textType}-text`;
}

/**
 * 切换语言并应用相应样式
 * @param {string} newLang - 新的语言代码
 * @param {object} vueInstance - Vue实例，用于更新数据
 * @param {object} zhLang - 中文语言包
 * @param {object} ruLang - 俄文语言包
 */
export function switchLanguageWithStyle(newLang, vueInstance, zhLang, ruLang) {
    try {
        // 保存语言设置
        uni.setStorageSync('lang', newLang);
        
        // 更新Vue实例的语言数据
        if (vueInstance) {
            vueInstance.currentLang = newLang;
            vueInstance.lang = newLang === 'zh' ? zhLang : ruLang;
            
            // 更新语言样式类
            if (vueInstance.languageClass !== undefined) {
                vueInstance.languageClass = getLanguageClass(newLang, vueInstance.pageClass || '');
            }
        }
        
        console.log(`语言已切换到: ${newLang}`);
    } catch (error) {
        console.error('切换语言失败:', error);
    }
}

/**
 * 获取响应式字体大小
 * @param {string} baseSize - 基础字体大小 (如 '30rpx')
 * @param {string} lang - 语言代码
 * @param {number} ruScale - 俄文缩放比例，默认0.9
 * @returns {string} 调整后的字体大小
 */
export function getResponsiveFontSize(baseSize, lang = 'zh', ruScale = 0.9) {
    if (lang === 'ru' && baseSize.includes('rpx')) {
        const size = parseInt(baseSize);
        const adjustedSize = Math.round(size * ruScale);
        return `${adjustedSize}rpx`;
    }
    return baseSize;
}

/**
 * 获取响应式宽度
 * @param {string} baseWidth - 基础宽度 (如 '630rpx')
 * @param {string} lang - 语言代码
 * @param {number} ruScale - 俄文缩放比例，默认1.1
 * @returns {string} 调整后的宽度
 */
export function getResponsiveWidth(baseWidth, lang = 'zh', ruScale = 1.1) {
    if (lang === 'ru' && baseWidth.includes('rpx')) {
        const width = parseInt(baseWidth);
        const adjustedWidth = Math.round(width * ruScale);
        return `${adjustedWidth}rpx`;
    }
    return baseWidth;
}

/**
 * 页面混入对象，提供通用的国际化功能
 */
export const i18nMixin = {
    data() {
        return {
            currentLang: 'zh',
            lang: zh,
            languageClass: 'lang-zh lang-transition',
            pageClass: ''
        };
    },
    
    methods: {
        /**
         * 初始化语言设置
         * @param {string} titleKey - 页面标题的键名
         * @param {string} pageClass - 页面特定的类名
         */
        initI18n(titleKey = null, pageClass = '') {
            this.currentLang = uni.getStorageSync('lang') || 'zh';
            this.lang = this.currentLang === 'zh' ? zh : ru;
            this.pageClass = pageClass;
            this.languageClass = getLanguageClass(this.currentLang, pageClass);
            
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
                this.languageClass = getLanguageClass(this.currentLang, this.pageClass);
                
                if (titleKey) {
                    setPageTitle(titleKey, this.lang);
                }
            }
        },
        
        /**
         * 切换语言
         * @param {string} newLang - 新语言代码
         * @param {string} titleKey - 页面标题键名
         */
        switchLanguage(newLang, titleKey = null) {
            switchLanguageWithStyle(newLang, this, zh, ru);
            if (titleKey) {
                setPageTitle(titleKey, this.lang);
            }
        }
    }
};