import type { MarketContent } from "./types";

export const frenchMarket: MarketContent = {
  id: "fr-FR",
  prefix: "/fr",
  country: "France",
  countryEnglish: "France",
  language: "fr-FR",
  ogLocale: "fr_FR",
  labels: {
    home: "Accueil France",
    navigation: "Navigation principale",
    contact: "Parlons de votre projet",
    contactIntro: "Présentez votre activité, votre site actuel et ce que vous souhaitez améliorer. Nous pourrons définir ensemble le périmètre de votre projet.",
    email: "Nous écrire",
    projects: "Des projets concrets",
    projectsIntro: "Découvrez une sélection de sites, boutiques et plateformes réalisés par Brisk. Chaque projet répond à un besoin différent.",
    viewProject: "Découvrir le projet",
    related: "Pour préparer votre projet",
    faq: "Questions fréquentes",
    markets: "Choisir votre marché",
    basedIn: "Agence basée dans le Limbourg belge · Collaboration à distance avec les entreprises en France",
    skipToContent: "Aller au contenu",
    onThisPage: "Sur cette page",
    privacy: "Confidentialité",
  },
  pages: [
    {
      id: "home",
      slug: "",
      nav: "L’agence",
      title: "Agence web pour les entreprises en France | Brisk",
      description: "Brisk accompagne les entreprises en France dans la création de sites sur mesure et de boutiques en ligne. Découvrez notre approche et parlez-nous de votre projet.",
      h1: "Une agence web pour donner une direction à votre site",
      lead: "Votre site doit expliquer votre métier, rendre votre offre compréhensible et faciliter la prochaine étape. Brisk conçoit des sites internet sur mesure et des expériences e-commerce pour les entreprises en France, depuis son implantation dans le Limbourg belge.",
      sections: [
        {
          heading: "Un site qui répond aux questions de vos futurs clients",
          paragraphs: [
            "Un artisan, une PME industrielle et une marque qui vend en ligne ne demandent pas la même chose à leur site. Pour le premier, il peut s’agir de montrer des réalisations et de recevoir une demande précise. Pour la deuxième, de rendre une offre technique accessible. Pour la troisième, de guider le choix puis la commande. La conception commence par cette différence.",
            "Nous mettons en relation les contenus, le webdesign et le développement web. Une navigation claire et des pages utiles donnent du sens à l’identité visuelle. Le visiteur comprend ce que vous proposez, à qui vous vous adressez et comment vous contacter.",
          ],
        },
        {
          heading: "Choisir le bon projet avant de choisir une technologie",
          paragraphs: [
            "Un site vitrine présente votre activité et facilite les prises de contact. Une boutique en ligne ajoute un catalogue, des règles de vente et un parcours de commande. Une plateforme peut répondre à des besoins de comptes clients ou de traitement de demandes. Le bon choix dépend de votre organisation et des actions attendues de vos visiteurs.",
            "Si votre site existe déjà, une refonte complète n’est pas toujours le premier chantier. Nous pouvons commencer la discussion par ses difficultés concrètes : offre peu lisible, navigation mobile compliquée, contenus dépassés ou fonctionnement devenu trop contraignant.",
          ],
        },
        {
          heading: "Une collaboration à distance avec la France",
          paragraphs: [
            "Brisk est une agence belge qui s’adresse aussi aux entreprises françaises. Que votre activité soit implantée à Lille, Paris, Lyon ou ailleurs en France, le projet peut être organisé à distance. Les interlocuteurs, les livrables et les étapes de validation doivent être définis dès le départ pour que chacun sache ce qu’il doit préparer.",
            "Pour une entreprise présente dans plusieurs pays, traduire quelques titres ne suffit pas. Il faut choisir les offres disponibles par marché, adapter le vocabulaire et conserver des chemins de contact cohérents. Ces décisions éditoriales précèdent la création des différentes versions du site.",
          ],
        },
        {
          heading: "Des réalisations à regarder au-delà de leur apparence",
          paragraphs: [
            "Le portfolio comprend notamment Landelijk Glas, une entreprise de portes et de verre sur mesure, City Housing Genk, dans l’hôtellerie, et LegacyCristal, une boutique de créations en cristal personnalisées. Ces projets illustrent des parcours différents : découvrir un savoir-faire, consulter un hébergement ou préparer un achat personnalisé.",
            "Pour évaluer une agence web, regardez la manière dont ses réalisations présentent une offre, hiérarchisent les informations et conduisent vers une action. Un style séduisant compte, mais la pertinence de ces choix pour votre entreprise compte tout autant.",
          ],
        },
        {
          heading: "Préparer un premier échange utile",
          paragraphs: [
            "Envoyez l’adresse de votre site actuel, une présentation de votre clientèle et les principaux objectifs du futur site. Indiquez les contenus déjà disponibles, les langues souhaitées et les outils à relier. Une enveloppe budgétaire permet de distinguer les besoins essentiels des évolutions qui pourront attendre.",
            "Notre guide sur les prix vous aide à comparer les périmètres. Les pages consacrées à la création, à l’e-commerce et à la refonte détaillent les décisions propres à chaque projet. Vous disposez ainsi d’une base concrète pour demander un devis.",
          ],
        },
      ],
      faq: [
        { question: "Brisk possède-t-elle un bureau en France ?", answer: "Brisk est basée dans le Limbourg belge. La collaboration avec les entreprises en France se fait à distance ; cette page ne présente pas une implantation française." },
        { question: "Travaillez-vous pour les petites entreprises ?", answer: "Le projet peut concerner un indépendant, un artisan ou une PME. Le périmètre doit être adapté à l’offre, aux contenus disponibles et au budget, plutôt qu’à une taille de site prédéfinie." },
        { question: "Peut-on réunir plusieurs langues sur un même site ?", answer: "Oui, un projet peut prévoir plusieurs versions linguistiques. Il faut définir les marchés visés, les pages à traduire, les personnes chargées de les valider et la façon dont chaque version sera entretenue." },
      ],
    },
    {
      id: "websites",
      slug: "creation-site-internet",
      nav: "Création de site internet",
      title: "Création de site internet sur mesure en France | Brisk",
      description: "Un site internet professionnel adapté à votre entreprise : structure, webdesign, développement sur mesure et bases SEO. Préparez votre projet avec Brisk.",
      h1: "Création de site internet sur mesure pour votre entreprise",
      lead: "Un site internet professionnel doit donner une réponse claire à une question simple : pourquoi vous choisir ? Brisk réunit conception, webdesign et développement sur mesure pour présenter votre activité et faciliter les demandes de vos futurs clients en France.",
      sections: [
        {
          heading: "Construire une structure autour de votre offre",
          paragraphs: [
            "Avant de dessiner les pages, il faut comprendre ce que vous vendez et comment vos clients prennent leur décision. Une entreprise qui propose plusieurs prestations a besoin de pages capables de répondre à des questions distinctes. À l’inverse, multiplier les pages presque identiques complique la navigation et apporte peu d’informations supplémentaires.",
            "Pour un site vitrine, une base utile peut comprendre la présentation de l’offre, des réalisations expliquées, des informations sur l’entreprise et un contact accessible. Une landing page répond à un objectif plus ciblé, par exemple présenter une prestation précise à une audience définie.",
          ],
        },
        {
          heading: "Un webdesign qui rend vos contenus lisibles",
          paragraphs: [
            "La création d’un site sur mesure permet de hiérarchiser les informations selon votre activité. Une photographie de réalisation, un schéma explicatif ou un exemple de prestation peut être plus utile qu’un long discours. Les choix de typographie, de contraste et d’espacement doivent aider le visiteur à comprendre la page.",
            "Sur mobile, les éléments essentiels doivent rester faciles à trouver : offre, localisation réelle, coordonnées et formulaire. Le responsive design concerne aussi la taille des zones interactives, la lecture des tableaux et l’ordre des contenus. Réduire simplement une maquette de bureau ne règle pas ces questions.",
          ],
        },
        {
          heading: "Définir ce que vous devrez pouvoir modifier",
          paragraphs: [
            "Le développement d’un site internet doit tenir compte de sa vie quotidienne. Souhaitez-vous publier des actualités, ajouter des réalisations ou modifier vos prestations ? Qui relira les contenus ? Le choix d’un CMS et des possibilités d’édition dépend de ces réponses, pas seulement de la technologie employée.",
            "Les intégrations demandent le même cadrage. Un formulaire simple, une demande de devis détaillée et une connexion à un outil métier impliquent des usages différents. Nous précisons les champs, les destinataires et les cas particuliers pour éviter qu’un besoin central soit découvert après la conception.",
          ],
        },
        {
          heading: "Prévoir le référencement dès la conception",
          paragraphs: [
            "Un site internet optimisé pour le SEO repose sur des contenus utiles et une structure compréhensible. Chaque page importante doit avoir un sujet défini, un titre spécifique et des liens internes pertinents. Les textes doivent répondre aux questions des clients avec des informations sur vos prestations, vos méthodes et vos réalisations.",
            "La préparation technique comprend notamment l’accès des moteurs aux pages publiques, des adresses cohérentes et des images correctement préparées. Ces fondations ne garantissent pas une position sur Google : la concurrence, la qualité des contenus et la notoriété de votre entreprise interviennent également.",
          ],
        },
        {
          heading: "Valider le site avant sa mise en ligne",
          paragraphs: [
            "La validation doit porter sur les parcours réels : consulter une prestation, ouvrir un projet, envoyer une demande et retrouver les coordonnées. Les textes, les liens, les affichages sur différents écrans et les messages d’erreur font partie de cette vérification. Les règles d’accès aux comptes et les responsabilités après publication doivent aussi être claires.",
            "Pour préparer un devis de création de site internet, rassemblez votre identité visuelle, vos contenus disponibles, les fonctions attendues et vos contraintes de calendrier. Le prix dépend du périmètre validé et du travail nécessaire pour obtenir un site que votre entreprise pourra utiliser durablement.",
          ],
        },
      ],
      faq: [
        { question: "Quelle différence entre un site vitrine et un site sur mesure ?", answer: "Le site vitrine décrit une fonction : présenter une entreprise et ses prestations. Le sur-mesure décrit la manière de le concevoir. Un site vitrine peut donc être réalisé sur mesure, avec une structure et un design adaptés à votre activité." },
        { question: "Faut-il fournir tous les textes avant de commencer ?", answer: "Un inventaire initial permet de savoir ce qui existe et ce qui manque. La rédaction, la sélection des visuels et la validation des informations doivent ensuite être attribuées clairement dans le périmètre du projet." },
        { question: "Combien de pages faut-il prévoir ?", answer: "Il n’existe pas de nombre universel. Chaque page doit répondre à un besoin distinct. Le nombre découle de vos offres, de vos publics et des preuves disponibles, sans créer de variantes artificielles pour chaque mot-clé." },
      ],
    },
    {
      id: "ecommerce",
      slug: "creation-site-e-commerce",
      nav: "Boutique en ligne",
      title: "Création de site e-commerce et boutique en ligne | Brisk",
      description: "Préparez votre boutique en ligne avec Brisk : catalogue, parcours d’achat, options produit et intégrations. Un projet e-commerce défini autour de votre activité.",
      h1: "Création de site e-commerce pensée pour votre façon de vendre",
      lead: "Créer une boutique en ligne demande de relier ce que le client voit à ce que votre équipe doit gérer. Brisk conçoit des expériences e-commerce sur mesure en partant du catalogue, du parcours d’achat et des contraintes de votre activité.",
      sections: [
        {
          heading: "Commencer par les produits et les règles de vente",
          paragraphs: [
            "Le catalogue détermine une grande partie du projet. Produits standards, articles personnalisables et références techniques nécessitent des fiches et des filtres différents. Il faut connaître les variantes, les options, les visuels disponibles et le suivi des disponibilités avant de définir les écrans.",
            "Pour une boutique destinée à la France, précisez les zones réellement desservies, les informations à afficher avant la commande et les modalités de livraison envisagées. Si vous vendez également ailleurs, chaque marché peut demander des contenus ou des règles différents. Ces choix doivent refléter votre fonctionnement réel.",
          ],
        },
        {
          heading: "Aider le client à choisir avant de lui demander d’acheter",
          paragraphs: [
            "Une fiche produit répond aux hésitations : dimensions, compatibilité, matériaux, personnalisation ou entretien. Photos et descriptions doivent expliquer précisément ce qui sera commandé. Un filtre n’est pertinent que si les données qui l’alimentent sont fiables et si son intitulé est compréhensible pour vos clients.",
            "Le panier et la commande prolongent cette clarté. Les options choisies, les quantités et les frais applicables doivent être vérifiables. Sur mobile, les champs du formulaire et les étapes de validation méritent une attention particulière. Un parcours visuellement simple peut encore masquer des difficultés de saisie ou des erreurs peu explicites.",
          ],
        },
        {
          heading: "Relier la boutique à votre organisation",
          paragraphs: [
            "Qui reçoit la commande ? Comment votre équipe suit-elle son traitement ? Le stock provient-il d’un outil existant ? Ces questions permettent de distinguer les tâches manuelles acceptables des échanges de données qui doivent être automatisés. Une intégration se définit par les informations échangées et les erreurs à gérer, pas uniquement par le nom d’un logiciel.",
            "Les moyens de paiement et les solutions de livraison se choisissent avec vos prestataires et vos contraintes commerciales. Leur disponibilité, leur configuration et leurs coûts doivent être vérifiés pour votre entreprise. Le cahier des charges doit aussi prévoir les commandes interrompues, les changements de disponibilité et les notifications.",
          ],
        },
        {
          heading: "Un référencement adapté au catalogue",
          paragraphs: [
            "Le SEO d’une boutique ne consiste pas à indexer toutes les combinaisons de filtres. Les catégories doivent correspondre à des besoins de recherche clairs et conduire vers des produits pertinents. Les descriptions originales, les caractéristiques précises et les liens entre catégories aident à construire des pages réellement utiles.",
            "Lors d’une refonte e-commerce, les anciennes adresses produit et catégorie doivent être recensées. Le traitement des références supprimées, temporairement indisponibles ou remplacées mérite une décision explicite. Il faut préserver les parcours utiles et éviter d’envoyer systématiquement tous les anciens liens vers l’accueil.",
          ],
        },
        {
          heading: "S’appuyer sur des exemples et un périmètre vérifiable",
          paragraphs: [
            "LegacyCristal présente un achat de cristal personnalisé à partir d’une photo. Roetfilterkopen.com s’adresse à des acheteurs de pièces automobiles. Ces réalisations du portfolio montrent pourquoi la qualité d’un parcours dépend du produit vendu : préparer une personnalisation et identifier une référence compatible sont deux problèmes différents.",
            "Pour votre demande de devis, partagez un extrait représentatif du catalogue, vos marchés, vos outils actuels et les fonctions indispensables au lancement. Nous pouvons alors discuter du niveau de personnalisation pertinent et comparer une base existante à un développement spécifique sans choisir la solution avant d’avoir compris le besoin.",
          ],
        },
      ],
      faq: [
        { question: "Quel est le prix d’un site e-commerce ?", answer: "Il dépend notamment des données produit, des variantes, du design, des intégrations et d’une éventuelle migration. La taille du catalogue ne suffit pas à estimer le travail : une petite gamme très personnalisable peut demander un parcours complexe." },
        { question: "Peut-on reprendre une boutique existante ?", answer: "Une reprise se prépare avec un inventaire des produits, des contenus, des URL et des données à conserver. Les possibilités d’export, les accès disponibles et les contraintes des outils actuels doivent être examinés avant de confirmer le périmètre." },
        { question: "Faut-il choisir Shopify, WooCommerce ou une boutique sur mesure ?", answer: "Le choix dépend du parcours de vente, de l’autonomie souhaitée et des intégrations. Notre page de comparaison aide à formuler les critères ; la technologie et les prestations retenues doivent être précisées dans la proposition de projet." },
      ],
    },
    {
      id: "pricing",
      slug: "prix-creation-site-internet",
      nav: "Prix et devis",
      title: "Prix de création de site internet : préparer un devis | Brisk",
      description: "Comprenez le coût d’un site vitrine ou e-commerce : design, contenus, fonctionnalités, migration et maintenance. Préparez un devis comparable avec Brisk.",
      h1: "Prix de création d’un site internet : comprendre le devis",
      lead: "Combien coûte un site internet ? Le montant dépend de ce qu’il doit accomplir et de ce qu’il faut produire pour y parvenir. Ce guide vous aide à définir le périmètre et à comparer les propositions pour votre entreprise en France.",
      sections: [
        {
          heading: "Le nombre de pages ne raconte pas tout",
          paragraphs: [
            "Deux sites de dix pages peuvent demander des volumes de travail très différents. Dans un cas, les textes et les photos sont prêts et les pages partagent une même structure. Dans l’autre, il faut clarifier plusieurs offres, concevoir des présentations spécifiques et relier le site à des outils existants. Le prix doit refléter ces différences.",
            "Une demande de tarif devient plus précise lorsque l’on distingue la conception, la production des contenus, le développement et la mise en ligne. Sans cette distinction, une offre apparemment complète peut laisser à votre charge des tâches importantes que vous n’aviez pas anticipées.",
          ],
        },
        {
          heading: "Ce qui influence le prix d’un site vitrine",
          paragraphs: [
            "Le travail éditorial commence par l’organisation de votre offre et des pages nécessaires. Viennent ensuite la direction visuelle, les composants d’interface, l’adaptation mobile et les fonctions de contact. Une bibliothèque de réalisations ou plusieurs langues ajoutent des besoins de saisie, de validation et de gestion.",
            "Fournir des contenus prêts à publier peut réduire une partie de la production, à condition qu’ils soient adaptés au futur site. Des documents commerciaux anciens nécessitent souvent une réécriture. De même, disposer d’un logo ne signifie pas que toute l’identité visuelle et tous les visuels sont disponibles.",
          ],
        },
        {
          heading: "Ce qui change pour une boutique en ligne",
          paragraphs: [
            "Le prix d’un site e-commerce dépend du catalogue et du fonctionnement de la vente. Les variantes, les options personnalisables, la qualité des données, les règles de livraison et les échanges avec vos outils peuvent représenter une part importante du travail. La migration d’une boutique existante demande aussi des vérifications spécifiques.",
            "Pensez au coût d’exploitation : hébergement, abonnements éventuels, services externes, suivi technique et travail de votre équipe. Le devis initial et les frais récurrents répondent à deux questions différentes. Les comparer ensemble permet de mieux apprécier le coût global du choix technique.",
          ],
        },
        {
          heading: "Comparer des devis sur un même périmètre",
          paragraphs: [
            "Un devis utile décrit ce qui sera livré et les responsabilités de chacun. Il doit permettre de comprendre qui rédige, qui fournit les images, qui valide, ce qui peut être modifié et comment le site sera transmis. Les demandes d’évolution doivent pouvoir être distinguées des éléments prévus au départ.",
          ],
          bullets: [
            "Liste des pages, langues et fonctions comprises dans le projet.",
            "Répartition de la rédaction, des visuels et de la saisie des contenus.",
            "Accès, propriété des comptes et conditions d’utilisation des services externes.",
            "Migration, vérifications avant publication et responsabilités après lancement.",
            "Coûts ponctuels, frais récurrents et modalités des évolutions futures.",
          ],
        },
        {
          heading: "Maîtriser le budget avec des priorités claires",
          paragraphs: [
            "Si le budget est limité, commencez par les pages et les fonctions qui permettent de présenter l’offre et de recevoir les bonnes demandes. Un espace complexe rarement utilisé peut attendre. Cette priorisation doit conserver un parcours complet : une fonctionnalité essentielle laissée à moitié terminée ne devient pas utile parce qu’elle coûte moins cher.",
            "Pour recevoir une proposition adaptée, envoyez votre site actuel, vos objectifs, les contenus disponibles, les intégrations envisagées et votre enveloppe. Précisez également les contraintes de validation interne. Ces informations permettent de discuter d’un périmètre réaliste et des arbitrages possibles avant de fixer un prix.",
          ],
        },
      ],
      faq: [
        { question: "Pourquoi ne pas afficher un tarif unique pour chaque site ?", answer: "Un tarif unique serait peu représentatif de projets dont les contenus et les fonctions diffèrent. Le montant doit correspondre à un périmètre explicite. Cette page présente les critères à préciser pour obtenir une proposition exploitable." },
        { question: "Peut-on créer un site internet avec un budget limité ?", answer: "Il est possible de réduire le périmètre et de préparer les contenus en amont. La priorité est de conserver une offre compréhensible, un affichage adapté au mobile et un contact fonctionnel, puis de planifier les évolutions utiles." },
        { question: "La maintenance est-elle comprise dans la création ?", answer: "Les prestations après publication doivent être définies dans la proposition. Demandez quels services sont inclus, pendant quelle période et comment sont traités l’hébergement, les mises à jour et les nouvelles demandes." },
      ],
    },
    {
      id: "redesign",
      slug: "refonte-site-internet",
      nav: "Refonte de site",
      title: "Refonte de site internet : design et migration SEO | Brisk",
      description: "Modernisez votre site avec un plan de refonte clair : contenus, expérience mobile, inventaire des URL et migration. Préparez les bonnes priorités avec Brisk.",
      h1: "Refonte de site internet : améliorer sans perdre les repères utiles",
      lead: "Votre entreprise a évolué, mais votre site ne raconte plus la bonne histoire. Une refonte permet de revoir l’offre, les parcours et le fonctionnement du site. Elle doit aussi tenir compte des contenus et des adresses que vos clients utilisent déjà.",
      sections: [
        {
          heading: "Identifier le problème avant de refaire le design",
          paragraphs: [
            "Un site ancien n’a pas nécessairement besoin d’être remplacé intégralement. Commencez par les difficultés observables : prestations introuvables, formulaire trop long, mise à jour compliquée, pages peu lisibles sur mobile ou offres devenues inexactes. Chacune appelle une réponse différente. Un changement de couleurs ne corrige pas une architecture confuse.",
            "Rassemblez les retours de votre équipe et de vos clients. Si vous disposez de données de fréquentation ou de recherche, elles peuvent aider à identifier les pages utilisées. L’objectif est de conserver ce qui rend service, de clarifier ce qui gêne et de supprimer ce qui n’a plus de fonction.",
          ],
        },
        {
          heading: "Faire l’inventaire du site existant",
          paragraphs: [
            "Avant toute suppression, recensez les pages, les documents téléchargeables, les formulaires et les outils connectés. Certaines adresses peuvent être présentes dans des e-mails, des publicités ou des liens provenant d’autres sites. Une page peu visitée peut également répondre à une question importante pour un petit nombre de prospects qualifiés.",
            "Cet inventaire doit comprendre les accès nécessaires : nom de domaine, hébergement, comptes de mesure et outils métier. Il faut identifier les responsables des contenus et les informations à mettre à jour. Une refonte devient plus prévisible lorsque ces éléments sont connus avant le développement.",
          ],
        },
        {
          heading: "Repenser les contenus et le parcours mobile",
          paragraphs: [
            "La nouvelle structure doit refléter votre offre actuelle. Regroupez les pages qui répètent la même information et développez les sujets qui manquent. Une réalisation documentée, une explication du déroulement d’une prestation ou une réponse précise à une question commerciale peut apporter davantage qu’un texte générique sur votre qualité de service.",
            "Vérifiez aussi les actions du visiteur sur téléphone : parcourir les prestations, consulter des visuels, trouver une adresse et envoyer une demande. Les composants d’interface doivent être testés avec des contenus représentatifs, y compris des titres longs et des messages d’erreur, pour éviter une maquette convaincante mais difficile à utiliser.",
          ],
        },
        {
          heading: "Préparer la migration des adresses",
          paragraphs: [
            "Quand une URL change, il faut déterminer sa nouvelle destination. Une redirection permanente vers une page réellement équivalente aide les visiteurs et les moteurs à retrouver le contenu. Rediriger toutes les anciennes pages vers l’accueil ne remplace pas cette correspondance. Les liens internes doivent également pointer directement vers les nouvelles adresses.",
            "Pour une refonte e-commerce, ajoutez les catégories, les fiches produit et les pages liées aux variantes à l’inventaire. Les références supprimées demandent un traitement adapté à leur situation. Le sitemap, les liens de navigation et les consignes d’indexation doivent correspondre à la version effectivement publiée.",
          ],
        },
        {
          heading: "Une liste de contrôle pour le lancement",
          paragraphs: [
            "La mise en ligne est une étape de vérification, pas seulement un changement d’hébergement. Prévoyez qui valide le contenu, qui contrôle les actions essentielles et qui suit les erreurs après publication. Une migration peut provoquer des variations de visibilité ; un suivi permet d’identifier les problèmes techniques qui nécessitent une correction.",
          ],
          bullets: [
            "Associer les anciennes URL importantes à leur destination pertinente.",
            "Vérifier les formulaires, les e-mails reçus et les parcours sur mobile.",
            "Contrôler titres, liens internes, images et pages publiées.",
            "Retirer les restrictions d’indexation réservées à la préproduction.",
            "Conserver les accès de mesure et suivre les erreurs après lancement.",
          ],
        },
      ],
      faq: [
        { question: "Une refonte peut-elle conserver mon référencement ?", answer: "Un inventaire, des contenus pertinents et une migration préparée réduisent les erreurs évitables. Ils ne garantissent pas des positions identiques : les moteurs doivent réévaluer les pages et d’autres facteurs peuvent faire évoluer la visibilité." },
        { question: "Faut-il changer le nom de domaine ?", answer: "Une refonte graphique ou technique n’impose pas de changer de domaine. Si un changement est nécessaire pour votre entreprise, il faut le traiter comme une migration supplémentaire avec ses correspondances d’URL et ses vérifications." },
        { question: "Peut-on conserver une partie des contenus ?", answer: "Oui. Les contenus exacts, utiles et cohérents avec votre offre peuvent être conservés ou améliorés. La décision doit se faire page par page, en tenant compte de la valeur pour les visiteurs et des objectifs du futur site." },
      ],
    },
    {
      id: "platforms",
      slug: "wordpress-shopify-ou-sur-mesure",
      nav: "Choisir une solution",
      title: "WordPress, Shopify, PrestaShop ou sur mesure ? | Brisk",
      description: "Comparez WordPress, WooCommerce, Shopify, PrestaShop et le développement sur mesure selon vos contenus, votre catalogue, vos outils et votre budget.",
      h1: "WordPress, Shopify ou sur mesure : choisir selon votre activité",
      lead: "La bonne question n’est pas de savoir quelle plateforme est la meilleure dans l’absolu. Il faut déterminer laquelle convient à vos contenus, à votre façon de vendre et à votre équipe. Voici les critères à examiner avant de choisir une technologie ou un prestataire.",
      sections: [
        {
          heading: "WordPress pour la gestion des contenus",
          paragraphs: [
            "WordPress est un système de gestion de contenus open source. Il peut constituer une base pertinente pour publier des pages, des articles et des réalisations. Dans un projet de création de site WordPress, il faut préciser ce que l’équipe pourra modifier, comment les contenus seront organisés et qui assurera le suivi technique.",
            "Le choix d’un thème et d’extensions ne remplace pas le travail de conception. Demandez comment seront gérés les composants spécifiques, les mises à jour et les dépendances. L’autonomie éditoriale est utile si elle permet à votre équipe de publier sans dégrader progressivement la cohérence du site.",
          ],
        },
        {
          heading: "WooCommerce pour une boutique dans WordPress",
          paragraphs: [
            "WooCommerce ajoute des fonctions de commerce à WordPress. Cette approche peut être intéressante lorsque contenus éditoriaux et vente doivent cohabiter. Le choix demande néanmoins une évaluation du catalogue, des extensions nécessaires, de l’hébergement et des opérations que votre équipe devra effectuer au quotidien.",
            "Avant de demander la création d’un site WooCommerce, préparez un exemple de produit simple, un produit avec variantes et les éventuels cas particuliers. Une démonstration représentative aide à vérifier que la gestion de la boutique reste compréhensible. Examinez également les coûts récurrents et les responsabilités de maintenance.",
          ],
        },
        {
          heading: "Shopify pour un environnement de vente hébergé",
          paragraphs: [
            "Shopify propose un environnement hébergé pour exploiter une boutique en ligne. Lors d’un projet Shopify, comparez le parcours souhaité avec les possibilités de la plateforme et des services complémentaires envisagés. La sélection doit prendre en compte le fonctionnement commercial, les contenus et les échanges de données avec vos autres outils.",
            "Les abonnements, les applications et les conditions de paiement doivent être vérifiés auprès des fournisseurs. Une fonctionnalité disponible dans une démonstration peut dépendre d’une offre ou d’un outil spécifique. Demandez une explication claire du périmètre effectivement prévu pour votre boutique.",
          ],
        },
        {
          heading: "PrestaShop et les besoins centrés sur le catalogue",
          paragraphs: [
            "PrestaShop est une autre solution à examiner pour un projet de commerce en ligne. Si vous possédez déjà une boutique PrestaShop, commencez par identifier les modules utilisés, les données à conserver et les difficultés réelles avant d’envisager une migration. Changer de plateforme ne corrige pas automatiquement des fiches produit incomplètes ou une organisation logistique imprécise.",
            "Comparez les solutions sur les mêmes scénarios : créer une référence, modifier une variante, traiter une commande et exporter des informations. Ces opérations concrètes sont plus instructives qu’une liste de fonctionnalités dont votre entreprise n’utilisera qu’une partie.",
          ],
        },
        {
          heading: "Quand envisager un développement sur mesure ?",
          paragraphs: [
            "Le sur-mesure mérite d’être étudié lorsque l’expérience attendue ou les règles métier ne correspondent pas bien à une base standard. Un configurateur particulier, un portail de clients professionnels ou un parcours de commande spécifique peuvent justifier cette réflexion. Il faut cependant prévoir la gestion des contenus, les évolutions et la maintenance dès la conception.",
            "Brisk présente dans son portfolio des sites, des boutiques et des plateformes sur mesure. Cette comparaison ne signifie pas que toutes les prestations WordPress, Shopify, WooCommerce ou PrestaShop sont proposées. Le choix de la solution et les interventions possibles doivent être confirmés après examen de votre besoin.",
          ],
        },
      ],
      faq: [
        { question: "Quelle plateforme est la meilleure pour le SEO ?", answer: "Le nom de la plateforme ne suffit pas à déterminer la visibilité. La qualité des contenus, la structure, les possibilités techniques et leur mise en œuvre comptent. Évaluez les besoins concrets du projet plutôt qu’une promesse générale liée à un outil." },
        { question: "Le sur-mesure coûte-t-il toujours plus cher ?", answer: "Il faut comparer le même périmètre et intégrer l’exploitation dans la durée. Les personnalisations, les services complémentaires et les interventions techniques peuvent modifier le coût d’une solution standard. Aucun classement universel ne remplace un devis détaillé." },
        { question: "Comment éviter de choisir trop tôt ?", answer: "Décrivez d’abord vos parcours, vos contenus, vos intégrations et les tâches de votre équipe. Demandez ensuite comment chaque option traite ces besoins, ce qui reste spécifique et quelles contraintes vous acceptez. Vous pourrez alors choisir sur une base concrète." },
      ],
    },
  ],
};
