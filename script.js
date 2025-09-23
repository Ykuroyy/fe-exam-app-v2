// グローバル変数
let currentExamType = '';
let currentQuestionIndex = 0;
let examQuestions = [];
let userAnswers = [];
let startTime = null;
let timerInterval = null;
let examStats = {};

// ローカルストレージキー
const STORAGE_KEYS = {
    STATS: 'fe_exam_stats',
    BOOKMARKS: 'fe_exam_bookmarks',
    HISTORY: 'fe_exam_history',
    WEAKNESS_ANALYSIS: 'fe_weakness_analysis',
    STUDY_PLAN: 'fe_study_plan'
};

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadStats();
});

function initializeApp() {
    console.log('基本情報技術者試験 科目B対策アプリを初期化中...');

    // 統計データの初期化
    if (!localStorage.getItem(STORAGE_KEYS.STATS)) {
        const initialStats = {
            totalExams: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            categoryStats: {
                algorithm: { total: 0, correct: 0 },
                security: { total: 0, correct: 0 }
            },
            lastExamDate: null
        };
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(initialStats));
    }

    // ブックマークの初期化
    if (!localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) {
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify([]));
    }

    // 学習履歴の初期化
    if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
    }

    // 弱点分析データの初期化
    if (!localStorage.getItem(STORAGE_KEYS.WEAKNESS_ANALYSIS)) {
        const initialWeakness = {
            previousScore: 250, // 前回のスコア
            weakAreas: [],
            recommendedQuestions: [],
            lastAnalysisDate: null
        };
        localStorage.setItem(STORAGE_KEYS.WEAKNESS_ANALYSIS, JSON.stringify(initialWeakness));
    }

    // 学習計画の初期化
    if (!localStorage.getItem(STORAGE_KEYS.STUDY_PLAN)) {
        const examDate = new Date();
        examDate.setDate(examDate.getDate() + 2); // 明後日
        
        const initialPlan = {
            examDate: examDate.toISOString(),
            dailyTargets: [],
            completedSessions: 0,
            totalSessions: 12, // 2日×6セッション
            intensiveMode: true
        };
        localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(initialPlan));
    }
}

// 試験開始
function startExam(examType) {
    currentExamType = examType;
    currentQuestionIndex = 0;
    userAnswers = [];

    // 問題選択
    selectExamQuestions(examType);

    if (examQuestions.length === 0) {
        alert('問題データが読み込まれていません。');
        return;
    }

    // UI切り替え
    showScreen('exam-container');

    // タイマー開始
    startTimer();

    // 最初の問題を表示
    displayQuestion();

    console.log(`${examType}試験開始 - ${examQuestions.length}問`);
}

function selectExamQuestions(examType) {
    switch (examType) {
        case 'all':
            // アルゴリズム16問 + セキュリティ4問 = 20問
            const algorithmQuestions = questions.algorithm.slice(0, 16);
            const securityQuestions = questions.security.slice(0, 4);
            examQuestions = [...algorithmQuestions, ...securityQuestions];
            break;
        case 'algorithm':
            examQuestions = questions.algorithm.slice(0, 16);
            break;
        case 'security':
            examQuestions = questions.security.slice(0, 4);
            break;
        default:
            examQuestions = [];
    }

    // 問題をシャッフル（オプション）
    // examQuestions = shuffleArray(examQuestions);
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 問題表示
function displayQuestion() {
    const question = examQuestions[currentQuestionIndex];

    // 進捗更新
    updateProgress();

    // 問題番号と内容
    document.getElementById('question-number').textContent = currentQuestionIndex + 1;
    document.getElementById('question-text').textContent = question.text;

    // コード表示
    const codeElement = document.getElementById('question-code');
    const codeContent = document.getElementById('code-content');
    if (question.code) {
        codeContent.textContent = question.code;
        codeElement.style.display = 'block';
    } else {
        codeElement.style.display = 'none';
    }

    // 選択肢表示
    displayChoices(question.choices);

    // ボタン状態更新
    updateButtonStates();

    // ブックマーク状態更新
    updateBookmarkButton();

    // 解説を隠す
    hideExplanation();
}

function displayChoices(choices) {
    const container = document.getElementById('choices-container');
    container.innerHTML = '';

    choices.forEach((choice, index) => {
        const choiceElement = document.createElement('div');
        choiceElement.className = 'choice-item';
        choiceElement.onclick = () => selectChoice(index);

        const label = String.fromCharCode(65 + index); // A, B, C, D
        choiceElement.innerHTML = `
            <span class="choice-label">${label}.</span>
            <span class="choice-text">${choice}</span>
        `;

        container.appendChild(choiceElement);
    });
}

function selectChoice(choiceIndex) {
    // 全ての選択肢から選択状態を削除
    document.querySelectorAll('.choice-item').forEach(item => {
        item.classList.remove('selected');
    });

    // 選択した選択肢をハイライト
    document.querySelectorAll('.choice-item')[choiceIndex].classList.add('selected');

    // 回答を保存
    userAnswers[currentQuestionIndex] = choiceIndex;

    // 回答ボタンを有効化
    document.getElementById('submit-btn').disabled = false;
}

// 回答提出
function submitAnswer() {
    const question = examQuestions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    const isCorrect = userAnswer === question.correct;

    // 選択肢の色分け
    const choiceItems = document.querySelectorAll('.choice-item');
    choiceItems.forEach((item, index) => {
        item.onclick = null; // クリック無効化

        if (index === question.correct) {
            item.classList.add('correct');
        } else if (index === userAnswer && !isCorrect) {
            item.classList.add('incorrect');
        }
    });

    // 解説表示
    showExplanation(question, isCorrect);

    // ボタン状態更新
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-btn').disabled = false;

    // 統計更新
    updateQuestionStats(question, isCorrect);
}

function showExplanation(question, isCorrect) {
    const explanationArea = document.getElementById('explanation-area');
    const correctAnswerText = document.getElementById('correct-answer-text');
    const explanationContent = document.getElementById('explanation-content');
    const keyPoints = document.getElementById('key-points');
    const relatedInfo = document.getElementById('related-info');

    // 正解表示
    const correctLabel = String.fromCharCode(65 + question.correct);
    correctAnswerText.textContent = `${correctLabel}. ${question.choices[question.correct]}`;

    // 解説内容
    explanationContent.textContent = question.explanation || 'この問題の詳細な解説です。';

    // 重要ポイント
    if (question.keyPoints) {
        keyPoints.innerHTML = `
            <h5>💡 重要ポイント</h5>
            <p>${question.keyPoints}</p>
        `;
        keyPoints.style.display = 'block';
    } else {
        keyPoints.style.display = 'none';
    }

    // 関連知識
    if (question.relatedInfo) {
        relatedInfo.innerHTML = `
            <h5>📚 関連知識</h5>
            <p>${question.relatedInfo}</p>
        `;
        relatedInfo.style.display = 'block';
    } else {
        relatedInfo.style.display = 'none';
    }

    explanationArea.style.display = 'block';
    explanationArea.scrollIntoView({ behavior: 'smooth' });
}

function hideExplanation() {
    document.getElementById('explanation-area').style.display = 'none';
}

// 進捗更新
function updateProgress() {
    const current = currentQuestionIndex + 1;
    const total = examQuestions.length;
    const percentage = (current / total) * 100;

    document.getElementById('current-question').textContent = current;
    document.getElementById('total-questions').textContent = total;
    document.getElementById('progress-fill').style.width = `${percentage}%`;

    // カテゴリバッジ更新
    const question = examQuestions[currentQuestionIndex];
    const categoryBadge = document.getElementById('current-category');
    categoryBadge.textContent = question.category === 'algorithm' ? 'アルゴリズム' : '情報セキュリティ';
}

// ボタン状態更新
function updateButtonStates() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    // 前へボタン
    prevBtn.disabled = currentQuestionIndex === 0;

    // 次へボタン
    nextBtn.disabled = true;

    // 回答ボタン
    submitBtn.disabled = userAnswers[currentQuestionIndex] === undefined;
    submitBtn.style.display = 'inline-block';
}

// ナビゲーション
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < examQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // 試験終了
        finishExam();
    }
}

// タイマー機能
function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (startTime) {
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer').textContent = timeString;
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// 試験終了と結果表示
function finishExam() {
    stopTimer();

    // 結果計算
    const results = calculateResults();

    // 統計更新
    updateOverallStats(results);

    // 結果表示
    showResults(results);

    // 学習履歴に追加
    addToHistory(results);
}

function calculateResults() {
    const totalQuestions = examQuestions.length;
    const correctAnswers = userAnswers.filter((answer, index) => 
        answer === examQuestions[index].correct
    ).length;

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const totalTime = Math.floor((new Date() - startTime) / 1000);

    // 分野別結果
    const categoryResults = {};
    examQuestions.forEach((question, index) => {
        const category = question.category;
        if (!categoryResults[category]) {
            categoryResults[category] = { total: 0, correct: 0 };
        }
        categoryResults[category].total++;
        if (userAnswers[index] === question.correct) {
            categoryResults[category].correct++;
        }
    });

    return {
        totalQuestions,
        correctAnswers,
        percentage,
        totalTime,
        categoryResults,
        examType: currentExamType,
        questions: examQuestions.map((question, index) => ({
            question: question,
            userAnswer: userAnswers[index],
            isCorrect: userAnswers[index] === question.correct
        }))
    };
}

function showResults(results) {
    showScreen('result-container');

    // スコア表示
    document.getElementById('score-percentage').textContent = results.percentage;
    document.getElementById('correct-count').textContent = results.correctAnswers;
    document.getElementById('total-count').textContent = results.totalQuestions;

    // 時間表示
    const minutes = Math.floor(results.totalTime / 60);
    const seconds = results.totalTime % 60;
    document.getElementById('total-time').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // 分野別結果
    const categoryResultsContainer = document.getElementById('category-results');
    categoryResultsContainer.innerHTML = '';

    Object.entries(results.categoryResults).forEach(([category, stats]) => {
        const percentage = Math.round((stats.correct / stats.total) * 100);
        const categoryName = category === 'algorithm' ? 'アルゴリズム' : '情報セキュリティ';

        const resultElement = document.createElement('div');
        resultElement.className = 'category-result';
        resultElement.innerHTML = `
            <span>${categoryName}</span>
            <span>${stats.correct}/${stats.total} (${percentage}%)</span>
        `;
        categoryResultsContainer.appendChild(resultElement);
    });
}

// 統計データ管理
function updateOverallStats(results) {
    const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS));

    stats.totalExams++;
    stats.totalQuestions += results.totalQuestions;
    stats.correctAnswers += results.correctAnswers;
    stats.lastExamDate = new Date().toISOString();

    // 分野別統計更新
    Object.entries(results.categoryResults).forEach(([category, categoryStats]) => {
        if (!stats.categoryStats[category]) {
            stats.categoryStats[category] = { total: 0, correct: 0 };
        }
        stats.categoryStats[category].total += categoryStats.total;
        stats.categoryStats[category].correct += categoryStats.correct;
    });

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
}

function updateQuestionStats(question, isCorrect) {
    // 問題レベルの統計は必要に応じて実装
}

function addToHistory(results) {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY));

    const historyEntry = {
        date: new Date().toISOString(),
        examType: results.examType,
        score: results.percentage,
        correctAnswers: results.correctAnswers,
        totalQuestions: results.totalQuestions,
        totalTime: results.totalTime,
        categoryResults: results.categoryResults
    };

    history.unshift(historyEntry); // 新しい記録を先頭に追加

    // 履歴は最新100件まで保持
    if (history.length > 100) {
        history.splice(100);
    }

    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

// ブックマーク機能
function toggleBookmark() {
    const question = examQuestions[currentQuestionIndex];
    const bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS));

    const bookmarkIndex = bookmarks.findIndex(bookmark => 
        bookmark.id === question.id
    );

    if (bookmarkIndex >= 0) {
        // ブックマークを削除
        bookmarks.splice(bookmarkIndex, 1);
    } else {
        // ブックマークを追加
        bookmarks.push({
            id: question.id,
            text: question.text,
            category: question.category,
            addedDate: new Date().toISOString()
        });
    }

    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    updateBookmarkButton();
}

function updateBookmarkButton() {
    const question = examQuestions[currentQuestionIndex];
    const bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS));
    const bookmarkBtn = document.getElementById('bookmark-btn');

    const isBookmarked = bookmarks.some(bookmark => bookmark.id === question.id);

    if (isBookmarked) {
        bookmarkBtn.classList.add('bookmarked');
        bookmarkBtn.textContent = '❤️ ブックマーク済み';
    } else {
        bookmarkBtn.classList.remove('bookmarked');
        bookmarkBtn.textContent = '📌 ブックマーク';
    }
}

// 学習履歴表示
function showStats() {
    showScreen('stats-container');

    const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS));
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY));

    // 統計サマリー
    const statssummary = document.getElementById('stats-summary');
    const overallPercentage = stats.totalQuestions > 0 ? 
        Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0;

    statsSummary.innerHTML = `
        <div class="stat-item">
            <span>総受験回数</span>
            <span>${stats.totalExams}回</span>
        </div>
        <div class="stat-item">
            <span>総問題数</span>
            <span>${stats.totalQuestions}問</span>
        </div>
        <div class="stat-item">
            <span>総合正答率</span>
            <span>${overallPercentage}%</span>
        </div>
        <div class="stat-item">
            <span>最終受験日</span>
            <span>${stats.lastExamDate ? new Date(stats.lastExamDate).toLocaleDateString() : 'なし'}</span>
        </div>
    `;

    // 分野別統計
    const categoryStats = document.getElementById('category-stats');
    categoryStats.innerHTML = '';

    Object.entries(stats.categoryStats).forEach(([category, categoryStats]) => {
        const percentage = categoryStats.total > 0 ? 
            Math.round((categoryStats.correct / categoryStats.total) * 100) : 0;
        const categoryName = category === 'algorithm' ? 'アルゴリズム' : '情報セキュリティ';

        const categoryElement = document.createElement('div');
        categoryElement.className = 'category-stat';
        categoryElement.innerHTML = `
            <h4>${categoryName}</h4>
            <p>正答率: ${percentage}% (${categoryStats.correct}/${categoryStats.total})</p>
        `;
        categoryStats.appendChild(categoryElement);
    });
}

// ブックマーク一覧表示
function showBookmarks() {
    showScreen('bookmark-container');

    const bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS));
    const bookmarkList = document.getElementById('bookmark-list');

    if (bookmarks.length === 0) {
        bookmarkList.innerHTML = '<p class="text-center">ブックマークされた問題はありません</p>';
        return;
    }

    bookmarkList.innerHTML = '';
    bookmarks.forEach(bookmark => {
        const categoryName = bookmark.category === 'algorithm' ? 'アルゴリズム' : '情報セキュリティ';

        const bookmarkElement = document.createElement('div');
        bookmarkElement.className = 'bookmark-item';
        bookmarkElement.onclick = () => reviewBookmarkedQuestion(bookmark);

        bookmarkElement.innerHTML = `
            <div class="bookmark-question-text">${bookmark.text}</div>
            <div class="bookmark-category">${categoryName} - ${new Date(bookmark.addedDate).toLocaleDateString()}</div>
        `;

        bookmarkList.appendChild(bookmarkElement);
    });
}

function reviewBookmarkedQuestion(bookmark) {
    // ブックマークされた問題を単問モードで表示する機能
    alert('ブックマーク問題のレビュー機能は今後実装予定です。');
}

// 間違い問題復習
function reviewIncorrect() {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY));

    if (history.length === 0) {
        alert('学習履歴がありません。');
        return;
    }

    // 最新の試験から間違い問題を抽出する機能
    alert('間違い問題の復習機能は今後実装予定です。');
}

// 詳細結果表示
function showDetailedResults() {
    alert('詳細結果の表示機能は今後実装予定です。');
}

// 画面切り替え
function showScreen(screenId) {
    // 全ての画面を非表示
    const screens = [
        'main-menu', 'exam-container', 'result-container', 
        'stats-container', 'bookmark-container', 'weakness-container',
        'study-plan-container', 'intensive-container'
    ];

    screens.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });

    // 指定された画面を表示
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'block';
        targetScreen.scrollIntoView({ behavior: 'smooth' });
    }
}

// メニューに戻る
function backToMenu() {
    showScreen('main-menu');

    // タイマー停止
    stopTimer();

    // 変数リセット
    currentQuestionIndex = 0;
    examQuestions = [];
    userAnswers = [];
    startTime = null;
}

function exitExam() {
    if (confirm('試験を終了してメニューに戻りますか？')) {
        backToMenu();
    }
}

// 統計データ読み込み
function loadStats() {
    // 初回起動時の統計読み込み処理
    const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS));
    if (stats && stats.totalExams > 0) {
        console.log(`学習履歴: ${stats.totalExams}回受験済み`);
    }
}

// ユーティリティ関数
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getJapaneseCategory(category) {
    return category === 'algorithm' ? 'アルゴリズム' : '情報セキュリティ';
}

// 新機能: 弱点診断機能
function showWeaknessAnalysis() {
    showScreen('weakness-container');
    
    const weaknessData = JSON.parse(localStorage.getItem(STORAGE_KEYS.WEAKNESS_ANALYSIS));
    const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS));
    
    // 前回スコア表示
    document.getElementById('weakness-score').textContent = weaknessData.previousScore;
    document.getElementById('previous-score').textContent = weaknessData.previousScore;
    
    // 正答率計算
    const accuracyRate = stats.totalQuestions > 0 ? 
        Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0;
    document.getElementById('accuracy-rate').textContent = accuracyRate + '%';
    
    // 弱点分野の分析と表示
    analyzeWeaknesses();
}

function analyzeWeaknesses() {
    const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS));
    const weakAreas = [];
    
    // 分野別正答率を分析
    for (const [category, categoryStats] of Object.entries(stats.categoryStats)) {
        if (categoryStats.total > 0) {
            const accuracy = (categoryStats.correct / categoryStats.total) * 100;
            if (accuracy < 60) { // 60%未満を弱点とする
                weakAreas.push({
                    category: category,
                    accuracy: accuracy,
                    total: categoryStats.total,
                    correct: categoryStats.correct
                });
            }
        }
    }
    
    // レベル別の弱点も分析（実装簡略化のため、固定の弱点を表示）
    const commonWeakAreas = [
        { name: 'ソートアルゴリズム', accuracy: 45, problems: ['バブルソート', 'クイックソート', 'マージソート'] },
        { name: 'グラフアルゴリズム', accuracy: 38, problems: ['ダイクストラ法', 'トポロジカルソート'] },
        { name: '動的プログラミング', accuracy: 32, problems: ['ナップサック問題', 'LCS問題'] },
        { name: '文字列アルゴリズム', accuracy: 41, problems: ['KMP法', 'ローリングハッシュ'] }
    ];
    
    displayWeakAreas(commonWeakAreas);
    generateRecommendations(commonWeakAreas);
}

function displayWeakAreas(weakAreas) {
    const weakAreasList = document.getElementById('weak-areas-list');
    weakAreasList.innerHTML = '';
    
    weakAreas.forEach(area => {
        const areaElement = document.createElement('div');
        areaElement.className = 'weak-area-item';
        areaElement.innerHTML = `
            <div class="weak-area-header">
                <span class="weak-area-name">${area.name}</span>
                <span class="weak-area-accuracy ${area.accuracy < 40 ? 'critical' : 'warning'}">${area.accuracy}%</span>
            </div>
            <div class="weak-area-problems">
                対象問題: ${area.problems.join(', ')}
            </div>
            <div class="weak-area-priority">
                優先度: ${area.accuracy < 40 ? '🔴 最重要' : '🟡 重要'}
            </div>
        `;
        weakAreasList.appendChild(areaElement);
    });
}

function generateRecommendations(weakAreas) {
    const recommendations = [
        { 
            title: '弱点克服集中コース', 
            description: '苦手分野の基礎から応用まで段階的学習',
            duration: '2時間',
            questions: 25
        },
        { 
            title: 'レベル別強化トレーニング', 
            description: '基礎→標準→応用の順で確実にステップアップ',
            duration: '1.5時間',
            questions: 20
        },
        { 
            title: '分野別完全制覇', 
            description: 'ソート・探索・グラフを徹底的に習得',
            duration: '3時間',
            questions: 40
        }
    ];
    
    const recommendationList = document.getElementById('recommendation-list');
    recommendationList.innerHTML = '';
    
    recommendations.forEach(rec => {
        const recElement = document.createElement('div');
        recElement.className = 'recommendation-item';
        recElement.innerHTML = `
            <div class="recommendation-title">${rec.title}</div>
            <div class="recommendation-description">${rec.description}</div>
            <div class="recommendation-meta">
                ⏱️ ${rec.duration} | 📝 ${rec.questions}問
            </div>
        `;
        recommendationList.appendChild(recElement);
    });
}

function startWeaknessTraining() {
    // 弱点克服トレーニングを開始
    showIntensiveMode();
}

// 学習計画機能
function showStudyPlan() {
    showScreen('study-plan-container');
    
    const studyPlan = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_PLAN));
    updateCountdown(studyPlan.examDate);
    updateDailyProgress();
    generateSessionList();
    generateMilestones();
}

function updateCountdown(examDateStr) {
    const examDate = new Date(examDateStr);
    const now = new Date();
    const timeDiff = examDate - now;
    
    if (timeDiff <= 0) {
        document.getElementById('days-left').textContent = '0';
        document.getElementById('hours-left').textContent = '0';
        document.getElementById('minutes-left').textContent = '0';
        return;
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('days-left').textContent = days;
    document.getElementById('hours-left').textContent = hours;
    document.getElementById('minutes-left').textContent = minutes;
    
    // ヘッダーのカウントダウンも更新
    const examCountdown = document.getElementById('exam-countdown');
    if (examCountdown) {
        examCountdown.textContent = `⏰ 試験まで ${days}日${hours}時間${minutes}分`;
    }
}

function updateDailyProgress() {
    const studyPlan = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_PLAN));
    const completedSessions = studyPlan.completedSessions;
    const totalSessions = studyPlan.totalSessions;
    
    const todayProgress = Math.round((completedSessions / totalSessions) * 100);
    document.getElementById('today-progress').textContent = todayProgress;
    document.getElementById('completed-sessions').textContent = completedSessions;
    document.getElementById('total-sessions').textContent = totalSessions;
}

function generateSessionList() {
    const sessions = [
        { id: 1, title: '基礎ソートアルゴリズム', duration: '30分', questions: 8, completed: false },
        { id: 2, title: '探索アルゴリズム', duration: '30分', questions: 8, completed: false },
        { id: 3, title: 'データ構造（スタック・キュー）', duration: '30分', questions: 8, completed: false },
        { id: 4, title: '再帰アルゴリズム', duration: '30分', questions: 8, completed: false },
        { id: 5, title: 'グラフアルゴリズム基礎', duration: '45分', questions: 10, completed: false },
        { id: 6, title: '動的プログラミング', duration: '45分', questions: 10, completed: false }
    ];
    
    const sessionList = document.getElementById('session-list');
    sessionList.innerHTML = '';
    
    sessions.forEach(session => {
        const sessionElement = document.createElement('div');
        sessionElement.className = `session-item ${session.completed ? 'completed' : 'pending'}`;
        sessionElement.innerHTML = `
            <div class="session-icon">${session.completed ? '✅' : '📚'}</div>
            <div class="session-content">
                <div class="session-title">${session.title}</div>
                <div class="session-meta">⏱️ ${session.duration} | 📝 ${session.questions}問</div>
            </div>
            <button class="session-btn" onclick="startSession(${session.id})" ${session.completed ? 'disabled' : ''}>
                ${session.completed ? '完了' : '開始'}
            </button>
        `;
        sessionList.appendChild(sessionElement);
    });
}

function generateMilestones() {
    const milestones = [
        { title: '基礎レベル完全習得', progress: 30, target: 'Day 1 午前', status: 'in-progress' },
        { title: '標準レベル80%以上', progress: 0, target: 'Day 1 午後', status: 'pending' },
        { title: '応用レベル60%以上', progress: 0, target: 'Day 2 午前', status: 'pending' },
        { title: '模擬試験600点突破', progress: 0, target: 'Day 2 午後', status: 'pending' }
    ];
    
    const milestoneList = document.getElementById('milestone-list');
    milestoneList.innerHTML = '';
    
    milestones.forEach(milestone => {
        const milestoneElement = document.createElement('div');
        milestoneElement.className = `milestone-item ${milestone.status}`;
        milestoneElement.innerHTML = `
            <div class="milestone-header">
                <span class="milestone-title">${milestone.title}</span>
                <span class="milestone-target">${milestone.target}</span>
            </div>
            <div class="milestone-progress">
                <div class="progress-bar-small">
                    <div class="progress-fill-small" style="width: ${milestone.progress}%"></div>
                </div>
                <span class="progress-text">${milestone.progress}%</span>
            </div>
        `;
        milestoneList.appendChild(milestoneElement);
    });
}

function startTodaySession() {
    // 今日のセッションを開始
    startIntensiveMode();
}

function startSession(sessionId) {
    alert(`セッション${sessionId}を開始します。`);
    // 実際にはそのセッションに対応する問題セットで試験を開始
}

function updateStudyPlan() {
    alert('学習プランを更新しました。');
    showStudyPlan(); // 再表示
}

// 集中トレーニング機能
function showIntensiveMode() {
    showScreen('intensive-container');
    resetTrainingStats();
}

function startIntensiveMode() {
    showIntensiveMode();
}

function resetTrainingStats() {
    document.getElementById('training-score').textContent = '0';
    document.getElementById('training-streak').textContent = '0';
    document.getElementById('training-accuracy').textContent = '0';
}

let selectedLevel = '';
let selectedCategory = '';

function selectTrainingLevel(level) {
    selectedLevel = level;
    
    // 全てのレベルボタンから選択状態を削除
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 選択されたボタンに選択状態を追加
    document.querySelector(`[data-level="${level}"]`).classList.add('selected');
    
    updateTrainingButton();
}

function selectTrainingCategory(category) {
    selectedCategory = category;
    
    // 全てのカテゴリボタンから選択状態を削除
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 選択されたボタンに選択状態を追加
    document.querySelector(`[data-category="${category}"]`).classList.add('selected');
    
    updateTrainingButton();
}

function updateTrainingButton() {
    const startBtn = document.getElementById('start-training-btn');
    if (selectedLevel && selectedCategory) {
        startBtn.disabled = false;
        startBtn.textContent = `🚀 ${getLevelName(selectedLevel)}×${getCategoryName(selectedCategory)} 開始`;
    } else {
        startBtn.disabled = true;
        startBtn.textContent = '🚀 レベルと分野を選択してください';
    }
}

function getLevelName(level) {
    const levelNames = {
        'basic': '基礎',
        'standard': '標準',
        'advanced': '応用',
        'mixed': 'ミックス'
    };
    return levelNames[level] || level;
}

function getCategoryName(category) {
    const categoryNames = {
        'sort': 'ソート',
        'search': '探索',
        'datastructure': 'データ構造',
        'recursion': '再帰',
        'graph': 'グラフ',
        'all': '全分野'
    };
    return categoryNames[category] || category;
}

function startIntensiveTraining() {
    if (!selectedLevel || !selectedCategory) {
        alert('レベルと分野を選択してください。');
        return;
    }
    
    // 選択された条件で問題を絞り込む
    let filteredQuestions = [];
    
    if (selectedLevel === 'mixed') {
        filteredQuestions = questions.algorithm; // 全レベル
    } else {
        filteredQuestions = questions.algorithm.filter(q => q.level === selectedLevel);
    }
    
    if (selectedCategory !== 'all') {
        // 分野による絞り込み（簡略化）
        const categoryKeywords = {
            'sort': ['ソート', 'バブル', '挿入', '選択', 'マージ', 'クイック', 'ヒープ'],
            'search': ['探索', '線形', '二分', 'BFS', 'DFS'],
            'datastructure': ['スタック', 'キュー', 'ハッシュ', 'ヒープ'],
            'recursion': ['再帰', 'フィボナッチ', 'ハノイ'],
            'graph': ['グラフ', 'ダイクストラ', 'トポロジカル', 'フロー']
        };
        
        const keywords = categoryKeywords[selectedCategory] || [];
        filteredQuestions = filteredQuestions.filter(q => 
            keywords.some(keyword => q.text.includes(keyword))
        );
    }
    
    if (filteredQuestions.length === 0) {
        alert('選択された条件に該当する問題がありません。');
        return;
    }
    
    // 集中トレーニング用の試験を開始
    currentExamType = 'intensive';
    examQuestions = shuffleArray([...filteredQuestions]).slice(0, 20); // 最大20問
    currentQuestionIndex = 0;
    userAnswers = [];
    
    startExamTimer();
    showScreen('exam-container');
    displayQuestion();
}

// 新しい試験タイプの処理
function startExam(examType) {
    currentExamType = examType;
    userAnswers = [];
    currentQuestionIndex = 0;

    // 問題セットの選択
    switch(examType) {
        case 'all':
            // 従来の全20問（アルゴリズム16問+セキュリティ4問）
            examQuestions = [
                ...shuffleArray([...questions.algorithm]).slice(0, 16),
                ...shuffleArray([...questions.security]).slice(0, 4)
            ];
            break;
        case 'mock':
            // 模擬試験（アルゴリズム16問のみ）
            examQuestions = shuffleArray([...questions.algorithm]).slice(0, 16);
            break;
        case 'algorithm':
            // 全アルゴリズム問題（60問）
            examQuestions = shuffleArray([...questions.algorithm]);
            break;
        case 'security':
            // セキュリティ問題のみ
            examQuestions = [...questions.security];
            break;
        case 'level-basic':
            examQuestions = questions.algorithm.filter(q => q.level === 'basic');
            break;
        case 'level-standard':
            examQuestions = questions.algorithm.filter(q => q.level === 'standard');
            break;
        case 'level-advanced':
            examQuestions = questions.algorithm.filter(q => q.level === 'advanced');
            break;
        default:
            return;
    }

    if (examQuestions.length === 0) {
        alert('問題が見つかりません。');
        return;
    }

    startExamTimer();
    showScreen('exam-container');
    displayQuestion();
}

function showProgress() {
    alert('学習進捗機能は準備中です。');
}

// 初期化時にカウントダウンを開始
document.addEventListener('DOMContentLoaded', function() {
    const studyPlan = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_PLAN));
    if (studyPlan) {
        updateCountdown(studyPlan.examDate);
        // 1分ごとにカウントダウンを更新
        setInterval(() => updateCountdown(studyPlan.examDate), 60000);
    }
});

// エクスポート（モジュール対応）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        startExam,
        showStats,
        showBookmarks,
        backToMenu
    };
}