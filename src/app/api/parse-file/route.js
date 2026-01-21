import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileName = file.name.toLowerCase()
    const buffer = Buffer.from(await file.arrayBuffer())

    // Check file size (10MB max)
    if (buffer.length > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File is too large. Maximum size is 10MB.' }, { status: 400 })
    }

    let text = ''

    if (fileName.endsWith('.pdf')) {
      // Parse PDF using pdf-parse
      const pdfParseModule = await import('pdf-parse')
      const pdfParse = pdfParseModule.default || pdfParseModule
      const data = await pdfParse(buffer)
      text = data.text
    } else if (fileName.endsWith('.docx')) {
      // Parse Word document using mammoth (dynamic import)
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else if (fileName.endsWith('.txt')) {
      // Plain text
      text = buffer.toString('utf-8')
    } else {
      return NextResponse.json(
        { error: 'Unsupported file format. Please upload PDF, Word (.docx), or TXT files.' },
        { status: 400 }
      )
    }

    text = text.trim()

    if (!text) {
      return NextResponse.json(
        { error: 'File appears to be empty or image-based. Please paste your CV text manually.' },
        { status: 400 }
      )
    }

    return NextResponse.json({ text })
  } catch (error) {
    console.error('File parsing error:', error.message, error.stack)
    return NextResponse.json(
      { error: `Failed to parse file: ${error.message}. Please try pasting your CV text manually.` },
      { status: 500 }
    )
  }
}
