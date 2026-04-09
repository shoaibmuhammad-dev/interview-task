import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 px-4 sm:px-6 lg:px-10 w-full border-t border-[#10B77F33] text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 w-full lg:grid-cols-5 gap-12 mb-20 mx-auto max-w-6xl">
        <div className="col-span-2 lg:col-span-2">
          <Image src={"/uptrix-logo_3.svg"} width={88} height={25} />
          <p className="text-gray-400 mt-4 text-sm max-w-xs mb-8 leading-relaxed">
            Professional monitoring for modern infrastructure. Fast, reliable,
            and developer-first.
          </p>
          <div className="flex gap-4">
            <Link
              href="/"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Image
                src={"/globe-icon.svg"}
                alt="globe-icon"
                width={20}
                height={20}
              />
            </Link>
            <Link
              href="/"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Image src={"/at.svg"} alt="at-icon" width={20} height={20} />
            </Link>
          </div>
        </div>

        <div>
          <h5 className="font-bold mb-6">Product</h5>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Uptime Monitoring
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Status Pages
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Incident Management
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                API Monitoring
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-6">Company</h5>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Customers
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Security
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-6">Legal</h5>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-white transition-colors">
                SLA
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 mx-auto max-w-6xl">
        <p>© 2024 Uptrix Monitoring Inc. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="/" className="hover:text-white transition-colors">
            Twitter
          </Link>
          <Link href="/" className="hover:text-white transition-colors">
            GitHub
          </Link>
          <Link href="/" className="hover:text-white transition-colors">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
