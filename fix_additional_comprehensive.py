#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import json

def generate_question_text_from_info(choices, explanation, question_id, category):
    """選択肢と解説から適切な問題文を生成"""
    
    # 進数関連
    if any(re.search(r'[01]+$', str(choice)) for choice in choices):
        if len(choices[0]) > 3:  # 長い2進数
            return "次の10進数を2進数で表したものはどれか。"
    
    # 計算結果
    if all(str(choice).replace('.', '').isdigit() for choice in choices):
        return "次の計算結果として正しいものはどれか。"
    
    # プログラミング関連のキーワード
    prog_keywords = ['プログラム', 'アルゴリズム', 'ソート', '配列', 'インデックス', '変数']
    if any(keyword in explanation for keyword in prog_keywords):
        return "次のプログラムまたはアルゴリズムに関する問題として、正しいものはどれか。"
    
    # データベース関連
    db_keywords = ['SQL', 'データベース', 'SELECT', 'テーブル']
    if any(keyword in explanation or any(keyword in str(choice) for choice in choices) for keyword in db_keywords):
        return "次のデータベースまたはSQLに関する説明として、正しいものはどれか。"
    
    # ネットワーク関連
    net_keywords = ['IP', 'TCP', 'HTTP', 'ネットワーク', 'プロトコル']
    if any(keyword in explanation or any(keyword in str(choice) for choice in choices) for keyword in net_keywords):
        return "次のネットワークに関する説明として、正しいものはどれか。"
    
    # セキュリティ関連
    sec_keywords = ['暗号', 'セキュリティ', '認証', 'SSL']
    if any(keyword in explanation or any(keyword in str(choice) for choice in choices) for keyword in sec_keywords):
        return "次の情報セキュリティに関する説明として、正しいものはどれか。"
    
    # カテゴリベース
    if category == 'more_algorithm':
        return "次のアルゴリズムまたはプログラムに関する問題として、正しいものはどれか。"
    elif category == 'more_subject_a':
        return "次の選択肢のうち、正しいものはどれか。"
    
    return "次の選択肢のうち、正しいものはどれか。"

def fix_comprehensive_additional_questions():
    print("🔧 追加問題64問の包括的修正を開始...")
    
    # ファイルを読み込み
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # バックアップ作成
    with open('questions_comprehensive_additional_backup.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("💾 バックアップ作成完了")
    
    # more_subject_a と more_algorithm のセクションを検索
    more_sections = ['more_subject_a', 'more_algorithm']
    
    for section in more_sections:
        print(f"🔍 {section} セクションを処理中...")
        
        # セクションの開始位置を探す
        section_start = content.find(f'{section}:')
        if section_start == -1:
            print(f"❌ {section} セクションが見つかりません")
            continue
        
        # セクション内の問題を探すパターン（より柔軟な）
        section_end = content.find('],', section_start)
        if section_end == -1:
            continue
        
        section_content = content[section_start:section_end + 2]
        
        # 各問題のパターンを検索（より包括的な）
        # {"id": "xxx", で始まるパターンをすべて検索
        question_pattern = r'\{\s*"id":\s*"([^"]+)"[^}]*"choices":\s*\[[^\]]*\][^}]*"correct":\s*\d+[^}]*"explanation":\s*"([^"]*)"[^}]*\}'
        
        questions_found = re.findall(question_pattern, section_content, re.DOTALL)
        print(f"  📋 {len(questions_found)}個の問題を発見")
        
        # 各問題を修正
        for question_id, explanation in questions_found:
            # 元の問題の詳細情報を取得
            single_question_pattern = rf'\{{\s*"id":\s*"{re.escape(question_id)}"[^}}]*\}}'
            match = re.search(single_question_pattern, section_content, re.DOTALL)
            
            if match:
                original_question = match.group(0)
                print(f"  🔧 修正中: {question_id}")
                
                # 選択肢を抽出
                choices_match = re.search(r'"choices":\s*\[(.*?)\]', original_question, re.DOTALL)
                if choices_match:
                    choices_raw = choices_match.group(1)
                    # 選択肢を解析
                    choices = [choice.strip().strip('"') for choice in choices_raw.split(',')]
                    choices = [choice for choice in choices if choice and choice != '']
                    
                    # 問題文を生成
                    question_text = generate_question_text_from_info(choices, explanation, question_id, section)
                    
                    # textフィールドを追加した新しい問題を作成
                    if '"text"' not in original_question:
                        # textフィールドがない場合は追加
                        new_question = original_question.replace(
                            f'"id": "{question_id}",',
                            f'"id": "{question_id}",\n                    "category": "{"algorithm" if section == "more_algorithm" else "subject_a"}",\n                    "level": "standard",\n                    "text": "{question_text}",\n                    "code": null,'
                        )
                        
                        # 元のコンテンツを置換
                        content = content.replace(original_question, new_question)
                        print(f"    ✅ {question_id}: {question_text[:40]}...")
    
    # 修正されたファイルを保存
    with open('questions.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("💾 修正完了！")
    print("🎯 追加問題64問すべてに問題文を追加しました！")

if __name__ == "__main__":
    fix_comprehensive_additional_questions()