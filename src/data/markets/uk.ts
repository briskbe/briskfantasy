import type { MarketContent } from "./types";

export const britishMarket: MarketContent = {
  id: "en-GB",
  prefix: "/en-gb",
  country: "United Kingdom",
  countryEnglish: "United Kingdom",
  language: "en-GB",
  ogLocale: "en_GB",
  labels: {
    home: "Web design for the UK",
    navigation: "Navigation",
    contact: "Discuss your website",
    contactIntro: "Tell us about your organisation, the people your website needs to reach and the change you want to make. We can use that to shape a useful project brief.",
    email: "Email Brisk",
    projects: "Selected work",
    projectsIntro: "Explore a selection of Brisk projects to see how design and development come together.",
    viewProject: "View project",
    related: "Plan your next step",
    faq: "Frequently asked questions",
    markets: "Other countries and languages",
    basedIn: "Brisk is based in Limburg, Belgium, and works remotely with organisations in the United Kingdom.",
    skipToContent: "Skip to content",
    onThisPage: "On this page",
    privacy: "Privacy policy",
  },
  pages: [
    {
      id: "home",
      slug: "",
      nav: "Overview",
      title: "Web Design for UK Businesses and SMEs | Brisk",
      description: "Custom web design for UK businesses and SMEs, delivered remotely from Belgium. Explore websites, ecommerce, redesign and practical advice for your brief.",
      h1: "Web design for UK businesses with a clear purpose",
      lead: "Your website should make it easier for the right people to understand your business and take the next step. Brisk brings design and development together for custom websites. Based in Limburg, Belgium, we work remotely with UK organisations that want a considered approach to their online presence.",
      sections: [
        {
          heading: "Give your website a job it can do well",
          paragraphs: [
            "For a professional services firm, that job might be helping a prospective client understand the scope of a service before making an enquiry. For a small manufacturer, it might mean presenting specifications clearly and routing technical questions to the right person. The useful starting point is the decision a visitor needs to make.",
            "We use that decision to shape the pages, content and interactions. An SME does not automatically need a large website. It needs enough information to answer real questions, demonstrate relevant experience and explain what happens after someone gets in touch.",
          ],
        },
        {
          heading: "Choose a project that fits the problem",
          paragraphs: [
            "A new business website, an online shop and a redesign have different requirements. A lead generation website needs strong service explanations and a dependable enquiry journey. Ecommerce introduces product information, payments and fulfilment. A redesign adds the responsibility of assessing existing content and planning a careful transition.",
            "The guides in this section separate those choices. You can also compare platform approaches and learn what should appear in a website quotation. This gives your team a shared basis for discussing priorities before committing to a particular design or technical solution.",
          ],
        },
        {
          heading: "A practical way to work across the Channel",
          paragraphs: [
            "Our studio is in Belgium. Project discussions can happen remotely during agreed working hours, with written decisions and clear review points. Before work begins, identify who owns the content, who gathers stakeholder feedback and who can approve a milestone. That prevents a website project from becoming a collection of disconnected opinions.",
            "Cross-border procurement should also be straightforward to understand. Agree the quotation currency, invoicing details, access to accounts and the support arrangements in writing. If an in-person supplier is essential to your organisation, include that requirement in your selection process from the outset.",
          ],
        },
        {
          heading: "Judge the finished website through real tasks",
          paragraphs: [
            "Review a proposed design by trying to complete a task: find a relevant service, check whether it suits you and send an enquiry. Repeat that journey on a phone and using a keyboard. The quality of a website becomes clearer when the test involves something a visitor actually needs to do.",
            "After launch, review the quality of enquiries alongside traffic and search visibility. A technical foundation and useful content support organic discovery, but positions are not a fixed deliverable. Ongoing improvements should follow evidence about visitor needs and the commercial value of the conversations your website starts.",
          ],
        },
      ],
      faq: [
        { question: "Is Brisk a UK-based web design agency?", answer: "Brisk is based in Limburg, Belgium. We offer remote collaboration for UK businesses and make that location clear. Meeting times, review arrangements and the scope of support should be agreed for your project." },
        { question: "Can a small business approach Brisk?", answer: "Yes. Share your business goals, available content and the functions you need. A focused brief helps establish whether a custom website is proportionate to the problem and what an appropriate first version should include." },
        { question: "Where should we begin if our team disagrees about the website?", answer: "Agree who the website serves and which visitor actions matter most. Then list the current obstacles to those actions. That creates a more useful starting point than choosing colours or comparing unrelated reference websites." },
      ],
    },
    {
      id: "websites",
      slug: "website-design",
      nav: "Website design",
      title: "Custom Website Design for UK Businesses | Brisk",
      description: "Plan a professional business website with Brisk. Explore custom design, accessible journeys, content, technical SEO and clear acceptance criteria for launch.",
      h1: "Custom website design for the way your business works",
      lead: "A professional website needs a clear proposition, a useful structure and dependable behaviour. Brisk designs and develops custom websites for businesses that want those parts considered together. For UK SMEs, the aim is a site that helps prospective customers make informed decisions and supports the team managing it.",
      sections: [
        {
          heading: "Turn your sales conversations into useful content",
          paragraphs: [
            "Your team already knows many of the questions a website needs to answer. What is included in a service? Who is it suitable for? What information does a client need to provide? Start with those questions and organise the content around how people compare their options. Specific explanations are more persuasive than broad claims about excellence.",
            "A content plan also identifies the evidence available to support your offer. Use approved project examples, accurate credentials and a clear description of your process. Where evidence is missing, plan how to gather it instead of filling the page with unsupported promises.",
          ],
        },
        {
          heading: "Make the important journeys easy to follow",
          paragraphs: [
            "A visitor may arrive on a service page without seeing the homepage. Each important page should explain its subject, answer the next likely question and provide an appropriate action. Navigation needs to remain understandable on small screens, and forms should explain what happens after an enquiry is submitted.",
            "Custom design creates room for a distinctive identity, but every interaction still needs to work for the person using it. Review text contrast, focus visibility, form labels and error messages as part of the design. Motion should support comprehension without getting in the way of reading or completing a task.",
          ],
        },
        {
          heading: "Build search visibility into the structure",
          paragraphs: [
            "Technical SEO starts with pages that can be reached, understood and indexed appropriately. Descriptive page titles, meaningful headings and internal links give content a clear context. Where several phrases describe the same service, a substantial page is more useful than a set of near-duplicates competing with one another.",
            "Performance needs the same practical approach. Consider image weight, unnecessary scripts and stability as pages load. Test under stated conditions and review real visitor data when it is available. A single laboratory score should inform development decisions, rather than stand in for the entire customer experience.",
          ],
        },
        {
          heading: "Define what a successful handover includes",
          paragraphs: [
            "Before development, agree the pages, languages, forms and integrations in scope. Identify who supplies copy and photography and how approvals work. Then define acceptance checks that your team can observe: an enquiry arrives at the intended inbox, required fields behave correctly and agreed content can be edited by the right people.",
            "The handover should make account ownership and ongoing responsibilities clear. Discuss hosting, domain access, maintenance, documentation and future changes. These decisions are particularly useful for an SME where the person commissioning the website may also be responsible for keeping it current after launch.",
          ],
        },
      ],
      faq: [
        { question: "Can we manage the website ourselves after launch?", answer: "The editing experience depends on the agreed solution. List the content your team expects to update, then include those tasks in the requirements and handover. Ask to try typical changes before accepting the finished website." },
        { question: "Do we need to write every page before speaking to Brisk?", answer: "No. Existing brochures, sales questions and a description of your services are useful starting material. The project scope should then state who drafts, checks and approves the final copy so content does not become an unresolved dependency." },
        { question: "Will a custom website automatically rank higher?", answer: "No technology guarantees a search position. Good technical implementation helps search engines access content, while relevance, competition and the usefulness of the site also matter. Agree measurable implementation checks separately from longer-term organic growth goals." },
      ],
    },
    {
      id: "ecommerce",
      slug: "ecommerce-web-design",
      nav: "Ecommerce web design",
      title: "Ecommerce Web Design for UK Businesses | Brisk",
      description: "Plan an ecommerce website around products, checkout and fulfilment. Brisk explains custom development, integrations and the checks an online shop needs.",
      h1: "Ecommerce web design that connects buying and fulfilment",
      lead: "An online shop has to work for the customer placing an order and the team responsible for delivering it. Brisk approaches ecommerce development through those connected tasks. We help define the product structure, purchase journey and integrations that a custom solution needs before the visual design is finalised.",
      sections: [
        {
          heading: "Shape the catalogue around how customers choose",
          paragraphs: [
            "Product categories should reflect the way people compare items, rather than only the structure of an internal stock list. Identify which details determine a purchase: dimensions, compatibility, material, availability or a choice of variants. Those details need consistent fields so search, filters and product pages remain useful as the catalogue grows.",
            "For a UK audience, agree how prices, delivery regions and availability will be presented. If you also sell abroad, document the markets and currencies involved. International requirements can affect product information, checkout rules and fulfilment, so they belong in the brief before development begins.",
          ],
        },
        {
          heading: "Make checkout clear before making it clever",
          paragraphs: [
            "Customers need to understand the order total, delivery options and the next action at each stage. A well-designed checkout explains required information, preserves useful input when an error occurs and makes confirmation unambiguous. It should also handle a cancelled payment without leaving the customer unsure whether an order exists.",
            "Plan support journeys alongside successful purchases. What happens when an item becomes unavailable, an address needs correcting or an order is refunded? These are normal operating situations. Designing them deliberately helps your team answer customer questions and reduces uncertainty around what the system has actually done.",
          ],
        },
        {
          heading: "Treat integrations as operating rules",
          paragraphs: [
            "A link to stock control or accounting is more than a technical connection. Decide which system owns each piece of information and how changes travel between systems. If stock updates are delayed, there needs to be an agreed response. If an order is sent twice, the receiving process should recognise the duplication.",
            "Brisk focuses on custom development, while a hosted platform or established commerce system may suit a simpler operation. Compare those options against your actual requirements. Avoid commissioning bespoke behaviour merely because it is possible; the additional work should solve a clear problem in your sales or fulfilment process.",
          ],
        },
        {
          heading: "Test complete orders and discoverable product pages",
          paragraphs: [
            "Before launch, run representative orders through product selection, checkout, confirmation and administration. Include different variants, delivery choices and payment outcomes. Test on mobile, then ask the people who will fulfil orders to complete their usual tasks. A successful payment alone is not enough to prove that the operation works.",
            "For search visibility, write useful category introductions and product information that answers buying questions. Review how filters, unavailable products and replaced items behave. After launch, combine checkout data with customer service feedback to identify where better information or a simpler interaction would make the greatest difference.",
          ],
        },
      ],
      faq: [
        { question: "Should our online shop use Shopify, WooCommerce or custom development?", answer: "Compare them against your product structure, integrations, management capacity and total operating cost. A standard catalogue can suit an established platform. Unusual workflows may justify custom work, but that should follow a clear requirements assessment." },
        { question: "Can an existing product catalogue be migrated?", answer: "Often, but first inspect the export format, image ownership, variants and data quality. A trial import with representative products helps reveal gaps before a full migration is planned. Existing product URLs also need attention." },
        { question: "What should our team prepare for an ecommerce brief?", answer: "Provide sample products, sales regions, payment requirements and the steps your staff follow after an order arrives. Include existing systems and common exceptions. Those details make the development discussion more useful than a visual reference alone." },
      ],
    },
    {
      id: "pricing",
      slug: "website-design-cost",
      nav: "Costs and quotations",
      title: "Website Design Cost: A Guide for UK SMEs | Brisk",
      description: "Understand website design costs before requesting a quotation. Compare scope, content, integrations, maintenance and handover with this guide for UK businesses.",
      h1: "Understand website design costs before comparing quotations",
      lead: "A website quotation is useful when you can see what the investment buys. Page count is only one part of that picture. For a UK SME, the important questions concern content, functionality, responsibilities and the cost of keeping the site useful. This guide helps you prepare a brief that makes proposals easier to compare.",
      sections: [
        {
          heading: "Identify the work behind the price",
          paragraphs: [
            "Designing a small brochure website is a different undertaking from creating a multilingual site with customer accounts or integrated bookings. Even projects with the same number of pages may require very different amounts of work. Bespoke layouts, content production, data migration and external systems all influence the scope.",
            "Your starting material matters too. An established identity and approved copy reduce unanswered questions, while a project that begins with an unclear proposition needs more discovery. A sensible quotation explains these assumptions so you can see why the proposed work is necessary.",
          ],
        },
        {
          heading: "Give suppliers the same brief",
          paragraphs: [
            "List the audiences, required pages and actions visitors need to complete. State which content your team will provide and which services you expect the supplier to deliver. Include existing technology, any migration requirements and the business reason for a deadline. Without shared assumptions, comparing totals can be misleading.",
            "Ask each proposal to define review rounds, acceptance checks and the treatment of changes. If a feature is optional, request that it be identified separately. This makes it easier to prioritise a first release without quietly removing something essential to the way your business operates.",
          ],
          bullets: [
            "Who writes, supplies and approves the content?",
            "Which integrations and migration tasks are included?",
            "How are extra requests assessed and agreed?",
            "What does testing and handover cover?",
          ],
        },
        {
          heading: "Separate project costs from ongoing commitments",
          paragraphs: [
            "Hosting, domains, maintenance and paid software can create recurring costs. An online shop may also depend on platform subscriptions, apps and payment processing. Ask which charges are fixed, which depend on usage and which are paid directly to third parties. This gives you a clearer view of ownership after launch.",
            "For a cross-border project, agree the quotation currency and invoicing details before approval. Also establish who owns the relevant accounts and how access is transferred. A purchasing decision should cover both the build and the practical conditions under which your organisation will use the website.",
          ],
        },
        {
          heading: "Control budget through priorities and decisions",
          paragraphs: [
            "The most useful way to contain cost is to distinguish essential visitor tasks from ideas that can wait. A focused service website may deliver more value than a larger site whose content nobody has time to maintain. Keep decision makers involved at agreed review points and gather feedback into a coherent response.",
            "Brisk does not publish a universal price that implies every project contains the same work. Share your priorities, constraints and available material so a relevant scope can be discussed. The resulting proposal should make deliverables and dependencies clear enough for your team to assess before committing.",
          ],
        },
      ],
      faq: [
        { question: "Why is there no fixed website price on this page?", answer: "A price needs a defined scope to be meaningful. Content, design, integrations and migration can change the work substantially. A project-specific quotation makes those assumptions visible and avoids suggesting that every business needs the same package." },
        { question: "How can a small business reduce the initial scope?", answer: "Prioritise the service or product that matters most, provide organised source material and defer features without a clear owner or use case. Keep essential accessibility, functionality and launch checks within the first release." },
        { question: "Should maintenance be part of the quotation?", answer: "Its treatment should be explicit. Ask whether ongoing work is included, optional or arranged separately, and clarify response arrangements, software updates and content changes. Do not assume that a build price includes indefinite support." },
      ],
    },
    {
      id: "redesign",
      slug: "website-redesign",
      nav: "Website redesign",
      title: "Website Redesign for UK Businesses | Brisk",
      description: "Plan a website redesign with clear priorities. Review existing content, protect useful URLs and test the new experience before a carefully managed launch.",
      h1: "Website redesign with a clear reason for every change",
      lead: "A redesign should resolve a business problem you can describe. Perhaps your services have changed, mobile enquiries are difficult or the site is awkward to maintain. Brisk reviews the existing website before proposing a new structure, so the project can improve weak points while retaining useful content and established journeys.",
      sections: [
        {
          heading: "Find out what needs to change",
          paragraphs: [
            "Start with evidence from the current website: the pages people use, the questions that bring them there and the enquiries that follow. Add observations from sales and support staff. They can often identify missing explanations or confusing wording that analytics alone cannot reveal.",
            "Separate appearance, content and technical behaviour in the diagnosis. A visual refresh will not solve an unclear proposition, and new copy will not repair a broken form. Some sites need targeted improvements; others need a more substantial rebuild because the existing structure or technology prevents useful changes.",
          ],
        },
        {
          heading: "Decide what to keep before changing the structure",
          paragraphs: [
            "Create an inventory of existing pages, downloads and important campaign destinations. For each item, decide whether it remains, needs updating, merges with another page or is genuinely obsolete. Preserve material that answers useful questions, particularly where it attracts relevant visitors or supports current sales conversations.",
            "When an address changes, map the old URL to a suitable new destination where one exists. Sending every removed page to the homepage rarely provides the context a visitor expected. This mapping belongs in the project plan, alongside new content and design, rather than being left until launch day.",
          ],
        },
        {
          heading: "Use the redesign to improve everyday tasks",
          paragraphs: [
            "Choose representative journeys that the new website must handle more clearly. A visitor might need to compare two services, find a specification or contact the correct department. Use these tasks when reviewing layouts, navigation and forms. They give stakeholders a shared basis for feedback beyond personal preference.",
            "Include the editorial team in testing. Ask them to update a page, replace an image and check a draft before publication. If a task still depends on an unclear process or specialist knowledge nobody owns, address that before accepting the new system. The redesign should improve operation as well as presentation.",
          ],
        },
        {
          heading: "Treat launch as a controlled transition",
          paragraphs: [
            "Agree responsibilities for domain changes, hosting, redirects and final approval. Check the new site’s forms, metadata, internal links and mobile behaviour. Confirm that existing email services are understood before changing shared domain settings. Keep a recovery plan appropriate to the project in case the switch exposes an unexpected issue.",
            "After launch, review errors, enquiries and search performance against the earlier baseline. A migration can lead to changes in visibility, even with careful preparation, so identify how issues will be reported and investigated. Early feedback is useful for improving wording and navigation once real visitors use the new site.",
          ],
        },
      ],
      faq: [
        { question: "Can we keep our current brand during a redesign?", answer: "Yes. A website redesign does not require a new identity. Existing colours, typography and approved assets can inform the work while the structure, content and interactions are improved around current business needs." },
        { question: "Will our search rankings stay the same?", answer: "No supplier can guarantee unchanged positions. A content inventory, relevant redirects and post-launch monitoring help reduce avoidable migration problems. They also make it easier to investigate changes with evidence rather than guesswork." },
        { question: "How do we decide between a refresh and a rebuild?", answer: "Compare the required improvements with the limits of the current system. If the main issues can be resolved through focused content and design changes, a refresh may be sufficient. A rebuild needs a clear justification in capability, maintainability or structure." },
      ],
    },
    {
      id: "platforms",
      slug: "wordpress-shopify-or-bespoke",
      nav: "Choosing a platform",
      title: "WordPress, Shopify or Bespoke Website? | Brisk",
      description: "Compare WordPress, Shopify, WooCommerce and bespoke development for your business. Understand editing, integrations, maintenance and the trade-offs of each route.",
      h1: "WordPress, Shopify or bespoke: choose around your requirements",
      lead: "A platform is a means of running your website, not the objective of the project. The right choice depends on what your visitors need and what your team can maintain. Brisk concentrates on custom development, and this guide explains where established platforms and bespoke work differ without assuming that one route suits every business.",
      sections: [
        {
          heading: "WordPress: editorial flexibility with maintenance decisions",
          paragraphs: [
            "WordPress is commonly used for publishing pages, articles and other content. Themes and plugins can supply familiar website functions, while the editing environment may suit teams that publish regularly. Evaluate how an actual page is assembled and updated; the quality of the experience depends on the particular implementation.",
            "Ask who maintains the software, checks compatibility and manages hosting and backups. A collection of extensions also creates dependencies that somebody must understand. WordPress website design can be a sensible route, but neither search performance nor easy maintenance follows automatically from selecting the platform.",
          ],
        },
        {
          heading: "Shopify and WooCommerce: two different commerce approaches",
          paragraphs: [
            "Shopify provides a hosted commerce environment. That can simplify parts of operating an online shop, while subscriptions, apps and platform boundaries remain part of the decision. Test the product types, checkout requirements and integrations that matter to your business before assuming they fit the available configuration.",
            "WooCommerce adds ecommerce functionality to WordPress. It can be useful when publishing and product sales share the same site, but responsibility for hosting and the software combination needs to be explicit. Compare both routes through daily tasks such as changing a product, managing an order and handling a refund.",
          ],
        },
        {
          heading: "Bespoke development: freedom that needs a purpose",
          paragraphs: [
            "Custom development allows the structure and interactions to follow particular requirements. It may suit an unusual enquiry journey, a specialist product configurator or a connection to internal business software. The benefit should be specific enough to describe before commissioning the work.",
            "A bespoke site still needs an editing plan, operational ownership and ongoing technical attention. It is not automatically cheaper to run or faster to change. Brisk discusses custom work in terms of the problem it solves and the responsibilities it creates, so you can compare that investment with an established alternative.",
          ],
        },
        {
          heading: "Test the choice before committing to the build",
          paragraphs: [
            "Write down representative tasks for visitors and staff. Include awkward but realistic cases, such as an incomplete enquiry, a discontinued product or a content editor publishing in the wrong place. Ask how each option handles those situations and which functions depend on paid extensions or additional development.",
            "Also discuss data export, account access, documentation and the process for future changes. These details reveal dependencies that a polished demonstration can hide. Bring your existing system and planned changes to the conversation with Brisk, so the proposed technology and implementation scope can follow an assessment of your requirements.",
          ],
        },
      ],
      faq: [
        { question: "Is bespoke development always the best choice for an SME?", answer: "No. An established platform may cover a straightforward brief with less initial work. Bespoke development becomes more relevant when a clearly defined requirement is difficult to support well through standard configuration." },
        { question: "What if we already use WordPress or Shopify?", answer: "Share the current system and the limitation you want to address. Brisk focuses on custom development. The first step is to establish whether the requirement calls for a custom component, a different approach or specialist support for your existing platform." },
        { question: "Which platform is best for SEO?", answer: "Look at the implementation rather than a platform ranking. Useful content, accessible page structure, appropriate indexation and performance all matter. Ask how those requirements will be delivered and maintained within the proposed solution." },
      ],
    },
  ],
};
