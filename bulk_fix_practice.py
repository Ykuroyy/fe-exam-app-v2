#!/usr/bin/env python3
"""
練習問題に問題文とフィールドを一括で追加するスクリプト
"""
import re

def bulk_fix_practice_questions():
    """練習問題を一括で修正"""
    
    print("📝 練習問題の一括修正を開始...")
    
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 問題文のマッピング（解答から推測）
    question_texts = {
        # 基礎理論・数値変換
        'prac001': '10進数25を2進数で表したものはどれか。',
        'prac002': 'CPUの性能指標であるCPIとは何の略か。',
        'prac003': 'OSI参照モデルの7層構造において、第4層はどれか。',
        'prac004': 'データベースの正規化に関する説明として正しいものはどれか。',
        'prac005': 'ソフトウェア開発におけるテスト技法の説明として正しいものはどれか。',
        'prac006': '情報セキュリティにおけるファイアウォールの主な機能はどれか。',
        'prac007': 'プロジェクト管理におけるPDCAサイクルの正しい順序はどれか。',
        'prac008': 'ネットワークトポロジーの種類に関する説明として正しいものはどれか。',
        'prac009': 'データ構造のスタックとキューに関する説明として正しいものはどれか。',
        'prac010': 'コンピュータの記憶装置に関する説明として正しいものはどれか。'
    }
    
    # 一般的な問題文テンプレート
    def generate_question_text(prac_id, choices, explanation, topic):
        # 特定の問題は個別に設定
        if prac_id in question_texts:
            return question_texts[prac_id]
        
        # 選択肢から問題タイプを推測
        choices_text = ' '.join(choices).lower()
        
        # 2進数問題
        if all(re.match(r'^\d{4,5}$', choice.strip()) for choice in choices):
            return f'10進数を2進数で表したものはどれか。'
        
        # アクロニム問題（略語）
        if any(len(choice) <= 5 and choice.isupper() for choice in choices):
            return f'次の略語の正しい意味はどれか。'
        
        # トピック別
        if 'データベース' in topic:
            return 'データベースに関する次の説明のうち、正しいものはどれか。'
        elif 'ネットワーク' in topic:
            return 'ネットワークに関する次の説明のうち、正しいものはどれか。'
        elif 'セキュリティ' in topic:
            return '情報セキュリティに関する次の説明のうち、正しいものはどれか。'
        elif 'アルゴリズム' in topic:
            return 'アルゴリズムに関する次の説明のうち、正しいものはどれか。'
        elif 'マネジメント' in topic:
            return 'プロジェクト管理に関する次の説明のうち、正しいものはどれか。'
        elif 'コンピュータシステム' in topic:
            return 'コンピュータシステムに関する次の説明のうち、正しいものはどれか。'
        elif '基礎理論' in topic:
            return '基礎理論に関する次の説明のうち、正しいものはどれか。'
        else:
            return '次の選択肢のうち、正しいものはどれか。'
    
    # 練習問題を個別に修正
    practice_pattern = r'(\{"id": "(prac\d+)",\s*)(.*?)(\})'
    
    def fix_single_question(match):
        prefix = match.group(1)
        prac_id = match.group(2)
        body = match.group(3)
        suffix = match.group(4)
        
        # 選択肢、説明、トピックを抽出
        choices_match = re.search(r'"choices": \[(.*?)\]', body, re.DOTALL)
        explanation_match = re.search(r'"explanation": "([^"]*)"', body)
        topic_match = re.search(r'"originalTopic": "([^"]*)"', body)
        
        choices = []
        explanation = ""
        topic = ""
        
        if choices_match:
            choice_texts = re.findall(r'"([^"]+)"', choices_match.group(1))
            choices = choice_texts
        
        if explanation_match:
            explanation = explanation_match.group(1)
            
        if topic_match:
            topic = topic_match.group(1)
        
        # 問題文を生成
        question_text = generate_question_text(prac_id, choices, explanation, topic)
        
        # 新しい問題オブジェクトを構築
        new_body = f'''
                    "category": "practice",
                    "level": "standard", 
                    "text": "{question_text}",
                    "code": null,
                    {body.strip()}'''
        
        print(f"✅ {prac_id}: {question_text[:50]}...")
        
        return f'{prefix.strip()}\n            {{{new_body}\n            {suffix}'
    
    # バックアップ作成
    with open('questions_practice_fix_backup.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    # 問題を修正
    updated_content = re.sub(practice_pattern, fix_single_question, content, flags=re.DOTALL)
    
    # 修正されたファイルを保存
    with open('questions.js', 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    # 結果確認
    fixed_count = updated_content.count('"text": "')
    practice_count = updated_content.count('"id": "prac')
    
    print(f"✅ 練習問題の修正完了: {practice_count} 問中に問題文を追加")
    print("💾 questions.js を更新し、バックアップを作成しました")

if __name__ == "__main__":
    try:
        bulk_fix_practice_questions()
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")
        import traceback
        traceback.print_exc()