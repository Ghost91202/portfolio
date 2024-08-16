// Function to toggle folder open/close
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

// Function to create a new file
function createFile() {
    const fileName = prompt("Enter the name of the new file:");
    if (fileName) {
        const fileList = document.getElementById('file-list');
        const newFile = document.createElement('li');
        newFile.className = 'file';
        newFile.textContent = fileName;
        newFile.setAttribute('onclick', 'selectFile(this)');
        fileList.appendChild(newFile);
    }
}

// Function to select a file and display its content
function selectFile(element) {
    // Remove 'selected' class from all files
    const selectedFiles = document.querySelectorAll('.file.selected');
    selectedFiles.forEach(file => file.classList.remove('selected'));

    // Add 'selected' class to the clicked file
    element.classList.add('selected');

    // Update the editor header with the selected file name
    const editorHeader = document.querySelector('.editor-header');
    editorHeader.textContent = element.textContent;

    // Get the code editor element
    const codeEditor = document.getElementById('code-editor');

    // Simulate loading different file contents (this could be expanded with more realistic content)
    let fileContent = '';
    switch (element.textContent) {
        case 'index.html':
            fileContent = `&lt;!DOCTYPE html&gt;<br>
            &lt;html lang="en"&gt;<br>
            &lt;head&gt;<br>
            &nbsp;&nbsp;&lt;meta charset="UTF-8"&gt;<br>
            &nbsp;&nbsp;&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;<br>
            &nbsp;&nbsp;&lt;title&gt;Document&lt;/title&gt;<br>
            &lt;/head&gt;<br>
            &lt;body&gt;<br>
            &lt;/body&gt;<br>
            &lt;/html&gt;`;
            break;
        case 'styles.css':
            fileContent = `body {<br>
            &nbsp;&nbsp;background-color: #1e1e1e;<br>
            &nbsp;&nbsp;color: #fff;<br>
            }`;
            break;
        case 'script.js':
            fileContent = `console.log('Hello, world!');`;
            break;
        case 'Header.js':
            fileContent = `export default function Header() {<br>
            &nbsp;&nbsp;return (&lt;header&gt;Header&lt;/header&gt;);<br>
            }`;
            break;
        case 'Footer.js':
            fileContent = `export default function Footer() {<br>
            &nbsp;&nbsp;return (&lt;footer&gt;Footer&lt;/footer&gt;);<br>
            }`;
            break;
        case 'README.md':
            fileContent = `# Project Title<br>This is a sample project.`;
            break;
        case 'package.json':
            fileContent = `{<br>
            &nbsp;&nbsp;"name": "project",<br>
            &nbsp;&nbsp;"version": "1.0.0"<br>
            }`;
            break;
        default:
            fileContent = `This is the ${element.textContent} file.`;
    }

    // Update the code editor with the selected file's content
    codeEditor.innerHTML = fileContent;
}
