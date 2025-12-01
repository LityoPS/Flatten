import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Features } from "@/components/Features";
import { Summarizer } from "@/components/Summarizer";

export default function Home() {
  return (
    <>
      <section id="summarizer">
        <Container>
          <SectionTitle
            preTitle="Summarizer"
            title="Transform Your Text with AI"
          >
            Experience the power of advanced abstractive summarization that captures the essence of your content.
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
            Keep track of all your summaries in one place, easily access and manage your previous work.
          </SectionTitle>
        </Container>
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
      </section>
    </>
  );
}
