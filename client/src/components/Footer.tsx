import { Link } from "react-router-dom";
import {
    Facebook,
    Twitter,
    Instagram,
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Youtube,
    MessageCircle,
    Send,
    ExternalLink,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-4">
                            <img
                                src="/images/logo.png"
                                alt="logo"
                                width={40}
                                height={40}
                            />
                            <h3 className="text-2xl font-bold text-[#3BB77E] ml-2">
                                E-commerce
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                            Your trusted online marketplace for quality
                            products. We bring the best shopping experience
                            right to your doorstep.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#3BB77E] transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#3BB77E] transition-colors"
                                aria-label="Twitter/X"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#3BB77E] transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#3BB77E] transition-colors"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#3BB77E] transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#3BB77E] transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#3BB77E] transition-colors"
                                aria-label="Discord/Chat"
                            >
                                <MessageCircle size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#3BB77E] transition-colors"
                                aria-label="Telegram/WhatsApp"
                            >
                                <Send size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#3BB77E] transition-colors"
                                aria-label="Website"
                            >
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/products"
                                    className="text-gray-600 dark:text-gray-300 hover:text-[#3BB77E] transition-colors"
                                >
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-600 dark:text-gray-300 hover:text-[#3BB77E] transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-600 dark:text-gray-300 hover:text-[#3BB77E] transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    className="text-gray-600 dark:text-gray-300 hover:text-[#3BB77E] transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Contact Info
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <Mail
                                    size={16}
                                    className="mr-2 text-[#3BB77E]"
                                />
                                <span>support@ecommerce.com</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <Mail
                                    size={16}
                                    className="mr-2 text-[#3BB77E]"
                                />
                                <span>info@ecommerce.com</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <Phone
                                    size={16}
                                    className="mr-2 text-[#3BB77E]"
                                />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <Phone
                                    size={16}
                                    className="mr-2 text-[#3BB77E]"
                                />
                                <span>+1 (555) 987-6543</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <MapPin
                                    size={16}
                                    className="mr-2 text-[#3BB77E]"
                                />
                                <span>123 Commerce St, Business City</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <MapPin
                                    size={16}
                                    className="mr-2 text-[#3BB77E]"
                                />
                                <span>456 Market Ave, Tech Town</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
                            © 2024 E-commerce. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <Link
                                to="/privacy"
                                className="text-gray-500 dark:text-gray-400 hover:text-[#3BB77E] transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-gray-500 dark:text-gray-400 hover:text-[#3BB77E] transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                to="/shipping"
                                className="text-gray-500 dark:text-gray-400 hover:text-[#3BB77E] transition-colors"
                            >
                                Shipping Info
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
