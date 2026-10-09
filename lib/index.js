function printWelcome(args = []) {
  const isDev = args.includes('--dev');

  console.log('====================================');
  console.log('UI/UX Max Pro');
  console.log('====================================');
  console.log('Premium UI/UX toolkit and workflow CLI');
  console.log('');
  console.log('Commands:');
  console.log('  ui-ux-max-pro         Show main banner');
  console.log('  ui-ux-max-pro --dev   Run development mode');
  console.log('');

  if (isDev) {
    console.log('Development mode enabled.');
    console.log('Project is ready for UI/UX enhancements.');
  } else {
    console.log('Ready for production UI/UX workflows.');
  }
}

module.exports = {
  printWelcome,
};
