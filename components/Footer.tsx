import Link from 'next/link';
import { Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                InstaFetch
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Fast, free, and simple Instagram video downloads. 
              Download any Instagram video in seconds.
            </p>
            
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Legal</h3>
            <div className="space-y-2">
              <Link 
                href="/privacy" 
                className="block text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="block text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2025 InstaFetch. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            InstaFetch is not affiliated with Instagram or Meta.
          </p>
        </div>
      </div>
    </footer>
  );
}