// Sample content for demonstration purposes
const filesContent = {
    'index.html': `<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>`,
    'styles.css': `body {\n    background-color: #1e1e1e;\n    color: #d4d4d4;\n    font-family: Arial, sans-serif;\n}`,
    'script.js': `console.log('Hello, world!');`,
    'Header.js': `export default function Header() {\n    return <header>Header</header>;\n}`,
    'Footer.js': `export default function Footer() {\n    return <footer>Footer</footer>;\n}`,
    'README.md': `# Project Title\n\nThis is a sample project.\n\n## Installation\n\nInstructions here.`,
    'package.json': `{\n  "name": "project",\n  "version": "1.0.0",\n  "description": "",\n  "main": "index.js",\n  "scripts": {\n    "test": "echo \\"Error: no test specified\\" && exit 1"\n  },\n  "keywords": [],\n  "author": "",\n  "license": "ISC"\n}`,
    'config.js': `const config = {\n    apiEndpoint: 'https://api.example.com',\n    timeout: 5000\n};\n\nexport default config;`,
    'App.js': `import React from 'react';\n\nfunction App() {\n    return (\n        <div>\n            <h1>App Component</h1>\n        </div>\n    );\n}\n\nexport default App;`,
    'server.js': `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n    res.send('Hello, world!');\n});\n\napp.listen(3000, () => {\n    console.log('Server is running on port 3000');\n});`
};

// Toggle folder open/close
function toggleFolder(element) {
    element.classList.toggle('active');
    const nestedList = element.nextElementSibling;
    if (nestedList.style.display === 'block') {
        nestedList.style.display = 'none';
        element.innerHTML = element.innerHTML.replace('&#9662;', '&#9656;');
    } else {
        nestedList.style.display = 'block';
        element.innerHTML = element.innerHTML.replace('&#9656;', '&#9662;');
    }
}

// Create a new file
function createFile() {
    const fileName = prompt("Enter the name of the new file:");
    if (fileName && !filesContent[fileName]) {
        const fileList = document.getElementById('file-list');
        const newFile = document.createElement('li');
        newFile.className = 'file';
        newFile.innerHTML = `<i class="fas fa-file-code"></i> ${fileName}`;
        newFile.setAttribute('onclick', `openFile(this, '${fileName}')`);
        fileList.appendChild(newFile);
        filesContent[fileName] = ''; // Initialize empty content for the new file
    } else {
        alert("File name is invalid or already exists.");
    }
}

// Open a file
function openFile(element, fileName) {
    const tabs = document.getElementById('tabs');
    const existingTab = document.querySelector(`.tab[data-filename="${fileName}"]`);

    // If the tab is not already open, create a new tab
    if (!existingTab) {
        const newTab = document.createElement('div');
        newTab.className = 'tab';
        newTab.dataset.filename = fileName;
        newTab.innerHTML = `<span>${fileName}</span> <i class="fas fa-times" onclick="closeTab(event)"></i>`;
        newTab.onclick = () => selectFile(fileName);
        tabs.appendChild(newTab);
    }

    // Select the newly opened or existing tab
    selectFile(fileName);
}

// Select a file and display its content
function selectFile(fileName) {
    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Add 'active' class to the clicked tab
    const activeTab = document.querySelector(`.tab[data-filename="${fileName}"]`);
    activeTab.classList.add('active');

    // Update the code editor with the selected file's content
    const codeEditor = document.getElementById('code-editor');
    codeEditor.value = filesContent[fileName];
    codeEditor.dataset.filename = fileName;
}

// Close a tab
function closeTab(event) {
    event.stopPropagation();
    const tab = event.target.parentElement;
    const fileName = tab.dataset.filename;
    tab.remove();

    // If there are still open tabs, select the last one
    const remainingTabs = document.querySelectorAll('.tab');
    if (remainingTabs.length > 0) {
        selectFile(remainingTabs[remainingTabs.length - 1].dataset.filename);
    } else {
        // If no tabs remain, clear the editor
        document.getElementById('code-editor').value = '';
    }
}

// Save file content when editing
document.getElementById('code-editor').addEventListener('input', function () {
    const fileName = this.dataset.filename;
    if (fileName) {
        filesContent[fileName] = this.value;
    }
});

// Toggle settings menu
function toggleSettings() {
    const settingsMenu = document.getElementById('settings');
    settingsMenu.classList.toggle('hide');
}

// Change font size
function changeFontSize() {
    const fontSize = document.getElementById('font-size-selector').value;
    document.getElementById('code-editor').style.fontSize = fontSize;
}

// Change theme
function changeTheme() {
    const theme = document.getElementById('theme-selector').value;
    const body = document.body;
    const codeEditor = document.getElementById('code-editor');

    if (theme === 'light') {
        body.style.backgroundColor = '#ffffff';
        body.style.color = '#000000';
        codeEditor.style.backgroundColor = '#f5f5f5';
    } else {
        body.style.backgroundColor = '#1e1e1e';
        body.style.color = '#d4d4d4';
        codeEditor.style.backgroundColor = '#1e1e1e';
    }
}

// Initialize default settings
document.addEventListener('DOMContentLoaded', () => {
    selectFile('index.html'); // Open a default file on load
    changeFontSize();
    changeTheme();
});
