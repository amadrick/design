export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://madrick.design/#person",
        name: "Andy Madrick",
        givenName: "Andy",
        familyName: "Madrick",
        url: "https://madrick.design",
        image: "https://madrick.design/og-image.png",
        jobTitle: ["Product Designer", "Design Engineer"],
        description:
          "Product Designer and Design Engineer with a philosophy background (B.A. Philosophy, Colorado State). Currently at Notion, previously Design Engineer at Tome (AI). Philosophy shapes his approach to design ethics, human-AI interaction, and building tools that respect how people think and work.",
        worksFor: {
          "@type": "Organization",
          name: "Notion",
          url: "https://notion.so",
          description: "Connected workspace for docs, wikis, and projects",
        },
        hasOccupation: [
          {
            "@type": "Occupation",
            name: "Product Designer",
            occupationLocation: {
              "@type": "City",
              name: "San Francisco",
            },
            skills: [
              "Product Design",
              "Design Systems",
              "UI/UX Design",
              "Interaction Design",
              "User Research",
              "Prototyping",
            ],
          },
          {
            "@type": "Occupation",
            name: "Design Engineer",
            description:
              "Technical designer who bridges design and engineering",
            skills: [
              "Design Engineering",
              "Front-end Development",
              "Prototyping",
              "Design Systems",
              "Technical Product Design",
            ],
          },
        ],
        // Work history - important for recruiter discovery
        memberOf: [
          {
            "@type": "OrganizationRole",
            memberOf: {
              "@type": "Organization",
              name: "Notion",
              url: "https://notion.so",
            },
            roleName: "Product Designer",
            startDate: "2024",
          },
          {
            "@type": "OrganizationRole",
            memberOf: {
              "@type": "Organization",
              name: "Lightfield",
              description: "Early-stage startup",
            },
            roleName: "Founding Designer",
            startDate: "2024",
            endDate: "2025",
          },
          {
            "@type": "OrganizationRole",
            memberOf: {
              "@type": "Organization",
              name: "Tome",
              url: "https://tome.app",
              description: "AI-powered storytelling and presentation platform",
            },
            roleName: "Design Engineer",
            startDate: "2024",
            endDate: "2024",
          },
          {
            "@type": "OrganizationRole",
            memberOf: {
              "@type": "Organization",
              name: "Mercury",
              url: "https://mercury.com",
              description: "Banking for startups",
            },
            roleName: "Product Designer",
            startDate: "2022",
            endDate: "2024",
          },
          {
            "@type": "OrganizationRole",
            memberOf: {
              "@type": "Organization",
              name: "ProtoPie",
              url: "https://protopie.io",
              description: "Advanced prototyping tool",
            },
            roleName: "Product Designer",
            startDate: "2021",
            endDate: "2022",
          },
        ],
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "University of Washington",
            department: "Design",
            award: "M. Design",
          },
          {
            "@type": "EducationalOrganization",
            name: "Colorado State University",
            department: "Philosophy",
            award: "B. Arts",
            description:
              "Philosophy background provides foundation for design ethics, epistemology of user experience, and thoughtful approach to human-AI interaction",
          },
        ],
        // Comprehensive skills for recruiter search
        knowsAbout: [
          // Core Design
          "Product Design",
          "Design Engineering",
          "Design Systems",
          "UI/UX Design",
          "Interaction Design",
          "User Experience Design",
          "Digital Product Design",
          "Visual Design",
          // Technical
          "Front-end Development",
          "Prototyping",
          "Technical Product Design",
          "Complex Systems Design",
          // AI & Emerging Tech
          "AI Product Design",
          "AI Interface Design",
          "LLM Interface Design",
          "AI Tools",
          "Generative AI",
          "Human-AI Interaction",
          "Conversational Design",
          "AI UX",
          // Strategic
          "0-1 Product Design",
          "Founding Designer",
          "Product Strategy",
          "Design Leadership",
          // Philosophy & Ethics (key differentiator for AI companies)
          "Philosophy",
          "Design Philosophy",
          "Design Ethics",
          "AI Ethics",
          "Ethical AI Design",
          "Responsible AI",
          "AI Alignment",
          "Human-Centered Design",
          "Human-Centered AI",
          "Epistemology",
          "Philosophy of Mind",
          "Cognitive Science",
          "Ethics of Technology",
          "Thoughtful Design",
          "Value-Sensitive Design",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          addressCountry: "US",
        },
        email: "andy@madrick.design",
        sameAs: [
          "https://linkedin.com/in/andymadrick",
          "https://twitter.com/andymadrick",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://madrick.design/#website",
        url: "https://madrick.design",
        name: "Andy Madrick - Product Designer & Design Engineer",
        description:
          "Portfolio of Andy Madrick, Product Designer and Design Engineer in San Francisco. Currently at Notion, previously Design Engineer at Tome (AI), Founding Designer at Lightfield, and Product Designer at Mercury and ProtoPie.",
        publisher: {
          "@id": "https://madrick.design/#person",
        },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://madrick.design/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://madrick.design/#profilepage",
        url: "https://madrick.design",
        name: "Andy Madrick - Product Designer Portfolio",
        description:
          "Professional portfolio showcasing product design and design engineering work",
        isPartOf: {
          "@id": "https://madrick.design/#website",
        },
        about: {
          "@id": "https://madrick.design/#person",
        },
        mainEntity: {
          "@id": "https://madrick.design/#person",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
