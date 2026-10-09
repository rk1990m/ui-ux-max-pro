const fs = require('fs');
const path = require('path');

function printWelcome(args = []) {
  const isDev = args.includes('--dev');

  console.log('====================================');
  console.log('UI/UX Max Pro');
  console.log('====================================');
  console.log('Premium UI/UX toolkit and workflow CLI');
  console.log('');
  console.log('Commands:');
  console.log('  ui-ux-max-pro init                Initialize a new project');
  console.log('  ui-ux-max-pro generate <name>    Generate a new component');
  console.log('  ui-ux-max-pro list               List all available components');
  console.log('  ui-ux-max-pro config             Manage configuration');
  console.log('  ui-ux-max-pro --version          Show version');
  console.log('  ui-ux-max-pro --help             Show this help message');
  console.log('');

  if (isDev) {
    console.log('Development mode enabled.');
    console.log('Project is ready for UI/UX enhancements.');
  } else {
    console.log('Ready for production UI/UX workflows.');
  }
}

function showHelp() {
  console.log('UI/UX Max Pro - CLI Help');
  console.log('');
  console.log('Usage: ui-ux-max-pro [command] [options]');
  console.log('');
  console.log('Commands:');
  console.log('  init                  Initialize a new UI/UX project');
  console.log('  generate <name>       Generate a new UI component');
  console.log('  gen <name>            Alias for generate');
  console.log('  list                  List available components');
  console.log('  ls                    Alias for list');
  console.log('  config                Manage project configuration');
  console.log('  --version, -v         Show version information');
  console.log('  --help, -h            Show this help message');
  console.log('  --dev                 Run in development mode');
  console.log('');
  console.log('Examples:');
  console.log('  ui-ux-max-pro init');
  console.log('  ui-ux-max-pro generate Button');
  console.log('  ui-ux-max-pro config show');
  console.log('  ui-ux-max-pro list');
}

function showVersion() {
  const pkg = require('../package.json');
  console.log(`UI/UX Max Pro v${pkg.version}`);
}

function initProject(options) {
  const projectName = options[0] || 'my-ui-ux-project';
  const projectDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    console.error(`✗ Directory ${projectName} already exists`);
    process.exit(1);
  }

  console.log(`✓ Initializing project: ${projectName}`);

  fs.mkdirSync(projectDir, { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'components'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'styles'), { recursive: true });

  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: 'A UI/UX project powered by UI/UX Max Pro',
    main: 'index.js',
    scripts: {
      start: 'echo "Start your project here"',
    },
    keywords: ['ui', 'ux', 'design'],
    author: '',
    license: 'MIT',
  };

  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  const readme = `# ${projectName}

A UI/UX project created with UI/UX Max Pro.

## Getting Started

\`\`\`bash
cd ${projectName}
npm install
\`\`\`

## Project Structure

- \`components/\` - Your UI components
- \`styles/\` - Style files

## Usage

Create components and add them to the \`components/\` directory.

Generate new components with:
\`\`\`bash
ui-ux-max-pro generate ComponentName
\`\`\`
`;

  fs.writeFileSync(path.join(projectDir, 'README.md'), readme);

  const configFile = {
    theme: 'light',
    language: 'en',
    componentFormat: 'vue',
  };

  fs.writeFileSync(
    path.join(projectDir, '.ui-ux-max-pro.json'),
    JSON.stringify(configFile, null, 2)
  );

  console.log(`✓ Project initialized successfully!`);
  console.log(`✓ Navigate to: cd ${projectName}`);
  console.log(`✓ Install dependencies: npm install`);
}

function generateComponent(componentName, options) {
  const componentDir = path.join(process.cwd(), 'components');

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  const fileName = path.join(componentDir, `${componentName}.vue`);

  if (fs.existsSync(fileName)) {
    console.error(`✗ Component ${componentName} already exists`);
    process.exit(1);
  }

  const componentTemplate = `<template>
  <div class="component-${componentName.toLowerCase()}">
    <h2>${componentName}</h2>
    <p>Your component content here</p>
  </div>
</template>

<script>
export default {
  name: '${componentName}',
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.component-${componentName.toLowerCase()} {
  padding: 16px;
  border-radius: 8px;
  background: #f5f5f5;
}
</style>
`;

  fs.writeFileSync(fileName, componentTemplate);

  console.log(`✓ Component generated: ${componentName}`);
  console.log(`✓ Location: components/${componentName}.vue`);
  console.log(`✓ Ready to use in your project!`);
}

function listComponents() {
  const componentDir = path.join(process.cwd(), 'components');

  if (!fs.existsSync(componentDir)) {
    console.log('No components directory found.');
    console.log('Create one with: ui-ux-max-pro init');
    return;
  }

  const files = fs.readdirSync(componentDir);

  if (files.length === 0) {
    console.log('No components found.');
    console.log('Generate one with: ui-ux-max-pro generate ComponentName');
    return;
  }

  console.log('Available Components:');
  console.log('');
  files.forEach((file, index) => {
    console.log(`  ${index + 1}. ${file}`);
  });
  console.log('');
}

module.exports = {
  printWelcome,
  generateComponent,
  initProject,
  listComponents,
  showHelp,
  showVersion,
};
