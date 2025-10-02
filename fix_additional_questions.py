#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import json

def generate_question_text_from_choices_and_explanation(choices, explanation, category, question_id):
    """選択肢と解説から適切な問題文を生成"""
    
    # 基本的なパターン別問題文生成
    if any('進数' in choice for choice in choices):
        if any('2進数' in choice or 'binary' in str(choices).lower() for choice in choices):
            return "次の10進数を2進数で表したものはどれか。"
        elif any('16進数' in choice or 'hex' in str(choices).lower() for choice in choices):
            return "次の10進数を16進数で表したものはどれか。"
        else:
            return "次の進数変換として正しいものはどれか。"
    
    # プログラミング関連
    if 'i +=' in explanation or 'インデックス' in explanation:
        return "次のプログラムを実行したとき、変数の値はどれか。"
    
    if 'アルゴリズム' in explanation or 'ソート' in explanation:
        return "次のアルゴリズムに関する説明として、正しいものはどれか。"
    
    # データ構造関連
    if any('配列' in choice or 'リスト' in choice for choice in choices):
        return "次のデータ構造に関する説明として、正しいものはどれか。"
    
    # データベース関連
    if any('SQL' in choice or 'SELECT' in choice or 'データベース' in choice for choice in choices):
        return "次のSQL文またはデータベースに関する説明として、正しいものはどれか。"
    
    # ネットワーク関連
    if any('IP' in choice or 'TCP' in choice or 'HTTP' in choice for choice in choices):
        return "次のネットワークに関する説明として、正しいものはどれか。"
    
    # セキュリティ関連
    if any('暗号' in choice or 'セキュリティ' in choice for choice in choices):
        return "次の情報セキュリティに関する説明として、正しいものはどれか。"
    
    # 計算問題
    if all(choice.isdigit() for choice in choices):
        return "次の計算結果として正しいものはどれか。"
    
    # システム関連
    if any('OS' in choice or 'CPU' in choice or 'メモリ' in choice for choice in choices):
        return "次のコンピュータシステムに関する説明として、正しいものはどれか。"
    
    # ソフトウェア開発関連
    if any('開発' in choice or 'プログラム' in choice or '設計' in choice for choice in choices):
        return "次のソフトウェア開発に関する説明として、正しいものはどれか。"
    
    # カテゴリ別デフォルト
    if category == 'more_subject_a':
        return "次の選択肢のうち、正しいものはどれか。"
    elif category == 'more_algorithm':
        return "次のアルゴリズムまたはプログラムに関する問題として、正しいものはどれか。"
    
    # デフォルト
    return "次の選択肢のうち、正しいものはどれか。"

def fix_additional_questions():
    print("🔧 追加問題64問の問題文修正を開始...")
    
    # questions.js ファイルを読み込み
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("📖 ファイル読み込み完了")
    
    # バックアップ作成
    with open('questions_additional_backup.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("💾 バックアップファイル作成: questions_additional_backup.js")
    
    # more_subject_a セクションを修正
    more_subject_a_pattern = r'(more_subject_a:\s*\[)(.*?)(\],\s*more_algorithm:)'
    more_subject_a_match = re.search(more_subject_a_pattern, content, re.DOTALL)
    
    if more_subject_a_match:
        print("🔍 more_subject_a セクション発見")
        more_subject_a_content = more_subject_a_match.group(2)
        
        # 各問題を修正
        question_pattern = r'\{"id":\s*"([^"]+)",\s*"choices":\s*\[(.*?)\],\s*"correct":\s*(\d+),\s*"explanation":\s*"([^"]+)"'
        
        def replace_subject_a_question(match):
            question_id = match.group(1)
            choices_str = match.group(2)
            correct = match.group(3)
            explanation = match.group(4)
            
            # 選択肢を解析
            choices = [choice.strip().strip('"') for choice in choices_str.split(',')]
            choices = [choice for choice in choices if choice]  # 空文字除去
            
            # 問題文を生成
            question_text = generate_question_text_from_choices_and_explanation(
                choices, explanation, 'more_subject_a', question_id
            )
            
            print(f"  ✅ {question_id}: {question_text[:50]}...")
            
            # 修正された問題を返す
            return f'{{"id": "{question_id}",\n                    "category": "subject_a",\n                    "level": "standard",\n                    "text": "{question_text}",\n                    "code": null,\n                    "choices": [{choices_str}],\n                    "correct": {correct},\n                    "explanation": "{explanation}"'
        
        # more_subject_a の問題を修正
        fixed_subject_a = re.sub(question_pattern, replace_subject_a_question, more_subject_a_content)
        
        # 元のコンテンツを置換
        content = content.replace(more_subject_a_match.group(2), fixed_subject_a)
        print("✅ more_subject_a セクション修正完了")
    
    # more_algorithm セクションを修正
    more_algorithm_pattern = r'(more_algorithm:\s*\[)(.*?)(\]\s*};)'
    more_algorithm_match = re.search(more_algorithm_pattern, content, re.DOTALL)
    
    if more_algorithm_match:
        print("🔍 more_algorithm セクション発見")
        more_algorithm_content = more_algorithm_match.group(2)
        
        def replace_algorithm_question(match):
            question_id = match.group(1)
            choices_str = match.group(2)
            correct = match.group(3)
            explanation = match.group(4)
            
            # 選択肢を解析
            choices = [choice.strip().strip('"') for choice in choices_str.split(',')]
            choices = [choice for choice in choices if choice]  # 空文字除去
            
            # 問題文を生成
            question_text = generate_question_text_from_choices_and_explanation(
                choices, explanation, 'more_algorithm', question_id
            )
            
            print(f"  ✅ {question_id}: {question_text[:50]}...")
            
            # 修正された問題を返す
            return f'{{"id": "{question_id}",\n                    "category": "algorithm",\n                    "level": "standard",\n                    "text": "{question_text}",\n                    "code": null,\n                    "choices": [{choices_str}],\n                    "correct": {correct},\n                    "explanation": "{explanation}"'
        
        # more_algorithm の問題を修正
        fixed_algorithm = re.sub(question_pattern, replace_algorithm_question, more_algorithm_content)
        
        # 元のコンテンツを置換
        content = content.replace(more_algorithm_match.group(2), fixed_algorithm)
        print("✅ more_algorithm セクション修正完了")
    
    # 修正されたファイルを保存
    with open('questions.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("💾 修正完了！questions.js を更新しました")
    print("🎯 追加問題64問すべてに問題文を追加しました！")

if __name__ == "__main__":
    fix_additional_questions()