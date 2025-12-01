import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Features } from "@/components/Features";
import { Summarizer } from "@/components/Summarizer";
import { HowToUse } from "@/components/HowToUse";
import History from "@/components/History";

export default function Home() {
  return (
    <>
      <section id="summarizer">
        <Container>
          <SectionTitle
            preTitle="Summarizer"
            title="Summarize Your Text"
          >
            Paste your text below and choose a summary style to get started.
          </SectionTitle>
        </Container>
        <Summarizer />
      </section>

      <section id="history">
        <Container>
          <SectionTitle
            preTitle="History"
            title="Your Summary Timeline"
          >
            Keep track of your 5 latest summaries in one place, easily access and manage your previous work.
          </SectionTitle>
        </Container>
        <History />
      </section>

      <section id="features">
        <Container>
          <SectionTitle
            preTitle="Features"
            title="Powerful AI Capabilities"
          >
            Discover what makes our abstractive text summarizer stand out from the rest.
          </SectionTitle>
        </Container>
        <Features />
      </section>

      <section id="how-to-use">
        <Container>
          <SectionTitle
            preTitle="How to Use"
            title="Simple Steps to Get Started"
          >
            Our intuitive interface makes it easy to get high-quality summaries in just a few clicks.
          </SectionTitle>
        </Container>
        <HowToUse />
      </section>
    </>
  );
}