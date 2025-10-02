#!/usr/bin/env python3
"""
TypeScriptファイルから過去問データを抽出してJavaScript形式に変換する
"""
import re
import json
import os

def extract_questions_from_ts(file_path):
    """TypeScriptファイルから問題データを抽出"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # export const xxxQuestions: Question[] = [ ... ]; の部分を抽出
        pattern = r'export\s+const\s+\w+Questions?:\s*Question\[\]\s*=\s*(\[[\s\S]*?\]);?'
        match = re.search(pattern, content)
        
        if not match:
            return []
        
        # 配列部分を抽出
        array_str = match.group(1)
        
        # 簡単な正規表現でオブジェクトを抽出
        questions = []
        
        # 各問題オブジェクト { ... } を抽出
        obj_pattern = r'\{[\s\S]*?\}'
        obj_matches = re.findall(obj_pattern, array_str)
        
        for obj_str in obj_matches:
            if 'id:' not in obj_str:
                continue
                
            # 各プロパティを抽出
            question = {}
            
            # id を抽出
            id_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", obj_str)
            if id_match:
                question['id'] = id_match.group(1).lower()
            
            # category を抽出
            cat_match = re.search(r"category:\s*['\"]([^'\"]+)['\"]", obj_str)
            if cat_match:
                question['category'] = cat_match.group(1)
            
            # text を抽出（バッククォートも考慮）
            text_match = re.search(r"text:\s*[`'\"]([^`'\"]*(?:\\.[^`'\"]*)*)[`'\"]", obj_str, re.DOTALL)
            if not text_match:
                # 複数行のバッククォートの場合
                text_match = re.search(r'text:\s*`([^`]*(?:`[^`]*)*)`', obj_str, re.DOTALL)
            if text_match:
                question['text'] = text_match.group(1).replace('\\n', '\n').strip()
            
            # options/choices を抽出
            options_match = re.search(r'(?:options|choices):\s*\[([\s\S]*?)\]', obj_str)
            if options_match:
                options_str = options_match.group(1)
                # 配列の各要素を抽出
                options = re.findall(r"['\"]([^'\"]*(?:\\.[^'\"]*)*)['\"]", options_str)
                question['choices'] = options
            
            # correctAnswer を抽出
            correct_match = re.search(r'correctAnswer:\s*(\d+)', obj_str)
            if correct_match:
                question['correct'] = int(correct_match.group(1))
            
            # explanation を抽出
            exp_match = re.search(r"explanation:\s*[`'\"]([^`'\"]*(?:\\.[^`'\"]*)*)[`'\"]", obj_str, re.DOTALL)
            if exp_match:
                question['explanation'] = exp_match.group(1).replace('\\n', '\n').strip()
            
            # topic を抽出
            topic_match = re.search(r"topic:\s*['\"]([^'\"]+)['\"]", obj_str)
            if topic_match:
                question['topic'] = topic_match.group(1)
            
            # 最低限必要なフィールドがあるかチェック
            if 'id' in question and 'text' in question and 'choices' in question:
                questions.append(question)
        
        return questions
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []

def convert_to_js_format(question, year):
    """過去問を現在のJS形式に変換"""
    category_map = {
        'A': 'subject_a',
        'B': 'algorithm'
    }
    
    return {
        'id': question['id'],
        'category': category_map.get(question.get('category'), 'algorithm'),
        'level': 'standard',
        'text': question.get('text', ''),
        'code': question.get('code'),
        'choices': question.get('choices', []),
        'correct': question.get('correct', 0),
        'explanation': question.get('explanation', ''),
        'keyPoints': f"{question.get('topic', '基本情報技術者試験')}の重要問題",
        'relatedInfo': f"出典: 基本情報技術者試験 {year}年度",
        'year': year
    }

# メイン処理
def main():
    base_dir = '/home/user/kihonjoho2-exam-app/src/data'
    
    files_to_process = {
        'r5Questions.ts': ('R5', 'A'),
        'r5BQuestions.ts': ('R5', 'B'),
        'r6Questions.ts': ('R6', 'A'),
        'r6BQuestions.ts': ('R6', 'B'),
        'r7Questions.ts': ('R7', 'A'),
        'r7BQuestions.ts': ('R7', 'B')
    }
    
    all_past_questions = {
        'past_r5_a': [],
        'past_r5_b': [],
        'past_r6_a': [],
        'past_r6_b': [],
        'past_r7_a': [],
        'past_r7_b': []
    }
    
    for filename, (year, category) in files_to_process.items():
        file_path = os.path.join(base_dir, filename)
        if os.path.exists(file_path):
            print(f"処理中: {filename}")
            questions = extract_questions_from_ts(file_path)
            
            # 変換して追加
            converted = [convert_to_js_format(q, year) for q in questions]
            
            key = f'past_{year.lower()}_{category.lower()}'
            all_past_questions[key].extend(converted)
            
            print(f"  -> {len(questions)}問を変換")
    
    # 結果を出力
    output = f"""
// 過去問データ（自動生成）
const pastQuestions = {json.dumps(all_past_questions, indent=2, ensure_ascii=False)};

// 統計
console.log('過去問データ統計:');
Object.keys(pastQuestions).forEach(key => {{
    console.log(`${{key}}: ${{pastQuestions[key].length}}問`);
}});

module.exports = pastQuestions;
"""
    
    with open('/home/user/webapp/past_questions.js', 'w', encoding='utf-8') as f:
        f.write(output)
    
    print(f"\n完了: /home/user/webapp/past_questions.js に出力")
    
    # 統計表示
    total = sum(len(questions) for questions in all_past_questions.values())
    print(f"総問題数: {total}問")
    for key, questions in all_past_questions.items():
        print(f"  {key}: {len(questions)}問")

if __name__ == "__main__":
    main()