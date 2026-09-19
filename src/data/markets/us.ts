import type { MarketContent } from "./types";

export const americanMarket: MarketContent = {
  id: "en-US",
  prefix: "/en-us",
  country: "United States",
  countryEnglish: "United States",
  language: "en-US",
  ogLocale: "en_US",
  labels: {
    home: "Web design for the United States",
    navigation: "Navigation",
    contact: "Tell us about your project",
    contactIntro: "Share your business goals, current website and the problems you want to solve. Include your time zone so we can plan a practical way to collaborate.",
    email: "Email Brisk",
    projects: "Explore selected projects",
    projectsIntro: "These projects from Brisk’s portfolio show different ways design and development can support a business.",
    viewProject: "Explore project",
    related: "Explore your options",
    faq: "Frequently asked questions",
    markets: "Other countries and languages",
    basedIn: "Brisk is based in Limburg, Belgium, and collaborates remotely with businesses in the United States.",
    skipToContent: "Skip to content",
    onThisPage: "On this page",
    privacy: "Privacy policy",
  },
  pages: [
    {
      id: "home",
      slug: "",
      nav: "Overview",
      title: "Web Design for US Small Businesses | Brisk",
      description: "Custom web design for US businesses from a Belgium-based studio. Explore business websites, ecommerce, redesign, project costs and remote collaboration.",
      h1: "Web design that helps US businesses explain their value",
      lead: "A business website should help someone understand your offer, decide whether it fits and take a useful next step. Brisk designs and develops custom websites with those decisions in mind. We are based in Limburg, Belgium, and collaborate remotely with US businesses through an agreed process for communication and review.",
      sections: [
        {
          heading: "Start with the customer decision you want to support",
          paragraphs: [
            "A small business website often needs to answer a few important questions well. What do you do? Who is it for? What makes your approach relevant? What happens after someone reaches out? A larger catalog of pages only helps when each page supports a distinct question or decision.",
            "For a service business, a useful next step might be a qualified inquiry. For a seller, it might be a completed order. We use the intended outcome to discuss content, navigation and functionality, rather than treating every company as if it needs the same website package.",
          ],
        },
        {
          heading: "Find the right starting point for your project",
          paragraphs: [
            "If you are launching a business website, begin with the pages and customer questions that support your core offer. If you already sell online, review the connection between product discovery, checkout and order management. If the current site is holding you back, investigate whether focused changes or a full redesign are justified.",
            "Our guides cover those different projects, along with pricing and platform selection. They help turn a broad request for web design into a brief that names the problem, identifies the people involved and gives you a practical way to compare potential solutions.",
          ],
        },
        {
          heading: "Make remote collaboration work across time zones",
          paragraphs: [
            "Working between the United States and Belgium calls for deliberate scheduling. Share your time zone, decision makers and preferred review windows before the project starts. Agree which conversations need a meeting and which decisions can be captured in written feedback. That keeps progress from depending on everyone being online at once.",
            "A useful review includes the page or feature being discussed, the intended customer task and the specific change requested. Consolidated feedback helps avoid conflicting instructions. The proposal should also state response arrangements and support responsibilities, so both teams understand how collaboration will work after launch.",
          ],
        },
        {
          heading: "Define success beyond the first impression",
          paragraphs: [
            "A strong visual identity matters, but the website must also behave reliably. Check that a mobile visitor can find the right service, complete a form and receive confirmation. Ask the person managing the site to try the content updates they will actually perform. These tests reveal issues that a static mockup cannot.",
            "After launch, judge the website through the quality of inquiries or orders alongside search visibility and usage. Organic growth depends on useful content, technical implementation and competition. Set a review process for improving the site as evidence accumulates rather than treating publication as the final decision.",
          ],
        },
      ],
      faq: [
        { question: "Where is Brisk located?", answer: "Brisk is based in Limburg, Belgium. US projects are discussed as remote collaborations. Share your time zone and any procurement or meeting requirements so the working arrangement can be agreed before the project begins." },
        { question: "Is custom web design suitable for a small business?", answer: "It can be when specific requirements justify the work. A focused website with clear content may be enough for some businesses, while others need distinctive interactions or integrations. The right scope follows the business need and available budget." },
        { question: "What should I send with my first inquiry?", answer: "Include your current website if you have one, a description of your offer and the main problem you want solved. Note required features, available content, decision makers and your time zone. A complete specification is not necessary to start a useful discussion." },
      ],
    },
    {
      id: "websites",
      slug: "custom-website-design",
      nav: "Custom website design",
      title: "Custom Website Design for US Businesses | Brisk",
      description: "Custom business website design with clear content, responsive layouts and technical SEO. Explore Brisk’s approach to planning, development and launch checks.",
      h1: "Custom website design built around your customer’s next step",
      lead: "A professional website connects what your business offers with what a visitor needs to know. Brisk combines design and development to build that connection through clear content, purposeful layouts and reliable interactions. We work with US businesses remotely, with project requirements and review responsibilities established before the build.",
      sections: [
        {
          heading: "Organize the website around buying questions",
          paragraphs: [
            "Begin with the questions a customer asks before choosing your company. They may need to understand the service scope, compare options, check compatibility or see how a project starts. Give each important topic a clear place instead of placing every message on the homepage or repeating it across similar pages.",
            "For a small business, this often means explaining a focused set of services in useful detail. For a company serving different audiences, it may require separate journeys. The structure should reflect meaningful differences in customer needs, with enough context for a visitor arriving directly from search.",
          ],
        },
        {
          heading: "Design for real devices and real interruptions",
          paragraphs: [
            "People do not always browse from a large monitor with uninterrupted attention. Responsive web design needs readable text, clear controls and a sensible order on smaller screens. A form should explain what information is needed, identify errors clearly and show what happens when submission succeeds.",
            "Custom design gives your brand a distinctive expression while keeping these tasks understandable. Review keyboard access, focus states and motion alongside visual appearance. If a page uses video or large images, assess how those assets affect loading and whether the message still makes sense before they appear.",
          ],
        },
        {
          heading: "Make SEO part of the content and development plan",
          paragraphs: [
            "SEO-friendly website design starts with useful pages and a structure search engines can navigate. Titles should describe the page, headings should organize the information and internal links should connect relevant topics. Creating several pages that answer the same question with slightly different keywords adds little value for a visitor.",
            "Technical work also includes appropriate indexing controls, image handling and performance checks. When replacing an existing site, review old URLs and their destinations. After publication, search and inquiry data can reveal where content needs more detail or where the website attracts people whose needs do not match your offer.",
          ],
        },
        {
          heading: "Turn the brief into observable acceptance checks",
          paragraphs: [
            "Before development, list the page types, forms, integrations and content editing tasks that the project must deliver. Identify who writes and approves copy and how stakeholder feedback is combined. An acceptance checklist then gives everyone a shared definition of a working website.",
            "For example, a completed inquiry should reach the designated destination, a required field should explain a missing value and the navigation should remain usable at agreed screen sizes. Include account ownership, hosting arrangements and handover in the same discussion. The finished site must be understandable to the people responsible for using and maintaining it.",
          ],
        },
      ],
      faq: [
        { question: "Can the website connect to our CRM or scheduling tools?", answer: "Potentially. Share the specific tools and the information that needs to move between them. Available APIs, account permissions and error handling affect the approach. A connection should be included only after its requirements and responsibilities are clear." },
        { question: "Do we have to attend meetings during Belgian office hours?", answer: "Agree practical overlap windows and written review arrangements at the start. Different US time zones create different scheduling needs. Clear feedback and documented approvals can keep much of the project moving without requiring constant live meetings." },
        { question: "What does SEO web design include?", answer: "It should include a crawlable structure, meaningful metadata, useful headings, internal links and attention to performance. The exact deliverables belong in the scope. Rankings also depend on content quality and competition, so a search position is not a guaranteed launch result." },
      ],
    },
    {
      id: "ecommerce",
      slug: "ecommerce-website-development",
      nav: "Ecommerce development",
      title: "Ecommerce Website Development for US Businesses | Brisk",
      description: "Plan an online store around products, checkout and operations. Explore custom ecommerce development, integrations and practical launch testing with Brisk.",
      h1: "Ecommerce website development for the whole order journey",
      lead: "An ecommerce website has two connected audiences: customers making a purchase and the team managing the sale. Brisk approaches custom online store development by understanding both. Product structure, checkout, inventory and order handling need to work together, so we define those requirements before treating the project as a set of page designs.",
      sections: [
        {
          heading: "Build a product model that supports confident choices",
          paragraphs: [
            "Before designing a catalog, identify what makes products different and which details customers use to choose. Variants, compatibility, dimensions and availability may matter more than a long marketing description. Consistent product data supports useful filtering, comparisons and a clearer product page.",
            "For US sales, specify the shipping destinations, displayed currency and information needed for the purchase. If different regions require different order rules, document the intended behavior and the systems responsible for supplying it. Business rules need an agreed source; they should not be guessed during interface development.",
          ],
        },
        {
          heading: "Design checkout for success and recovery",
          paragraphs: [
            "A customer should know what is in the cart, which costs apply and what happens after payment. Make required information clear and avoid asking for details with no operational purpose. On a phone, small usability problems can become major obstacles, so test the complete flow at realistic screen sizes.",
            "Also define failed and interrupted transactions. A declined payment, a changed cart or an unavailable item needs a useful explanation and a path forward. Confirmation messages should reflect the actual order state. The same clarity is needed when support staff help customers change or cancel an order.",
          ],
        },
        {
          heading: "Connect the store to the way your team operates",
          paragraphs: [
            "Inventory, accounting and fulfillment tools can influence the project more than the storefront design. Establish which system owns each record, how changes are synchronized and who investigates failures. A connection is not complete just because data moves successfully in a demonstration; duplicate requests and temporary outages also need consideration.",
            "Brisk focuses on custom development. An established commerce platform can still be the right baseline for a straightforward store. Compare Shopify, WooCommerce and custom approaches through your specific product types, order rules and administrative workload before choosing how much unique development the operation needs.",
          ],
        },
        {
          heading: "Use complete test orders as launch evidence",
          paragraphs: [
            "Create a representative test set covering product options, shipping choices and payment outcomes. Follow each order through confirmation and the administrative steps your staff perform. Include refunds or cancellations where they are part of the agreed scope. This checks the business process as well as the customer-facing interface.",
            "Product and category pages also need a search plan. Write original information that resolves buying questions, and decide how filters, replaced products and unavailable items should behave. After launch, review checkout drop-off alongside support requests so improvements address the reasons customers hesitate, rather than only changing the appearance of a button.",
          ],
        },
      ],
      faq: [
        { question: "When does custom ecommerce development make sense?", answer: "It may make sense when product configuration, customer rules or system integrations cannot be supported well by standard options. Define the requirement and compare alternatives first. Custom work should have an operational benefit that justifies building and maintaining it." },
        { question: "Can our existing store data be reused?", answer: "Usually some data can be transferred, but product variants, images, historical orders and customer records need separate assessment. Review export options and test a representative sample before promising a complete migration. Existing product URLs also need a transition plan." },
        { question: "Who decides the store’s tax and shipping rules?", answer: "Your business supplies or approves the rules and identifies any specialist systems that calculate them. The project should state how those rules are configured, tested and updated. Development translates agreed requirements into behavior rather than deciding commercial policy on your behalf." },
      ],
    },
    {
      id: "pricing",
      slug: "website-design-pricing",
      nav: "Website pricing",
      title: "Website Design Pricing and Project Costs | Brisk",
      description: "What drives website design cost? Compare custom design, content, integrations and ongoing expenses, then prepare a practical brief for a Brisk project quote.",
      h1: "Website design pricing starts with a clear scope",
      lead: "If you are asking how much a website costs, the useful next question is what the website must do. A small business brochure site and a connected online store involve different work. This guide explains how to compare quotes, identify ongoing costs and prepare a brief that leads to a meaningful project discussion.",
      sections: [
        {
          heading: "Look beyond the number of pages",
          paragraphs: [
            "Website development cost is shaped by design complexity, content, functionality and the condition of existing material. Several pages built from a shared structure may require less work than one highly interactive tool. Integrations, account features and content migration can add effort that is not visible in an initial screenshot.",
            "List the required page types and visitor tasks before requesting a quote. Explain whether copy, images and brand guidelines already exist. If several people must approve the work, include the review process as well. Those details help establish the real scope and avoid comparing proposals based on different assumptions.",
          ],
        },
        {
          heading: "Ask what the quote actually delivers",
          paragraphs: [
            "A useful proposal identifies deliverables, dependencies and the decisions your team must make. Ask whether content preparation, mobile layouts, migration and integrations are included. Clarify how many review stages are planned and how changes are estimated after the scope is approved.",
            "Affordable web design should still leave you with a functioning, manageable result. If the budget is limited, prioritize a smaller set of complete customer journeys. Cutting important testing or leaving ownership unclear can create more work later, even when the initial quote looks attractive.",
          ],
          bullets: [
            "Identify who supplies and approves each content item.",
            "Specify the behavior of forms and integrations.",
            "Agree the tests used to accept the finished work.",
            "Document handover, account access and support responsibilities.",
          ],
        },
        {
          heading: "Include the cost of operating the website",
          paragraphs: [
            "Hosting, domain registration, maintenance and third-party services may create recurring charges. Ecommerce can introduce platform, app and payment processing costs. Ask which expenses are fixed, which vary with usage and which are billed directly by another provider. Internal time spent maintaining content also belongs in your planning.",
            "For a project with a Belgium-based studio, agree the quote currency, payment milestones and invoicing details. Establish the collaboration and support windows that fit your US time zone. Those arrangements make the project easier to manage and should be clear before the commercial proposal is accepted.",
          ],
        },
        {
          heading: "Prepare a brief that supports useful trade-offs",
          paragraphs: [
            "Describe your business, audience and primary customer action. Share the current website and explain where it falls short. Include required systems, content readiness, the reason for any deadline and a budget range if you have one. Separate essential requirements from ideas that can wait until there is evidence of demand.",
            "Brisk discusses pricing against a defined project rather than publishing a universal amount for every website. A focused first release may be the right choice, while a more complex operation may need additional discovery. The goal is a proposal you can evaluate through specific outcomes and responsibilities.",
          ],
        },
      ],
      faq: [
        { question: "Can you give a website price without a full specification?", answer: "An early discussion can identify the likely scope and unresolved questions. A dependable project quote needs enough detail about content, features and responsibilities to explain what is included. More complex integrations may require investigation first." },
        { question: "What can I simplify without weakening the first release?", answer: "Focus on the most important audience and customer action. Reuse accurate existing content, reduce unnecessary page types and defer speculative features. Keep the checks needed for core functionality, usability and a reliable launch." },
        { question: "Does the development price include future changes?", answer: "That depends on the written agreement. Ask which corrections, maintenance activities and content changes are included and which are quoted separately. Make account ownership and the process for requesting later work explicit." },
      ],
    },
    {
      id: "redesign",
      slug: "website-redesign-services",
      nav: "Website redesign",
      title: "Website Redesign Services for US Businesses | Brisk",
      description: "Plan a website redesign around customer needs, existing content and a controlled launch. Brisk helps evaluate what to improve, preserve and test.",
      h1: "Website redesign services focused on what needs to improve",
      lead: "A website refresh becomes more useful when you can name the problem behind it. Your offer may have changed, customers may struggle to find information or your team may avoid updating an awkward system. Brisk reviews those issues before planning a redesign, connecting visual changes with improvements in content, usability and operation.",
      sections: [
        {
          heading: "Establish a baseline before replacing the site",
          paragraphs: [
            "Review current pages, search traffic and the customer actions that matter to the business. Look at which pages attract relevant inquiries and which generate confusion. Ask sales and support staff what people repeatedly misunderstand. Their observations can explain behavior that is difficult to interpret from traffic charts alone.",
            "Define the desired improvement in concrete terms. For example, visitors should be able to distinguish two services or complete an inquiry on a phone. This creates a better brief than simply asking for a modern appearance and helps determine whether targeted improvements or a full rebuild are appropriate.",
          ],
        },
        {
          heading: "Keep useful content and plan URL changes",
          paragraphs: [
            "Create an inventory of the current site, including pages outside the main navigation and downloadable resources. Identify what to retain, update, merge or remove. Existing content may answer valuable customer questions even when its presentation needs work. Rewriting everything from scratch can discard useful detail without improving the result.",
            "When URLs change, plan relevant redirects and update internal links. A person following an old service link should reach an appropriate replacement where one exists. Keep important campaign destinations and externally linked resources in view so the transition covers more than the pages shown in the new menu.",
          ],
        },
        {
          heading: "Review the new experience through customer and staff tasks",
          paragraphs: [
            "Test proposed pages against the baseline goals. Can a new visitor understand the offer without a sales explanation? Can someone find the contact route they need? Does the form remain usable with a keyboard and on a smaller screen? Use the answers to guide feedback instead of relying entirely on visual preference.",
            "The team managing the website should also test its regular work. Updating a service, changing an image and reviewing a draft are useful examples. Agree who can publish, what documentation is needed and how future changes will be requested. A redesign should leave the operating process clearer.",
          ],
        },
        {
          heading: "Coordinate launch across teams and time zones",
          paragraphs: [
            "Choose a launch window with the relevant decision makers and technical contacts available. Record responsibilities for domain settings, hosting, final content and approval. Check redirects, forms, page metadata and internal links before the switch, and establish a recovery option appropriate to the project.",
            "After publication, review errors, inquiries and search visibility against the earlier baseline. Rankings can change during a migration, so a careful plan reduces avoidable problems without promising an identical outcome. For remote US projects, agree how urgent findings are reported and who can act when the studio and your team have different working hours.",
          ],
        },
      ],
      faq: [
        { question: "Does a redesign require changing our domain?", answer: "No. Many redesigns can keep the existing domain. Changes to hosting or platform still need careful coordination, particularly where domain settings also support email and other services. Inventory those dependencies before planning the switch." },
        { question: "How can we avoid losing useful search traffic?", answer: "Identify valuable existing pages, preserve relevant content and map changed URLs to suitable destinations. Check the implementation and monitor after launch. These steps reduce preventable mistakes, but no redesign can guarantee unchanged search rankings." },
        { question: "Can Brisk improve part of our website instead of replacing it?", answer: "That depends on the current system and the problem being solved. Start with an assessment of the required changes. A limited refresh can be sensible when the underlying structure remains suitable; a rebuild needs a clear functional or operational reason." },
      ],
    },
    {
      id: "platforms",
      slug: "wordpress-shopify-or-custom",
      nav: "Platform comparison",
      title: "WordPress, Shopify or Custom Web Development? | Brisk",
      description: "Compare WordPress, Shopify, WooCommerce and custom development for a US business website. Review editing, ecommerce, integrations and long-term ownership.",
      h1: "WordPress, Shopify or custom development: compare the work involved",
      lead: "A platform decision affects how your website is built, updated and connected to the rest of your business. Brisk focuses on custom development, but a standard solution may be sufficient for a straightforward brief. Compare the options through the tasks you need to perform and the responsibilities your team can support.",
      sections: [
        {
          heading: "WordPress for publishing and flexible content management",
          paragraphs: [
            "WordPress provides a familiar approach to managing pages and posts, with themes and plugins covering many common website needs. It can be practical for a team that publishes regularly. The specific editing experience still depends on the way the site is assembled, so ask to see representative updates performed.",
            "A WordPress web design project also needs decisions about hosting, software updates, backups and plugin compatibility. Those responsibilities do not disappear after launch. Evaluate the implemented site and the maintenance arrangement rather than assuming that a widely used platform automatically delivers a fast or easy-to-run website.",
          ],
        },
        {
          heading: "Shopify and WooCommerce for different store requirements",
          paragraphs: [
            "Shopify offers a hosted commerce environment for organizing products and running an online store. Its fit depends on your catalog, required integrations and how closely the available configuration matches your order process. Include subscriptions, apps and platform constraints in the comparison, particularly if you need unusual behavior.",
            "WooCommerce extends WordPress with ecommerce functionality. It can connect publishing and selling within the same system, while hosting and the combination of extensions need active ownership. For either route, test product variants, order administration and refunds against your actual workflow before treating the platform choice as settled.",
          ],
        },
        {
          heading: "Custom development for requirements with a clear benefit",
          paragraphs: [
            "Custom website development provides more freedom to shape interfaces and application behavior around a defined need. A specialist configuration tool, an unusual qualification process or an integration with internal software may justify that approach. The case for custom work should name the limitation it removes and the value of removing it.",
            "That flexibility comes with development and maintenance responsibilities. Decide how content is edited, where the application runs and how another developer would understand the project later. Brisk’s emphasis on custom work is a starting point for that discussion, not a reason to add complexity to a simple requirement.",
          ],
        },
        {
          heading: "Use a decision checklist before selecting a platform",
          paragraphs: [
            "List essential customer journeys, staff editing tasks and external systems. Then test each option against the same examples. Include a realistic exception, such as an incomplete inquiry or unavailable product, so the comparison reveals how the system behaves outside a polished demonstration.",
            "Ask which capabilities are native, which rely on paid extensions and which require custom development. Review data export, ownership of accounts and the process for changing providers. Bring your current platform into the discussion with Brisk; the proposed technology and implementation scope should follow an assessment of the requirements you actually have.",
          ],
        },
      ],
      faq: [
        { question: "Which option costs the least over time?", answer: "That depends on requirements, subscriptions, maintenance and the frequency of changes. Compare a complete operating scenario rather than the initial build alone. A low starting cost may still involve substantial extension or administrative costs for a complex workflow." },
        { question: "Can Brisk assess a project that already uses Shopify or WordPress?", answer: "Share the current website, the platform and the limitation you want to address. Brisk’s focus is custom development, so the first discussion should establish whether a custom component, a different approach or specialist platform support is the appropriate route." },
        { question: "Is a custom website automatically faster?", answer: "No. Performance depends on implementation, assets, hosting and third-party code. Custom development can give more control over these choices, but the finished experience still needs testing and ongoing attention as content and features change." },
      ],
    },
  ],
};
