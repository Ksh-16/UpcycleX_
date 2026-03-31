import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav className="list-none mb-10">
              <li>
                <Link href="/marketplace?category=Bags%20%26%20Accessories" className="text-gray-600 hover:text-gray-800">Bags & Accessories</Link>
              </li>
              <li>
                <Link href="/marketplace?category=Home%20Decor" className="text-gray-600 hover:text-gray-800">Home Decor</Link>
              </li>
              <li>
                <Link href="/marketplace?category=Fashion" className="text-gray-600 hover:text-gray-800">Fashion</Link>
              </li>
              <li>
                <Link href="/marketplace?category=Garden%20%26%20Plants" className="text-gray-600 hover:text-gray-800">Garden & Plants</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">QUICK LINKS</h2>
            <nav className="list-none mb-10">
              <li>
                <Link href="/marketplace" className="text-gray-600 hover:text-gray-800">Marketplace</Link>
              </li>
              <li>
                <Link href="/upload" className="text-gray-600 hover:text-gray-800">Upload Waste</Link>
              </li>
              <li>
                <Link href="/connect" className="text-gray-600 hover:text-gray-800">Find Makers</Link>
              </li>
              <li>
                <Link href="/policy" className="text-gray-600 hover:text-gray-800">Our Policies</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">FOR SELLERS</h2>
            <nav className="list-none mb-10">
              <li>
                <Link href="/seller" className="text-gray-600 hover:text-gray-800">Seller Dashboard</Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-gray-800">Become a Seller</Link>
              </li>
              <li>
                <Link href="/connect" className="text-gray-600 hover:text-gray-800">Join as Maker</Link>
              </li>
              <li>
                <Link href="/policy" className="text-gray-600 hover:text-gray-800">Seller Policies</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SUBSCRIBE</h2>
            <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
              <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                <label htmlFor="footer-field" className="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="footer-field" name="footer-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-green-800 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded transition-colors">Submit</button>
            </div>
            <p className="text-gray-500 text-sm mt-2 md:text-left text-center">Join our newsletter to stay updated
              <br className="lg:block hidden" />with our latest news
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-full p-2 bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <span className="ml-3 text-xl">UpCycleX</span>
          </Link>
          <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">&copy; {currentYear} UpCycleX —
            <a href="https://twitter.com/techQuesters" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@techQuesters</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500 hover:text-gray-700 cursor-pointer">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500 hover:text-gray-700 cursor-pointer">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
