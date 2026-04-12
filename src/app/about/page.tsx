import React from 'react';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-border pb-3">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{children}</h2>
    </div>
  );
}

function ResumeItem({
  title,
  location,
  subtitle,
  period,
  bullets,
}: {
  title: React.ReactNode;
  location?: string;
  subtitle?: string;
  period?: string;
  bullets: string[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="font-bold text-foreground">{title}</div>
        {location ? <span className="italic text-muted">{location}</span> : null}
      </div>
      {subtitle || period ? (
        <div className="flex flex-col gap-1 text-sm italic text-muted sm:flex-row sm:justify-between">
          <span>{subtitle}</span>
          <span>{period}</span>
        </div>
      ) : null}
      <ul className="list-disc space-y-1 pl-5 text-muted marker:text-subtle">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Tsung-Yu Chan</h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-foreground/80">
            <a href="mailto:tycharlie.c@gmail.com" className="transition-colors hover:text-foreground">
              tycharlie.c@gmail.com
            </a>
            <span>|</span>
            <a href="https://github.com/tycharlie99" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              GitHub
            </a>
            <span>|</span>
            <a href="https://www.linkedin.com/in/tsungyu-chan/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <span>|</span>
            <a href="https://tycharlie.com" className="transition-colors hover:text-foreground">
              tycharlie.com
            </a>
          </div>
        </header>

        <div className="space-y-14">
          <section className="space-y-6">
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-6">
              <ResumeItem
                title="National Yang Ming Chiao Tung University"
                location="Hsinchu, Taiwan"
                subtitle="Master of Computer Science and Engineering"
                period="Feb. 2022 – Feb. 2024"
                bullets={[
                  "GPA: 4.3/4.3",
                  "Thesis: 5G NR PUSCH Procedure Optimization and Parallelization Based on ARM Platform",
                ]}
              />
              <ResumeItem
                title="National Taiwan University of Science and Technology"
                location="Hsinchu, Taiwan"
                subtitle="Bachelor of Electronic and Computer Engineering"
                period="Sep. 2018 – Jan. 2022"
                bullets={["GPA: 4.0/4.3"]}
              />
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-6">
              <ResumeItem
                title="Synopsys"
                location="Taipei, Taiwan"
                subtitle="Sr. R&D Engineer"
                period="Feb. 2025 – Present"
                bullets={["Designed and implemented graphical user interfaces (GUI) using Qt framework."]}
              />
              <ResumeItem
                title="EURECOM"
                location="Biot, France"
                subtitle="Intern"
                period="Apr. 2023 – Sep. 2023"
                bullets={[
                  "Migrated OpenAirInterface to the AArch64 platform.",
                  "Developed OpenAirInterface on the AArch64 platform.",
                  "Optimized and parallelized the physical layer of OpenAirInterface.",
                ]}
              />
              <ResumeItem
                title="eCloudvalley Digital Technology"
                location="New Taipei, Taiwan"
                subtitle="Intern"
                period="Apr. 2021 – Aug. 2022"
                bullets={[
                  "Developed technical materials for learning AWS and Azure.",
                  "Developed the cloud services playground platform using AWS and Azure.",
                  "Developed an IoT-enabled pool table project.",
                ]}
              />
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading>Skill</SectionHeading>
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              <table className="w-full border-collapse text-left">
                <tbody>
                  <tr className="border-b border-border last:border-0">
                    <td className="w-40 px-4 py-3 align-top font-bold text-foreground">Domain Knowledge</td>
                    <td className="px-4 py-3 text-muted">5G, Web, DevOps, Software Engineering, Unix-like Operating System</td>
                  </tr>
                  <tr className="border-b border-border last:border-0">
                    <td className="px-4 py-3 align-top font-bold text-foreground">Programming</td>
                    <td className="px-4 py-3 text-muted">C, C++, Python</td>
                  </tr>
                  <tr className="border-b border-border last:border-0">
                    <td className="px-4 py-3 align-top font-bold text-foreground">Other</td>
                    <td className="px-4 py-3 text-muted">Docker, Kubernetes, AWS, Azure</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading>Project</SectionHeading>
            <div className="space-y-6">
              <ResumeItem
                title={(
                  <a
                    href="https://github.com/tycharlie99/BareMetal-OS-Kernel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    Simple OS Kernel on Raspberry Pi 3
                  </a>
                )}
                location="Course Project"
                bullets={[
                  "Developed a simple OS in a bare-metal environment.",
                  "Implemented exception and interrupt handling, along with basic system calls.",
                  "Supported virtual memory management using a buddy system for page allocation.",
                  "Added multitasking support with a scheduler and context switching.",
                ]}
              />
              <ResumeItem
                title={(
                  <a
                    href="https://github.com/tycharlie99/webrtc-project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    Video streaming platform
                  </a>
                )}
                location="Team Project"
                bullets={[
                  "WebRTC-based live streaming platform.",
                  "Supported the chat room on the platform.",
                  "Supported the login feature for managing the users.",
                ]}
              />
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
