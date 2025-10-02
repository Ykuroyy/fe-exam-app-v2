// 過去問PDFファイルを各問題に自動的に割り当てるスクリプト
const fs = require('fs');
const path = require('path');

// PDFファイルのマッピング
const pdfMapping = {
    // 令和5年度（2023）
    'past_r5_a': 'pdfs/2023r05_fe_kamoku_a_qs.pdf',
    'past_r5_b': 'pdfs/2023r05_fe_kamoku_b_qs.pdf',
    
    // 令和6年度（2024）
    'past_r6_a': 'pdfs/2024r06_fe_kamoku_a_qs.pdf', 
    'past_r6_b': 'pdfs/2024r06_fe_kamoku_b_qs.pdf',
    
    // 令和7年度（2025）
    'past_r7_a': 'pdfs/2025r07_fe_kamoku_a_qs.pdf',
    'past_r7_b': 'pdfs/2025r07_fe_kamoku_b_qs.pdf'
};

function updateQuestionsWithPDF() {
    console.log('📄 過去問PDFファイルの割り当てを開始...');
    
    // questions.jsファイルを読み込み
    let questionsContent = fs.readFileSync('questions.js', 'utf8');
    
    // 各カテゴリに対してPDFファイルを追加
    Object.entries(pdfMapping).forEach(([category, pdfUrl]) => {
        console.log(`🔍 ${category} カテゴリに ${pdfUrl} を割り当て中...`);
        
        // 該当カテゴリの問題を検索して更新
        const categoryRegex = new RegExp(`(${category}:\\s*\\[\\s*)(.*?)(\\s*\\])`, 'gs');
        
        questionsContent = questionsContent.replace(categoryRegex, (match, prefix, content, suffix) => {
            let updatedContent = content;
            
            // 各問題にpdfUrlフィールドを追加
            updatedContent = updatedContent.replace(
                /"code":\s*(null|"[^"]*"),/g,
                (codeMatch) => `${codeMatch}\n                    "pdfUrl": "${pdfUrl}",`
            );
            
            return prefix + updatedContent + suffix;
        });
        
        console.log(`✅ ${category} カテゴリの更新完了`);
    });
    
    // 更新されたファイルを保存
    fs.writeFileSync('questions_with_pdf.js', questionsContent);
    console.log('✅ questions_with_pdf.js に保存完了');
    
    // 統計情報を出力
    const pdfCount = (questionsContent.match(/"pdfUrl":/g) || []).length;
    console.log(`📊 合計 ${pdfCount} 問にPDFファイルを割り当てました`);
}

// より精密な更新関数
function updateQuestionsWithPDFPrecise() {
    console.log('📄 精密なPDF割り当てを開始...');
    
    // questions.jsの内容を読み込み
    const questionsContent = fs.readFileSync('questions.js', 'utf8');
    
    // 各カテゴリ別に処理
    Object.entries(pdfMapping).forEach(([category, pdfUrl]) => {
        console.log(`🔍 ${category} -> ${pdfUrl}`);
        
        // カテゴリセクションを特定
        const startPattern = `${category}:\\s*\\[`;
        const endPattern = `\\]`;
        
        const startMatch = questionsContent.search(new RegExp(startPattern));
        if (startMatch === -1) {
            console.log(`⚠️  ${category} カテゴリが見つかりませんでした`);
            return;
        }
        
        // ブラケットレベルでセクションを特定
        let bracketCount = 0;
        let inCategory = false;
        let sectionStart = -1;
        let sectionEnd = -1;
        
        for (let i = startMatch; i < questionsContent.length; i++) {
            const char = questionsContent[i];
            
            if (char === '[') {
                if (!inCategory) {
                    inCategory = true;
                    sectionStart = i;
                }
                bracketCount++;
            } else if (char === ']') {
                bracketCount--;
                if (bracketCount === 0 && inCategory) {
                    sectionEnd = i + 1;
                    break;
                }
            }
        }
        
        if (sectionStart !== -1 && sectionEnd !== -1) {
            const categorySection = questionsContent.substring(sectionStart, sectionEnd);
            console.log(`📝 ${category} セクションを特定しました (${sectionEnd - sectionStart} 文字)`);
        } else {
            console.log(`❌ ${category} セクションの範囲を特定できませんでした`);
        }
    });
}

// 実行
if (require.main === module) {
    try {
        updateQuestionsWithPDFPrecise();
        updateQuestionsWithPDF();
    } catch (error) {
        console.error('❌ エラーが発生しました:', error.message);
    }
}

module.exports = { updateQuestionsWithPDF, pdfMapping };