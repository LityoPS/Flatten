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
                className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100"
              >
                <Image
                  src="/logo.svg"
                  alt="Synopsis"
                  width="32"
                  height="32"
                  className="w-8"
                />
                <span>Synopsis</span>
              </Link>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed lg:text-left">
              Synopsis is an Abstractive Text Summarization Website built with
              Next.js & TailwindCSS. It uses a fine-tuned Flan-T5 model to
              generate summaries trained on the XSUM and CNN/Daily Mail
              datasets.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-4 gap-y-2 lg:gap-x-6">
            {navigation.map((item, index) => (
              <Link
                key={`${item.name}-${index}`}
                href={item.href}
                className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:outline-none transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}