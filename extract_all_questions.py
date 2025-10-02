#!/usr/bin/env python3
"""
TypeScriptファイルから全ての過去問データを抽出してJavaScript形式に変換する
248問の大規模データベースを構築
"""
import re
import json
import os
import ast
from typing import List, Dict, Any

def clean_typescript_to_json(content: str) -> str:
    """TypeScriptコードを解析可能なJSON形式に変換"""
    # コメント除去
    content = re.sub(r'//.*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    
    # import文除去
    content = re.sub(r'import.*?;', '', content)
    
    # export文を除去してデータ部分のみ抽出
    match = re.search(r'export\s+const\s+\w+Questions?:\s*Question\[\]\s*=\s*(\[[\s\S]*?\]);?$', content, re.MULTILINE)
    if not match:
        return "[]"
    
    array_content = match.group(1)
    
    # TypeScript特有の構文をクリーンアップ
    array_content = array_content.replace('`', '"')  # バッククォートをダブルクォートに
    
    # 複数行文字列の処理
    array_content = re.sub(r'"\s*\+\s*"', '', array_content)  # 文字列連結を除去
    
    # 末尾のカンマを除去
    array_content = re.sub(r',(\s*[\}\]])', r'\1', array_content)
    
    return array_content

def extract_questions_with_regex(file_path: str) -> List[Dict[str, Any]]:
    """正規表現でTypeScriptファイルから問題を抽出"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        questions = []
        
        # オブジェクトを一つずつマッチ
        object_pattern = r'\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}'
        
        for match in re.finditer(object_pattern, content, re.DOTALL):
            obj_str = '{' + match.group(1) + '}'
            
            # 必須フィールドが含まれているかチェック
            if 'id:' not in obj_str or 'text:' not in obj_str:
                continue
                
            question = {}
            
            # 各フィールドを抽出
            def extract_field(pattern, obj_str, default=''):
                match = re.search(pattern, obj_str, re.DOTALL)
                return match.group(1).strip() if match else default
            
            # IDを抽出
            question['id'] = extract_field(r"id:\s*['\"]([^'\"]+)['\"]", obj_str).lower()
            
            # カテゴリーを抽出
            category = extract_field(r"category:\s*['\"]([^'\"]+)['\"]", obj_str)
            question['category'] = category
            
            # テキストを抽出（バッククォート対応）
            text_match = re.search(r'text:\s*[`\'\"](.*?)[`\'\"]', obj_str, re.DOTALL)
            if text_match:
                question['text'] = text_match.group(1).replace('\\n', '\n').strip()
            
            # コードを抽出
            code_match = re.search(r'code:\s*[`\'\"](.*?)[`\'\"]', obj_str, re.DOTALL)
            if code_match:
                question['code'] = code_match.group(1).replace('\\n', '\n').strip()
            
            # 選択肢を抽出
            options_match = re.search(r'(?:options|choices):\s*\[(.*?)\]', obj_str, re.DOTALL)
            if options_match:
                options_str = options_match.group(1)
                # 選択肢を個別に抽出
                choices = re.findall(r"['\"]([^'\"]*(?:\\.[^'\"]*)*)['\"]", options_str)
                question['choices'] = [choice.replace('\\"', '"').replace("\\'", "'") for choice in choices]
            
            # 正解を抽出
            correct_match = re.search(r'correctAnswer:\s*(\d+)', obj_str)
            if correct_match:
                question['correct'] = int(correct_match.group(1))
            
            # 解説を抽出
            explanation_match = re.search(r'explanation:\s*[`\'\"](.*?)[`\'\"]', obj_str, re.DOTALL)
            if explanation_match:
                question['explanation'] = explanation_match.group(1).replace('\\n', '\n').strip()
            
            # トピックを抽出
            topic_match = re.search(r'topic:\s*[\'\"](.*?)[\'\"]\s*', obj_str)
            if topic_match:
                question['topic'] = topic_match.group(1)
            
            # 最低限の必須フィールドがあるかチェック
            if question.get('id') and question.get('text') and question.get('choices'):
                questions.append(question)
        
        return questions
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []

def convert_to_app_format(question: Dict[str, Any], source_file: str) -> Dict[str, Any]:
    """アプリの形式に変換"""
    
    # ファイル名から年度とカテゴリを判定
    year = 'practice'
    if 'r5' in source_file.lower():
        year = 'R5'
    elif 'r6' in source_file.lower():
        year = 'R6'
    elif 'r7' in source_file.lower():
        year = 'R7'
    
    # カテゴリーマッピング
    category_map = {
        'A': 'subject_a',
        'B': 'algorithm'
    }
    
    app_category = category_map.get(question.get('category'), 'algorithm')
    
    # 問題の難易度を推定
    text_length = len(question.get('text', ''))
    has_code = bool(question.get('code'))
    
    if text_length < 200 and not has_code:
        level = 'basic'
    elif text_length > 500 or has_code:
        level = 'advanced'
    else:
        level = 'standard'
    
    return {
        'id': question.get('id', ''),
        'category': app_category,
        'level': level,
        'text': question.get('text', ''),
        'code': question.get('code'),
        'choices': question.get('choices', []),
        'correct': question.get('correct', 0),
        'explanation': question.get('explanation', ''),
        'keyPoints': f"{question.get('topic', '基本情報技術者試験')}の重要問題",
        'relatedInfo': f"出典: 基本情報技術者試験 {year}年度" if year != 'practice' else '基本情報技術者試験 練習問題',
        'year': year,
        'originalTopic': question.get('topic', ''),
        'sourceFile': source_file
    }

def main():
    """メイン処理"""
    base_dir = '/home/user/kihonjoho2-exam-app/src/data'
    
    # 処理するファイルとカテゴリのマッピング
    files_to_process = {
        'r5Questions.ts': 'past_r5_a',
        'r5BQuestions.ts': 'past_r5_b',
        'r6Questions.ts': 'past_r6_a', 
        'r6BQuestions.ts': 'past_r6_b',
        'r7Questions.ts': 'past_r7_a',
        'r7BQuestions.ts': 'past_r7_b',
        'practiceQuestions.ts': 'practice_questions',
        'moreQuestions.ts': 'more_subject_a',
        'moreBQuestions.ts': 'more_algorithm',
        'sampleQuestions.ts': 'sample_questions',
        'questionSets.ts': 'question_sets'
    }
    
    all_questions = {}
    
    # 各カテゴリを初期化
    for category in files_to_process.values():
        all_questions[category] = []
    
    total_questions = 0
    
    print("🚀 過去問データベース完全抽出開始...")
    print("=" * 50)
    
    for filename, category in files_to_process.items():
        file_path = os.path.join(base_dir, filename)
        
        if os.path.exists(file_path):
            print(f"📖 処理中: {filename}")
            
            # 問題を抽出
            questions = extract_questions_with_regex(file_path)
            
            # アプリ形式に変換
            converted_questions = []
            for q in questions:
                converted = convert_to_app_format(q, filename)
                converted_questions.append(converted)
            
            all_questions[category] = converted_questions
            total_questions += len(converted_questions)
            
            print(f"   ✅ {len(converted_questions)}問を変換完了")
        else:
            print(f"   ❌ ファイルが見つかりません: {filename}")
    
    print("=" * 50)
    print(f"🎯 抽出完了！総問題数: {total_questions}問")
    
    # カテゴリ別統計
    print("\n📊 カテゴリ別統計:")
    for category, questions in all_questions.items():
        if questions:
            print(f"   {category}: {len(questions)}問")
    
    # JavaScriptファイルを生成
    output_content = f"""// 基本情報技術者試験 完全過去問データベース
// 自動抽出・変換済み - 総{total_questions}問
// 生成日時: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

const allPastQuestions = {json.dumps(all_questions, ensure_ascii=False, indent=2)};

// 統計情報
console.log('📊 完全過去問データベース統計:');
console.log('総問題数: {total_questions}問');
Object.keys(allPastQuestions).forEach(category => {{
    if (allPastQuestions[category].length > 0) {{
        console.log(`  ${{category}}: ${{allPastQuestions[category].length}}問`);
    }}
}});

// ブラウザ環境でのエクスポート
if (typeof window !== 'undefined') {{
    window.allPastQuestions = allPastQuestions;
}}

// Node.js環境でのエクスポート
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = allPastQuestions;
}}"""

    # ファイル保存
    output_path = '/home/user/webapp/all_past_questions.js'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output_content)
    
    print(f"\n💾 出力ファイル: {output_path}")
    print(f"📝 ファイルサイズ: {os.path.getsize(output_path):,} bytes")
    
    # 分析結果をまとめて表示
    print(f"\n🎉 完全過去問データベース構築完了！")
    print(f"   • 過去問3年分（R5-R7）: {len(all_questions['past_r5_a']) + len(all_questions['past_r5_b']) + len(all_questions['past_r6_a']) + len(all_questions['past_r6_b']) + len(all_questions['past_r7_a']) + len(all_questions['past_r7_b'])}問")
    print(f"   • 練習問題: {len(all_questions['practice_questions'])}問") 
    print(f"   • 追加問題: {len(all_questions['more_subject_a']) + len(all_questions['more_algorithm'])}問")
    print(f"   • サンプル問題: {len(all_questions['sample_questions'])}問")
    print(f"   • 総合計: {total_questions}問")

if __name__ == "__main__":
    main()