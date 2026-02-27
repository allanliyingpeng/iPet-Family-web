/**
 * i18n.js — iPet Family 国际化模块
 * 支持中文 / English 切换，无需刷新页面
 *
 * 文本元素：data-i18n="key"  → innerHTML 替换
 * Meta属性：data-i18n-content="key" → content 属性替换
 * 长内容页：#zh-content / #en-content 显示/隐藏切换
 */
(function () {

    /* ================================================================
       语言包（仅存储短文本；privacy/terms 的长内容直接写在 HTML 里）
    ================================================================ */
    var translations = {
        zh: {
            /* 页面 meta */
            pageTitle:        'i 宠家 - iPet Family | AI宠物品种识别、健康咨询、艺术照生成',
            pageDesc:         'AI宠物品种识别、健康咨询、艺术照生成，铲屎官们的必备神器',

            /* 首页主内容 */
            productName:      'i 宠家 - iPet Family',
            slogan:           'AI宠物品种识别、健康咨询、艺术照生成，<br>铲屎官们的必备神器',
            iosUpdate:        'i 宠家 - iPet Family iOS 版 1.0 正式上线',
            androidUpdate:    'i 宠家 - iPet Family 安卓版 1.0 正式上线',
            iosBtn:           'iOS版',
            androidBtn:       'Android版',
            playStoreBtn:     'Play Store版',

            /* 截图占位 */
            screenshot1:      '截图展示区 1<br>请替换为 App 截图',
            screenshot2:      '截图展示区 2<br>请替换为 App 截图',
            screenshot3:      '截图展示区 3<br>请替换为 App 截图',
            screenshot4:      '截图展示区 4<br>请替换为 App 截图',

            /* 手机下方品牌区 */
            brandName:        'i 宠家 - iPet Family',
            tagline:          '更懂你的宠物管家',

            /* Footer */
            copyright:        'Copyright © 2026 i 宠家 - iPet Family. All Rights Reserved.',
            privacy:          '隐私政策',
            terms:            '用户协议',

            /* 隐私政策页 */
            privacyPageTitle: '隐私政策 - i 宠家 iPet Family',

            /* 用户协议页 */
            termsPageTitle:   '用户协议 - i 宠家 iPet Family',

            /* 公共 */
            backHome:         '← 返回首页'
        },

        en: {
            /* 页面 meta */
            pageTitle:        'iPet Family | AI Pet Breed Recognition, Health & Art Photos',
            pageDesc:         'AI Pet Breed Recognition, Health Consultation & Art Photo Generation — A Must-Have for Pet Owners',

            /* 首页主内容 */
            productName:      'iPet Family',
            slogan:           'AI Pet Breed Recognition, Health Consultation & Art Photo Generation — A Must-Have for Cat and Dog Owners',
            iosUpdate:        'iPet Family iOS 1.0 Now Available',
            androidUpdate:    'iPet Family Android 1.0 Now Available',
            iosBtn:           'iOS',
            androidBtn:       'Android',
            playStoreBtn:     'Play Store',

            /* 截图占位 */
            screenshot1:      'Screenshot 1<br>Replace with App Screenshot',
            screenshot2:      'Screenshot 2<br>Replace with App Screenshot',
            screenshot3:      'Screenshot 3<br>Replace with App Screenshot',
            screenshot4:      'Screenshot 4<br>Replace with App Screenshot',

            /* 手机下方品牌区 */
            brandName:        'iPet Family',
            tagline:          'Your Smart Pet Care Companion',

            /* Footer */
            copyright:        'Copyright © 2026 iPet Family. All Rights Reserved.',
            privacy:          'Privacy Policy',
            terms:            'Terms of Service',

            /* 隐私政策页 */
            privacyPageTitle: 'Privacy Policy - iPet Family',

            /* 用户协议页 */
            termsPageTitle:   'Terms of Service - iPet Family',

            /* 公共 */
            backHome:         '← Back to Home'
        }
    };

    /* ================================================================
       语言检测
    ================================================================ */
    function detectLang() {
        var saved = localStorage.getItem('ipet-lang');
        if (saved && translations[saved]) return saved;
        var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
        return nav.startsWith('zh') ? 'zh' : 'en';
    }

    /* ================================================================
       应用语言
    ================================================================ */
    function applyLang(lang) {
        if (!translations[lang]) return;

        var t = translations[lang];

        /* 1. 更新 <html lang> */
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

        /* 2. 更新所有 data-i18n 元素 */
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) {
                if (el.tagName === 'TITLE') {
                    el.textContent = t[key];
                } else {
                    el.innerHTML = t[key];
                }
            }
        });

        /* 3. 更新 meta content 属性 */
        document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-content');
            if (t[key] !== undefined) {
                el.setAttribute('content', t[key]);
            }
        });

        /* 4. 切换 privacy / terms 页的长内容块 */
        var zhBlock = document.getElementById('zh-content');
        var enBlock = document.getElementById('en-content');
        if (zhBlock) zhBlock.style.display = lang === 'zh' ? '' : 'none';
        if (enBlock) enBlock.style.display = lang === 'en' ? '' : 'none';

        /* 5. 同步切换器按钮激活状态 */
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        /* 6. 持久化 */
        localStorage.setItem('ipet-lang', lang);
    }

    /* ================================================================
       初始化
    ================================================================ */
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                applyLang(btn.getAttribute('data-lang'));
            });
        });
        applyLang(detectLang());
    });

    window.iPetI18n = { apply: applyLang, detect: detectLang };

}());
