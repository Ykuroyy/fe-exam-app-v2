#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

def generate_question_text(question_id, choices, explanation):
    """問題ID、選択肢、解説から適切な問題文を生成"""
    
    # 進数変換問題
    if all(re.match(r'^[01]+$', str(choice)) for choice in choices if choice):
        return "次の10進数を2進数で表したものはどれか。"
    
    if any('バイト' in str(choice) for choice in choices):
        return "次の記憶容量の単位として正しいものはどれか。"
    
    # 計算結果（数値のみ）
    if all(str(choice).replace('.', '').replace('-', '').isdigit() for choice in choices if choice):
        return "次の計算結果として正しいものはどれか。"
    
    # プログラミング関連
    if any(keyword in explanation for keyword in ['プログラム', 'アルゴリズム', '変数', 'インデックス']):
        return "次のプログラムを実行したとき、正しい結果はどれか。"
    
    # データベース関連
    if any(keyword in explanation or any(keyword in str(choice) for choice in choices) 
           for keyword in ['SQL', 'データベース', 'SELECT', 'テーブル']):
        return "次のデータベースに関する説明として、正しいものはどれか。"
    
    # ネットワーク関連
    if any(keyword in explanation or any(keyword in str(choice) for choice in choices)
           for keyword in ['IP', 'TCP', 'HTTP', 'ネットワーク']):
        return "次のネットワークに関する説明として、正しいものはどれか。"
    
    # デフォルト
    if question_id.startswith('a'):
        return "次の選択肢のうち、正しいものはどれか。"
    elif question_id.startswith('b'):
        return "次のアルゴリズムまたはプログラムに関する問題として、正しいものはどれか。"
    
    return "次の選択肢のうち、正しいものはどれか。"

def fix_additional_questions_direct():
    print("🔧 追加問題64問の直接修正を開始...")
    
    # ファイル読み込み
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # バックアップ作成
    with open('questions_direct_backup.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("💾 バックアップ作成: questions_direct_backup.js")
    
    # 修正対象の問題を検索するパターン
    # textフィールドがない問題のみを対象とする
    pattern = r'(\{\s*"id":\s*"([ab]\d+)",\s*"choices":\s*\[(.*?)\],\s*"correct":\s*\d+,\s*"explanation":\s*"([^"]*)")'
    
    matches = list(re.finditer(pattern, content, re.DOTALL))
    print(f"📋 {len(matches)}個の追加問題を発見")
    
    modified_count = 0
    
    for match in matches:
        full_match = match.group(0)
        question_id = match.group(2)
        choices_raw = match.group(3)
        explanation = match.group(4)
        
        # すでにtextフィールドがある場合はスキップ
        if '"text"' in full_match:
            continue
        
        # 選択肢を解析
        choices = []
        for choice in choices_raw.split(','):
            choice = choice.strip().strip('"').strip()
            if choice:
                choices.append(choice)
        
        # 問題文を生成
        question_text = generate_question_text(question_id, choices, explanation)
        
        # 新しい問題形式を作成（textとcategoryフィールドを追加）
        category = "algorithm" if question_id.startswith('b') else "subject_a"
        
        # correct番号を抽出
        correct_match = re.search(r'"correct":\s*(\d+)', full_match)
        correct_num = correct_match.group(1) if correct_match else "0"
        
        new_question = f'{{"id": "{question_id}",\n                    "category": "{category}",\n                    "level": "standard",\n                    "text": "{question_text}",\n                    "code": null,\n                    "choices": [{choices_raw}],\n                    "correct": {correct_num},\n                    "explanation": "{explanation}"'
        
        # 元の問題を新しい形式で置換
        content = content.replace(full_match, new_question)
        modified_count += 1
        
        print(f"  ✅ {question_id}: {question_text[:50]}...")
    
    # ファイルに保存
    with open('questions.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"💾 修正完了！{modified_count}問を修正しました")
    return modified_count

if __name__ == "__main__":
    fix_additional_questions_direct()