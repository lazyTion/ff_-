// 测试国际化样式集成
const fs = require('fs');
const path = require('path');

console.log('🔍 检查国际化样式集成状态...\n');

// 检查样式文件
const stylesPath = '/workspace/ff_-/仓储小程序/styles/i18n-styles.css';
if (fs.existsSync(stylesPath)) {
    console.log('✅ 国际化样式文件存在');
} else {
    console.log('❌ 国际化样式文件不存在');
}

// 检查工具函数
const utilsPath = '/workspace/ff_-/仓储小程序/utils/i18n.js';
if (fs.existsSync(utilsPath)) {
    const utilsContent = fs.readFileSync(utilsPath, 'utf8');
    const hasStyleFunctions = utilsContent.includes('getLanguageClass') && 
                             utilsContent.includes('getResponsiveFontSize') &&
                             utilsContent.includes('getResponsiveWidth');
    if (hasStyleFunctions) {
        console.log('✅ 国际化工具函数完整');
    } else {
        console.log('❌ 国际化工具函数不完整');
    }
} else {
    console.log('❌ 国际化工具文件不存在');
}

// 检查页面集成状态
const pagesDir = '/workspace/ff_-/仓储小程序/pages';
const checkPageIntegration = (pagePath) => {
    if (!fs.existsSync(pagePath)) return null;
    
    const content = fs.readFileSync(pagePath, 'utf8');
    const checks = {
        hasLanguageImport: content.includes('import zh from') && content.includes('import ru from'),
        hasGetLanguageClass: content.includes('getLanguageClass'),
        hasLanguageClassData: content.includes('languageClass:'),
        hasLanguageClassBinding: content.includes(':class="languageClass"'),
        hasStyleImport: content.includes('@import') && content.includes('i18n-styles'),
        hasSemanticClasses: content.includes('input-text') || content.includes('button-text') || content.includes('label-text')
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    return { checks, score, total: Object.keys(checks).length };
};

// 检查关键页面
const keyPages = [
    'login/login.nvue',
    'index/index.vue',
    'rfid/rfid.vue',
    'rfidCheck/rfidCheck.vue',
    'selectResult/selectResult.vue'
];

console.log('\n📄 页面集成状态:');
keyPages.forEach(page => {
    const fullPath = path.join(pagesDir, page);
    const result = checkPageIntegration(fullPath);
    
    if (result) {
        const percentage = Math.round((result.score / result.total) * 100);
        const status = percentage >= 80 ? '✅' : percentage >= 50 ? '⚠️' : '❌';
        console.log(`${status} ${page}: ${result.score}/${result.total} (${percentage}%)`);
        
        if (percentage < 100) {
            const missing = Object.entries(result.checks)
                .filter(([key, value]) => !value)
                .map(([key]) => key);
            console.log(`   缺失: ${missing.join(', ')}`);
        }
    } else {
        console.log(`❌ ${page}: 文件不存在`);
    }
});

// 检查所有有国际化的页面
console.log('\n📊 所有国际化页面统计:');
const allPages = [];
const scanDir = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else if (file.endsWith('.vue') || file.endsWith('.nvue')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('import zh from') && content.includes('import ru from')) {
                const relativePath = path.relative(pagesDir, fullPath);
                const result = checkPageIntegration(fullPath);
                allPages.push({ path: relativePath, ...result });
            }
        }
    });
};

scanDir(pagesDir);

const totalPages = allPages.length;
const fullyIntegrated = allPages.filter(p => p.score === p.total).length;
const partiallyIntegrated = allPages.filter(p => p.score > 0 && p.score < p.total).length;
const notIntegrated = allPages.filter(p => p.score === 0).length;

console.log(`总页面数: ${totalPages}`);
console.log(`完全集成: ${fullyIntegrated} (${Math.round(fullyIntegrated/totalPages*100)}%)`);
console.log(`部分集成: ${partiallyIntegrated} (${Math.round(partiallyIntegrated/totalPages*100)}%)`);
console.log(`未集成: ${notIntegrated} (${Math.round(notIntegrated/totalPages*100)}%)`);

console.log('\n🎯 集成建议:');
if (fullyIntegrated === totalPages) {
    console.log('✅ 所有页面都已完全集成国际化样式支持！');
} else {
    console.log('📝 需要完善的页面:');
    allPages.filter(p => p.score < p.total).forEach(page => {
        const missing = Object.entries(page.checks)
            .filter(([key, value]) => !value)
            .map(([key]) => key);
        console.log(`   ${page.path}: ${missing.join(', ')}`);
    });
}

console.log('\n🚀 测试完成！');