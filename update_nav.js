const fs = require('fs');
const path = require('path');

const dir = 'd:\\level up AI';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const insertion = `                <a href="bughunting.html" class="nav-item">
                    <i class="fa-solid fa-bug"></i> Bug Hunting
                </a>
                <a href="corporate.html" class="nav-item">
                    <i class="fa-solid fa-handshake"></i> Corporate Matches
                </a>
`;

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We want to insert after Assessments
    if (content.includes('href="assessment.html"')) {
        // Find the block for assessment.html
        const match = content.match(/<a href="assessment\.html" class="nav-item[^>]*>[\s\S]*?<\/a>/);
        if (match) {
            // Check if it's already there
            if (!content.includes('bughunting.html')) {
                const replacement = match[0] + '\n' + insertion;
                content = content.replace(match[0], replacement);
                fs.writeFileSync(filePath, content);
                console.log('Updated sidebar in:', file);
            }
        }
    }
});
