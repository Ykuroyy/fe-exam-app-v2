#!/usr/bin/env python3
"""
すべての過去問問題にPDFファイルを包括的に割り当てるスクリプト
"""
import re
import json

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

def comprehensive_pdf_update():
    """すべての過去問にPDFを包括的に割り当て"""
    
    print("📄 包括的PDF割り当てを開始...")
    
    # questions.jsファイルを読み込み
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    total_updated = 0
    
    for category, pdf_url in PDF_MAPPING.items():
        print(f"🔍 {category} カテゴリを包括的に処理中...")
        
        # カテゴリセクションを特定
        category_start = content.find(f'{category}:')
        if category_start == -1:
            print(f"⚠️  {category} カテゴリが見つかりませんでした")
            continue
        
        # セクションの終わりを特定（次のカテゴリまたはファイル終端）
        section_start = content.find('[', category_start)
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
        
        # セクション内容を抽出
        section_content = content[section_start:section_end]
        
        # すべての問題にpdfUrlを追加（既存のものは更新）
        # "code": null, または "code": "...", の行を見つけて、その後にpdfUrlを追加
        updated_section = re.sub(
            r'("code":\s*(?:null|"[^"]*"),)(\s*"choices")',
            rf'\1\n                    "pdfUrl": "{pdf_url}",\2',
            section_content
        )
        
        # 既存のpdfUrlがある場合は更新
        updated_section = re.sub(
            r'"pdfUrl":\s*"[^"]*"',
            f'"pdfUrl": "{pdf_url}"',
            updated_section
        )
        
        # 元のコンテンツを更新
        if updated_section != section_content:
            content = content[:section_start] + updated_section + content[section_end:]
            
            # 追加された数を数える
            count = updated_section.count(f'"pdfUrl": "{pdf_url}"')
            print(f"✅ {category} カテゴリに {count} 問のPDFを設定しました")
            total_updated += count
        else:
            print(f"ℹ️  {category} カテゴリは変更なし")
    
    # バックアップを作成
    with open('questions_comprehensive_backup.js', 'w', encoding='utf-8') as f:
        with open('questions.js', 'r', encoding='utf-8') as original:
            f.write(original.read())
    
    # 更新されたファイルを保存
    with open('questions.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ 合計 {total_updated} 問にPDFファイルを設定しました")
    print("💾 questions.js を更新し、バックアップを作成しました")

def add_pdf_to_individual_questions():
    """個別の問題IDベースでPDFを追加"""
    
    print("📝 個別問題へのPDF追加を開始...")
    
    with open('questions.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # IDパターンベースでPDFを割り当て
    id_pdf_mapping = {
        r'r5[ab]\d+': {'r5a': 'pdfs/2023r05_fe_kamoku_a_qs.pdf', 'r5b': 'pdfs/2023r05_fe_kamoku_b_qs.pdf'},
        r'r6[ab]\d+': {'r6a': 'pdfs/2024r06_fe_kamoku_a_qs.pdf', 'r6b': 'pdfs/2024r06_fe_kamoku_b_qs.pdf'},
        r'r7[ab]\d+': {'r7a': 'pdfs/2025r07_fe_kamoku_a_qs.pdf', 'r7b': 'pdfs/2025r07_fe_kamoku_b_qs.pdf'}
    }
    
    updated_count = 0
    
    # 問題オブジェクトを個別に処理
    question_pattern = r'\{\s*"id":\s*"([^"]+)"[^}]*"code":\s*(?:null|"[^"]*"),([^}]*)\}'
    
    def update_question(match):
        nonlocal updated_count
        question_id = match.group(1)
        rest_of_question = match.group(2)
        
        # IDに基づいてPDFURLを決定
        pdf_url = None
        
        if question_id.startswith('r5a'):
            pdf_url = 'pdfs/2023r05_fe_kamoku_a_qs.pdf'
        elif question_id.startswith('r5b'):
            pdf_url = 'pdfs/2023r05_fe_kamoku_b_qs.pdf'
        elif question_id.startswith('r6a'):
            pdf_url = 'pdfs/2024r06_fe_kamoku_a_qs.pdf'
        elif question_id.startswith('r6b'):
            pdf_url = 'pdfs/2024r06_fe_kamoku_b_qs.pdf'
        elif question_id.startswith('r7a'):
            pdf_url = 'pdfs/2025r07_fe_kamoku_a_qs.pdf'
        elif question_id.startswith('r7b'):
            pdf_url = 'pdfs/2025r07_fe_kamoku_b_qs.pdf'
        
        if pdf_url:
            # pdfUrlが既に存在するかチェック
            if '"pdfUrl"' not in rest_of_question:
                # pdfUrlを追加
                rest_of_question = f'\n                    "pdfUrl": "{pdf_url}",' + rest_of_question
                updated_count += 1
                print(f"📄 {question_id} にPDFを追加: {pdf_url}")
            else:
                # 既存のpdfUrlを更新
                rest_of_question = re.sub(
                    r'"pdfUrl":\s*"[^"]*"',
                    f'"pdfUrl": "{pdf_url}"',
                    rest_of_question
                )
                print(f"🔄 {question_id} のPDFを更新: {pdf_url}")
        
        return f'{{"id": "{question_id}",{rest_of_question}}}'
    
    # 問題を個別に更新
    updated_content = re.sub(question_pattern, update_question, content, flags=re.DOTALL)
    
    if updated_content != content:
        with open('questions.js', 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"✅ {updated_count} 問を個別に更新しました")
    else:
        print("ℹ️  個別更新による変更はありませんでした")

if __name__ == "__main__":
    try:
        comprehensive_pdf_update()
        print("\n" + "="*60 + "\n")
        add_pdf_to_individual_questions()
        
        # 最終確認
        print("\n" + "="*60 + "\n")
        print("📊 最終PDF割り当て状況:")
        
        with open('questions.js', 'r', encoding='utf-8') as f:
            content = f.read()
        
        for category, pdf_url in PDF_MAPPING.items():
            count = content.count(f'"{pdf_url}"')
            print(f"  {category}: {count} 問に {pdf_url}")
        
        total_pdf_assignments = content.count('"pdfUrl":')
        print(f"\n🎯 総PDF割り当て数: {total_pdf_assignments} 問")
        
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")