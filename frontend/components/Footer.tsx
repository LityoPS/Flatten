import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";

export function Footer() {
  const navigation = [
    { name: "Summarizer", href: "#summarizer" },
    { name: "History", href: "#history" },
    { name: "Features", href: "#features" },
    { name: "How to Use", href: "#how-to-use" },
  ];

  return (
    <footer className="relative border-t border-neutral-200 dark:border-[#404040]">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-8 gap-6">
          <div className="flex flex-col gap-3 lg:max-w-md">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-medium text-indigo-600 dark:text-gray-100"
              >
                <Image
                  src="/logo.svg"
                  alt="Flatten"
                  width="32"
                  height="32"
                  className="w-8"
                />
                <span>Flatten</span>
              </Link>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed lg:text-left">
              Flatten is an Abstractive Text Summarization Website built with
              Next.js & TailwindCSS. It uses a fine-tuned Flan-T5 model to
              generate summaries trained on the XSUM and CNN/Daily Mail
              datasets.
            </p>
          </div>

          <nav className="flex flex-col gap-4 lg:items-end">
            <div className="flex flex-wrap gap-x-4 gap-y-2 lg:gap-x-6">
              {navigation.map((item, index) => (
                <Link
                  key={`${item.name}-${index}`}
                  href={item.href}
                  className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:outline-none whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              href="https://github.com/LityoPS/Abstractive-Text-Summarizer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-800 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 w-fit"
            >
              <span>View on GitHub</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5 fill-current"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}