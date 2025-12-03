/**
 * Generate PDF from CV HTML
 *
 * Usage:
 * 1. Install puppeteer: npm install -D puppeteer
 * 2. Run: node scripts/generate-cv-pdf.js
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePDF() {
    console.log('🚀 Launching browser...');

    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();

    // Path to the CV HTML file
    const cvPath = join(__dirname, '..', 'src', 'lib', 'cv', 'cv.html');
    const cvUrl = `file://${cvPath}`;

    console.log('📄 Loading CV HTML...');
    await page.goto(cvUrl, {
        waitUntil: 'networkidle0'
    });

    console.log('📝 Generating PDF...');

    // Generate PDF with A4 dimensions
    await page.pdf({
        path: join(__dirname, '..', 'static', 'tom-brereton-cv.pdf'),
        format: 'A4',
        printBackground: true,
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    });

    await browser.close();

    console.log('✅ PDF generated successfully: static/tom-brereton-cv.pdf');
}

generatePDF().catch(err => {
    console.error('❌ Error generating PDF:', err);
    process.exit(1);
});
