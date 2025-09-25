#!/usr/bin/env node

/**
 * Deployment validation script for InstaFetch
 * Checks if all required files and configurations are present
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating InstaFetch deployment configuration...\n');

const requiredFiles = [
  'package.json',
  'next.config.js',
  'tailwind.config.ts',
  'tsconfig.json',
  'requirements.txt',
  'railway.json',
  'nixpacks.toml',
  'Procfile',
  'app/layout.tsx',
  'app/page.tsx',
  'app/api/extract/route.ts',
  'scripts/instagram_downloader.py',
  'scripts/instagram_downloader_simple.py'
];

const requiredDirs = [
  'app',
  'components',
  'lib',
  'hooks',
  'scripts'
];

let allValid = true;

// Check required files
console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allValid = false;
  }
});

// Check required directories
console.log('\n📂 Checking required directories:');
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    console.log(`  ✅ ${dir}/`);
  } else {
    console.log(`  ❌ ${dir}/ - MISSING`);
    allValid = false;
  }
});

// Check package.json scripts
console.log('\n📦 Checking package.json scripts:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['dev', 'build', 'start'];
  
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`  ✅ ${script} script`);
    } else {
      console.log(`  ❌ ${script} script - MISSING`);
      allValid = false;
    }
  });
} catch (error) {
  console.log(`  ❌ package.json - INVALID JSON`);
  allValid = false;
}

// Check Python requirements
console.log('\n🐍 Checking Python requirements:');
try {
  const requirements = fs.readFileSync('requirements.txt', 'utf8');
  const requiredPackages = ['requests', 'yt-dlp'];
  
  requiredPackages.forEach(pkg => {
    if (requirements.includes(pkg)) {
      console.log(`  ✅ ${pkg}`);
    } else {
      console.log(`  ❌ ${pkg} - MISSING`);
      allValid = false;
    }
  });
} catch (error) {
  console.log(`  ❌ requirements.txt - MISSING OR INVALID`);
  allValid = false;
}

// Check Railway configuration
console.log('\n🚂 Checking Railway configuration:');
try {
  const railwayConfig = JSON.parse(fs.readFileSync('railway.json', 'utf8'));
  if (railwayConfig.deploy && railwayConfig.deploy.startCommand) {
    console.log(`  ✅ Railway configuration`);
  } else {
    console.log(`  ❌ Railway configuration - INVALID`);
    allValid = false;
  }
} catch (error) {
  console.log(`  ❌ railway.json - INVALID JSON`);
  allValid = false;
}

// Check Next.js configuration
console.log('\n⚛️ Checking Next.js configuration:');
try {
  const nextConfig = fs.readFileSync('next.config.js', 'utf8');
  if (nextConfig.includes('nextConfig')) {
    console.log(`  ✅ Next.js configuration`);
  } else {
    console.log(`  ❌ Next.js configuration - INVALID`);
    allValid = false;
  }
} catch (error) {
  console.log(`  ❌ next.config.js - MISSING OR INVALID`);
  allValid = false;
}

// Summary
console.log('\n' + '='.repeat(50));
if (allValid) {
  console.log('🎉 All validations passed! Your project is ready for Railway deployment.');
  console.log('\nNext steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Go to Railway.app and deploy from GitHub');
  console.log('3. Set your environment variables');
  console.log('4. Test your Instagram video downloader');
} else {
  console.log('❌ Some validations failed. Please fix the issues above before deploying.');
  console.log('\nCommon fixes:');
  console.log('- Run: npm install');
  console.log('- Run: pip install -r requirements.txt');
  console.log('- Check that all files are committed to Git');
}

process.exit(allValid ? 0 : 1);
