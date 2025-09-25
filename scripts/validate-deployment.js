#!/usr/bin/env node

/**
 * Deployment validation script for InstaFetch
 * Checks if all required files and configurations are present
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'package.json',
  'next.config.js',
  'vercel.json',
  'requirements.txt',
  'app/layout.tsx',
  'app/page.tsx',
  'app/api/extract/route.ts',
  'scripts/instagram_downloader_vercel.py',
  'scripts/instagram_downloader_simple.py'
];

const requiredDirs = [
  'app',
  'components',
  'lib',
  'scripts'
];

function checkFile(filePath) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${filePath}`);
    return true;
  } else {
    console.log(`❌ ${filePath} - MISSING`);
    return false;
  }
}

function checkDirectory(dirPath) {
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    console.log(`✅ ${dirPath}/`);
    return true;
  } else {
    console.log(`❌ ${dirPath}/ - MISSING`);
    return false;
  }
}

function validatePackageJson() {
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    console.log('\n📦 Package.json validation:');
    
    // Check required scripts
    const requiredScripts = ['dev', 'build', 'start', 'lint'];
    const missingScripts = requiredScripts.filter(script => !pkg.scripts[script]);
    
    if (missingScripts.length === 0) {
      console.log('✅ All required scripts present');
    } else {
      console.log(`❌ Missing scripts: ${missingScripts.join(', ')}`);
    }
    
    // Check required dependencies
    const requiredDeps = ['next', 'react', 'react-dom'];
    const missingDeps = requiredDeps.filter(dep => !pkg.dependencies[dep]);
    
    if (missingDeps.length === 0) {
      console.log('✅ All required dependencies present');
    } else {
      console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`);
    }
    
    return missingScripts.length === 0 && missingDeps.length === 0;
  } catch (error) {
    console.log('❌ Invalid package.json');
    return false;
  }
}

function validateVercelConfig() {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    
    console.log('\n🚀 Vercel configuration validation:');
    
    if (vercelConfig.version && vercelConfig.builds) {
      console.log('✅ Vercel configuration valid');
      return true;
    } else {
      console.log('❌ Invalid Vercel configuration');
      return false;
    }
  } catch (error) {
    console.log('❌ Invalid vercel.json');
    return false;
  }
}

function validatePythonScripts() {
  console.log('\n🐍 Python scripts validation:');
  
  const pythonScripts = [
    'scripts/instagram_downloader_vercel.py',
    'scripts/instagram_downloader_simple.py'
  ];
  
  let allValid = true;
  
  pythonScripts.forEach(script => {
    if (fs.existsSync(script)) {
      const content = fs.readFileSync(script, 'utf8');
      if (content.includes('def main()') && content.includes('json.dumps')) {
        console.log(`✅ ${script} - Valid Python script`);
      } else {
        console.log(`❌ ${script} - Invalid Python script`);
        allValid = false;
      }
    } else {
      console.log(`❌ ${script} - Missing`);
      allValid = false;
    }
  });
  
  return allValid;
}

function validateRequirements() {
  console.log('\n📋 Python requirements validation:');
  
  if (fs.existsSync('requirements.txt')) {
    const content = fs.readFileSync('requirements.txt', 'utf8');
    if (content.includes('requests') && content.includes('urllib3')) {
      console.log('✅ requirements.txt - Valid');
      return true;
    } else {
      console.log('❌ requirements.txt - Missing required packages');
      return false;
    }
  } else {
    console.log('❌ requirements.txt - Missing');
    return false;
  }
}

function main() {
  console.log('🔍 InstaFetch Deployment Validation');
  console.log('=====================================');
  
  let allValid = true;
  
  // Check required files
  console.log('\n📁 Required files:');
  requiredFiles.forEach(file => {
    if (!checkFile(file)) {
      allValid = false;
    }
  });
  
  // Check required directories
  console.log('\n📂 Required directories:');
  requiredDirs.forEach(dir => {
    if (!checkDirectory(dir)) {
      allValid = false;
    }
  });
  
  // Validate configurations
  const packageValid = validatePackageJson();
  const vercelValid = validateVercelConfig();
  const pythonValid = validatePythonScripts();
  const requirementsValid = validateRequirements();
  
  // Final result
  console.log('\n🎯 Validation Summary:');
  console.log('=====================');
  
  if (allValid && packageValid && vercelValid && pythonValid && requirementsValid) {
    console.log('✅ All validations passed!');
    console.log('🚀 Ready for Vercel deployment!');
    console.log('\nNext steps:');
    console.log('1. git add .');
    console.log('2. git commit -m "Ready for deployment"');
    console.log('3. git push origin main');
    console.log('4. Deploy to Vercel');
  } else {
    console.log('❌ Some validations failed!');
    console.log('🔧 Please fix the issues above before deploying.');
  }
  
  return allValid && packageValid && vercelValid && pythonValid && requirementsValid;
}

if (require.main === module) {
  const success = main();
  process.exit(success ? 0 : 1);
}

module.exports = { main };
