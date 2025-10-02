#!/usr/bin/env python3
"""
過去問PDFファイルを各問題に一括で割り当てるスクリプト
"""
import re

# PDFファイルのマッピング
PDF_MAPPING = {
    # 令和5年度（2023）
    'past_r5_a': 'pdfs/2023r05_fe_kamoku_a_qs.pdf',
    'past_r5_b': 'pdfs/2023r05_fe_kamoku_b_qs.pdf',
    
    # 令和6年度（2024）
    'past_r6_a': 'pdfs/2024r06_fe_kamoku_a_qs.pdf', 
    'past_r6_b': 'pdfs/2024r06_fe_kamoku_b_qs.pdf',
    
    # 令和7年度（2025）
    'past_r7_a': 'pdfs/2025r07_fe_kamoku_a_qs.pdf',
    'past_r7_b': 'pdfs/2025r07_fe_kamoku_b_qs.pdf'
}

def update_questions_with_pdf():
    """questions.jsファイルの過去問問題にPDFURLを追加"""
    
    print("📄 過去問PDFファイルの一括割り当てを開始...")
    
    # questions.jsファイルを読み込み
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    updated_count = 0
    
    # 各カテゴリに対してPDFを割り当て
    for category, pdf_url in PDF_MAPPING.items():
        print(f"🔍 {category} カテゴリを処理中...")
        
        # カテゴリの開始位置を特定
        category_pattern = rf'{category}:\s*\['
        match = re.search(category_pattern, content)
        
        if not match:
            print(f"⚠️  {category} カテゴリが見つかりませんでした")
            continue
        
        # カテゴリ内の問題を特定して更新
        # "code": null, の後に "pdfUrl": "..." を追加
        pattern = rf'({category}:\s*\[.*?)("code":\s*(null|"[^"]*"),)(.*?\s*\])'
        
        def replace_code_with_pdf(match):
            prefix = match.group(1)
            code_line = match.group(2)
            suffix = match.group(4)
            
            # code行の後にpdfUrlを追加
            new_code_line = code_line + f'\n                    "pdfUrl": "{pdf_url}",'
            
            return prefix + new_code_line + suffix
        
        # 正規表現で一括置換（DOTALL フラグで改行も含む）
        new_content = re.sub(pattern, replace_code_with_pdf, content, flags=re.DOTALL)
        
        if new_content != content:
            content = new_content
            count = content.count(f'"pdfUrl": "{pdf_url}"')
            print(f"✅ {category} カテゴリに {count} 問のPDFを追加しました")
            updated_count += count
        else:
            print(f"ℹ️  {category} カテゴリは既に更新済みまたは問題なし")
    
    # バックアップを作成
    with open('questions_backup.js', 'w', encoding='utf-8') as f:
        with open('questions.js', 'r', encoding='utf-8') as original:
            f.write(original.read())
    
    # 更新されたファイルを保存
    with open('questions.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ 合計 {updated_count} 問にPDFファイルを割り当てました")
    print("💾 questions.js を更新し、questions_backup.js にバックアップを作成しました")

def verify_pdf_assignments():
    """PDFの割り当て状況を確認"""
    
    print("🔍 PDF割り当て状況を確認中...")
    
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    for category, pdf_url in PDF_MAPPING.items():
        count = content.count(f'"pdfUrl": "{pdf_url}"')
        print(f"📊 {category}: {count} 問に {pdf_url} が割り当て済み")

if __name__ == "__main__":
    try:
        update_questions_with_pdf()
        print("\n" + "="*60 + "\n")
        verify_pdf_assignments()
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")