#!/usr/bin/env python3
"""
questions.jsの構文エラーを修正するスクリプト
"""
import re

def fix_syntax_errors():
    """構文エラーを修正"""
    
    print("🔧 questions.jsの構文エラーを修正中...")
    
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # バックアップ作成
    with open('questions_syntax_backup.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    # 問題のあるパターンを修正
    # パターン1: {"id": "pracXXX", { → { "id": "pracXXX",
    pattern1 = r'(\{"id": "prac\d+",)\s*\{'
    content = re.sub(pattern1, r'{\n                    "id": "prac\d+",', content)
    
    # より正確なパターンマッチング
    # 不正: {"id": "pracXXX", {
    # 正解: { "id": "pracXXX",
    
    # 全ての {"id": "prac を { "id": "prac に置換
    content = re.sub(r'\{"id": "prac(\d+)",\s*\{', r'{\n                    "id": "prac\1",', content)
    
    # 構文チェック用のより具体的な修正
    lines = content.split('\n')
    fixed_lines = []
    
    for i, line in enumerate(lines):
        # {"id": "pracXXX", で始まる行を修正
        if re.match(r'\s*\{"id": "prac\d+",\s*$', line):
            # 次の行が { なら削除
            indent = len(line) - len(line.lstrip())
            fixed_line = ' ' * indent + '{' + line.strip()[1:]  # 最初の{を除去してインデント調整
            fixed_lines.append(fixed_line)
            
            # 次の行が単独の { なら スキップ
            if i + 1 < len(lines) and lines[i + 1].strip() == '{':
                continue
        else:
            fixed_lines.append(line)
    
    content = '\n'.join(fixed_lines)
    
    # 更新されたファイルを保存
    with open('questions.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ 構文エラーの修正完了")
    print("💾 questions.js を更新し、バックアップを作成しました")

def simple_fix():
    """シンプルな修正方法"""
    print("🔧 シンプルな構文修正を実行...")
    
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # バックアップ作成
    with open('questions_simple_backup.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    # 問題パターンを検索・修正
    # {"id": "pracXXX",\n            { の形を修正
    pattern = r'(\s*)\{"id": "prac(\d+)",\s*\n\s*\{'
    
    def replace_func(match):
        indent = match.group(1)
        prac_num = match.group(2)
        return f'{indent}{{\n{indent}                    "id": "prac{prac_num}",'
    
    content = re.sub(pattern, replace_func, content)
    
    # 更新されたファイルを保存
    with open('questions.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ シンプル修正完了")

if __name__ == "__main__":
    try:
        simple_fix()
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")
        import traceback
        traceback.print_exc()