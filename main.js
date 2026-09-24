document.addEventListener("DOMContentLoaded", function () {

    const translations = {
        en: {
            "nav.home": "Home",
            "nav.products": "Products",
            "nav.solutions": "Solutions",
            "nav.contact": "Contact",
            "nav.quote": "Get a Quote",
            "lang.title": "Language",
            "lang.en": "English",
            "lang.fr": "Français",
            "lang.de": "Deutsch",
            "lang.ar": "العربية",
            "hero.eyebrow": "CUSTOM PACKAGING MANUFACTURER",
            "hero.title1": "Packaging",
            "hero.title1b": "Made",
            "hero.title2": "For Your Brand.",
            "hero.text": "Custom rigid boxes, magnetic boxes, perfume packaging, cosmetic packaging and premium presentation packaging manufactured to your specifications.",
            "hero.cta1": "Get a Custom Quote",
            "hero.cta2": "Explore Products",
            "home.custom": "Custom",
            "home.structural": "Structural Design",
            "home.premium": "Premium",
            "home.finishing": "Finishing Options",
            "home.qc": "QC",
            "home.quality": "Production Control",
            "intro.eyebrow": "BUILT AROUND YOUR PRODUCT",
            "intro.title": "From packaging concept to finished product.",
            "intro.text": "Metapackink provides custom packaging manufacturing for brands that need more than a standard box. From structural development and material selection to printing, finishing, assembly and quality control, every project can be developed around your product.",
            "intro.link": "Explore our packaging solutions →",
            "products.eyebrow": "OUR PRODUCTS",
            "products.title": "Packaging for premium products.",
            "products.view": "View all products →",
            "why.eyebrow": "WHY METAPACKINK",
            "why.title": "More than printing a box.",
            "why.subtitle": "We help turn packaging requirements into production-ready packaging.",
            "process.eyebrow": "HOW IT WORKS",
            "process.title": "A simple path from idea to production.",
            "cta.eyebrow": "START YOUR PROJECT",
            "cta.title": "Have a packaging idea?",
            "cta.text": "Tell us what you need and we'll help you turn it into a production-ready packaging solution.",
            "cta.button": "Request a Quote →",
            "footer.products": "Products",
            "footer.company": "Company",
            "footer.start": "Start a Project",
            "footer.description": "Send your packaging requirements and request a quotation.",
            "footer.button": "Get a Quote",
            "footer.copy": "© 2026 Metapackink. All rights reserved.",
            "solutions.hero": "From packaging concept",
            "solutions.hero2": "to finished production.",
            "solutions.eyebrow": "CUSTOM PACKAGING SOLUTIONS",
            "solutions.subtitle": "A complete custom packaging workflow for brands that need packaging developed around their product, brand and production requirements.",
            "solutions.button": "Start Your Project →",
            "solutions.process": "OUR PROCESS",
            "solutions.processTitle": "How a custom packaging project works.",
            "solutions.introEyebrow": "ONE PROJECT / ONE WORKFLOW",
            "solutions.introTitle": "Packaging should be engineered, not simply printed.",
            "solutions.introText1": "A successful packaging project involves more than artwork. The structure, board, paper, finishing, internal protection, assembly and logistics all affect the final result.",
            "solutions.introText2": "Metapackink can coordinate these requirements around your product specifications and target presentation.",
            "solutions.materialsEyebrow": "MATERIALS",
            "solutions.materialsTitle": "Built around the right materials.",
            "solutions.finishEyebrow": "PREMIUM FINISHING",
            "solutions.finishTitle": "Make the packaging feel like part of the product.",
            "solutions.finishText": "Finishing can change how packaging looks, feels and communicates your brand.",
            "solutions.industryEyebrow": "PACKAGING APPLICATIONS",
            "solutions.industryTitle": "Solutions for different product categories.",
            "products.pageeyebrow": "CUSTOM PACKAGING PRODUCTS",
            "products.pagetitle": "Packaging designed around your product.",
            "products.pageintro": "Explore custom packaging structures for luxury, beauty, fragrance, retail and premium consumer products.",
            "products.rigidEyebrow": "01 / RIGID PACKAGING",
            "products.rigidTitle": "Premium Rigid Boxes",
            "products.rigidText": "Rigid board packaging for products that require a premium presentation and durable structure.",
            "products.requestQuote": "Request Quote →",
            "products.industryEyebrow": "02 / INDUSTRY PACKAGING",
            "products.industryTitle": "Beauty & Fragrance Packaging",
            "products.industryText": "Custom packaging developed for beauty, skincare, fragrance and premium consumer products.",
            "products.viewSolutions": "View Solutions →",
            "contact.eyebrow": "LET'S TALK PACKAGING",
            "contact.title": "Tell us what you're building.",
            "contact.text": "Give us a call, send us a WhatsApp message, or email us directly.",
            "contact.call": "Give us a call",
            "contact.tel": "Tel :",
            "contact.email": "Email us",
            "contact.address": "Address",
            "contact.addressText": "Jiangnan Industrial Zone 2, Nancun Town, Panyu District, Guangzhou",
            "contact.start": "Start a Project",
            "button.quote": "Get a Quote",
            "timeline.project": "Project Brief",
            "timeline.projectText": "Send your product dimensions, quantity, target market, packaging references and project requirements.",
            "timeline.structural": "Structural Development",
            "timeline.structuralText": "We determine the appropriate box construction, dimensions and material requirements for your project.",
            "timeline.materials": "Materials & Finishing",
            "timeline.materialsText": "Select board, paper, fabrics, coatings, foil, embossing, debossing, spot UV and other finishes.",
            "timeline.artwork": "Artwork & Prototype",
            "timeline.artworkText": "Confirm dielines, artwork, construction and physical sample requirements before production.",
            "timeline.production": "Mass Production",
            "timeline.productionText": "Approved specifications are transferred into production with quality checks throughout the process.",
            "timeline.delivery": "Inspection & Delivery",
            "timeline.deliveryText": "Finished packaging is checked before packing and shipment to the requested destination.",
            "materials.greyboard": "Greyboard",
            "materials.greyboardText": "Rigid board structures for premium presentation boxes.",
            "materials.paper": "Specialty Paper",
            "materials.paperText": "Textured, coated and specialty papers for branded surfaces.",
            "materials.fabric": "Fabric & Wraps",
            "materials.fabricText": "Fabric, paper and other wrapping materials for premium boxes.",
            "materials.protective": "Protective Materials",
            "materials.protectiveText": "Custom-fit foam, EVA and other protective packaging materials.",
            "finishes.foil": "Foil Stamping",
            "finishes.foilText": "Metallic and specialty foil effects",
            "finishes.emboss": "Embossing",
            "finishes.embossText": "Raised branded details",
            "finishes.deboss": "Debossing",
            "finishes.debossText": "Recessed logo and graphic effects",
            "finishes.uv": "Spot UV",
            "finishes.uvText": "Selective gloss contrast",
            "finishes.lam": "Matte Lamination",
            "finishes.lamText": "Smooth premium surface protection",
            "finishes.soft": "Soft Touch",
            "finishes.softText": "Soft premium tactile finish",
            "product.rigidTitle": "Premium Rigid Boxes",
            "product.rigidText": "High-end presentation boxes for luxury, retail and branded products.",
            "product.magneticTitle": "Magnetic Boxes",
            "product.magneticText": "Foldable and rigid magnetic closure packaging for premium presentation.",
            "product.perfumeTitle": "Perfume Packaging",
            "product.perfumeText": "Custom fragrance boxes designed around bottle dimensions and brand identity.",
            "product.cosmeticTitle": "Cosmetic Packaging",
            "product.cosmeticText": "Branded boxes for skincare, beauty and cosmetic products.",
            "product.drawerTitle": "Custom Drawer Boxes",
            "product.drawerText": "Sliding drawer-style packaging designed for premium presentation and retail display.",
            "product.giftTitle": "Premium Gift Packaging",
            "product.giftText": "Luxury presentation boxes designed for gifting and special editions.",
            "product.rigidCardText": "Custom sizes, papers, finishes and internal structures.",
            "product.magneticCardText": "Premium magnetic boxes for luxury product presentation.",
            "product.twoPieceCardText": "Classic lid-and-base construction with custom finishing.",
            "product.perfumeCardText": "Custom fragrance boxes built around bottle dimensions.",
            "product.cosmeticCardText": "Branded packaging for skincare and beauty products.",
            "product.drawerCardText": "Elegant pull-out drawer packaging for premium retail and gifting.",
            "product.giftCardText": "Luxury presentation boxes designed for gifting and special editions.",
            "product.twoPieceTitle": "Two-Piece Rigid Boxes",
            "product.twoPieceText": "Classic lid-and-base construction for premium retail packaging.",
            "product.explore": "Explore →",
            "feature.structural": "Structural Development",
            "feature.structuralText": "Packaging structures can be developed around product dimensions, presentation requirements and logistics.",
            "feature.material": "Material Selection",
            "feature.materialText": "Choose from greyboard, specialty papers, coated papers, fabrics, foams and other packaging materials.",
            "feature.finishing": "Premium Finishing",
            "feature.finishingText": "Foil stamping, embossing, debossing, spot UV, lamination and other finishing options are available.",
            "feature.quality": "Quality Control",
            "feature.qualityText": "Production checks help verify dimensions, materials, printing, finishing and assembly before shipment.",
            "process.requirements": "Send Requirements",
            "process.requirementsText": "Share your dimensions, quantity, product information and packaging ideas.",
            "process.quote": "Structure & Quote",
            "process.quoteText": "We review the project and recommend suitable materials, construction and finishes.",
            "process.sample": "Sample Approval",
            "process.sampleText": "Confirm the packaging structure, artwork, materials and finishing.",
            "process.production": "Production & QC",
            "process.productionText": "Production follows the approved specifications before final shipment.",
            "footer.tagline": "Custom packaging manufacturing for premium brands.",
            "footer.rigid": "Rigid Boxes",
            "footer.magnetic": "Magnetic Boxes",
            "footer.perfume": "Perfume Packaging",
            "footer.cosmetic": "Cosmetic Packaging",
            "footer.home": "Home",
            "footer.social": "Social media links",
            "footer.facebook": "Facebook",
            "footer.instagram": "Instagram",
            "footer.youtube": "YouTube",
            "footer.linkedin": "LinkedIn",
            "footer.pinterest": "Pinterest",
            "footer.twitter": "Twitter",
            "products.supportEyebrow": "03 / SUPPORTING PACKAGING",
            "products.supportTitle": "Custom Branded Packaging",
            "products.supportText": "Packaging components and supporting printed materials can be developed as part of a complete packaging project.",
            "products.paperBags": "Paper Bags",
            "products.paperBagsText": "Retail and gift packaging bags",
            "products.wrappingPaper": "Wrapping Paper",
            "products.wrappingPaperText": "Custom printed brand packaging materials",
            "products.customEyebrow": "CUSTOM PROJECT",
            "products.customTitle": "Don't see exactly what you need?",
            "products.customText": "Tell us your product dimensions, quantity and packaging requirements. We can develop a custom solution.",
            "products.customButton": "Talk to Metapackink →",
            "solutions.timelineProject": "Project Brief",
            "solutions.timelineProjectText": "Send your product dimensions, quantity, target market, packaging references and project requirements.",
            "solutions.timelineStructural": "Structural Development",
            "solutions.timelineStructuralText": "We determine the appropriate box construction, dimensions and material requirements for your project.",
            "solutions.timelineMaterials": "Materials & Finishing",
            "solutions.timelineMaterialsText": "Select board, paper, fabrics, coatings, foil, embossing, debossing, spot UV and other finishes.",
            "solutions.timelineArtwork": "Artwork & Prototype",
            "solutions.timelineArtworkText": "Confirm dielines, artwork, construction and physical sample requirements before production.",
            "solutions.timelineProduction": "Mass Production",
            "solutions.timelineProductionText": "Approved specifications are transferred into production with quality checks throughout the process.",
            "solutions.timelineDelivery": "Inspection & Delivery",
            "solutions.timelineDeliveryText": "Finished packaging is checked before packing and shipment to the requested destination.",
            "solutions.industryFragranceText": "Custom perfume boxes designed around bottles, brands and retail presentation.",
            "solutions.industryBeautyText": "Packaging for skincare, cosmetics and beauty products.",
            "solutions.industryJewelryText": "Compact premium boxes for jewelry and accessories.",
            "solutions.industryRetailText": "Presentation packaging for premium consumer brands.",
            "solutions.industryGiftText": "Branded boxes for gifting and special collections.",
            "solutions.industryConsumerText": "Custom packaging for products requiring a branded presentation.",
            "solutions.darkEyebrow": "READY TO BUILD YOUR PACKAGING?",
            "solutions.darkTitle": "Let's develop your next packaging project.",
            "solutions.darkText": "Send your specifications and we'll review the project with you.",
            "solutions.darkButton": "Request a Quote →",
            "contact.infoEyebrow": "CONTACT METAPACKINK",
            "contact.infoTitle": "Let's talk about your packaging project.",
            "contact.infoText": "Our team is ready to answer your questions and discuss your custom packaging requirements.",
            "contact.whatsapp": "Whatsapp :",
            "contact.emailLabel": "Email",
            "floating.contact": "Contact us",
            "floating.phone": "Phone",
            "floating.email": "Email",
            "floating.whatsapp": "WhatsApp",
            "floating.scan": "Scan to WhatsApp",
            "floating.qrAlt": "Scan the QR code to contact us on WhatsApp",
            "industry.fragrance": "Perfume & Fragrance",
            "industry.beauty": "Cosmetics & Beauty",
            "industry.jewelry": "Jewelry",
            "industry.retail": "Luxury Retail",
            "industry.gift": "Gift Packaging",
            "industry.consumer": "Consumer Products"
        },
        fr: {
            "nav.home": "Accueil",
            "nav.products": "Produits",
            "nav.solutions": "Solutions",
            "nav.contact": "Contact",
            "nav.quote": "Obtenir un devis",
            "lang.title": "Langue",
            "lang.en": "English",
            "lang.fr": "Français",
            "lang.de": "Deutsch",
            "lang.ar": "العربية",
            "hero.eyebrow": "FABRICANT D'EMBALLAGES SUR MESURE",
            "hero.title1": "L'emballage",
            "hero.title1b": "pensé",
            "hero.title2": "pour votre marque.",
            "hero.text": "Boîtes rigides sur mesure, boîtes magnétiques, emballages parfum, cosmétiques et présentations premium fabriquées selon vos exigences.",
            "hero.cta1": "Demander un devis",
            "hero.cta2": "Découvrir les produits",
            "home.custom": "Sur mesure",
            "home.structural": "Conception structurelle",
            "home.premium": "Premium",
            "home.finishing": "Finitions",
            "home.qc": "Contrôle",
            "home.quality": "Contrôle de production",
            "intro.eyebrow": "CONÇU AUTOUR DE VOTRE PRODUIT",
            "intro.title": "De l'idée emballage au produit fini.",
            "intro.text": "Metapackink fabrique des emballages sur mesure pour les marques qui ont besoin de plus qu'une simple boîte. De la conception structurelle à la sélection des matériaux, en passant par l'impression, les finitions, l'assemblage et le contrôle qualité, chaque projet peut être développé autour de votre produit.",
            "intro.link": "Découvrez nos solutions d'emballage →",
            "products.eyebrow": "NOS PRODUITS",
            "products.title": "Des emballages pour des produits premium.",
            "products.view": "Voir tous les produits →",
            "why.eyebrow": "POURQUOI METAPACKINK",
            "why.title": "Plus qu'une simple boîte imprimée.",
            "why.subtitle": "Nous aidons à transformer vos besoins en emballages prêts à la production.",
            "process.eyebrow": "COMMENT ÇA MARCHE",
            "process.title": "Un chemin simple de l'idée à la production.",
            "cta.eyebrow": "DÉMARRER VOTRE PROJET",
            "cta.title": "Vous avez une idée d'emballage ?",
            "cta.text": "Dites-nous ce dont vous avez besoin et nous vous aiderons à le transformer en solution d'emballage prête à la production.",
            "cta.button": "Demander un devis →",
            "footer.products": "Produits",
            "footer.company": "Entreprise",
            "footer.start": "Démarrer un projet",
            "footer.description": "Envoyez vos exigences d'emballage et demandez un devis.",
            "footer.button": "Obtenir un devis",
            "footer.copy": "© 2026 Metapackink. Tous droits réservés.",
            "solutions.hero": "De l'idée d'emballage",
            "solutions.hero2": "à la production finale.",
            "solutions.eyebrow": "SOLUTIONS D'EMBALLAGE SUR MESURE",
            "solutions.subtitle": "Un workflow complet d'emballage sur mesure pour les marques qui ont besoin d'un packaging pensé autour de leur produit, de leur marque et de leurs exigences de production.",
            "solutions.button": "Démarrer votre projet →",
            "solutions.process": "NOTRE PROCESSUS",
            "solutions.processTitle": "Comment fonctionne un projet d'emballage sur mesure.",
            "solutions.introEyebrow": "UN PROJET / UN FLUX DE TRAVAIL",
            "solutions.introTitle": "L'emballage doit être conçu, pas simplement imprimé.",
            "solutions.introText1": "Un projet d'emballage réussi va au-delà de l'artwork. La structure, le carton, le papier, la finition, la protection interne, l'assemblage et la logistique influencent tous le résultat final.",
            "solutions.introText2": "Metapackink peut coordonner ces exigences autour des spécifications de votre produit et de votre présentation cible.",
            "solutions.materialsEyebrow": "MATÉRIAUX",
            "solutions.materialsTitle": "Conçu autour des bons matériaux.",
            "solutions.finishEyebrow": "FINITIONS PREMIUM",
            "solutions.finishTitle": "Faites que l'emballage fasse partie du produit.",
            "solutions.finishText": "La finition peut changer l'apparence, la sensation et la communication de votre marque.",
            "solutions.industryEyebrow": "APPLICATIONS D'EMBALLAGE",
            "solutions.industryTitle": "Des solutions pour différentes catégories de produits.",
            "products.pageeyebrow": "PRODUITS D'EMBALLAGE SUR MESURE",
            "products.pagetitle": "Un emballage pensé autour de votre produit.",
            "products.pageintro": "Découvrez des structures d'emballage sur mesure pour le luxe, la beauté, les parfums, la vente au détail et les produits de consommation premium.",
            "products.rigidEyebrow": "01 / EMBALLAGES RIGIDES",
            "products.rigidTitle": "Boîtes rigides premium",
            "products.rigidText": "Emballages en carton rigide pour produits qui demandent une présentation premium et une structure durable.",
            "products.requestQuote": "Demander un devis →",
            "products.industryEyebrow": "02 / EMBALLAGES DE SECTEUR",
            "products.industryTitle": "Emballages beauté & parfumerie",
            "products.industryText": "Des emballages sur mesure conçus pour la beauté, les soins, les parfums et les produits premium.",
            "products.viewSolutions": "Voir les solutions →",
            "contact.eyebrow": "PARLONS EMBALLAGE",
            "contact.title": "Dites-nous ce que vous créez.",
            "contact.text": "Appelez-nous, envoyez-nous un message WhatsApp ou écrivez-nous directement.",
            "contact.call": "Appelez-nous",
            "contact.tel": "Téléphone :",
            "contact.email": "Écrivez-nous",
            "contact.address": "Adresse",
            "contact.addressText": "Zone industrielle Jiangnan 2, ville de Nancun, district de Panyu, Guangzhou",
            "contact.start": "Démarrer un projet",
            "button.quote": "Obtenir un devis",
            "timeline.project": "Brief du projet",
            "timeline.projectText": "Envoyez les dimensions du produit, la quantité, le marché cible, les références d'emballage et les exigences du projet.",
            "timeline.structural": "Développement structurel",
            "timeline.structuralText": "Nous déterminons la bonne construction de boîte, les dimensions et les exigences de matériaux pour votre projet.",
            "timeline.materials": "Matériaux & finitions",
            "timeline.materialsText": "Sélectionnez carton, papier, tissus, revêtements, feuille, gaufrage, debossing, UV localisée et autres finitions.",
            "timeline.artwork": "Artwork & prototype",
            "timeline.artworkText": "Validez les gabarits, les visuels, la construction et les exigences d'échantillon physique avant la production.",
            "timeline.production": "Production de masse",
            "timeline.productionText": "Les spécifications approuvées sont transférées en production avec contrôles qualité tout au long du processus.",
            "timeline.delivery": "Inspection & livraison",
            "timeline.deliveryText": "L'emballage fini est vérifié avant conditionnement et expédition vers la destination demandée.",
            "materials.greyboard": "Carton gris",
            "materials.greyboardText": "Structures en carton rigide pour boîtes de présentation premium.",
            "materials.paper": "Papier spécial",
            "materials.paperText": "Papiers texturés, revêtus et spéciaux pour surfaces de marque.",
            "materials.fabric": "Tissus & wraps",
            "materials.fabricText": "Tissus, papiers et autres matériaux d'enveloppement pour boîtes premium.",
            "materials.protective": "Matériaux protecteurs",
            "materials.protectiveText": "Mousse sur mesure, EVA et autres matériaux de protection pour emballage.",
            "finishes.foil": "Finition au foil",
            "finishes.foilText": "Effets métalliques et spécifiques",
            "finishes.emboss": "Relief",
            "finishes.embossText": "Détails de marque en relief",
            "finishes.deboss": "Debossing",
            "finishes.debossText": "Logo et graphisme en creux",
            "finishes.uv": "UV localisée",
            "finishes.uvText": "Contraste brillant sélectif",
            "finishes.lam": "Laminage mat",
            "finishes.lamText": "Protection de surface premium douce",
            "finishes.soft": "Soft Touch",
            "finishes.softText": "Finition premium douce au toucher",
            "product.rigidTitle": "Boîtes rigides premium",
            "product.rigidText": "Boîtes de présentation haut de gamme pour le luxe, le retail et les produits de marque.",
            "product.magneticTitle": "Boîtes magnétiques",
            "product.magneticText": "Emballages pliables et rigides à fermeture magnétique pour une présentation premium.",
            "product.perfumeTitle": "Emballages parfum",
            "product.perfumeText": "Boîtes de parfum sur mesure conçues autour des dimensions du flacon et de l'identité de marque.",
            "product.cosmeticTitle": "Emballages cosmétiques",
            "product.cosmeticText": "Boîtes de marque pour les soins, la beauté et les produits cosmétiques.",
            "product.drawerTitle": "Boîtes tiroirs sur mesure",
            "product.drawerText": "Emballages coulissants conçus pour une présentation premium et le retail.",
            "product.giftTitle": "Emballages cadeaux premium",
            "product.giftText": "Boîtes de présentation luxueuses pour cadeaux et éditions spéciales.",
            "product.rigidCardText": "Formats, papiers, finitions et structures internes sur mesure.",
            "product.magneticCardText": "Boîtes magnétiques premium pour présenter des produits de luxe.",
            "product.twoPieceCardText": "Construction classique avec couvercle et base, finition sur mesure.",
            "product.perfumeCardText": "Boîtes parfum sur mesure conçues autour des dimensions du flacon.",
            "product.cosmeticCardText": "Emballages de marque pour les soins et produits de beauté.",
            "product.drawerCardText": "Élégants emballages tiroirs pour le retail premium et les cadeaux.",
            "product.giftCardText": "Boîtes de présentation luxueuses pour cadeaux et éditions spéciales.",
            "product.twoPieceTitle": "Boîtes rigides en deux parties",
            "product.twoPieceText": "Construction classique couvercle et base pour emballages retail premium.",
            "product.explore": "Découvrir →",
            "feature.structural": "Développement structurel",
            "feature.structuralText": "Les structures peuvent être développées autour des dimensions du produit, de la présentation et de la logistique.",
            "feature.material": "Sélection des matériaux",
            "feature.materialText": "Choisissez parmi carton gris, papiers spéciaux, papiers couchés, tissus, mousses et autres matériaux.",
            "feature.finishing": "Finitions premium",
            "feature.finishingText": "Dorure, gaufrage, debossing, UV localisée, laminage et autres finitions sont disponibles.",
            "feature.quality": "Contrôle qualité",
            "feature.qualityText": "Les contrôles vérifient les dimensions, matériaux, impression, finition et assemblage avant expédition.",
            "process.requirements": "Envoyer les exigences",
            "process.requirementsText": "Partagez vos dimensions, quantités, informations produit et idées d'emballage.",
            "process.quote": "Structure & devis",
            "process.quoteText": "Nous étudions le projet et recommandons les matériaux, constructions et finitions adaptés.",
            "process.sample": "Validation de l'échantillon",
            "process.sampleText": "Validez la structure, les visuels, les matériaux et la finition.",
            "process.production": "Production & contrôle",
            "process.productionText": "La production suit les spécifications approuvées avant l'expédition finale.",
            "footer.tagline": "Fabrication d'emballages sur mesure pour marques premium.",
            "footer.rigid": "Boîtes rigides",
            "footer.magnetic": "Boîtes magnétiques",
            "footer.perfume": "Emballages parfum",
            "footer.cosmetic": "Emballages cosmétiques",
            "footer.home": "Accueil",
            "footer.social": "Liens vers les réseaux sociaux",
            "footer.facebook": "Facebook",
            "footer.instagram": "Instagram",
            "footer.youtube": "YouTube",
            "footer.linkedin": "LinkedIn",
            "footer.pinterest": "Pinterest",
            "footer.twitter": "Twitter",
            "products.supportEyebrow": "03 / EMBALLAGES COMPLÉMENTAIRES",
            "products.supportTitle": "Emballages de marque sur mesure",
            "products.supportText": "Les composants d'emballage et supports imprimés peuvent être développés dans un projet complet.",
            "products.paperBags": "Sacs en papier",
            "products.paperBagsText": "Sacs pour emballages retail et cadeaux",
            "products.wrappingPaper": "Papier d'emballage",
            "products.wrappingPaperText": "Matériaux d'emballage de marque imprimés sur mesure",
            "products.customEyebrow": "PROJET SUR MESURE",
            "products.customTitle": "Vous ne trouvez pas exactement ce qu'il vous faut ?",
            "products.customText": "Indiquez les dimensions, la quantité et les exigences de votre emballage. Nous pouvons développer une solution sur mesure.",
            "products.customButton": "Parler à Metapackink →",
            "solutions.timelineProject": "Brief du projet",
            "solutions.timelineProjectText": "Envoyez les dimensions du produit, la quantité, le marché cible, les références et les exigences du projet.",
            "solutions.timelineStructural": "Développement structurel",
            "solutions.timelineStructuralText": "Nous déterminons la construction, les dimensions et les matériaux adaptés à votre projet.",
            "solutions.timelineMaterials": "Matériaux & finitions",
            "solutions.timelineMaterialsText": "Sélectionnez carton, papier, tissus, revêtements, foil, gaufrage, debossing, UV et autres finitions.",
            "solutions.timelineArtwork": "Artwork & prototype",
            "solutions.timelineArtworkText": "Validez les gabarits, visuels, construction et exigences de l'échantillon avant production.",
            "solutions.timelineProduction": "Production de masse",
            "solutions.timelineProductionText": "Les spécifications approuvées passent en production avec des contrôles qualité continus.",
            "solutions.timelineDelivery": "Inspection & livraison",
            "solutions.timelineDeliveryText": "L'emballage fini est vérifié avant conditionnement et expédition vers la destination demandée.",
            "solutions.industryFragranceText": "Boîtes de parfum conçues autour des flacons, des marques et de la présentation retail.",
            "solutions.industryBeautyText": "Emballages pour soins, cosmétiques et produits de beauté.",
            "solutions.industryJewelryText": "Boîtes premium compactes pour bijoux et accessoires.",
            "solutions.industryRetailText": "Emballages de présentation pour marques de consommation premium.",
            "solutions.industryGiftText": "Boîtes de marque pour cadeaux et collections spéciales.",
            "solutions.industryConsumerText": "Emballages sur mesure pour produits nécessitant une présentation de marque.",
            "solutions.darkEyebrow": "PRÊT À CONSTRUIRE VOTRE EMBALLAGE ?",
            "solutions.darkTitle": "Développons votre prochain projet d'emballage.",
            "solutions.darkText": "Envoyez-nous vos spécifications et nous étudierons le projet avec vous.",
            "solutions.darkButton": "Demander un devis →",
            "contact.infoEyebrow": "CONTACTER METAPACKINK",
            "contact.infoTitle": "Parlons de votre projet d'emballage.",
            "contact.infoText": "Notre équipe est prête à répondre à vos questions et à discuter de vos exigences.",
            "contact.whatsapp": "Whatsapp :",
            "contact.emailLabel": "E-mail",
            "floating.contact": "Contactez-nous",
            "floating.phone": "Téléphone",
            "floating.email": "E-mail",
            "floating.whatsapp": "WhatsApp",
            "floating.scan": "Scanner pour WhatsApp",
            "floating.qrAlt": "Scannez le code QR pour nous contacter sur WhatsApp",
            "industry.fragrance": "Parfums & fragrances",
            "industry.beauty": "Cosmétiques & beauté",
            "industry.jewelry": "Bijouterie",
            "industry.retail": "Luxe retail",
            "industry.gift": "Emballages cadeaux",
            "industry.consumer": "Produits de consommation"
        },
        de: {
            "nav.home": "Startseite",
            "nav.products": "Produkte",
            "nav.solutions": "Lösungen",
            "nav.contact": "Kontakt",
            "nav.quote": "Angebot anfragen",
            "lang.title": "Sprache",
            "lang.en": "English",
            "lang.fr": "Français",
            "lang.de": "Deutsch",
            "lang.ar": "العربية",
            "hero.eyebrow": "INDIVIDUELLE VERPACKUNGSFERTIGUNG",
            "hero.title1": "Verpackung",
            "hero.title1b": "gemacht",
            "hero.title2": "für Ihre Marke.",
            "hero.text": "Maßgeschneiderte Starreboxen, Magnetboxen, Duftverpackungen, Kosmetikverpackungen und hochwertige Präsentationsverpackungen nach Ihren Spezifikationen.",
            "hero.cta1": "Individuelles Angebot",
            "hero.cta2": "Produkte entdecken",
            "home.custom": "Individuell",
            "home.structural": "Strukturdesign",
            "home.premium": "Premium",
            "home.finishing": "Veredelungsoptionen",
            "home.qc": "QC",
            "home.quality": "Produktionskontrolle",
            "intro.eyebrow": "AUF IHR PRODUKT ZUGESCHNITTEN",
            "intro.title": "Von Verpackungsidee bis fertiges Produkt.",
            "intro.text": "Metapackink fertigt individuelle Verpackungen für Marken, die mehr als nur eine Standardbox benötigen. Von der Strukturentwicklung und Materialauswahl bis hin zu Druck, Veredelung, Montage und Qualitätskontrolle kann jedes Projekt rund um Ihr Produkt entwickelt werden.",
            "intro.link": "Entdecken Sie unsere Verpackungslösungen →",
            "products.eyebrow": "UNSERE PRODUKTE",
            "products.title": "Verpackungen für Premium-Produkte.",
            "products.view": "Alle Produkte ansehen →",
            "why.eyebrow": "WARUM METAPACKINK",
            "why.title": "Mehr als nur eine bedruckte Box.",
            "why.subtitle": "Wir helfen dabei, Verpackungsanforderungen in produktionsreife Lösungen umzuwandeln.",
            "process.eyebrow": "WIE ES FUNKTIONIERT",
            "process.title": "Ein einfacher Weg von der Idee zur Produktion.",
            "cta.eyebrow": "STARTEN SIE IHR PROJEKT",
            "cta.title": "Haben Sie eine Verpackungs-Idee?",
            "cta.text": "Sagen Sie uns, was Sie brauchen, und wir helfen Ihnen dabei, daraus eine produktionsreife Verpackungslösung zu machen.",
            "cta.button": "Angebot anfragen →",
            "footer.products": "Produkte",
            "footer.company": "Unternehmen",
            "footer.start": "Projekt starten",
            "footer.description": "Senden Sie Ihre Verpackungsanforderungen und fragen Sie ein Angebot an.",
            "footer.button": "Angebot anfragen",
            "footer.copy": "© 2026 Metapackink. Alle Rechte vorbehalten.",
            "solutions.hero": "Von Verpackungsidee",
            "solutions.hero2": "zur fertigen Produktion.",
            "solutions.eyebrow": "INDIVIDUELLE VERPACKUNGSLÖSUNGEN",
            "solutions.subtitle": "Ein kompletter Prozess für individuelle Verpackungslösungen für Marken, die Verpackungen rund um ihr Produkt, ihre Marke und ihre Produktionsanforderungen entwickeln müssen.",
            "solutions.button": "Projekt starten →",
            "solutions.process": "UNSER PROZESS",
            "solutions.processTitle": "Wie ein individuelles Verpackungsprojekt funktioniert.",
            "solutions.introEyebrow": "EIN PROJEKT / EIN ARBEITSABLAUF",
            "solutions.introTitle": "Verpackung sollte entwickelt werden, nicht nur gedruckt.",
            "solutions.introText1": "Ein erfolgreiches Verpackungsprojekt ist mehr als nur Grafik. Struktur, Karton, Papier, Veredelung, Innen-Schutz, Montage und Logistik beeinflussen das Endergebnis.",
            "solutions.introText2": "Metapackink kann diese Anforderungen rund um Ihre Produkt-Spezifikationen und Zielpräsentation koordinieren.",
            "solutions.materialsEyebrow": "MATERIALIEN",
            "solutions.materialsTitle": "Auf die richtigen Materialien zugeschnitten.",
            "solutions.finishEyebrow": "PREMIUM-VEREDLUNG",
            "solutions.finishTitle": "Damit die Verpackung zum Produkt gehört.",
            "solutions.finishText": "Veredelung kann das Aussehen, das Gefühl und die Markenkommunikation verändern.",
            "solutions.industryEyebrow": "VERPACKUNGSANWENDUNGEN",
            "solutions.industryTitle": "Lösungen für verschiedene Produktkategorien.",
            "products.pageeyebrow": "INDIVIDUELLE VERPACKUNGSPRODUKTE",
            "products.pagetitle": "Verpackung, die um Ihr Produkt entwickelt wurde.",
            "products.pageintro": "Entdecken Sie individuelle Verpackungsstrukturen für Luxus, Beauty, Duft, Einzelhandel und Premium-Konsumgüter.",
            "products.rigidEyebrow": "01 / STARRE VERPACKUNG",
            "products.rigidTitle": "Premium-Starreboxen",
            "products.rigidText": "Starreboard-Verpackungen für Produkte, die eine hochwertige Präsentation und robuste Struktur benötigen.",
            "products.requestQuote": "Angebot anfragen →",
            "products.industryEyebrow": "02 / BRANCHENVERPACKUNG",
            "products.industryTitle": "Beauty- & Duftverpackungen",
            "products.industryText": "Individuelle Verpackungen für Beauty, Pflege, Duft und Premium-Konsumgüter.",
            "products.viewSolutions": "Lösungen ansehen →",
            "contact.eyebrow": "LASSEN SIE UNS REDEN",
            "contact.title": "Sagen Sie uns, was Sie bauen.",
            "contact.text": "Rufen Sie uns an, senden Sie uns eine WhatsApp-Nachricht oder schreiben Sie uns direkt.",
            "contact.call": "Rufen Sie uns an",
            "contact.tel": "Tel :",
            "contact.email": "E-Mail senden",
            "contact.address": "Adresse",
            "contact.addressText": "Industriezone Jiangnan 2, Stadt Nancun, Bezirk Panyu, Guangzhou",
            "contact.start": "Projekt starten",
            "button.quote": "Angebot anfragen",
            "timeline.project": "Projektbrief",
            "timeline.projectText": "Senden Sie Produktmaße, Menge, Zielmarkt, Verpackungsreferenzen und Projektanforderungen.",
            "timeline.structural": "Strukturentwicklung",
            "timeline.structuralText": "Wir bestimmen die passende Konstruktionsweise, Abmessungen und Materialanforderungen für Ihr Projekt.",
            "timeline.materials": "Materialien & Veredelung",
            "timeline.materialsText": "Wählen Sie Karton, Papier, Stoffe, Beschichtungen, Folien, Prägung, Debossing, Spot-UV und andere Oberflächen.",
            "timeline.artwork": "Artwork & Prototyp",
            "timeline.artworkText": "Bestätigen Sie Schnittmuster, Artwork, Konstruktion und Prototyp-Anforderungen vor der Produktion.",
            "timeline.production": "Massenproduktion",
            "timeline.productionText": "Freigegebene Spezifikationen gehen in die Produktion mit Qualitätschecks über den ganzen Prozess.",
            "timeline.delivery": "Prüfung & Lieferung",
            "timeline.deliveryText": "Die fertige Verpackung wird vor dem Packen und Versand geprüft.",
            "materials.greyboard": "Graukarton",
            "materials.greyboardText": "Starre Boardstrukturen für hochwertige Präsentationsboxen.",
            "materials.paper": "Spezialpapier",
            "materials.paperText": "Strukturierte, beschichtete und spezielle Papiere für Markenoberflächen.",
            "materials.fabric": "Stoff & Hüllen",
            "materials.fabricText": "Stoffe, Papier und andere Umhüllungen für Premium-Boxen.",
            "materials.protective": "Schutzmaterialien",
            "materials.protectiveText": "Maßgeschneiderte Schaumstoffe, EVA und andere Schutzmaterialien.",
            "finishes.foil": "Folienprägung",
            "finishes.foilText": "Metallische und Spezialfolieffekte",
            "finishes.emboss": "Prägung",
            "finishes.embossText": "Erhobene Marken-Details",
            "finishes.deboss": "Debossing",
            "finishes.debossText": "Vertiefte Logo- und Grafikdetails",
            "finishes.uv": "Spot UV",
            "finishes.uvText": "Selektiver Glanzkontrast",
            "finishes.lam": "Mattlamination",
            "finishes.lamText": "Sanfter premium Oberflächenschutz",
            "finishes.soft": "Soft Touch",
            "finishes.softText": "Weiche Premium-Taktilfinish",
            "product.rigidTitle": "Premium-Starreboxen",
            "product.rigidText": "Hochwertige Präsentationsboxen für Luxus, Einzelhandel und Markenprodukte.",
            "product.magneticTitle": "Magnetboxen",
            "product.magneticText": "Faltbare und starre Verpackungen mit Magnetverschluss für eine Premium-Präsentation.",
            "product.perfumeTitle": "Duftverpackungen",
            "product.perfumeText": "Individuelle Duftboxen, entwickelt rund um Flaschenmaße und Markenidentität.",
            "product.cosmeticTitle": "Kosmetikverpackungen",
            "product.cosmeticText": "Markenboxen für Hautpflege, Beauty und Kosmetikprodukte.",
            "product.drawerTitle": "Individuelle Schubladenboxen",
            "product.drawerText": "Schubladenverpackungen für hochwertige Präsentation und den Einzelhandel.",
            "product.giftTitle": "Premium-Geschenkverpackungen",
            "product.giftText": "Luxuriöse Präsentationsboxen für Geschenke und Sondereditionen.",
            "product.rigidCardText": "Individuelle Größen, Papiere, Veredelungen und Innenstrukturen.",
            "product.magneticCardText": "Premium-Magnetboxen für die Präsentation von Luxusprodukten.",
            "product.twoPieceCardText": "Klassische Deckel-und-Boden-Konstruktion mit individueller Veredelung.",
            "product.perfumeCardText": "Individuelle Duftboxen rund um die Flaschenmaße.",
            "product.cosmeticCardText": "Markenverpackungen für Hautpflege und Beauty-Produkte.",
            "product.drawerCardText": "Elegante Schubladenverpackungen für Premium-Retail und Geschenke.",
            "product.giftCardText": "Luxuriöse Präsentationsboxen für Geschenke und Sondereditionen.",
            "product.twoPieceTitle": "Starre zweiteilige Boxen",
            "product.twoPieceText": "Klassische Deckel-und-Boden-Konstruktion für Premium-Retail-Verpackungen.",
            "product.explore": "Entdecken →",
            "feature.structural": "Strukturentwicklung",
            "feature.structuralText": "Verpackungsstrukturen können rund um Produktmaße, Präsentationsanforderungen und Logistik entwickelt werden.",
            "feature.material": "Materialauswahl",
            "feature.materialText": "Wählen Sie Graukarton, Spezialpapiere, beschichtete Papiere, Stoffe, Schaumstoffe und weitere Materialien.",
            "feature.finishing": "Premium-Veredelung",
            "feature.finishingText": "Folienprägung, Prägung, Debossing, Spot-UV, Laminierung und weitere Veredelungen sind möglich.",
            "feature.quality": "Qualitätskontrolle",
            "feature.qualityText": "Produktionsprüfungen kontrollieren Maße, Materialien, Druck, Veredelung und Montage vor dem Versand.",
            "process.requirements": "Anforderungen senden",
            "process.requirementsText": "Teilen Sie Maße, Menge, Produktinformationen und Verpackungsideen mit uns.",
            "process.quote": "Struktur & Angebot",
            "process.quoteText": "Wir prüfen das Projekt und empfehlen geeignete Materialien, Konstruktionen und Veredelungen.",
            "process.sample": "Musterfreigabe",
            "process.sampleText": "Bestätigen Sie Verpackungsstruktur, Artwork, Materialien und Veredelung.",
            "process.production": "Produktion & Qualitätskontrolle",
            "process.productionText": "Die Produktion folgt den freigegebenen Spezifikationen vor dem endgültigen Versand.",
            "footer.tagline": "Individuelle Verpackungsfertigung für Premium-Marken.",
            "footer.rigid": "Starre Boxen",
            "footer.magnetic": "Magnetboxen",
            "footer.perfume": "Duftverpackungen",
            "footer.cosmetic": "Kosmetikverpackungen",
            "footer.home": "Startseite",
            "footer.social": "Links zu sozialen Medien",
            "footer.facebook": "Facebook",
            "footer.instagram": "Instagram",
            "footer.youtube": "YouTube",
            "footer.linkedin": "LinkedIn",
            "footer.pinterest": "Pinterest",
            "footer.twitter": "Twitter",
            "products.supportEyebrow": "03 / ERGÄNZENDE VERPACKUNG",
            "products.supportTitle": "Individuelle Markenverpackungen",
            "products.supportText": "Verpackungskomponenten und gedruckte Begleitmaterialien können als Teil eines Gesamtprojekts entwickelt werden.",
            "products.paperBags": "Papiertüten",
            "products.paperBagsText": "Tüten für Einzelhandel und Geschenkverpackungen",
            "products.wrappingPaper": "Geschenkpapier",
            "products.wrappingPaperText": "Individuell bedruckte Markenverpackungsmaterialien",
            "products.customEyebrow": "INDIVIDUELLES PROJEKT",
            "products.customTitle": "Nicht genau das gefunden, was Sie brauchen?",
            "products.customText": "Nennen Sie uns Produktmaße, Menge und Verpackungsanforderungen. Wir entwickeln eine individuelle Lösung.",
            "products.customButton": "Mit Metapackink sprechen →",
            "solutions.timelineProject": "Projektbrief",
            "solutions.timelineProjectText": "Senden Sie Produktmaße, Menge, Zielmarkt, Verpackungsreferenzen und Projektanforderungen.",
            "solutions.timelineStructural": "Strukturentwicklung",
            "solutions.timelineStructuralText": "Wir bestimmen Konstruktion, Abmessungen und Materialanforderungen für Ihr Projekt.",
            "solutions.timelineMaterials": "Materialien & Veredelung",
            "solutions.timelineMaterialsText": "Wählen Sie Karton, Papier, Stoffe, Beschichtungen, Folie, Prägung, Debossing, Spot-UV und weitere Veredelungen.",
            "solutions.timelineArtwork": "Artwork & Prototyp",
            "solutions.timelineArtworkText": "Bestätigen Sie Schnittmuster, Artwork, Konstruktion und Musteranforderungen vor der Produktion.",
            "solutions.timelineProduction": "Massenproduktion",
            "solutions.timelineProductionText": "Freigegebene Spezifikationen werden mit laufenden Qualitätsprüfungen produziert.",
            "solutions.timelineDelivery": "Prüfung & Lieferung",
            "solutions.timelineDeliveryText": "Die fertige Verpackung wird vor Verpackung und Versand an den Zielort geprüft.",
            "solutions.industryFragranceText": "Individuelle Duftboxen für Flaschen, Marken und eine hochwertige Retail-Präsentation.",
            "solutions.industryBeautyText": "Verpackungen für Hautpflege, Kosmetik und Beauty-Produkte.",
            "solutions.industryJewelryText": "Kompakte Premium-Boxen für Schmuck und Accessoires.",
            "solutions.industryRetailText": "Präsentationsverpackungen für Premium-Konsumgütermarken.",
            "solutions.industryGiftText": "Markenboxen für Geschenke und besondere Kollektionen.",
            "solutions.industryConsumerText": "Individuelle Verpackungen für Produkte mit hochwertiger Markenpräsentation.",
            "solutions.darkEyebrow": "BEREIT, IHRE VERPACKUNG ZU ENTWICKELN?",
            "solutions.darkTitle": "Entwickeln wir Ihr nächstes Verpackungsprojekt.",
            "solutions.darkText": "Senden Sie uns Ihre Spezifikationen und wir prüfen das Projekt gemeinsam.",
            "solutions.darkButton": "Angebot anfragen →",
            "contact.infoEyebrow": "METAPACKINK KONTAKTIEREN",
            "contact.infoTitle": "Sprechen wir über Ihr Verpackungsprojekt.",
            "contact.infoText": "Unser Team beantwortet Ihre Fragen und bespricht gern Ihre individuellen Verpackungsanforderungen.",
            "contact.whatsapp": "WhatsApp :",
            "contact.emailLabel": "E-Mail",
            "floating.contact": "Kontaktieren Sie uns",
            "floating.phone": "Telefon",
            "floating.email": "E-Mail",
            "floating.whatsapp": "WhatsApp",
            "floating.scan": "Für WhatsApp scannen",
            "floating.qrAlt": "QR-Code scannen, um uns über WhatsApp zu kontaktieren",
            "industry.fragrance": "Parfüm & Duft",
            "industry.beauty": "Kosmetik & Beauty",
            "industry.jewelry": "Schmuck",
            "industry.retail": "Luxus-Einzelhandel",
            "industry.gift": "Geschenkverpackung",
            "industry.consumer": "Konsumgüter"
        },
        ar: {
            "nav.home": "الرئيسية",
            "nav.products": "المنتجات",
            "nav.solutions": "الحلول",
            "nav.contact": "التواصل",
            "nav.quote": "احصل على عرض سعر",
            "lang.title": "اللغة",
            "lang.en": "English",
            "lang.fr": "Français",
            "lang.de": "Deutsch",
            "lang.ar": "العربية",
            "hero.eyebrow": "تصنيع عبوات مخصص",
            "hero.title1": "تغليف",
            "hero.title1b": "مصمم",
            "hero.title2": "لعلامتك.",
            "hero.text": "صناديق rigid مخصصة، صناديق مغناطيسية، عبوات العطور، عبوات التجميل وعبوات العرض الفاخرة حسب مواصفاتك.",
            "hero.cta1": "احصل على عرض سعر مخصص",
            "hero.cta2": "استكشف المنتجات",
            "home.custom": "مخصص",
            "home.structural": "تصميم هيكلي",
            "home.premium": "مميز",
            "home.finishing": "خيارات التشطيب",
            "home.qc": "مراقبة",
            "home.quality": "مراقبة الإنتاج",
            "intro.eyebrow": "مصمم خصيصًا لمنتجك",
            "intro.title": "من فكرة التغليف إلى المنتج النهائي.",
            "intro.text": "تنتج Metapackink عبوات مخصصة للعلامات التجارية التي تحتاج إلى أكثر من مجرد علبة قياسية. بدءًا من تطوير الهيكل واختيار المواد، وصولاً إلى الطباعة والتشطيب والتجميع ومراقبة الجودة، يمكن تطوير كل مشروع حول منتجك.",
            "intro.link": "اكتشف حلول التغليف لدينا →",
            "products.eyebrow": "منتجاتنا",
            "products.title": "تغليف للمنتجات الفاخرة.",
            "products.view": "عرض جميع المنتجات →",
            "why.eyebrow": "لماذا Metapackink",
            "why.title": "أكثر من مجرد علبة مطبوعة.",
            "why.subtitle": "نساعدك في تحويل متطلبات التغليف إلى حلول جاهزة للإنتاج.",
            "process.eyebrow": "كيف يعمل",
            "process.title": "مسار بسيط من الفكرة إلى الإنتاج.",
            "cta.eyebrow": "ابدأ مشروعك",
            "cta.title": "هل لديك فكرة تغليف؟",
            "cta.text": "أخبرنا بما تحتاجه وسنساعدك في تحويله إلى حل تغليف جاهز للإنتاج.",
            "cta.button": "اطلب عرض سعر →",
            "footer.products": "المنتجات",
            "footer.company": "الشركة",
            "footer.start": "ابدأ مشروعًا",
            "footer.description": "أرسل متطلبات التغليف واطلب عرض سعر.",
            "footer.button": "احصل على عرض سعر",
            "footer.copy": "© 2026 Metapackink. جميع الحقوق محفوظة.",
            "solutions.hero": "من فكرة التغليف",
            "solutions.hero2": "إلى الإنتاج النهائي.",
            "solutions.eyebrow": "حلول التغليف المخصصة",
            "solutions.subtitle": "سير عمل كامل لتغليف مخصص للعلامات التجارية التي تحتاج إلى تطوير عبوات حول منتجها وعلامتها ومتطلبات الإنتاج.",
            "solutions.button": "ابدأ مشروعك →",
            "solutions.process": "عملية العمل",
            "solutions.processTitle": "كيف يعمل مشروع التغليف المخصص.",
            "solutions.introEyebrow": "مشروع واحد / تدفق عمل واحد",
            "solutions.introTitle": "يجب تصميم التغليف، وليس طباعته فقط.",
            "solutions.introText1": "يشمل مشروع التغليف الناجح أكثر من مجرد الرسومات. تؤثر البنية والورق والتشطيب والحماية الداخلية والتجميع والخدمات اللوجستية على النتيجة النهائية.",
            "solutions.introText2": "يمكن لـ Metapackink تنسيق هذه المتطلبات حول مواصفات منتجك والعرض المستهدف.",
            "solutions.materialsEyebrow": "المواد",
            "solutions.materialsTitle": "مصمم حول المواد المناسبة.",
            "solutions.finishEyebrow": "تشطيب فاخر",
            "solutions.finishTitle": "اجعل التغليف جزءًا من المنتج.",
            "solutions.finishText": "يمكن للتشطيب أن يغير مظهر التغليف وشعوره وقدرته على توصيل علامتك التجارية.",
            "solutions.industryEyebrow": "تطبيقات التغليف",
            "solutions.industryTitle": "حلول لفئات منتجات مختلفة.",
            "products.pageeyebrow": "منتجات التغليف المخصص",
            "products.pagetitle": "تغليف مصمم خصيصًا لمنتجك.",
            "products.pageintro": "اكتشف هياكل التغليف المخصصة للمنتجات الفاخرة والجمال والعطور والتجزئة والسلع الاستهلاكية المميزة.",
            "products.rigidEyebrow": "01 / تغليف صلب",
            "products.rigidTitle": "صناديق صلبة فاخرة",
            "products.rigidText": "تغليف من اللوح الصلب للمنتجات التي تتطلب عرضًا فاخرًا وبنية متينة.",
            "products.requestQuote": "اطلب عرض سعر →",
            "products.industryEyebrow": "02 / تغليف حسب الصناعة",
            "products.industryTitle": "تغليف العناية والجمال والعطور",
            "products.industryText": "تغليف مخصص مصمم للجمال والعناية والعطور والمنتجات الفاخرة.",
            "products.viewSolutions": "عرض الحلول →",
            "contact.eyebrow": "دعنا نتحدث عن التغليف",
            "contact.title": "أخبرنا ما الذي تصنعه.",
            "contact.text": "اتصل بنا أو أرسل رسالة واتساب أو اكتب إلينا مباشرة.",
            "contact.call": "اتصل بنا",
            "contact.tel": "الهاتف :",
            "contact.email": "راسلنا",
            "contact.address": "العنوان",
            "contact.addressText": "المنطقة الصناعية جيانغنان 2، بلدة نانتسون، حي بانيو، قوانغتشو",
            "contact.start": "ابدأ مشروعًا",
            "button.quote": "احصل على عرض سعر",
            "timeline.project": "نبذة المشروع",
            "timeline.projectText": "أرسل أبعاد المنتج والكمية والسوق المستهدف ومراجع التغليف ومتطلبات المشروع.",
            "timeline.structural": "تطوير الهيكل",
            "timeline.structuralText": "نحدد هيكل الصندوق المناسب والأبعاد ومتطلبات المواد المناسبة لمشروعك.",
            "timeline.materials": "المواد والتشطيب",
            "timeline.materialsText": "اختر الورق والمواد والأقمشة والأ coatings والرقائق والتخريم و UV محلي والتشطيبات الأخرى.",
            "timeline.artwork": "الرسومات والنموذج الأولي",
            "timeline.artworkText": "أكد مخططات القطع والرسومات والبنية ومتطلبات العينة الفعلية قبل الإنتاج.",
            "timeline.production": "الإنتاج الضخم",
            "timeline.productionText": "يتم تحويل المواصفات المعتمدة إلى الإنتاج مع فحوصات الجودة طوال العملية.",
            "timeline.delivery": "الفحص والتسليم",
            "timeline.deliveryText": "يتم فحص التغليف النهائي قبل التعبئة والشحن إلى الوجهة المطلوبة.",
            "materials.greyboard": "لوح رمادي",
            "materials.greyboardText": "هياكل لوح صلبة لعلب العرض الفاخرة.",
            "materials.paper": "ورق متخصص",
            "materials.paperText": "أوراق مميزة ومغطاة وخاصة للأسطح المميزة.",
            "materials.fabric": "أقمشة وأغلفة",
            "materials.fabricText": "أقمشة وأوراق ومواد تغليف أخرى لعربات فاخرة.",
            "materials.protective": "مواد حماية",
            "materials.protectiveText": "فوم مخصص، EVA وغيرها من مواد الحماية للتغليف.",
            "finishes.foil": "تغليف بالصفائح",
            "finishes.foilText": "تأثيرات فلزية ومميزة",
            "finishes.emboss": "تخريم",
            "finishes.embossText": "تفاصيل علامة تجارية بارزة",
            "finishes.deboss": "Debossing",
            "finishes.debossText": "شعار ورسومات مطبوعة مغمورة",
            "finishes.uv": "UV محلي",
            "finishes.uvText": "تباين لامع انتقائي",
            "finishes.lam": "تغليف مات",
            "finishes.lamText": "حماية سطحية فاخرة ناعمة",
            "finishes.soft": "Soft Touch",
            "finishes.softText": "تشطيب ناعم فخم للمس",
            "product.rigidTitle": "صناديق صلبة فاخرة",
            "product.rigidText": "علب عرض عالية الجودة للمنتجات الفاخرة والتجزئة والمنتجات ذات العلامات التجارية.",
            "product.magneticTitle": "صناديق مغناطيسية",
            "product.magneticText": "تغليف قابل للطي وصلب بإغلاق مغناطيسي لعرض فاخر.",
            "product.perfumeTitle": "تغليف العطور",
            "product.perfumeText": "صناديق عطور مخصصة مصممة حول أبعاد الزجاجة وهوية العلامة.",
            "product.cosmeticTitle": "تغليف مستحضرات التجميل",
            "product.cosmeticText": "علب تحمل العلامة التجارية للعناية بالبشرة والجمال ومستحضرات التجميل.",
            "product.drawerTitle": "صناديق أدراج مخصصة",
            "product.drawerText": "تغليف بنمط الدرج المنزلق للعرض الفاخر والتجزئة.",
            "product.giftTitle": "تغليف هدايا فاخر",
            "product.giftText": "علب عرض فاخرة مصممة للهدايا والإصدارات الخاصة.",
            "product.rigidCardText": "أحجام وأوراق وتشطيبات وهياكل داخلية مخصصة.",
            "product.magneticCardText": "صناديق مغناطيسية فاخرة لعرض المنتجات الراقية.",
            "product.twoPieceCardText": "هيكل كلاسيكي بغطاء وقاعدة مع تشطيب مخصص.",
            "product.perfumeCardText": "صناديق عطور مخصصة حول أبعاد الزجاجة.",
            "product.cosmeticCardText": "تغليف يحمل العلامة التجارية للعناية بالبشرة ومنتجات الجمال.",
            "product.drawerCardText": "تغليف أدراج أنيق للتجزئة الفاخرة والهدايا.",
            "product.giftCardText": "علب عرض فاخرة مصممة للهدايا والإصدارات الخاصة.",
            "product.twoPieceTitle": "صناديق صلبة من قطعتين",
            "product.twoPieceText": "هيكل كلاسيكي بغطاء وقاعدة لتغليف التجزئة الفاخر.",
            "product.explore": "استكشف →",
            "feature.structural": "تطوير الهيكل",
            "feature.structuralText": "يمكن تطوير هياكل التغليف حول أبعاد المنتج ومتطلبات العرض والخدمات اللوجستية.",
            "feature.material": "اختيار المواد",
            "feature.materialText": "اختر من اللوح الرمادي والأوراق المتخصصة والمغلفة والأقمشة والفوم ومواد التغليف الأخرى.",
            "feature.finishing": "تشطيب فاخر",
            "feature.finishingText": "تتوفر الطباعة بالرقائق والتخريم والطباعة الغائرة وSpot UV والتغليف وتشطيبات أخرى.",
            "feature.quality": "مراقبة الجودة",
            "feature.qualityText": "تساعد فحوصات الإنتاج في التحقق من الأبعاد والمواد والطباعة والتشطيب والتجميع قبل الشحن.",
            "process.requirements": "إرسال المتطلبات",
            "process.requirementsText": "شارك الأبعاد والكمية ومعلومات المنتج وأفكار التغليف.",
            "process.quote": "الهيكل وعرض السعر",
            "process.quoteText": "نراجع المشروع ونوصي بالمواد والبنية والتشطيبات المناسبة.",
            "process.sample": "اعتماد العينة",
            "process.sampleText": "أكد هيكل التغليف والرسومات والمواد والتشطيب.",
            "process.production": "الإنتاج ومراقبة الجودة",
            "process.productionText": "يتبع الإنتاج المواصفات المعتمدة قبل الشحن النهائي.",
            "footer.tagline": "تصنيع تغليف مخصص للعلامات التجارية الفاخرة.",
            "footer.rigid": "صناديق صلبة",
            "footer.magnetic": "صناديق مغناطيسية",
            "footer.perfume": "تغليف العطور",
            "footer.cosmetic": "تغليف مستحضرات التجميل",
            "footer.home": "الرئيسية",
            "footer.social": "روابط التواصل الاجتماعي",
            "footer.facebook": "فيسبوك",
            "footer.instagram": "إنستغرام",
            "footer.youtube": "يوتيوب",
            "footer.linkedin": "لينكدإن",
            "footer.pinterest": "بنترست",
            "footer.twitter": "تويتر",
            "products.supportEyebrow": "03 / التغليف الداعم",
            "products.supportTitle": "تغليف مخصص يحمل العلامة التجارية",
            "products.supportText": "يمكن تطوير مكونات التغليف والمواد المطبوعة الداعمة كجزء من مشروع تغليف متكامل.",
            "products.paperBags": "أكياس ورقية",
            "products.paperBagsText": "أكياس لتغليف التجزئة والهدايا",
            "products.wrappingPaper": "ورق تغليف",
            "products.wrappingPaperText": "مواد تغليف مطبوعة مخصصة للعلامة التجارية",
            "products.customEyebrow": "مشروع مخصص",
            "products.customTitle": "لم تجد ما تحتاجه تمامًا؟",
            "products.customText": "أخبرنا بأبعاد المنتج والكمية ومتطلبات التغليف. يمكننا تطوير حل مخصص.",
            "products.customButton": "تحدث إلى Metapackink →",
            "solutions.timelineProject": "نبذة المشروع",
            "solutions.timelineProjectText": "أرسل أبعاد المنتج والكمية والسوق المستهدف ومراجع التغليف ومتطلبات المشروع.",
            "solutions.timelineStructural": "تطوير الهيكل",
            "solutions.timelineStructuralText": "نحدد بنية الصندوق والأبعاد ومتطلبات المواد المناسبة لمشروعك.",
            "solutions.timelineMaterials": "المواد والتشطيب",
            "solutions.timelineMaterialsText": "اختر اللوح والورق والأقمشة والطلاءات والرقائق والتخريم والطباعة الغائرة وSpot UV والتشطيبات الأخرى.",
            "solutions.timelineArtwork": "الرسومات والنموذج الأولي",
            "solutions.timelineArtworkText": "أكد مخططات القطع والرسومات والبنية ومتطلبات العينة الفعلية قبل الإنتاج.",
            "solutions.timelineProduction": "الإنتاج الضخم",
            "solutions.timelineProductionText": "تنتقل المواصفات المعتمدة إلى الإنتاج مع فحوصات الجودة طوال العملية.",
            "solutions.timelineDelivery": "الفحص والتسليم",
            "solutions.timelineDeliveryText": "يتم فحص التغليف النهائي قبل التعبئة والشحن إلى الوجهة المطلوبة.",
            "solutions.industryFragranceText": "صناديق عطور مخصصة حول الزجاجات والعلامات التجارية والعرض في المتاجر.",
            "solutions.industryBeautyText": "تغليف للعناية بالبشرة ومستحضرات التجميل ومنتجات الجمال.",
            "solutions.industryJewelryText": "صناديق فاخرة صغيرة للمجوهرات والإكسسوارات.",
            "solutions.industryRetailText": "تغليف عرض للعلامات التجارية الاستهلاكية الفاخرة.",
            "solutions.industryGiftText": "علب تحمل العلامة التجارية للهدايا والمجموعات الخاصة.",
            "solutions.industryConsumerText": "تغليف مخصص للمنتجات التي تتطلب عرضًا يحمل العلامة التجارية.",
            "solutions.darkEyebrow": "هل أنت مستعد لبناء تغليفك؟",
            "solutions.darkTitle": "لنطور مشروع التغليف القادم معًا.",
            "solutions.darkText": "أرسل مواصفاتك وسنراجع المشروع معك.",
            "solutions.darkButton": "اطلب عرض سعر →",
            "contact.infoEyebrow": "تواصل مع METAPACKINK",
            "contact.infoTitle": "لنتحدث عن مشروع التغليف الخاص بك.",
            "contact.infoText": "فريقنا مستعد للإجابة عن أسئلتك ومناقشة متطلبات التغليف المخصص.",
            "contact.whatsapp": "واتساب :",
            "contact.emailLabel": "البريد الإلكتروني",
            "floating.contact": "تواصل معنا",
            "floating.phone": "الهاتف",
            "floating.email": "البريد الإلكتروني",
            "floating.whatsapp": "واتساب",
            "floating.scan": "امسح للتواصل عبر واتساب",
            "floating.qrAlt": "امسح رمز QR للتواصل معنا عبر واتساب",
            "industry.fragrance": "العطور والروائح",
            "industry.beauty": "الجمال والعناية",
            "industry.jewelry": "المجوهرات",
            "industry.retail": "تجزئة فاخرة",
            "industry.gift": "تغليف الهدايا",
            "industry.consumer": "المنتجات الاستهلاكية"
        }
    };

    const supportedLanguages = ["en", "fr", "de", "ar"];

    function applyLanguage(lang) {
        const language = supportedLanguages.includes(lang) ? lang : "en";
        const selected = translations[language];

        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

        document.querySelectorAll("[data-i18n]").forEach(function (element) {
            const key = element.dataset.i18n;

            if (selected[key]) {
                element.textContent = selected[key];
            }
        });

        document.querySelectorAll("[data-i18n-attr]").forEach(function (element) {
            element.dataset.i18nAttr.split(",").forEach(function (attributePair) {
                const parts = attributePair.split(":");
                const attribute = parts[0];
                const key = parts.slice(1).join(":");

                if (attribute && selected[key]) {
                    element.setAttribute(attribute, selected[key]);
                }
            });
        });

        const current = document.querySelector(".lang-current");
        if (current) {
            current.textContent = language.toUpperCase();
        }

        document.querySelectorAll(".lang-option").forEach(function (button) {
            const isActive = button.dataset.lang === language;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        localStorage.setItem("metapackink-language", language);
    }

    const legacyNav = document.querySelector(".legacy-nav");

    if (legacyNav && !legacyNav.querySelector(".legacy-controls")) {
        const legacyLogo = legacyNav.querySelector(".logo");
        if (legacyLogo) {
            legacyLogo.innerHTML = "<span>META</span>PACKINK";
            legacyLogo.setAttribute("aria-label", "Home");
        }

        const contactPath = window.location.pathname.includes("/industries/")
            ? "../contact.html"
            : "contact.html";

        legacyNav.insertAdjacentHTML("beforeend", `
            <div class="legacy-controls">
                <div class="lang-switcher" aria-label="Language switcher">
                    <button type="button" class="lang-toggle" aria-expanded="false" aria-label="Select language">
                        <span class="lang-current">EN</span>
                    </button>
                    <div class="lang-menu" role="menu">
                        <button type="button" class="lang-option is-active" data-lang="en" aria-pressed="true">English</button>
                        <button type="button" class="lang-option" data-lang="fr" aria-pressed="false">Français</button>
                        <button type="button" class="lang-option" data-lang="de" aria-pressed="false">Deutsch</button>
                        <button type="button" class="lang-option" data-lang="ar" aria-pressed="false">العربية</button>
                    </div>
                </div>
                <a href="${contactPath}" class="nav-btn">Get a Quote</a>
            </div>
        `);
    }

    const langSwitcher = document.querySelector(".lang-switcher");

    if (langSwitcher) {
        const toggle = langSwitcher.querySelector(".lang-toggle");
        const options = langSwitcher.querySelectorAll(".lang-option");

        toggle.addEventListener("click", function () {
            langSwitcher.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(langSwitcher.classList.contains("open")));
        });

        options.forEach(function (button) {
            button.addEventListener("click", function () {
                const selected = button.dataset.lang;
                applyLanguage(selected);
                langSwitcher.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", function (event) {
            if (!langSwitcher.contains(event.target)) {
                langSwitcher.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    const savedLanguage = localStorage.getItem("metapackink-language");
    applyLanguage(savedLanguage || "en");


    /*
    --------------------------------
    CONTACT FORM
    --------------------------------
    */

    const form = document.getElementById("quoteForm");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const message =
                document.getElementById("formMessage");

            const name =
                form.querySelector('[name="name"]').value;

            const email =
                form.querySelector('[name="email"]').value;

            const details =
                form.querySelector('[name="message"]').value;


            if (!name || !email || !details) {

                message.style.color = "#d33";

                message.textContent =
                    "Please complete the required fields.";

                return;

            }


            /*
            --------------------------------
            MAILTO FALLBACK
            --------------------------------
            Replace the email address below
            with your real sales email.
            --------------------------------
            */

            const company =
                form.querySelector('[name="company"]').value;

            const phone =
                form.querySelector('[name="phone"]').value;

            const packaging =
                form.querySelector('[name="packaging"]').value;

            const quantity =
                form.querySelector('[name="quantity"]').value;

            const date =
                form.querySelector('[name="date"]').value;


            const subject =
                encodeURIComponent(
                    "New Metapackink Packaging Inquiry"
                );


            const body =
                encodeURIComponent(

                    "Name: " + name + "\n" +
                    "Company: " + company + "\n" +
                    "Email: " + email + "\n" +
                    "Phone: " + phone + "\n" +
                    "Packaging: " + packaging + "\n" +
                    "Quantity: " + quantity + "\n" +
                    "Target Date: " + date + "\n\n" +
                    "Project Details:\n" +
                    details

                );


            window.location.href =
                "mailto:sales@metapackink.com" +
                "?subject=" +
                subject +
                "&body=" +
                body;


            message.style.color = "#e87522";

            message.textContent =
                "Your email client is opening. Thank you for contacting Metapackink.";

        });

    }


    /*
    --------------------------------
    HEADER SCROLL EFFECT
    --------------------------------
    */

    const header =
        document.querySelector(".site-header");


    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 20) {

                header.style.boxShadow =
                    "0 8px 30px rgba(0,0,0,.06)";

            } else {

                header.style.boxShadow =
                    "none";

            }

        });

    }


    /*
    --------------------------------
    SCROLL REVEALS
    --------------------------------
    */

    const revealItems = document.querySelectorAll(
        ".intro-section, .section-heading, .page-hero > .container, .solution-hero > .container, .contact-hero > .container, .contact-info, .contact-form-wrapper, .contact-card, .dark-cta > .container, .category-heading, .timeline-item, .finishing-grid, .industry-grid"
    );

    const staggerItems = document.querySelectorAll(
        ".product-grid, .feature-grid, .process-grid, .catalog-grid, .material-grid, .footer-grid"
    );

    revealItems.forEach(function (item) {
        item.classList.add("reveal");
    });

    staggerItems.forEach(function (item) {
        item.classList.add("reveal-stagger");
    });

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries, revealObserver) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);

                }

            });

        }, { threshold:0.12, rootMargin:"0px 0px -40px" });

        document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (item) {
            observer.observe(item);
        });

    } else {

        document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (item) {
            item.classList.add("is-visible");
        });

    }


    /*
    --------------------------------
    SMOOTH INTERNAL LINKS
    --------------------------------
    */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


});