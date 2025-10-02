// 過去問リポジトリのデータを現在の形式に変換するスクリプト
const fs = require('fs');
const path = require('path');

// 現在のquestions.jsを読み込み
const currentQuestionsPath = '/home/user/webapp/questions.js';
const pastQuestionsDir = '/home/user/kihonjoho2-exam-app/src/data';

// 過去問ファイルリスト
const pastQuestionFiles = [
    'r5Questions.ts',
    'r5BQuestions.ts', 
    'r6Questions.ts',
    'r6BQuestions.ts',
    'r7Questions.ts',
    'r7BQuestions.ts',
    'practiceQuestions.ts',
    'moreQuestions.ts',
    'moreBQuestions.ts',
    'sampleQuestions.ts'
];

// TypeScriptファイルから問題データを抽出する関数
function extractQuestionsFromTS(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // export const xxxQuestions: Question[] = [ の部分を見つける
        const match = content.match(/export\s+const\s+\w+Questions?:\s*Question\[\]\s*=\s*(\[[\s\S]*?\]);?/);
        if (!match) return [];
        
        // JSONとして評価できるように調整
        let questionsStr = match[1];
        
        // TypeScript固有の構文を削除/変換
        questionsStr = questionsStr
            .replace(/\/\*[\s\S]*?\*\//g, '') // コメント削除
            .replace(/\/\/.*$/gm, '') // 行コメント削除
            .replace(/'/g, '"') // シングルクォートをダブルクォートに
            .replace(/(\w+):/g, '"$1":') // プロパティキーをダブルクォートで囲む
            .replace(/,(\s*[\}\]])/g, '$1'); // 末尾のカンマを削除
        
        const questions = eval(questionsStr);
        return questions;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
        return [];
    }
}

// 過去問データを現在の形式に変換
function convertToCurrentFormat(question, sourceFile) {
    const year = sourceFile.includes('r5') ? 'R5' : 
                 sourceFile.includes('r6') ? 'R6' : 
                 sourceFile.includes('r7') ? 'R7' : 'PRACTICE';
    
    const categoryType = question.category === 'A' ? 'subject_a' : 
                        question.category === 'B' ? 'algorithm' : 'algorithm';
    
    return {
        id: question.id.toLowerCase(),
        category: categoryType,
        level: question.category === 'A' ? 'basic' : 
               (question.text.length > 300 ? 'advanced' : 'standard'),
        text: question.text,
        code: question.code || null,
        choices: question.options || question.choices,
        correct: question.correctAnswer,
        explanation: question.explanation,
        keyPoints: `${question.topic}の重要問題`,
        relatedInfo: `出典: 基本情報技術者試験 ${year}年度`,
        year: year,
        originalTopic: question.topic,
        hasImage: !!question.image || !!question.images
    };
}

console.log('過去問データの変換を開始します...');

let allPastQuestions = {
    subject_a: [],
    algorithm: [],
    past_r5_a: [],
    past_r5_b: [],
    past_r6_a: [],  
    past_r6_b: [],
    past_r7_a: [],
    past_r7_b: [],
    practice: []
};

// 各過去問ファイルを処理
pastQuestionFiles.forEach(filename => {
    const filePath = path.join(pastQuestionsDir, filename);
    if (fs.existsSync(filePath)) {
        console.log(`Processing ${filename}...`);
        const questions = extractQuestionsFromTS(filePath);
        
        questions.forEach(question => {
            const converted = convertToCurrentFormat(question, filename);
            
            // 年度別とカテゴリー別に分類
            if (filename.includes('r5')) {
                if (question.category === 'A') {
                    allPastQuestions.past_r5_a.push(converted);
                } else {
                    allPastQuestions.past_r5_b.push(converted);
                }
            } else if (filename.includes('r6')) {
                if (question.category === 'A') {
                    allPastQuestions.past_r6_a.push(converted);
                } else {
                    allPastQuestions.past_r6_b.push(converted);
                }
            } else if (filename.includes('r7')) {
                if (question.category === 'A') {
                    allPastQuestions.past_r7_a.push(converted);
                } else {
                    allPastQuestions.past_r7_b.push(converted);
                }
            } else {
                // practice, more, sampleは練習問題として
                if (question.category === 'A') {
                    allPastQuestions.subject_a.push(converted);
                } else {
                    allPastQuestions.algorithm.push(converted);
                }
            }
        });
        
        console.log(`  -> ${questions.length}問を変換`);
    }
});

// 統計を表示
console.log('\n=== 変換結果統計 ===');
Object.keys(allPastQuestions).forEach(category => {
    console.log(`${category}: ${allPastQuestions[category].length}問`);
});

// 既存のquestions.jsと統合
console.log('\n既存のquestions.jsと統合中...');
const output = `// 基本情報技術者試験 完全問題データベース
// 過去問 + アルゴリズム問題 + 科目A問題の統合版
// 自動生成日: ${new Date().toLocaleString('ja-JP')}

const questions = ${JSON.stringify(allPastQuestions, null, 2)};

// エクスポート（ブラウザ環境では不要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questions };
}
`;

// 新しいファイルとして保存
const outputPath = '/home/user/webapp/questions_integrated.js';
fs.writeFileSync(outputPath, output, 'utf8');

console.log(`\n統合完了！新しいファイル: ${outputPath}`);
console.log(`総問題数: ${Object.values(allPastQuestions).reduce((sum, arr) => sum + arr.length, 0)}問`);