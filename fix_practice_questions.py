#!/usr/bin/env python3
"""
練習問題に欠けている問題文を補完するスクリプト
解答選択肢から問題文を推測・生成します
"""
import re
import json

# 問題文のテンプレートマッピング（選択肢から問題内容を推測）
QUESTION_TEMPLATES = {
    # 2進数変換問題
    'binary': {
        'pattern': r'^\d{5}$',
        'template': '10進数の25を2進数で表したものはどれか。'
    },
    
    # CPI問題
    'cpi': {
        'keywords': ['Clock cycles Per Instruction', 'Commands Per Instruction'],
        'template': 'CPUの性能指標であるCPIとは何の略か。'
    },
    
    # データベース問題
    'database': {
        'keywords': ['正規化', 'テーブル', 'SQL', 'データベース'],
        'template': 'データベースに関する次の説明のうち、正しいものはどれか。'
    },
    
    # ネットワーク問題
    'network': {
        'keywords': ['TCP', 'IP', 'OSI', 'プロトコル', 'ネットワーク'],
        'template': 'ネットワークに関する次の説明のうち、正しいものはどれか。'
    },
    
    # アルゴリズム問題
    'algorithm': {
        'keywords': ['ソート', 'アルゴリズム', 'データ構造', '計算量'],
        'template': 'アルゴリズムに関する次の説明のうち、正しいものはどれか。'
    },
    
    # セキュリティ問題
    'security': {
        'keywords': ['暗号化', 'セキュリティ', 'ファイアウォール', '認証'],
        'template': '情報セキュリティに関する次の説明のうち、正しいものはどれか。'
    },
    
    # マネジメント問題
    'management': {
        'keywords': ['PDCA', 'プロジェクト管理', 'マネジメント'],
        'template': 'プロジェクト管理に関する次の説明のうち、正しいものはどれか。'
    },
    
    # 基礎理論問題
    'theory': {
        'keywords': ['2進数', '16進数', '論理演算', 'ブール代数'],
        'template': '基礎理論に関する次の説明のうち、正しいものはどれか。'
    }
}

def detect_question_type(choices):
    """選択肢から問題のタイプを検出"""
    choices_text = ' '.join(choices).lower()
    
    # 2進数パターン
    if all(re.match(r'^\d{4,5}$', choice.strip()) for choice in choices):
        return 'binary'
    
    # キーワードベースの検出
    for question_type, config in QUESTION_TEMPLATES.items():
        if 'keywords' in config:
            for keyword in config['keywords']:
                if keyword.lower() in choices_text:
                    return question_type
    
    return 'general'

def generate_question_text(question_id, choices, explanation='', topic=''):
    """問題IDと選択肢から適切な問題文を生成"""
    
    # 問題タイプを検出
    question_type = detect_question_type(choices)
    
    # 特定のパターンに基づく問題文生成
    if question_type == 'binary':
        # 2進数問題の場合、説明から元の数値を抽出
        if '25' in explanation:
            return '10進数25を2進数で表したものはどれか。'
        else:
            return '次の10進数を2進数で表したものはどれか。'
    
    elif question_type == 'cpi':
        return 'CPUの性能指標であるCPIとは何の略か。'
    
    elif 'PDCA' in ' '.join(choices):
        return 'PDCA サイクルの各フェーズの正しい順序はどれか。'
    
    elif 'ファイアウォール' in ' '.join(choices):
        return 'ネットワークセキュリティにおけるファイアウォールの主な機能はどれか。'
    
    # トピックベースの問題文生成
    elif 'データベース' in topic or 'データベース' in ' '.join(choices):
        return 'データベースに関する次の説明のうち、正しいものはどれか。'
    
    elif 'ネットワーク' in topic or any(kw in ' '.join(choices) for kw in ['TCP', 'IP', 'プロトコル']):
        return 'ネットワークに関する次の説明のうち、正しいものはどれか。'
    
    elif 'セキュリティ' in topic or any(kw in ' '.join(choices) for kw in ['暗号', 'セキュリティ']):
        return '情報セキュリティに関する次の説明のうち、正しいものはどれか。'
    
    elif 'アルゴリズム' in topic or any(kw in ' '.join(choices) for kw in ['ソート', 'アルゴリズム']):
        return 'アルゴリズムに関する次の説明のうち、正しいものはどれか。'
    
    elif 'マネジメント' in topic:
        return 'プロジェクト管理に関する次の説明のうち、正しいものはどれか。'
    
    elif '基礎理論' in topic:
        return '基礎理論に関する次の説明のうち、正しいものはどれか。'
    
    # デフォルト問題文
    return f'次の選択肢の中から正しいものはどれか。（問題ID: {question_id}）'

def fix_practice_questions():
    """練習問題に問題文を追加"""
    
    print("📝 練習問題の問題文補完を開始...")
    
    # questions.jsファイルを読み込み
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # practice_questionsセクションを特定
    practice_start = content.find('practice_questions:')
    if practice_start == -1:
        print("❌ practice_questions セクションが見つかりません")
        return
    
    # セクションの範囲を特定
    section_start = content.find('[', practice_start)
    bracket_count = 0
    section_end = section_start
    
    for i in range(section_start, len(content)):
        char = content[i]
        if char == '[':
            bracket_count += 1
        elif char == ']':
            bracket_count -= 1
            if bracket_count == 0:
                section_end = i + 1
                break
    
    section_content = content[section_start:section_end]
    
    # 問題オブジェクトを個別に処理
    question_pattern = r'\{"id": "([^"]+)",\s*"choices": \[(.*?)\],\s*"correct": (\d+),\s*"explanation": "([^"]*)",\s*"keyPoints": "([^"]*)",\s*"relatedInfo": "([^"]*)",\s*"year": "([^"]*)",\s*"originalTopic": "([^"]*)",\s*"sourceFile": "([^"]*)"\}'
    
    fixed_count = 0
    
    def fix_question(match):
        nonlocal fixed_count
        
        question_id = match.group(1)
        choices_raw = match.group(2)
        correct = match.group(3)
        explanation = match.group(4)
        key_points = match.group(5)
        related_info = match.group(6)
        year = match.group(7)
        original_topic = match.group(8)
        source_file = match.group(9)
        
        # 選択肢を解析
        choices = []
        choice_pattern = r'"([^"]+)"'
        choices = re.findall(choice_pattern, choices_raw)
        
        # 問題文を生成
        question_text = generate_question_text(question_id, choices, explanation, original_topic)
        
        fixed_count += 1
        print(f"✅ {question_id}: {question_text[:50]}...")
        
        # 修正された問題オブジェクトを返す
        return f'''{{
                    "id": "{question_id}",
                    "category": "practice",
                    "level": "standard",
                    "text": "{question_text}",
                    "code": null,
                    "choices": [{choices_raw}],
                    "correct": {correct},
                    "explanation": "{explanation}",
                    "keyPoints": "{key_points}",
                    "relatedInfo": "{related_info}",
                    "year": "{year}",
                    "originalTopic": "{original_topic}",
                    "sourceFile": "{source_file}"
            }}'''
    
    # 問題を修正
    fixed_section = re.sub(question_pattern, fix_question, section_content, flags=re.DOTALL)
    
    # 元のコンテンツを更新
    updated_content = content[:section_start] + fixed_section + content[section_end:]
    
    # バックアップを作成
    with open('questions_practice_backup.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    # 更新されたファイルを保存
    with open('questions.js', 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"✅ {fixed_count} 問の練習問題に問題文を追加しました")
    print("💾 questions.js を更新し、バックアップを作成しました")

def verify_fix():
    """修正結果を確認"""
    
    print("🔍 修正結果を確認中...")
    
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # textフィールドがある問題数をカウント
    practice_with_text = content.count('"text":')
    practice_total = content.count('"id": "prac')
    
    print(f"📊 練習問題: {practice_with_text}/{practice_total} 問に問題文あり")
    
    if practice_with_text >= practice_total:
        print("🎉 すべての練習問題に問題文が追加されました！")
    else:
        print(f"⚠️  {practice_total - practice_with_text} 問にまだ問題文が不足しています")

if __name__ == "__main__":
    try:
        fix_practice_questions()
        print("\n" + "="*60 + "\n")
        verify_fix()
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")
        import traceback
        traceback.print_exc()