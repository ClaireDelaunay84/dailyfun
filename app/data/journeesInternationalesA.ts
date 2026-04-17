type JourneeInternationale = {
    nom: string
    description: string
}

export const journeesA: Record<string, JourneeInternationale[]> = {
    "01-01": [
        { nom: "Journée mondiale de la paix", description: "Instaurée par l'ONU en 1981, cette journée invite tous les peuples à célébrer la paix. C'est aussi le jour où le monde entier fait des résolutions... qu'il oublie en moyenne au bout de 12 jours !" },
        { nom: "Jour de l'An", description: "Le 1er janvier est férié dans 90 pays. Les Romains célébraient Janus, dieu des commencements, en s'offrant des dattes et du miel. Notre réveillon moderne est finalement assez raisonnable en comparaison !" },
    ],
    "01-02": [
        { nom: "Journée internationale de la science-fiction", description: "La science-fiction a prédit Internet, les tablettes tactiles et les oreillettes Bluetooth. Jules Verne et H.G. Wells étaient de sérieux futurologues déguisés en romanciers !" },
        { nom: "Journée nationale du calendrier", description: "Le calendrier grégorien fut adopté en 1582 par le pape Grégoire XIII. L'Angleterre le refusa jusqu'en 1752 — créant 11 jours de décalage avec le reste de l'Europe. Un chaos administratif d'anthologie !" },
    ],
    "01-03": [
        { nom: "Journée mondiale du chocolat noir", description: "Le chocolat noir contient plus d'antioxydants que les myrtilles. Les Mayas l'utilisaient comme monnaie — imaginez payer votre loyer en tablettes de chocolat. Un rêve devenu réalité 3 000 ans trop tôt !" },
        { nom: "Journée mondiale du jeu de société", description: "Les jeux de société existent depuis 5 000 ans. Le Senet égyptien est le plus ancien jeu connu. Aujourd'hui, 3 milliards de personnes jouent aux jeux de société — et les disputes en famille pendant les fêtes restent un classique !" },
    ],
    "01-04": [
        { nom: "Journée mondiale du braille", description: "Louis Braille inventa son système à 15 ans seulement, en 1824. Aujourd'hui, le braille est utilisé dans plus de 133 langues. Un adolescent a littéralement changé la vie de millions de personnes dans le monde entier !" },
        { nom: "Journée nationale du spaghetti", description: "Les Italiens consomment 23 kg de pâtes par personne par an. Marco Polo n'a PAS ramené les pâtes de Chine : elles existaient déjà en Italie avant son voyage. Un mythe culinaire aussi tenace que faux !" },
    ],
    "01-05": [
        { nom: "Journée nationale de la bière artisanale", description: "Il existe plus de 10 000 brasseries artisanales dans le monde. La bière est la 3e boisson la plus consommée sur Terre après l'eau et le thé. Les anciens Égyptiens la considéraient comme un médicament et la prescrivaient pour plus de 100 maux !" },
        { nom: "Journée mondiale des oiseaux", description: "Il y a 200 à 400 milliards d'oiseaux sur Terre, soit environ 50 oiseaux par être humain. Le martinet peut voler 10 mois sans jamais se poser, dormant et mangeant en plein vol. L'ultime voyageur nomade !" },
    ],
    "01-06": [
        { nom: "Journée de l'Épiphanie", description: "L'Épiphanie célèbre les Rois Mages. La galette des Rois génère 30 millions de parts vendues en France chaque année ! La fève en porcelaine est apparue au XIXe siècle — avant, c'était vraiment une fève sèche !" },
        { nom: "Journée mondiale des jeux de société (bis)", description: "Le Monopoly fut inventé en 1935 pendant la Grande Dépression. Ironie : un jeu sur la spéculation immobilière né de la misère. La partie la plus longue de l'histoire dura 70 jours sans interruption !" },
    ],
    "01-07": [
        { nom: "Journée mondiale du dessin animé", description: "Le premier dessin animé projeté publiquement date de 1906. Pixar emploie des physiciens, des biologistes et des chimistes pour rendre ses films réalistes. La science au service de l'imagination !" },
        { nom: "Journée nationale de la crêpe", description: "Les Français consomment 2 milliards de crêpes par an. La recette de la pâte à crêpes date du XIIIe siècle en Bretagne. La règle d'or : tenir une pièce dans la main gauche en faisant sauter la crêpe pour attirer la fortune !" },
    ],
    "01-08": [
        { nom: "Journée nationale de l'huile d'olive", description: "L'huile d'olive existe depuis 6 000 ans. La Grèce est le premier consommateur mondial par habitant avec 15 litres par an. Hippocrate la prescrivait pour plus de 60 maladies — et la science moderne lui donne raison !" },
        { nom: "Journée mondiale de la géographie", description: "Google Maps a parcouru plus de 16 millions de km de routes dans le monde — 400 fois le tour de la Terre. La première carte du monde connue fut dessinée en Babylonie il y a 6 200 ans sur une tablette d'argile !" },
    ],
    "01-09": [
        { nom: "Journée mondiale du jeu vidéo", description: "L'industrie du jeu vidéo pèse plus que le cinéma et la musique réunis : 200 milliards de dollars par an. Le premier jeu vidéo fut créé en 1958 par un physicien nucléaire américain pour divertir des visiteurs d'un laboratoire !" },
        { nom: "Journée nationale du chocolat au lait", description: "Le chocolat au lait fut inventé par Henri Nestlé en 1875. Les Suisses sont les plus grands consommateurs de chocolat avec 10 kg par personne par an, soit l'équivalent de 100 tablettes !" },
    ],
    "01-10": [
        { nom: "Journée mondiale du rire", description: "Rire 100 fois équivaut à 15 minutes de vélo selon les cardiologues. Les bébés rient 300 fois par jour, les adultes seulement 15 fois. Que s'est-il passé entre les deux ?!" },
        { nom: "Journée nationale du fromage fondu", description: "La fondue savoyarde a été inventée pour utiliser les fromages durcis en hiver. La Suisse consomme 22 kg de fromage par habitant par an. Si vous laissez tomber votre pain, vous devez embrasser votre voisin !" },
    ],
    "01-11": [
        { nom: "Journée internationale du merci", description: "Dire merci libère de la sérotonine aussi bien chez celui qui le dit que chez celui qui le reçoit. Les Français disent merci en moyenne 5 fois par jour — les Canadiens 8 fois. Il y a une marge de progression !" },
        { nom: "Journée mondiale des épices", description: "La Route des Épices du XVe siècle a changé le monde entier. La muscade valait autrefois son poids en or. Aujourd'hui, la France importe 50 000 tonnes d'épices par an — un héritage des grandes explorations !" },
    ],
    "01-12": [
        { nom: "Journée nationale du café au lait", description: "Le café est la 2e marchandise la plus échangée au monde après le pétrole. En France, on consomme 5,5 kg de café par personne par an. Ce sont des chèvres éthiopiennes qui auraient découvert les effets stimulants du café !" },
        { nom: "Journée internationale de la méditation", description: "8 semaines de méditation quotidienne (20 min/jour) suffisent pour modifier physiquement la structure du cerveau. Les moines bouddhistes tibétains ont un niveau de conscience mesuré 80 fois supérieur à la moyenne !" },
    ],
    "01-13": [
        { nom: "Journée nationale du chat", description: "Il y a 600 millions de chats domestiques dans le monde. Les chats ronronnent à une fréquence de 25 à 150 Hz, ce qui accélère la guérison des os. Votre chat vous soigne peut-être à votre insu !" },
        { nom: "Journée mondiale de l'avion en papier", description: "Le record du monde de distance pour un avion en papier est de 88,4 mètres. Un aérodynamicien de la NASA a consacré 30 ans à perfectionner les avions en papier. Passion ou vocation ?" },
    ],
    "01-14": [
        { nom: "Journée internationale du câlin", description: "Un câlin de plus de 20 secondes libère de l'ocytocine, l'hormone de l'attachement. Les médecins prescrivent des câlins thérapeutiques dans certains hôpitaux. Il est recommandé d'en avoir au moins 8 par jour pour s'épanouir !" },
        { nom: "Journée nationale de la moutarde", description: "La moutarde est le condiment le plus vendu au monde après le sel. Dijon produit 80% de la moutarde française, mais aujourd'hui avec des graines canadiennes. Une tradition locale devenue internationale !" },
    ],
    "01-15": [
        { nom: "Journée mondiale de la neige", description: "Chaque flocon de neige est unique et possède une symétrie hexagonale parfaite. En une heure de chute de neige modérée, il tombe 7,6 milliards de flocons par km². L'infiniment petit au service du spectacle !" },
        { nom: "Journée internationale de l'art", description: "Le plus vieux dessin connu date de 73 000 ans, trouvé en Afrique du Sud. Léonard de Vinci peignait avec les deux mains simultanément. La Joconde reçoit environ 15 000 visiteurs par jour !" },
    ],
    "01-16": [
        { nom: "Journée nationale du beurre de cacahuète", description: "Les Américains consomment 700 millions de livres de beurre de cacahuète par an. Un pot de 340g contient environ 540 cacahuètes. La loi américaine impose que le beurre de cacahuète contienne au minimum 90% de cacahuètes !" },
        { nom: "Journée mondiale de l'espoir", description: "Les personnes optimistes vivent en moyenne 7 ans de plus. La psychologie positive a démontré que l'espoir se cultive comme n'importe quelle compétence. Le cerveau ne distingue pas toujours un souvenir d'une anticipation positive !" },
    ],
    "01-17": [
        { nom: "Journée mondiale du tatouage", description: "1 Français sur 5 est tatoué. Les plus vieilles preuves de tatouages remontent à 5 300 ans sur Ötzi, l'homme des glaces. Ses tatouages étaient positionnés sur des points d'acupuncture — peut-être à des fins thérapeutiques !" },
        { nom: "Journée nationale du sandwich", description: "Le comte de Sandwich aurait inventé le sandwich pour manger sans quitter sa table de jeu. Les Américains mangent 50 milliards de sandwichs par an. Le sandwich le plus cher du monde coûte 170€ et contient du jambon ibérique et de la truffe !" },
    ],
    "01-18": [
        { nom: "Journée mondiale des grenouilles", description: "Les grenouilles existent depuis 265 millions d'années et ont survécu à l'extinction des dinosaures ! Il en existe 7 000 espèces. Certaines grenouilles survivent congelées en hiver et reprennent vie au printemps !" },
        { nom: "Journée nationale de la soupe", description: "La soupe est l'un des premiers plats cuisinés de l'humanité, datant de 25 000 ans. Le mot 'restaurant' vient du français 'restaurer' : les premiers restaurants parisiens servaient uniquement des bouillons revigorants !" },
    ],
    "01-19": [
        { nom: "Journée nationale du pop-corn", description: "Les Américains consomment 17 milliards de litres de popcorn par an. Le maïs à popcorn est une variété spécifique — tous les maïs n'éclatent pas. Les Indiens d'Amérique utilisaient le popcorn comme décoration depuis 5 600 ans !" },
        { nom: "Journée mondiale de la cuisine locale", description: "Il existe plus de 50 000 variétés comestibles de plantes dans le monde, mais l'humanité n'en consomme régulièrement que 200. La cuisine locale préserve à la fois la biodiversité et les savoirs ancestraux !" },
    ],
    "01-20": [
        { nom: "Journée de la conscience", description: "Chaque personne a entre 6 000 et 60 000 pensées par jour. 80% de nos pensées seraient négatives et 95% seraient les mêmes que la veille. La méditation de pleine conscience peut vraiment changer ce schéma !" },
        { nom: "Journée mondiale du fromage", description: "La France produit plus de 1 200 variétés de fromage. Charles de Gaulle disait : 'Comment voulez-vous gouverner un pays qui a 246 variétés de fromage ?' Il sous-estimait largement le chiffre !" },
    ],
    "01-21": [
        { nom: "Journée internationale des câlins (International Hug Day)", description: "Les câlins réduisent la pression artérielle, le stress et renforcent le système immunitaire. Il est recommandé d'avoir au moins 4 câlins par jour pour survivre, 8 pour se maintenir et 12 pour grandir !" },
        { nom: "Journée nationale du fromage grillé", description: "Le croque-monsieur est apparu sur les menus parisiens en 1910. Avec un œuf dessus, il devient croque-madame — personne ne sait exactement pourquoi c'est le nom féminin. Un mystère culinaire !" },
    ],
    "01-22": [
        { nom: "Journée internationale de l'éducation", description: "260 millions d'enfants dans le monde n'ont pas accès à l'école. Un an d'éducation supplémentaire augmente les revenus d'une personne de 10% en moyenne. La Finlande, championne de l'éducation, ne commence l'école primaire qu'à 7 ans !" },
        { nom: "Journée nationale du yaourt", description: "Les Bulgares ont la plus forte concentration de centenaires au monde — et ils attribuent ça au yaourt. Les bactéries lactiques du yaourt ont d'ailleurs été baptisées Lactobacillus bulgaricus en honneur de la Bulgarie !" },
    ],
    "01-23": [
        { nom: "Journée nationale de la tarte au citron meringuée", description: "La meringue fut inventée par un pâtissier suisse en 1720. La tarte au citron meringuée telle qu'on la connaît date du XIXe siècle américain. En France, c'est l'un des desserts préférés avec 73% d'avis favorables !" },
        { nom: "Journée mondiale de la lecture à voix haute", description: "Lire à voix haute à un enfant 20 minutes par jour lui fait entendre 1,8 million de mots supplémentaires par an. Les personnes qui lisent régulièrement ont un risque réduit de 32% de développer la maladie d'Alzheimer !" },
    ],
    "01-24": [
        { nom: "Journée internationale de l'éducation", description: "L'UNESCO rappelle que l'éducation transforme des vies. La Finlande, championne mondiale de l'éducation, a des enseignants aussi bien considérés que des médecins. Valoriser les profs, c'est investir dans l'avenir !" },
        { nom: "Journée nationale des esquimaux glacés", description: "La glace enrobée de chocolat fut inventée en 1920 par un épicier américain qui cherchait à calmer les larmes d'un enfant incapable de choisir entre chocolat et glace. Une invention née d'une indécision enfantine !" },
    ],
    "01-25": [
        { nom: "Journée nationale de la crème brûlée", description: "La crème brûlée apparaît pour la première fois dans un livre de cuisine français en 1691. La flamme caramélise le sucre en quelques secondes. Le terme 'brûlée' fait référence à la technique, pas à une erreur culinaire !" },
        { nom: "Journée mondiale du ski de fond", description: "La Norvège compte plus de skis de fond que d'habitants ! Le ski de fond est le sport olympique qui brûle le plus de calories : jusqu'à 1 200 calories par heure. Les Norvégiens emmènent leurs bébés skier dès 1 an !" },
    ],
    "01-26": [
        { nom: "Journée internationale des douanes", description: "Chaque jour, les douaniers du monde traitent 55 millions de colis. Les douanes existent depuis l'Antiquité : les Romains taxaient les marchandises aux portes des villes. Le mot 'douane' vient de l'arabe 'diwan' (registre) !" },
        { nom: "Journée mondiale de la pistache", description: "La pistache est l'un des aliments les plus riches en protéines végétales. L'Iran produit 50% des pistaches mondiales. La pistache est l'un des premiers aliments cultivés par l'humanité — depuis 7 000 ans !" },
    ],
    "01-27": [
        { nom: "Journée internationale de commémoration de la Shoah", description: "En souvenir des victimes de la Shoah, cette journée rappelle l'horreur du génocide nazi et incite à l'éducation contre toutes les formes de discrimination. 'Celui qui oublie le passé est condamné à le revivre.'" },
        { nom: "Journée mondiale du chocolat blanc", description: "Techniquement, le chocolat blanc n'est pas du chocolat car il ne contient pas de cacao solide, seulement du beurre de cacao. Il fut créé par Nestlé en 1930 pour écouler l'excédent de beurre de cacao. Un beau détournement culinaire !" },
    ],
    "01-28": [
        { nom: "Journée mondiale de la protection des données personnelles", description: "Chaque jour, 2,5 quintillions d'octets de données sont créés. Facebook connaît en moyenne 5 000 points de données sur chaque utilisateur. Le RGPD européen est considéré comme la législation la plus protectrice au monde !" },
        { nom: "Journée nationale du puzzle", description: "Le premier puzzle fut créé en 1760 par un cartographe anglais qui découpait des cartes pour enseigner la géographie. Le puzzle le plus grand du monde comporte 551 232 pièces. Un projet de quelques années !" },
    ],
    "01-29": [
        { nom: "Journée nationale de la fondue au fromage", description: "La fondue est née de la nécessité : les Suisses devaient utiliser leur fromage durci en hiver. Aujourd'hui, la Suisse exporte 73 000 tonnes de fromage par an. Règle absolue : ne jamais souffler sur le fromage fondu !" },
        { nom: "Journée mondiale de la danse africaine", description: "L'Afrique compte plus de 1 000 formes de danses traditionnelles différentes. La danse est au cœur des rituels, des célébrations et de la transmission culturelle en Afrique. Le continent qui danse le plus !" },
    ],
    "01-30": [
        { nom: "Journée mondiale des lépreux", description: "La lèpre touche encore 200 000 personnes par an mais est pourtant guérissable en quelques semaines avec des antibiotiques. 95% des humains sont naturellement immunisés contre la lèpre sans le savoir !" },
        { nom: "Journée nationale du muffin anglais", description: "Le muffin anglais (plat et poché) n'a rien à voir avec le muffin américain (moelleux et sucré). Thomas' English Muffins vend 1 milliard de muffins par an aux États-Unis depuis 1880. Deux nations séparées par la même langue !" },
    ],
    "01-31": [
        { nom: "Journée à l'envers", description: "Le 31 janvier, toutes les heures du matin sont des palindromes ! 1:01, 2:02, 3:03... Les palindromes existent depuis l'Antiquité : les Romains gravaient 'SATOR AREPO TENET OPERA ROTAS' qui se lit dans tous les sens !" },
        { nom: "Journée mondiale de l'abandon des résolutions", description: "Statistiquement, 80% des résolutions du Nouvel An sont abandonnées avant le 31 janvier. La science montre que les micro-habitudes de 2 minutes par jour réussissent mieux que les grands changements. Reprenez dès demain !" },
    ],
    "02-01": [
        { nom: "Journée mondiale de la liberté de la presse", description: "3 journalistes sont tués chaque mois dans le monde. La Finlande, la Norvège et le Danemark occupent les 3 premières places de liberté de la presse. L'information libre est le fondement de la démocratie !" },
        { nom: "Journée nationale du beurre de cacahuète et chocolat", description: "L'alliance beurre de cacahuète et chocolat est une invention américaine de 1928. Reese's Peanut Butter Cups est la confiserie la plus vendue aux États-Unis depuis 1963. La combinaison salé-sucré active simultanément deux zones du cerveau !" },
    ],
    "02-02": [
        { nom: "Journée mondiale des zones humides", description: "Les zones humides abritent 40% de toutes les espèces vivantes. Elles filtrent naturellement l'eau et stockent 2 fois plus de carbone que les forêts. Pourtant elles disparaissent 3 fois plus vite que les forêts !" },
        { nom: "Jour de la marmotte", description: "Si la marmotte Phil voit son ombre le 2 février, 6 semaines d'hiver ! Cette tradition vient d'Allemagne. Phil a un taux de réussite de 39% — une pièce de monnaie ferait mieux. Mais c'est bien plus amusant !" },
    ],
    "02-03": [
        { nom: "Journée mondiale du dessin", description: "Un enfant de 5 ans dessine en moyenne 20 fois par jour. À 20 ans, plus personne ne dessine spontanément. Les dessins rupestres les plus anciens ont 40 000 ans — nos ancêtres étaient des artistes avant d'être des bâtisseurs !" },
        { nom: "Journée nationale de la soupe de tomate", description: "Andy Warhol a peint la boîte de soupe Campbell's en 1962, transformant un produit du quotidien en icône de l'art. La soupe de tomate était prescrite comme remède contre la dyspepsie au XIXe siècle !" },
    ],
    "02-04": [
        { nom: "Journée mondiale contre le cancer", description: "Chaque année, 10 millions de personnes meurent d'un cancer. Mais depuis 1990, le taux de mortalité a baissé de 33% dans les pays développés grâce aux avancées médicales. La recherche progresse à une vitesse incroyable !" },
        { nom: "Journée mondiale du collier de fleurs hawaïen", description: "Au Hawaï, offrir un lei (collier de fleurs) est le geste d'accueil le plus universel. Il faut 50 à 80 fleurs pour un seul lei. La tradition polynésienne remonte à 2 000 ans et symbolise l'aloha : amour, paix et compassion !" },
    ],
    "02-05": [
        { nom: "Journée nationale du Nutella", description: "1,8 million de pots de Nutella sont vendus chaque jour dans le monde. Sa fabrication utilise 25% de la production mondiale de noisettes. Si on alignait tous les pots vendus en un an, on ferait 5 fois le tour de la Terre !" },
        { nom: "Journée mondiale de la reconnaissance du visage", description: "Votre cerveau reconnaît un visage familier en 100 millisecondes — plus vite que vous ne clignez des yeux. Nous sommes la seule espèce capable de reconnaître des visages dans des objets inanimés (nuages, toasts, façades) !" },
    ],
    "02-06": [
        { nom: "Journée mondiale du jeu de go", description: "Le go est le jeu de stratégie le plus complexe jamais inventé — plus que les échecs. Il y a plus de configurations possibles au go que d'atomes dans l'univers observable. AlphaGo d'IA a battu le champion mondial en 2016 !" },
        { nom: "Journée nationale du Saganaki (fromage flambé)", description: "Le saganaki grec est du fromage frit ou flambé. Dans les restaurants grecs américains, le fromage est flambé en criant 'Opa !' — une tradition inventée... à Chicago en 1968. La diaspora enrichit la culture !" },
    ],
    "02-07": [
        { nom: "Journée mondiale du ballet", description: "Louis XIV était un danseur étoile avant d'être roi ! Il dansa dans 40 ballets et créa la première académie de danse en 1661. Les danseurs de l'Opéra de Paris passent plus de 8 heures par jour en entraînement !" },
        { nom: "Journée nationale de la lentille", description: "Les lentilles sont cultivées depuis 11 000 ans — parmi les premières plantes domestiquées. Elles contiennent plus de protéines que la viande par gramme et produisent 50 fois moins de CO2 pour la même quantité de protéines !" },
    ],
    "02-08": [
        { nom: "Journée mondiale de l'harmonica", description: "L'harmonica est le seul instrument de musique fabriqué pour quelques euros et maîtrisable en quelques heures... mais dont la maîtrise complète prend toute une vie. Il en existe 14 types différents. Un instrument humble et profond !" },
        { nom: "Journée nationale du pain perdu (French Toast)", description: "Le pain perdu existe depuis l'Empire romain ! Il est appelé 'French Toast' en Amérique mais les Français l'appellent 'pain perdu'. Les Américains ont renommé plein de plats avec 'French' pour leur donner du prestige !" },
    ],
    "02-09": [
        { nom: "Journée nationale de la pizza", description: "Les Italiens consomment 1,6 million de pizzas par jour. La pizza a été inventée à Naples au XVIIIe siècle pour nourrir les pauvres. La pizza la plus chère du monde (12 000€) est garnie de homard, caviar et truffes blanches !" },
        { nom: "Journée mondiale du dentiste", description: "Les Égyptiens se brossaient les dents avec des branches effilées il y a 5 000 ans. La brosse à dents moderne fut inventée en 1938. Un enfant américain visite son dentiste en moyenne 2 fois par an — un adulte français 1,2 fois !" },
    ],
    "02-10": [
        { nom: "Journée mondiale des légumineuses", description: "Les légumineuses (lentilles, pois chiches, haricots) nourrissent 2 milliards de personnes. Elles fixent l'azote dans le sol, réduisant le besoin d'engrais. Un hectare de soja produit 5x plus de protéines qu'un hectare d'élevage bovin !" },
        { nom: "Journée nationale du bagel", description: "Le bagel est né dans les communautés juives de Pologne au XVIIe siècle. New York en consomme 1 million par jour ! La règle du vrai bagel : il doit être bouilli avant d'être cuit — c'est ça qui lui donne sa croûte brillante !" },
    ],
    "02-11": [
        { nom: "Journée internationale des femmes et des filles de science", description: "Seulement 30% des chercheurs dans le monde sont des femmes. Marie Curie reste la seule personne à avoir reçu deux Prix Nobel dans deux disciplines différentes. Cette journée inspire les jeunes filles à choisir des carrières scientifiques !" },
        { nom: "Journée mondiale du malade", description: "Cette journée instaurée par Jean-Paul II en 1992 invite à penser à ceux qui souffrent. La médecine moderne a éradiqué plus de 50 maladies mortelles depuis 1900. La variole est la première maladie officiellement éradiquée en 1980 !" },
    ],
    "02-12": [
        { nom: "Journée mondiale de l'évolution — Darwin Day", description: "Charles Darwin publia 'L'Origine des espèces' en 1859 — tous les exemplaires du premier tirage furent vendus le jour même ! Ses idées rencontrèrent une telle résistance qu'il attendit 20 ans avant de les publier !" },
        { nom: "Journée nationale du caramel au beurre salé", description: "Le caramel au beurre salé breton fut inventé par Henri Le Roux en 1977 à Quiberon. Il remporta le titre de 'meilleur bonbon de France' dès 1980. Depuis, c'est devenu une obsession mondiale et une fierté bretonne !" },
    ],
    "02-13": [
        { nom: "Journée mondiale de la radio", description: "La radio touche 95% de la population mondiale et reste le média le plus accessible. En cas de catastrophe, c'est toujours la radio qui survit en dernier. La première transmission radio eut lieu en 1895 par Guglielmo Marconi !" },
        { nom: "Journée nationale du chocolat fondu", description: "La fondue au chocolat fut inventée en Suisse dans les années 1950. Elle crée du lien social : on partage le même pot, on rit quand quelqu'un perd son fruit. Le chocolat fondu libère autant d'endorphines qu'un baiser !" },
    ],
    "02-14": [
        { nom: "Saint Valentin — Journée des amoureux", description: "La Saint-Valentin génère 2 milliards de cartes envoyées chaque année. Les Américains dépensent en moyenne 190€ pour la Saint-Valentin. Le symbole ❤️ représenterait les graines de silphium, une plante contraceptive de l'Antiquité !" },
        { nom: "Journée mondiale des bonbons en forme de cœur", description: "Les Sweethearts (bonbons aux messages) sont fabriqués depuis 1866 ! Ils vendent 8 milliards de pièces pour la Saint-Valentin. Les messages ont évolué : 'Text Me' et 'Tweet Me' ont remplacé 'Be Mine' dans les éditions modernes !" },
    ],
    "02-15": [
        { nom: "Journée mondiale contre le cancer de l'enfant", description: "400 000 enfants développent un cancer chaque année. Dans les pays développés, le taux de guérison atteint 80% — mais dans les pays pauvres, il est inférieur à 20%. L'accès aux soins reste une injustice mondiale !" },
        { nom: "Journée nationale du gâteau au chocolat", description: "La recette du fondant au chocolat fut créée par accident en 1987 par un chef qui sortit ses gâteaux du four trop tôt. Un raté transformé en chef-d'œuvre culinaire. Vive les erreurs créatives !" },
    ],
    "02-16": [
        { nom: "Journée mondiale du chat", description: "Les chats dorment 12 à 16 heures par jour. Ils ont 32 muscles dans chaque oreille et peuvent les tourner à 180°. Le ronronnement du chat (25-50 Hz) peut scientifiquement accélérer la guérison des fractures osseuses !" },
        { nom: "Journée nationale des crêpes aux myrtilles", description: "La myrtille est l'un des seuls aliments naturellement bleus. Elle contient des anthocyanes qui améliorent la mémoire selon plusieurs études. Les Amérindiens l'utilisaient pour teindre leurs vêtements et conserver la viande !" },
    ],
    "02-17": [
        { nom: "Journée nationale des ailes de poulet (Chicken Wings Day)", description: "Les Buffalo Wings furent inventées en 1964 à Buffalo, New York, par accident — la cuisinière avait commandé des ailes à la place des dos. Les Américains mangent 1,4 milliard d'ailes pendant le Super Bowl !" },
        { nom: "Journée mondiale de la bienveillance au travail", description: "Les employés qui ont un ami proche au travail sont 7 fois plus engagés selon Gallup. Un simple 'merci' sincère augmente la productivité de 50%. La bienveillance n'est pas un luxe, c'est une stratégie gagnante !" },
    ],
    "02-18": [
        { nom: "Journée mondiale du recyclage", description: "Recycler une canette d'aluminium économise assez d'énergie pour alimenter une télé pendant 3 heures. Les Allemands sont champions du monde du recyclage avec 66% des déchets recyclés. La France recycle 65% de son verre !" },
        { nom: "Journée nationale du tiramisu", description: "Le tiramisu (littéralement 'tire-moi vers le haut') a été inventé dans les années 1960 en Vénétie. Il n'y a pas d'accord sur la recette originale — chaque famille vénitienne a 'la vraie recette'. C'est le dessert le plus commandé en Europe !" },
    ],
    "02-19": [
        { nom: "Journée mondiale de la baleine et du dauphin", description: "Les baleines bleues sont les plus grands animaux ayant jamais existé — plus grands que les dinosaures. Leur cœur pèse 180 kg et bat 4 fois par minute. Elles communiquent par des chants qui voyagent sur des milliers de km !" },
        { nom: "Journée nationale des macarons", description: "Le macaron parisien tel qu'on le connaît fut créé par la maison Ladurée en 1930. Sa vraie difficulté : obtenir le 'pied' parfait, cette petite collerette qui se forme à la base. Un défi de pâtissier !" },
    ],
    "02-20": [
        { nom: "Journée mondiale de la justice sociale", description: "L'ONU appelle à lutter contre la pauvreté et les inégalités. Aujourd'hui, 1% de la population mondiale possède plus de richesses que les 99% restants. Pourtant, la pauvreté extrême a été divisée par 4 depuis 1990 !" },
        { nom: "Journée nationale du pain aux bananes", description: "Le banana bread connut son heure de gloire lors du confinement de 2020 — c'est le plat le plus cuisiné de la pandémie. La recette parfaite nécessite des bananes très mûres : plus elles sont noires, plus elles sont sucrées !" },
    ],
    "02-21": [
        { nom: "Journée internationale de la langue maternelle", description: "6 000 langues sont parlées dans le monde, mais une disparaît toutes les deux semaines. Le français est la seule langue avec l'anglais enseignée dans chaque pays du monde. Parler deux langues retarde Alzheimer de 4 ans en moyenne !" },
        { nom: "Journée mondiale du guide touristique", description: "Les premiers guides touristiques professionnels apparurent à Paris en 1855 lors de l'Exposition Universelle. Aujourd'hui, le Lonely Planet est le guide le plus lu au monde avec 120 millions d'exemplaires vendus !" },
    ],
    "02-22": [
        { nom: "Journée mondiale du chat (officielle)", description: "Un chat qui cligne lentement des yeux vers vous vous fait un 'bisou de chat' — clignez en retour pour communiquer votre affection ! Les chats font plus de 100 sons différents ; les chiens seulement 10 !" },
        { nom: "Journée nationale du gâteau au citron", description: "Le citron est arrivé en Europe via les Croisades au XIIe siècle. Le zeste de citron contient 5 à 10 fois plus de vitamine C que le jus. La tarte au citron meringuée est l'un des desserts préférés des Français !" },
    ],
    "02-23": [
        { nom: "Journée mondiale du tennis de table", description: "Le ping-pong fut inventé en Angleterre en 1880 avec des bouchons de champagne en guise de balles ! La Chine remporte 60% des médailles olympiques en tennis de table depuis 30 ans. La balle se déplace jusqu'à 170 km/h !" },
        { nom: "Journée nationale du biscuit", description: "Les Romains inventèrent le biscuit comme nourriture de voyage — cuit deux fois (bis-cuit) pour être conservé longtemps. Les Anglais exportèrent le biscuit au monde entier avec leur empire. La France produit 380 000 tonnes de biscuits par an !" },
    ],
    "02-24": [
        { nom: "Journée nationale du fromage", description: "La France compte 1 200 fromages différents. L'AOP protège 45 fromages français. Le camembert fut inventé en 1791 par Marie Harel, une paysanne normande — pas par un moine comme la légende le dit !" },
        { nom: "Journée mondiale de la solidarité", description: "En France, 22 millions de bénévoles font vivre 1,3 million d'associations. Les recherches montrent que faire du bénévolat rend plus heureux que recevoir des cadeaux. La générosité est un investissement personnel !" },
    ],
    "02-25": [
        { nom: "Journée nationale de la noix de coco", description: "La noix de coco est techniquement un fruit, une noix ET une graine. Elle peut flotter des milliers de km avant de germer. Son eau est si proche du plasma sanguin qu'elle fut utilisée en transfusion d'urgence pendant la Seconde Guerre mondiale !" },
        { nom: "Journée mondiale de la coopération internationale", description: "La Station Spatiale Internationale est l'exemple ultime de coopération : 15 pays collaborent dans l'espace depuis 1998. L'ISS a coûté 150 milliards de dollars — l'investissement scientifique collaboratif le plus cher de l'histoire !" },
    ],
    "02-26": [
        { nom: "Journée mondiale de la plongée sous-marine", description: "Les océans couvrent 71% de la Terre mais 95% restent inexplorés. La plongée autonome fut inventée par Jacques Cousteau en 1943. Les abysses abritent peut-être plus d'espèces inconnues que toutes les forêts tropicales réunies !" },
        { nom: "Journée nationale du pistou", description: "Le pistou provençal est le cousin du pesto génois — même base (basilic, ail, huile d'olive) mais sans pignons ni fromage. La rivalité culinaire franco-italienne dure depuis des siècles. Les deux sont délicieux !" },
    ],
    "02-27": [
        { nom: "Journée mondiale de l'ours polaire", description: "Il reste seulement 20 000 à 25 000 ours polaires dans le monde. Leur fourrure n'est pas blanche mais transparente — c'est l'effet optique qui la rend blanche. Ils peuvent nager 320 km sans s'arrêter !" },
        { nom: "Journée nationale du praliné", description: "Le praliné fut inventé par le cuisinier du maréchal du Plessis-Praslin en 1630 pour séduire la cour de Louis XIV. La technique : caraméliser des amandes. Aujourd'hui la Belgique est championne mondiale de la pralinerie !" },
    ],
    "02-28": [
        { nom: "Journée internationale des maladies rares", description: "Il existe 7 000 maladies rares touchant 300 millions de personnes. Une maladie est dite 'rare' quand elle touche moins d'1 personne sur 2 000. 80% sont d'origine génétique et 75% apparaissent avant l'âge de 5 ans !" },
        { nom: "Journée nationale du croissant au beurre", description: "Le croissant n'est pas français mais viennois — créé en 1683 pour célébrer la victoire contre les Ottomans. La France l'a adopté et perfectionné avec du beurre AOP. Un vrai croissant au beurre contient... beaucoup de beurre !" },
    ],
    "02-29": [
        { nom: "Journée des Bissextiles !", description: "Le 29 février n'existe que tous les 4 ans. Les personnes nées ce jour (les 'leaplings') fêtent officiellement leur anniversaire le 28 février ou le 1er mars les autres années. Il y a environ 5 millions de leaplings dans le monde !" },
        { nom: "Journée mondiale de la rareté", description: "Le 29 février est le jour le plus rare du calendrier. La tradition irlandaise dit que c'est le seul jour où une femme peut demander un homme en mariage. Si l'homme refuse, il doit offrir 12 paires de gants pour cacher l'absence de bague !" },
    ],
    "03-01": [
        { nom: "Journée nationale du champignon", description: "Il existe plus d'1,5 million d'espèces de champignons sur Terre. Les champignons sont plus proches de l'animal que de la plante. Le plus grand organisme vivant sur Terre est un champignon en Oregon qui couvre 9 km² !" },
        { nom: "Journée mondiale du zéro déchet", description: "Le mouvement zéro déchet a débuté en 2008. Béa Johnson, Française vivant aux États-Unis, vit avec toute sa famille avec seulement un litre de déchets par an. En France, chaque habitant produit 570 kg de déchets par an !" },
    ],
    "03-02": [
        { nom: "Journée mondiale de l'ouïe", description: "1,5 milliard de personnes vivent avec une perte auditive. La cause principale chez les jeunes ? Écouter de la musique trop fort avec des écouteurs. Les chauves-souris entendent des fréquences 20 fois supérieures à l'oreille humaine !" },
        { nom: "Journée nationale du banana split", description: "Le banana split fut inventé en 1904 par un apprenti pharmacien de 23 ans à Latrobe, Pennsylvanie. Il le vendit 10 centimes. La ville organise encore une fête annuelle du banana split chaque été !" },
    ],
    "03-03": [
        { nom: "Journée mondiale de la faune et flore sauvage", description: "Un million d'espèces sont menacées d'extinction. Pourtant, on découvre encore 15 000 nouvelles espèces par an. Les requins existent depuis 450 millions d'années — ils ont survécu aux 5 extinctions de masse de la Terre !" },
        { nom: "Journée mondiale de l'audition", description: "Saviez-vous que les oiseaux peuvent entendre des sons deux fois plus vite que les humains ? C'est pourquoi leurs chants nous semblent si rapides quand on les enregistre et ralentit. La nature entend différemment !" },
    ],
    "03-04": [
        { nom: "Journée mondiale de l'ingénierie pour le développement durable", description: "Les ingénieurs ont créé les 7 merveilles du monde moderne dont Internet. Mais seulement 20% des ingénieurs travaillent sur des défis humanitaires. Cette journée encourage à mettre la technique au service de l'humanité !" },
        { nom: "Journée nationale du gratin dauphinois", description: "Le gratin dauphinois doit son nom au Dauphiné (Isère). La recette originale de 1788 ne contenait ni fromage ni crème — juste des pommes de terre et du lait. La version gratinée est une 'amélioration' du XXe siècle !" },
    ],
    "03-05": [
        { nom: "Journée nationale du fromage de chèvre", description: "La France produit 50% du fromage de chèvre européen. Le crottin de Chavignol (38g seulement) est l'un des fromages les plus primés du monde. Les chèvres furent les premiers animaux domestiqués pour leur lait, il y a 10 000 ans !" },
        { nom: "Journée mondiale des mathématiques", description: "Les mathématiques sont le seul domaine où on peut prouver qu'une chose est vraie avec certitude absolue. Il existe des problèmes mathématiques non résolus depuis des siècles, avec un million de dollars à la clé pour celui qui les résoudra !" },
    ],
    "03-06": [
        { nom: "Journée mondiale du dentifrice", description: "Les anciens Égyptiens utilisaient un mélange de sel, poivre, iris et menthe comme dentifrice il y a 4 000 ans. Le tube de dentifrice fut inventé en 1892. Le fluor a réduit de 50% les caries depuis les années 1960 !" },
        { nom: "Journée nationale de l'Oreo", description: "L'Oreo est le biscuit le plus vendu au monde depuis 1912. Les Américains achètent 40 milliards d'Oreos par an. La méthode scientifiquement validée : tourner, lécher, tremper — dans cet ordre précis !" },
    ],
    "03-07": [
        { nom: "Journée mondiale de la plante", description: "Il existe 390 000 espèces de plantes connues sur Terre. La plante la plus grande du monde est une posidonie en Australie : 200 km² et 200 000 ans d'âge. Les plantes couvrent 80% de la biomasse terrestre !" },
        { nom: "Journée nationale du crumble aux pommes", description: "Le crumble fut inventé en Grande-Bretagne pendant la Seconde Guerre mondiale par manque de farine pour faire des tartes. La recette simplifiée devint un symbole de créativité sous rationnement. Aujourd'hui c'est le dessert préféré des Britanniques !" },
    ],
    "03-08": [
        { nom: "Journée internationale des droits des femmes", description: "Les femmes représentent 50% de l'humanité mais seulement 25% des parlementaires mondiaux. À travail égal, les femmes gagnent encore en moyenne 16% de moins. L'égalité économique globale est estimée à... 2186 selon le Forum Économique Mondial !" },
        { nom: "Journée mondiale de la mimosa", description: "En Italie, la mimosa est le symbole des femmes le 8 mars depuis 1946. Elle fut choisie car elle fleurit tôt, résiste au froid et pousse partout — comme les femmes qui s'imposent malgré les obstacles !" },
    ],
    "03-09": [
        { nom: "Journée nationale du sandwich au bacon", description: "Le bacon est l'aliment le plus cité dans les études sur le bonheur olfactif. L'odeur du bacon grillé vient de la réaction de Maillard — la même que pour le pain grillé ou le café. 65% des chefs américains le classent comme ingrédient favori !" },
        { nom: "Journée mondiale des reins", description: "Nos deux reins filtrent 180 litres de sang par jour et ne pèsent que 150g chacun. Les reins peuvent perdre 75% de leur capacité sans provoquer de symptômes. Boire suffisamment d'eau est le meilleur cadeau qu'on puisse leur faire !" },
    ],
    "03-10": [
        { nom: "Journée nationale de Mario (Mario Day)", description: "MAR10 ressemble à MARIO ! Ce jour célèbre le célèbre plombier créé par Shigeru Miyamoto en 1981. Mario est le personnage de jeu vidéo le plus reconnu au monde. Sa profession fut choisie car les niveaux se passaient dans des tuyaux !" },
        { nom: "Journée mondiale des femmes ingénieures", description: "Hedy Lamarr, star de Hollywood des années 40, inventa la technologie à la base du WiFi et du Bluetooth. Ada Lovelace écrivit le premier algorithme informatique en 1842. Les femmes ont toujours fait avancer la tech !" },
    ],
    "03-11": [
        { nom: "Journée mondiale de la rondelle (Ring Day)", description: "Le beignet ring (donut) fut popularisé en France lors des foires médiévales sous forme de bugnes. L'anneau central existe pour que la pâte cuise uniformément — c'est fonctionnel, pas décoratif. La physique de la friture !" },
        { nom: "Journée internationale des mathématiques (prélude au Pi Day)", description: "Demain c'est le Pi Day (3/14 en format américain) ! π est irrationnel et transcendant. Les superordinateurs ont calculé π à 100 000 milliards de décimales. Pourtant 39 décimales suffisent pour calculer la taille de l'univers !" },
    ],
    "03-12": [
        { nom: "Journée mondiale du rein", description: "Les reins font partie des organes les plus sophistiqués : ils ajustent leur travail à la seconde près selon votre activité. Donner un rein de son vivant est possible — et le rein restant compense entièrement en quelques semaines !" },
        { nom: "Journée nationale du café irlandais", description: "L'Irish Coffee fut inventé en 1943 par un chef d'aéroport irlandais pour réchauffer des passagers américains dont l'avion faisait demi-tour à cause du mauvais temps. Un remède météorologique devenu classique mondial !" },
    ],
    "03-13": [
        { nom: "Journée mondiale de la sieste", description: "Winston Churchill disait qu'il accomplissait deux journées de travail grâce à sa sieste quotidienne. Les Japonais pratiquent l'Inemuri : dormir en réunion est signe de travail acharné, pas de paresse. Une sieste de 20 min améliore la vigilance de 54% !" },
        { nom: "Journée nationale des confitures", description: "La confiture fut inventée comme méthode de conservation avant le sucre raffiné — on utilisait du miel. En France, on produit 160 000 tonnes de confitures par an. La recette légale française impose minimum 45% de fruits !" },
    ],
    "03-14": [
        { nom: "Journée internationale des mathématiques — Pi Day !", description: "Le 14 mars c'est le Pi Day : 3,14 ! Albert Einstein est né un 14 mars 1879. Stephen Hawking est mort un 14 mars 2018. Le cosmos aime les coïncidences mathématiques !" },
        { nom: "Journée nationale des pommes de terre", description: "Antoine Parmentier fit planter des pommes de terre à Versailles sous garde armée pour les rendre désirables. Le stratagème fonctionna — les gens les volaient ! Un coup marketing royal pour un légume révolutionnaire !" },
    ],
    "03-15": [
        { nom: "Journée mondiale des droits des consommateurs", description: "Initiée par JF Kennedy en 1962, cette journée rappelle le droit de chaque consommateur à être protégé. En Europe, vous avez 14 jours pour retourner n'importe quel achat en ligne sans justification. Un droit conquis de haute lutte !" },
        { nom: "Journée mondiale de l'électricité statique", description: "L'électricité statique peut atteindre 35 000 volts — sans vous tuer car l'intensité est infime. La foudre, elle, atteint 1 milliard de volts. Benjamin Franklin fut le premier à comprendre leur lien en 1752 avec son cerf-volant !" },
    ],
    "03-16": [
        { nom: "Journée nationale de l'artichaut", description: "L'artichaut est une fleur de chardon cultivée depuis 2 500 ans. Catherine de Médicis l'introduisit en France au XVIe siècle. Il contient des substances qui améliorent la santé du foie. Son cœur (le fond) est la partie la plus noble !" },
        { nom: "Journée mondiale de la samba", description: "La samba est née au Brésil au XIXe siècle, fusion des musiques africaines et européennes. Le carnaval de Rio est le plus grand spectacle du monde avec 2 millions de participants par jour. La samba brûle 400 calories par heure !" },
    ],
    "03-17": [
        { nom: "Journée mondiale du sommeil", description: "Un tiers des Français souffrent de troubles du sommeil. Pendant la nuit, votre cerveau évacue les toxines accumulées dans la journée — c'est comme un lave-cerveau ! Les girafes dorment moins de 2 heures par nuit !" },
        { nom: "Saint Patrick", description: "Saint Patrick n'était pas irlandais mais gallois. La bière verte de la Saint-Patrick fut inventée aux États-Unis en 1914. La parade de New York attire 2 millions de personnes. Il y a plus d'Irlando-Américains que d'Irlandais en Irlande !" },
    ],
    "03-18": [
        { nom: "Journée mondiale du recyclage (Global Recycling Day)", description: "Recycler une tonne de papier sauve 17 arbres et économise 26 000 litres d'eau. Les Coréens recyclent 95% de leurs emballages alimentaires. La France a recyclé 70% de son verre en 2022 — un record national !" },
        { nom: "Journée nationale de la vodka", description: "La vodka est la liqueur la plus vendue au monde. La Russie et la Pologne se disputent son invention depuis des siècles. Le mot 'vodka' vient du slave 'voda' (eau). En Russie, le vin fut longtemps appelé 'eau de vie étrangère' !" },
    ],
    "03-19": [
        { nom: "Journée nationale du pop-corn au beurre", description: "Le popcorn au beurre au cinéma est une invention américaine des années 1930 — les cinémas le vendaient pour survivre à la Grande Dépression ! Le beurre ajouté transforme le maïs soufflé sain en plaisir coupable. Aucun regret !" },
        { nom: "Journée mondiale de l'artisanat", description: "L'artisanat représente le 2e employeur mondial après l'agriculture. En France, 1,5 million d'artisans font vivre ce secteur. Les métiers d'art comme la haute joaillerie et la tapisserie sont inscrits au patrimoine immatériel de l'UNESCO !" },
    ],
    "03-20": [
        { nom: "Journée internationale du bonheur", description: "L'ONU reconnaît le bonheur comme objectif fondamental de l'humanité depuis 2012. La Finlande est classée 1ère nation la plus heureuse pour la 6e année consécutive. Leur secret ? Sauna, forêt, café et ne pas forcer la conversation !" },
        { nom: "Journée mondiale de la Francophonie", description: "Le français est parlé par 320 millions de personnes dans 90 pays. C'est la seule langue avec l'anglais enseignée dans chaque pays du monde. D'ici 2065, le français pourrait être la 1ère langue la plus parlée au monde !" },
    ],
    "03-21": [
        { nom: "Journée internationale des forêts", description: "Les forêts couvrent 31% de la surface terrestre et abritent 80% de la biodiversité. Chaque minute, 40 terrains de football de forêt disparaissent. Un seul arbre adulte produit assez d'oxygène pour 4 personnes par an !" },
        { nom: "Journée mondiale de la poésie", description: "La poésie est la forme d'art la plus ancienne — antérieure à l'écriture. Les aèdes grecs récitaient l'Iliade de mémoire (24 000 vers !). Aujourd'hui, la poésie slam connaît un renouveau extraordinaire chez les jeunes !" },
    ],
    "03-22": [
        { nom: "Journée mondiale de l'eau", description: "2,2 milliards de personnes n'ont pas accès à l'eau potable. Un humain peut survivre 3 semaines sans manger mais seulement 3 jours sans eau. Pourtant 70% de l'eau douce mondiale est utilisée par l'agriculture intensive !" },
        { nom: "Journée nationale de la limonade rose", description: "La limonade rose fut inventée par accident en 1857 dans un cirque américain quand de la limonade se mélangea avec l'eau de rinçage des chaussettes roses d'une performeuse. Le public adora. L'accidentologie culinaire en action !" },
    ],
    "03-23": [
        { nom: "Journée météorologique mondiale", description: "La météo influence 70% de l'économie mondiale. Une prévision à 7 jours est aujourd'hui aussi fiable qu'une prévision à 3 jours en 1990. Les super-calculateurs météo traitent 1 000 milliards d'opérations par seconde !" },
        { nom: "Journée nationale de la gaufre", description: "Les gaufres existent depuis le Moyen Âge — les moines les vendaient devant les cathédrales lors des fêtes. La gaufre de Liège et la gaufre de Bruxelles sont deux mondes : les deux camps ne s'accordent sur rien, sauf que c'est délicieux !" },
    ],
    "03-24": [
        { nom: "Journée mondiale de la tuberculose", description: "La tuberculose tue encore 1,6 million de personnes par an, malgré un vaccin existant depuis 1921. Elle est soignée par un traitement de 6 mois d'antibiotiques. Chopin, Kafka et Keats en sont morts — elle inspirait une pâleur romantique à l'époque !" },
        { nom: "Journée nationale de la raclette", description: "Les Français consomment 19 000 tonnes de raclette par an. La raclette (gratter en suisse-allemand) était le repas des bergers alpins qui faisaient fondre leur fromage au feu de camp. Un repas de bergère devenu tradition nationale !" },
    ],
    "03-25": [
        { nom: "Journée internationale de la commémoration de l'esclavage", description: "La traite transatlantique a arraché 12,5 millions d'Africains à leur continent. Haïti fut la 1ère République noire libre en 1804 après une révolution d'esclaves. Cette journée rappelle l'importance de la mémoire pour construire un avenir juste !" },
        { nom: "Journée mondiale de l'odeur des livres (Bibliophile Day)", description: "L'odeur des vieux livres a un nom scientifique : bibliomie. Elle est causée par la décomposition du papier. 79% des lecteurs affirment que l'odeur d'un livre est aussi importante que le texte lui-même !" },
    ],
    "03-26": [
        {
            nom: "Journée des épinard",
            description: "Il y a 3 fois plus de fer dans les gaufrettes au chocolat que dans les épinards"
        },
        {
            nom: "Hier c'était la journée de la procrastination !",
            description: "Donc si vous l'avez remise à aujourd'hui, profitez-en, c'est encore libre...!"
        },
    ],
    "03-27": [
        {
            nom: "Journée mondiale du théâtre",
            description: "Assister à une représentation au festival d'Avignon coûte 2,2 fois moins cher qu'une place pour un match de Ligue 1"
        },
        {
            nom: "Journée nationale du fromage",
            description: "Un Français consomme en moyenne 27 kg de fromage par an — soit 2,5 fois plus que la moyenne mondiale, faisant de la France le 1er pays consommateur per capita au monde. 🥇🇫🇷"
        },
    ],
    "03-28": [
        {
            nom: "Journée des mauvaises herbes",
            description: "Le pissenlit que vous arrachez de votre jardin contient 3 fois plus de vitamine C qu'une laitue achetée en supermarché — et plus de calcium que le lait. 🥛❌ Ce qu'on appelle mauvaise herbe n'existe pas en botanique : c'est purement une invention humaine. 🧑‍🌾"
        },
        {
            nom: "Journée mondiale du Big Bang",
            description: "Le terme Big Bang a été inventé en 1949 par un scientifique qui n'y croyait pas — Fred Hoyle l'a utilisé à la radio britannique pour se moquer de la théorie. 😂 Le nom est resté, mais pas lui : il a eu le prix Nobel... pour une autre découverte. 🏆"
        },
    ],
    "03-29": [
        {
            nom: "Journée internationale des nuages",
            description: "Il existe officiellement 102 types de nuages répertoriés par l'Organisation Météorologique Mondiale — et le dernier, l'\"asperitas\", n'a été ajouté à la liste qu'en 2017, après une campagne menée par... un club de passionnés de nuages britanniques. 🇬🇧🔭"
        },
        {
            nom: "Journée du tour de passe-passe",
            description: "Harry Houdini était si célèbre que son nom est entré dans le dictionnaire anglais — \"to houdini\" signifie s'échapper d'une situation impossible — et il réalisait ses tours les plus dangereux avec une côte cassée, sans jamais le dire au public. 🪄🤫"
        },
    ],
    "03-30": [
        {
            nom: "Journée Mondiale des troubles bipolaires",
            description: "La journée mondiale des troubles bipolaires est célébrée le 30 mars, jour de naissance de Vincent van Gogh — artiste dont le diagnostic posthume de trouble bipolaire est aujourd'hui reconnu par la majorité des psychiatres, et qui a peint 900 tableaux en seulement 10 ans. 🎨"
        },
        {
            nom: "Journée des médecins",
            description: "Le caducée, symbole universel de la médecine, est en réalité une erreur historique — le bâton ailé aux deux serpents est le symbole d'Hermès, dieu des marchands et des voleurs, alors que le vrai symbole médical est le bâton d'Asclépios, avec un seul serpent. 🐍"
        },
    ],
    "03-31": [
        {
            nom: "Journée Internationale de la visibilité Trans",
            description: "La journée de la visibilité trans existe depuis 2009 seulement, fondée par l'activiste Rachel Crandall — alors que les Hijras, communauté trans d'Inde, sont officiellement reconnues par l'État indien depuis plus de 4 000 ans, ce qui en fait l'une des plus anciennes reconnaissances institutionnelles au monde. 🌏"
        },
        {
            nom: "Journée Mondiale de la sauvegarde des données informatiques",
            description: "La journée mondiale de la sauvegarde des données est célébrée le 31 mars — la veille du 1er avril — car ses fondateurs estimaient qu'il fallait être un sacré idiot pour perdre toutes ses données le lendemain. 😂 Et pourtant, 30% des gens n'ont jamais fait de sauvegarde de leur vie."
        },
    ],
    "04-01": [
        {
            nom: "1er avril",
            description: "Le \"poisson d'avril\" vient du XVIe siècle — quand le roi Charles IX décala le Nouvel An du 1er avril au 1er janvier, les gens qui n'étaient pas au courant continuaient d'offrir des cadeaux en avril et se faisaient coller un poisson dans le dos pour se moquer d'eux. 😂"
        },
        {
            nom: "Journée Internationale de la blague",
            description: "En 1957, la BBC diffusa un documentaire sérieux sur la récolte des spaghettis dans les arbres en Suisse — des milliers de téléspectateurs appelèrent la chaîne pour demander où acheter un plant de spaghetti, ce qui reste à ce jour le canular télévisé le plus célèbre de l'histoire. 🌳🍝"
        },
    ],
    "04-02": [
        {
            nom: "Journée Mondiale de la sensibilisation à l'autisme",
            description: "Alan Turing, considéré comme le père de l'informatique moderne, était très probablement autiste — et c'est précisément sa façon de penser \"hors des schémas neurotypiques\" qui lui a permis de déchiffrer Enigma, sauvant selon les historiens entre 14 et 21 millions de vies pendant la Seconde Guerre Mondiale. 💻"
        },
        {
            nom: "Journée internationale des livres pour enfants",
            description: "\"Harry Potter à l'école des sorciers\" a été refusé par 12 éditeurs avant d'être publié — aujourd'hui c'est le livre pour enfants le plus vendu de l'histoire avec plus de 500 millions d'exemplaires, et J.K. Rowling était au chômage et mère célibataire quand elle l'a écrit. 🪄✨"
        },
        {
            nom: "Journée Mondiale de batailles d'oreillers",
            description: "Il existe un Championnat du Monde de Batailles d'Oreillers organisé chaque année au Japon depuis 2013 — avec des règles strictes, des arbitres officiels et des équipes nationales, et la France y a participé en se faisant éliminer dès les quarts de finale. 😴🏆"
        },
    ],
    "04-03": [
        {
            nom: "Journée mondiale de la fête",
            description: "Après une aventure d'un soir, 4 hommes sur 5 affirment en garder un bon souvenir... A l'inverse, près de la moitié des femmes intrrogées le regrette.🥳"
        },
    ],
    "04-04": [
        {
            nom: "Journée internationale de sensibilisation aux mines antipersonnel",
            description: "Il reste encore 110 millions de mines antipersonnel enfouies dans le sol de 60 pays — et une mine coûte entre 3 et 30 dollars à fabriquer, mais entre 300 et 1 000 dollars à déminer, ce qui signifie que détruire l'arsenal mondial coûterait 50 fois plus cher que de l'avoir fabriqué. 😔🌍"
        },
        {
            nom: "Journée Mondiale du travail invisible",
            description: "Le travail domestique non rémunéré — cuisine, ménage, soin des enfants — représente 10 700 milliards de dollars par an dans le monde selon l'OIT, soit 13% du PIB mondial, et il est assuré à 76% par des femmes. 👩‍🍳📊"
        },
    ],
    "04-05": [
        {
            nom: "Journée internationale de la conscience",
            description: "Les scientifiques ne savent toujours pas pourquoi nous sommes conscients — c'est ce qu'on appelle le \"problème difficile de la conscience\", formulé en 1995, et c'est l'une des rares questions où la philosophie et la neuroscience s'avouent toutes les deux vaincues. 🤯 Nous pouvons cartographier chaque neurone du cerveau sans expliquer pourquoi il y a quelqu'un \"à l'intérieur\". 👁️"
        },
        {
            nom: "Journée de l'entretien des tombes",
            description: "En France, la part de crémations a fortement augmenter en 30 ans. 1% en 1979 contre 34% en 2013.🪦"
        },
        {
            nom: "Journée Nationale du Syndrome du bébé sécoué",
            description: "Le syndrome du bébé secoué est la première cause de mortalité par maltraitance chez les moins de 2 ans en France — et dans 80% des cas, il survient non pas par intention de nuire, mais parce que le parent ne savait pas que secouer un bébé quelques secondes pouvait causer des lésions cérébrales irréversibles. 💔"
        },
    ],
    "04-06": [
        {
            nom: "Journée mondiale du sport pour le développement et la paix",
            description: "En 1969, une guerre de 4 jours éclata entre le Honduras et le Salvador — surnommée la \"Guerre du Football\" — déclenchée après un match de qualification pour la Coupe du Monde, prouvant que le sport peut, dans les deux sens, faire et défaire la paix. 🕊️😬"
        },
    ],
    "04-07": [
        {
            nom: "Journée mondiale de la santé",
            description: "En France, plus de 2 hôpitaux universitaires sur 3 pratiquent l'hypnose médicale.😪🏥"
        },
        {
            nom: "Internationale de réflexion sur le génocide de 1994 au Rwanda",
            description: "En 100 jours, entre avril et juillet 1994, environ 800 000 personnes ont été tuées au Rwanda — soit un rythme 5 fois plus rapide que celui des chambres à gaz nazies — pendant que la communauté internationale, pourtant informée, choisissait officiellement de ne pas utiliser le mot \"génocide\" pour éviter d'avoir à intervenir. 🌍💔"
        },
    ],
    "04-08": [
        {
            nom: "Journée Internationale des Roms",
            description: "Les Roms sont originaires du nord-ouest de l'Inde — ce n'est pas une légende, c'est prouvé génétiquement et linguistiquement depuis les années 80 — et leur langue, le romani, partage 60% de son vocabulaire avec le hindi. Pourtant, après 1 000 ans de migration en Europe, ils restent le peuple le plus discriminé du continent selon l'Agence des droits fondamentaux de l'UE. 🌍"
        },
        {
            nom: "Journée Nationale des ambulanciers",
            description: "Les ambulanciers français parcourent en moyenne 45 000 km par an — soit plus d'un tour de la Terre — et sont pourtant rémunérés en moyenne 200€ de moins par mois que la moyenne nationale, faisant d'eux l'un des métiers les plus essentiels et les moins reconnus financièrement du secteur médical. 💙"
        },
    ],
    "04-09": [
        {
            nom: "Journée des objets connectés",
            description: "L'occasion de mettre en lumière toutes ces technologies du quotidien qui simplifient nos vies : montres intelligentes, enceintes connectées, capteurs, et bien plus encore. Une journée pour explorer, découvrir et s'émerveiller de l'univers de l'IoT (Internet of Things) 🌐✨"
        },
        {
            nom: "Journée mondiale de la licorne",
            description: "Cette créature magique et colorée est devenue bien plus qu'un mythe : elle symbolise la créativité, la singularité et la magie du possible ✨ Alors laissez parler votre imagination et embrassez votre côté unique… après tout, tout le monde a une licorne qui sommeille en soi 🌈💫"
        },
    ],
    "04-10": [
        {
            nom: "Journée internationale des frères et sœurs",
            description: "Une belle occasion de célébrer ces liens uniques, faits de complicité, de souvenirs partagés… et parfois de quelques chamailleries 😄 Alors n'hésitez pas à envoyer un petit message à votre frère ou votre sœur pour leur dire combien ils comptent pour vous ❤️🤝" },
        { nom:
                "Journée du golfeur",
            description: "Aujourd'hui, on rend hommage aux passionnés du green à l'occasion de la Journée du Golfeur ! Que vous soyez un pro du swing ou un débutant encore en quête de votre premier birdie, cette journée est faite pour vous 🏌️ Alors sortez vos clubs, profitez du grand air et savourez chaque coup… même ceux qui finissent dans le rough 😄🌿" },
    ],
    "04-11": [
        {
            nom: "Journée mondiale de la maladie de Parkinson",
            description: "Aujourd'hui, le 11 avril, est dédié à la Journée Mondiale de la Maladie de Parkinson, symbolisée par la tulipe rouge 🔴 Cette journée est l'occasion de sensibiliser le grand public à cette maladie neurologique qui touche des millions de personnes dans le monde, et de soutenir les patients, leurs proches et les soignants qui les accompagnent au quotidien. Ensemble, continuons à soutenir la recherche pour un avenir sans Parkinson 💙" },
    ],
    "04-12": [
        {
            nom: "Journée internationale du vol spatial habité",
            description: "Aujourd'hui, on célèbre la Journée Internationale du Vol Spatial Habité ! Une date qui nous rappelle l'incroyable exploit de Youri Gagarine, premier homme à avoir voyagé dans l'espace le 12 avril 1961 🌍✨ L'occasion de lever les yeux vers les étoiles et de saluer tous ces astronautes qui repoussent les frontières de l'humanité, là où peu d'êtres humains ont osé aller 👨‍🚀🌌" },
        {
            nom: "Journée des enfants des rues",
            description: "Aujourd'hui, la Journée des Enfants des Rues nous invite à ne pas détourner le regard sur une réalité qui touche des millions d'enfants à travers le monde, privés d'abri, d'éducation et de protection 💛 Cette journée est un appel collectif à l'action pour défendre leurs droits, soutenir les associations qui œuvrent à leurs côtés, et rappeler que chaque enfant mérite un avenir digne et sécurisé 🤝 Parce qu'aucun enfant ne devrait grandir sans filet 🧡" },
    ],
    "04-13": [
        {
            nom: "Journée nationale du Scrabble",
            description: "Ce jeu de lettres mythique qui fait travailler les méninges depuis des générations, où chaque mot posé sur le plateau peut faire basculer la partie 🧠✨ Alors sortez votre chevalet, piochez vos lettres et tentez de placer ce fameux mot sur une case mot compte triple… et que le meilleur vocabulaire gagne ! 🏆📖" },
        {
            nom: "Journée mondiale de la gastronomie",
            description: "Une belle occasion de célébrer l'art de bien manger, de savourer des saveurs du monde entier et de rendre hommage à tous ceux qui transforment de simples ingrédients en véritables expériences culinaires 👨‍🍳✨ Que vous soyez cordon bleu ou simple gourmand, aujourd'hui plus que jamais, mettez les petits plats dans les grands… et régalez-vous 🌍🥂" },
    ],
    "04-14": [
        {
            nom: "Journée mondiale de la maladie de Chagas",
            description: "La Journée Mondiale de la Maladie de Chagas met en lumière cette maladie tropicale silencieuse, causée par un parasite et qui affecte près de 7 millions de personnes dans le monde, principalement en Amérique latine 🌎 Souvent méconnue et négligée, elle peut pourtant avoir des conséquences graves sur le cœur et le système digestif si elle n'est pas dépistée à temps 💙 Une journée pour sensibiliser, agir et soutenir la recherche afin que Chagas ne reste plus dans l'ombre 🤝" },
        {
            nom: "Journée des célibataires (Corée du Sud)",
            description: "Chaque 14 avril, la Corée du Sud célèbre la Black Day, la journée des célibataires ! Ceux qui n'ont rien reçu ni pour la Saint-Valentin ni pour la White Day se réunissent entre amis pour manger un grand bol de jajangmyeon, ces nouilles à la sauce noire qui sont devenues le symbole savoureux de cette journée 🍜🖤 Une façon conviviale et décomplexée de célébrer le célibat… avec humour et appétit ! 😄" },
    ],
    "04-15": [
        { 
            nom: "Journée mondiale de l'art — Léonard de Vinci Day", 
            description: "🖼️ Le 15 avril, date de naissance de Léonard de Vinci en 1452, est célébrée comme la Journée Mondiale de l'Art pour honorer la créativité sous toutes ses formes — peinture, sculpture, musique, danse et bien plus encore ! " },
        { 
            nom: "Journée mondiale du cirque",
            description: "🤹 La Journée Mondiale du Cirque célèbre cet art millénaire qui mêle acrobaties, jonglerie et magie pour émerveiller petits et grands sous le chapiteau ! 🎠✨" },
    ],
    "04-16": [
        {
            nom: "Journée mondiale de la voix",
            description: "🗣️ Chaque 16 avril, la Journée Mondiale de la Voix rappelle que notre voix est un instrument précieux et unique — qu'elle chante, raconte ou convainc, elle mérite qu'on en prenne soin ! 🎶" },
        {
            nom: "Journée mondiale contre l'esclavage des enfants",
            description: "👶 La Journée Mondiale contre l'Esclavage des Enfants rappelle que des millions d'enfants sont encore exploités à travers le monde — une réalité inacceptable qui exige une mobilisation collective urgente. 🌍💔" },
        {
            nom: "Journée nationale des numismates",
            description: "💰 La Journée Nationale des Numismates rend hommage aux passionnés de monnaies et médailles anciennes, ces collectionneurs qui preservent à travers chaque pièce un fragment d'histoire et de patrimoine ! 🏛️" },
    ],
    "04-17": [
        {
            nom: "Journée mondiale de l'hémophilie",
            description: "💉 La Journée Mondiale de l'Hémophilie sensibilise aux troubles de la coagulation sanguine qui touchent des millions de personnes dans le monde, et appelle à un accès équitable aux traitements pour tous ! " },
        {
            nom: "Journée mondiale des luttes paysanes",
            description: "🚜 La Journée Mondiale des Luttes Paysannes rend hommage aux agriculteurs du monde entier qui se battent pour leurs droits, leurs terres et une alimentation juste et durable pour tous ! ✊" },
        {
            nom: "Journée internationale de l'herboristerie",
            description: "🌱 La Journée Mondiale de l'Herboristerie célèbre l'art ancestral des plantes médicinales et aromatiques — un savoir-faire millénaire qui, entre tradition et science moderne, continue de soigner et d'émerveiller ! 🍃" },
    ],
    "04-18": [
        {
            nom: "Journée internationale des monuments et des sites",
            description: "🗺️ Chaque 18 avril, la Journée Internationale des Monuments et des Sites nous invite à protéger et valoriser le patrimoine architectural et culturel de l'humanité — ces témoins irremplaçables de notre histoire commune ! "
        },
        {
            nom: "Journée mondiale des radios amateurs",
            description: "🔭 La Journée Mondiale des Radios Amateurs célèbre ces passionnés qui, micro en main et antenne pointée vers le ciel, connectent le monde entier sans frontières ni internet ! "
        },
    ],
    "04-19": [
        {
            nom: "Journée de la langue chinoise",
            description: "🖌️ La Journée de la Langue Chinoise célèbre l'une des plus anciennes langues du monde — avec ses milliers de caractères et ses tons mélodieux, le mandarin est parlé par plus d'un milliard de personnes ! " },
    ],
    "04-20": [
        {
            nom: "Journée du cannabis thérapeutique",
            description: "💊 Chaque 20 avril, la Journée du Cannabis Thérapeutique ouvre le débat sur l'usage médical de cette plante aux propriétés reconnues — soulagement de la douleur, épilepsie, soins palliatifs — encore trop peu accessible aux patients qui en ont besoin !" },
        {
            nom: "Journée mondiale des adjoint(e)s administratifs (-ves) et secrétaires",
            description: "📋 La Journée Mondiale des Adjoint(e)s Administratifs et Secrétaires rend hommage à ces piliers discrets de l'entreprise qui organisent, coordonnent et font tourner la machine… souvent sans qui personne ne le remarque ! 💼" },
    ],
    "04-21": [
        { nom: "Journée mondiale de la créativité et de l'innovation",
            description: "🎨 Chaque 21 avril, la Journée Mondiale de la Créativité et de l'Innovation célèbre la capacité humaine à penser autrement et à résoudre les défis du monde — parce que chaque grande avancée a d'abord été une idée folle ! " },
        { nom: "Journée de la crèche",
            description: "👶 La Journée de la Crèche met à l'honneur ces lieux essentiels qui accueillent les tout-petits dans leurs premières années — des espaces d'éveil, de jeu et de lien social où se construisent les bases de chaque enfant ! " },
    ],
    "04-22": [
        { nom: "Journée mondiale de la Terre",
            description: "🌱 La Journée Mondiale de la Terre nous rappelle que notre planète n'est pas une ressource inépuisable — un seul jour pour prendre conscience, mais 365 jours pour agir ! ♻️" },
        { nom: "Disquaire day",
            description: "🎸 Le Disquaire Day célèbre les disquaires indépendants et la culture vinyle — une journée pour redécouvrir le plaisir de fouiller des bacs et de repartir avec une pépite sous le bras ! 🖤" },
        { nom: "Semaine mondiale des déficits immunitaires primitifs",
            description: "🏥 Chaque dernière semaine d'avril, la Semaine Mondiale des Déficits Immunitaires Primitifs sensibilise à ces maladies rares qui fragilisent le système immunitaire dès la naissance — un combat quotidien pour des milliers de patients encore trop souvent diagnostiqués trop tard ! " },
    ],
    "04-23": [
        { nom: "Journée mondiale du livre et du droit d'auteur",
            description: "🖊️ Chaque 23 avril, la Journée Mondiale du Livre et du Droit d'Auteur célèbre la lecture et les auteurs qui nous transportent dans d'autres univers — parce qu'un livre ouvert, c'est un esprit qui s'éveille ! " },
    ],
    "04-24": [
        { nom: "Journée mondiale des animaux de laboratoires",
            description: "🔬 Chaque 24 avril, la Journée Mondiale des Animaux de Laboratoire interpelle sur le sort des millions d'animaux utilisés chaque année dans la recherche scientifique — et appelle à développer des alternatives éthiques pour réduire leur souffrance ! 💔" },
        { nom: "Journée mondiale de la lutte contre la méningite",
            description: "🏥 La Journée Mondiale de la Lutte contre la Méningite alerte sur cette infection foudroyante qui peut tuer en moins de 24 heures — la vaccination reste la meilleure arme pour protéger les plus vulnérables ! 💉" },
        { nom: "Fashion Revolution Day",
            description: "🌍 Le Fashion Revolution Day nous invite à questionner nos habitudes de consommation vestimentaire — qui a cousu mes vêtements, dans quelles conditions ? Une journée pour rappeler que la mode ne doit pas coûter des vies ! ✊" },
    ],
    "04-25": [
        { nom: "Journée mondiale du paludisme",
            description: "🦟 La Journée Mondiale du Paludisme rappelle que cette maladie transmise par les moustiques tue encore plus de 600 000 personnes par an — une hécatombe évitable qui exige une mobilisation mondiale sans relâche ! 💊" },
        { nom: "Journée nationale des manchots",
            description: "🐧 La Journée Nationale des Manchots célèbre ces oiseaux fascinants qui ont troqué le vol contre la nage — des acrobates des mers polaires aussi élégants dans l'eau que maladroits sur la glace ! 🌊" },
        { nom: "Journée mondiale pour la sauvegarde du lien parental",
            description: "❤️ La Journée Mondiale pour la Sauvegarde du Lien Parental défend le droit fondamental de chaque enfant à maintenir une relation avec ses deux parents — parce qu'aucune séparation ne devrait jamais priver un enfant de l'amour de sa famille ! 👪" },
    ],
    "04-26": [
        { nom: "Journée mondiale de la propriété intellectuelle",
            description: "🖊️ Chaque 26 avril, la Journée Mondiale de la Propriété Intellectuelle rappelle l'importance de protéger les créations de l'esprit humain — brevets, marques, œuvres artistiques — pour encourager l'innovation et récompenser ceux qui osent créer ! " },
        { nom: "Journée mondiale de la visibilité lesbienne",
            description: "💜Chaque 26 avril, la Journée Mondiale de la Visibilité Lesbienne célèbre et affirme l'identité des femmes lesbiennes — une journée pour lutter contre l'invisibilité, les stéréotypes et toutes les formes de discrimination ! ✊" },
        { nom: "Journée internationale des chiens-guides",
            description: "🐾 La Journée Internationale des Chiens-Guides rend hommage à ces compagnons d'exception qui offrent autonomie et liberté aux personnes malvoyantes — des héros à quatre pattes formés avec rigueur pour devenir de véritables yeux au quotidien ! ❤️" },
    ],
    "04-27": [
        { nom: "Journée mondiale du design graphique", description: "Le design graphique existe depuis les premières inscriptions humaines. Paul Rand a créé les logos d'IBM, ABC et UPS. Un seul homme a dessiné les icônes visuelles de 3 géants américains du XXe siècle !" },
        { nom: "Journée nationale du rouleau de printemps", description: "Le rouleau de printemps vietnamien (frais) et le rouleau de printemps frit chinois n'ont que le nom en commun. Les deux sont célébrés lors du Nouvel An lunaire — la saison du renouveau et des bonnes saveurs !" },
    ],
    "04-28": [
        { nom: "Journée mondiale de la sécurité et de la santé au travail", description: "2,3 millions de personnes meurent chaque année d'accidents du travail. Le travail devrait nous construire, pas nous détruire. La Finlande a réduit ses accidents du travail de 70% en 30 ans grâce à la prévention !" },
        { nom: "Journée nationale du pain de mie", description: "Le pain de mie tranché industriellement fut inventé en 1928 — d'où l'expression 'best thing since sliced bread'. Un boulanger vendit les droits de sa machine trancheuse pour 500 dollars. Il fut ruiné !" },
    ],
    "04-29": [
        { nom: "Journée internationale de la danse", description: "La danse est la plus universelle des formes d'art — toutes les cultures dansent. Danser 30 minutes brûle 200 calories et améliore la mémoire de 20%. Les danseurs professionnels ont le même VO2max que les nageurs olympiques !" },
        { nom: "Journée nationale du risotto", description: "Le risotto milanais au safran fut créé en 1574 par un maître verrier qui utilisa du safran pour colorer le riz comme il colorait le verre. La cuisine et l'art se nourrissent l'un l'autre depuis toujours !" },
    ],
    "04-30": [
        { nom: "Journée internationale du jazz", description: "Né à La Nouvelle-Orléans vers 1900, le jazz est patrimoine culturel immatériel de l'UNESCO. Il a enfanté le blues, le rock, la soul et le hip-hop. Miles Davis, Coltrane, Ella Fitzgerald — des noms qui resteront éternellement !" },
        { nom: "Journée nationale du haricot", description: "Les haricots existent depuis 7 000 ans. Ils fixent l'azote dans le sol et enrichissent naturellement la terre. La 'Three Sisters' amérindienne (courge, maïs, haricot) est l'un des systèmes agricoles les plus durables jamais conçus !" },
    ],
    "05-01": [
        { nom: "Fête du Travail", description: "La fête du Travail commémore le massacre de Chicago de 1886 où des ouvriers réclamaient la journée de 8h. Grâce à eux, nous avons les week-ends et les congés payés. En France, c'est aussi le jour du muguet porte-bonheur !" },
        { nom: "Journée du muguet porte-bonheur", description: "Charles IX offrit du muguet à la cour en 1561, lançant la tradition. C'est la seule journée où n'importe qui peut vendre des fleurs sans licence commerciale. Les Français offrent 60 millions de brins de muguet le 1er mai !" },
    ],
    "05-02": [
        { nom: "Journée mondiale du thon", description: "Le thon rouge peut nager à 70 km/h et plonger à 1 000m. Certains spécimens pèsent plus de 600 kg. Au Japon, un thon rouge a été vendu 3 millions de dollars aux enchères en 2019. La surpêche menace son existence !" },
        { nom: "Journée nationale du tiramisu", description: "Le tiramisu signifie littéralement 'tire-moi vers le haut' en italien. Chaque famille vénitienne prétend avoir la vraie recette originale. C'est le dessert le plus commandé dans les restaurants d'Europe !" },
    ],
    "05-03": [
        { nom: "Journée mondiale de la liberté de la presse", description: "En 2023, 3 journalistes sont tués par mois dans le monde. La Finlande, le Danemark et la Norvège occupent le top 3 de la liberté de la presse. Un journaliste libre est la meilleure garantie de démocratie !" },
        { nom: "Journée nationale des lunettes de soleil", description: "Les Inuits utilisaient des lunettes en ivoire avec des fentes pour réduire l'éblouissement de la neige il y a 2 000 ans. Sam Foster commercialisa les premières lunettes de soleil modernes sur la plage d'Atlantic City en 1929 !" },
    ],
    "05-04": [
        { nom: "Star Wars Day — May the 4th be with you !", description: "Le 4 mai est devenu la journée officielle de Star Wars grâce au jeu de mots 'May the 4th be with you'. La saga a généré 65 milliards de dollars. Yoda parle en inversion du sujet — linguistes et fans débattent encore de sa langue !" },
        { nom: "Journée internationale des pompiers", description: "En France, 200 000 sapeurs-pompiers volontaires assurent 80% des interventions. Les pompiers de Paris interviennent toutes les 40 secondes en moyenne. Des héros du quotidien qui méritent bien leur journée !" },
    ],
    "05-05": [
        { nom: "Journée mondiale de l'hygiène des mains", description: "Se laver les mains 30 secondes réduit de 50% les infections respiratoires. Ignaz Semmelweis, le médecin qui l'a découvert en 1847, fut envoyé à l'asile par ses pairs sceptiques. L'histoire lui a donné raison !" },
        { nom: "Journée nationale du pesto", description: "Le pesto génois existe depuis le XIVe siècle. La recette originale se fait au mortier — jamais au mixer ! Le basilic génois DOP est protégé comme un grand cru. Une Indication Géographique Protégée pour une sauce !" },
    ],
    "05-06": [
        { nom: "Journée mondiale de l'asthme", description: "300 millions de personnes souffrent d'asthme dans le monde. L'air intérieur peut être jusqu'à 5 fois plus pollué que l'air extérieur. Les plantes purificatrices d'air peuvent réduire les allergènes de 50% !" },
        { nom: "Journée nationale des infirmières", description: "Florence Nightingale réduisit la mortalité hospitalière de 42% à 2% simplement en imposant l'hygiène des mains. Elle inventa le graphique circulaire pour convaincre le Parlement. Une statisticienne autant que soignante !" },
    ],
    "05-07": [
        { nom: "Journée mondiale du rire (World Laughter Day)", description: "Cette journée fut créée par le Dr. Madan Kataria en 1998, fondateur du yoga du rire. Les clubs de rire existent dans 110 pays. Un enfant rit 300 fois par jour, un adulte seulement 15 à 20 fois !" },
        { nom: "Journée nationale des nouilles", description: "Un bol de nouilles vieux de 4 000 ans a été retrouvé en Chine ! La Chine, l'Italie et l'Arabie se disputent l'invention des pâtes depuis des siècles. Chacun mange les siennes et tout le monde est heureux !" },
    ],
    "05-08": [
        { nom: "Journée mondiale de la Croix-Rouge", description: "Fondée en 1863 par Henry Dunant après la bataille de Solférino, la Croix-Rouge est présente dans 192 pays avec 17 millions de bénévoles. Dunant reçut le 1er Prix Nobel de la Paix en 1901 !" },
        { nom: "Journée de la Victoire 1945", description: "Le 8 mai 1945, l'Allemagne nazie capitule. C'est la fin de la Seconde Guerre mondiale en Europe. 70 millions de personnes moururent dans ce conflit — le plus meurtrier de l'histoire humaine !" },
    ],
    "05-09": [
        { nom: "Journée de l'Europe", description: "Le 9 mai 1950, Robert Schuman proposa l'union européenne dans un discours de 5 minutes. Ce texte lança une aventure qui unit aujourd'hui 27 pays et 450 millions d'habitants. L'UE a maintenu la paix en Europe depuis 75 ans !" },
        { nom: "Journée nationale de la crêpe au Nutella", description: "La Chandeleur génère 200 000 tonnes de Nutella vendus en France par an. La recette parfaite : pâte reposée 1h minimum, beurre clarifié, et on fait sauter la première crêpe qui rate toujours. C'est la tradition, même pour les pros !" },
    ],
    "05-10": [
        { nom: "Journée mondiale des abeilles (anticipation)", description: "Les abeilles pollinisent 70% des plantes dont nous nous nourrissons. Une colonie compte 50 000 individus qui battent des ailes 250 fois par seconde. Leur danse indique précisément l'angle et la distance des fleurs !" },
        { nom: "Journée nationale du babeurre", description: "Le babeurre est le liquide restant après barattage de la crème en beurre. Naturellement fermenté, il facilite la digestion. Les pancakes américains parfaits l'utilisent absolument — c'est lui qui crée la texture aérée !" },
    ],
    "05-11": [
        { nom: "Journée nationale de la fête des Mères (anticipation)", description: "La fête des Mères fut officialisée en France en 1928. Les mamans françaises reçoivent 40 millions de cartes et 30 millions de bouquets chaque année. Le mot 'maman' est parmi les premiers mots dans presque toutes les langues du monde !" },
        { nom: "Journée mondiale de la fibromyalgie", description: "La fibromyalgie touche 2% de la population, dont 80% de femmes. Elle provoque des douleurs chroniques diffuses. Le fait qu'elle soit invisible ne la rend pas moins réelle — une leçon d'empathie pour tous !" },
    ],
    "05-12": [
        { nom: "Journée internationale des infirmières", description: "En hommage à Florence Nightingale née le 12 mai 1820. Nightingale réduisit la mortalité des soldats de 42% à 2% en améliorant l'hygiène. Elle changea la médecine avec une serpillière et des statistiques !" },
        { nom: "Journée mondiale de la fatigue chronique", description: "Le syndrome de fatigue chronique touche 17 millions de personnes. Reconnu par l'OMS en 2016. Le Long Covid a permis de mieux comprendre ce syndrome longtemps incompris des médecins !" },
    ],
    "05-13": [
        { nom: "Journée mondiale du cocktail", description: "Le cocktail tel qu'on le définit a été décrit pour la première fois en 1806 : spiritueux + sucre + eau + bitter. Jerry Thomas publia le premier livre de cocktails en 1862. Il existe aujourd'hui 93 000 bars dans le monde !" },
        { nom: "Journée nationale des chips", description: "Les chips furent inventées en 1853 par George Crum, un chef qui en voulait à un client qui renvoyait ses frites trop épaisses. Il les coupa ultra-fins par vengeance. Le client adora — et les chips naquirent d'un caprice !" },
    ],
    "05-14": [
        { nom: "Journée nationale des fraises et de la crème", description: "Les fraises et la crème chantilly ont été popularisées lors du tournoi de Wimbledon en 1877. Les Britanniques consomment 2 700 tonnes de fraises pendant les 2 semaines de Wimbledon. Un rituel sportivo-culinaire !" },
        { nom: "Journée mondiale de la biologie marine", description: "Les océans couvrent 71% de la Terre mais 95% restent inexplorés. Entre 700 et 1 000 nouvelles espèces marines sont découvertes chaque année. Les profondeurs abritent peut-être plus d'espèces que toutes les forêts terrestres !" },
    ],
    "05-15": [
        { nom: "Journée internationale des familles", description: "La famille est la cellule de base de la société selon l'ONU. En France, 1 famille sur 5 est monoparentale. Les études montrent que la qualité des relations familiales prime sur leur forme !" },
        { nom: "Journée nationale de la raviole", description: "Les raviolis existent en Chine depuis 1 200 ans et en Italie depuis le XIIIe siècle. La question de l'invention est officiellement irrésolue. En France, les ravioles du Dauphiné (microscopiques) sont un patrimoine protégé !" },
    ],
    "05-16": [
        { nom: "Journée internationale du vivre ensemble en paix", description: "L'ONU appelle à célébrer la tolérance et la diversité. 195 pays coexistent sur Terre malgré leurs différences. L'espéranto, créé en 1887 pour unir l'humanité, est encore parlé par 2 millions de personnes !" },
        { nom: "Journée nationale de la guacamole", description: "Le guacamole existe depuis les Aztèques du XVIe siècle. Les États-Unis achètent 120 millions d'avocats pour le Super Bowl. La recette aztèque originale est identique à celle d'aujourd'hui — certaines recettes traversent les siècles !" },
    ],
    "05-17": [
        { nom: "Journée mondiale contre l'homophobie et la transphobie", description: "Le 17 mai 1990, l'OMS retirait l'homosexualité de sa liste des maladies. Dans 69 pays, elle reste criminalisée. Cette journée milite pour l'égalité universelle. Plus de 60 pays ont reconnu le mariage pour tous !" },
        { nom: "Journée mondiale des télécommunications", description: "Internet connecte 5,4 milliards de personnes. Les câbles sous-marins transportent 99% du trafic internet mondial. Ces câbles mesurent en tout 1,3 million de km — 3 fois la distance Terre-Lune !" },
    ],
    "05-18": [
        { nom: "Journée internationale des musées", description: "Il y a 55 000 musées dans le monde. Pendant les confinements de 2020, les musées ont reçu 113 millions de visites virtuelles. La culture résiste à tout et trouve toujours un chemin !" },
        { nom: "Journée nationale des chips de pita", description: "Le pain pita a 4 000 ans d'histoire au Moyen-Orient. La poche se forme parce que la pâte cuit si vite que la vapeur la gonfle en deux couches. Les pita chips sont une invention américaine des années 1990 !" },
    ],
    "05-19": [
        { nom: "Journée nationale du vin Malbec", description: "Le Malbec est originaire du Cahors en France mais a trouvé sa gloire en Argentine au XIXe siècle. Les Argentins ont tellement amélioré le cépage que les Français importent maintenant du Malbec argentin. La mondialisation du vin !" },
        { nom: "Journée mondiale de la gentillesse", description: "La gentillesse libère de l'ocytocine aussi bien chez celui qui donne que chez celui qui reçoit. Les 'actes aléatoires de gentillesse' (random acts of kindness) ont été documentés comme réduisant l'anxiété de 40% !" },
    ],
    "05-20": [
        { nom: "Journée mondiale des abeilles", description: "Les abeilles existent depuis 100 millions d'années. Une abeille visite 2 000 fleurs par jour pour produire 1/12e de cuillère à café de miel dans sa vie entière. Elles communiquent en dansant — la 'danse frétillante' !" },
        { nom: "Journée mondiale de la métrologie", description: "Depuis 2019, toutes les unités du SI sont définies par des constantes physiques fondamentales. Le kilogramme n'est plus défini par un bloc de platine à Paris, mais par la constante de Planck. La science s'affranchit des objets !" },
    ],
    "05-21": [
        { nom: "Journée mondiale de la diversité culturelle", description: "4% des langues du monde sont parlées par 96% de la population. Les 6 000 langues restantes portent des savoirs uniques. Quand une langue disparaît, c'est une bibliothèque entière qui brûle !" },
        { nom: "Journée mondiale du thé", description: "Le thé est la 2e boisson la plus consommée au monde après l'eau. Un Britannique boit en moyenne 876 tasses par an. La cérémonie japonaise du thé (chanoyu) peut durer 4 heures. Toute une philosophie dans une tasse !" },
    ],
    "05-22": [
        { nom: "Journée internationale de la biodiversité", description: "La Terre abrite 8,7 millions d'espèces estimées, mais seulement 1,2 million identifiées. Nous détruisons peut-être des espèces avant même de les avoir découvertes. 1 million d'espèces sont actuellement menacées d'extinction !" },
        { nom: "Journée nationale du gingembre", description: "Le gingembre est utilisé en médecine depuis 5 000 ans. C'est l'un des premiers produits de la Route de la Soie. Il réduit les nausées de 40% selon des études cliniques — aussi efficace que certains médicaments !" },
    ],
    "05-23": [
        { nom: "Journée mondiale des tortues", description: "Les tortues existent depuis 220 millions d'années et ont survécu aux dinosaures ! Certaines espèces vivent plus de 200 ans. La tortue Jonathan des Seychelles, née vers 1832, est le plus vieil animal terrestre vivant connu !" },
        { nom: "Journée nationale de la crème fouettée", description: "La chantilly fut créée au XVIIe siècle par François Vatel, cuisinier de Condé. Vatel se suicida parce que sa livraison de poisson était en retard pour un banquet royal. Une sensibilité professionnelle... extrême !" },
    ],
    "05-24": [
        { nom: "Journée européenne des parcs naturels", description: "Il existe 3 800 parcs nationaux dans le monde couvrant 15% des terres émergées. Yellowstone fut le premier parc national en 1872. Les zones protégées permettent à des espèces en danger de se reconstituer !" },
        { nom: "Journée nationale de la mozzarella", description: "La vraie mozzarella di bufala ne se conserve que 24h et n'est jamais réfrigérée en Campanie. Le lait de bufflonne contient 2x plus de protéines que le lait de vache. 80% de la mozzarella mondiale est en fait industrielle !" },
    ],
    "05-25": [
        { nom: "Journée de la serviette — Towel Day (Hitchhiker's Guide)", description: "Douglas Adams écrivit que la serviette est l'objet le plus utile de l'univers. Le 25 mai est devenu 'Towel Day' en son honneur après sa mort en 2001. Le message universel : Don't Panic et ayez toujours votre serviette !" },
        { nom: "Journée mondiale de la thyroïde", description: "La thyroïde régule tout votre métabolisme à partir d'une glande de 25g. 200 millions de personnes souffrent de maladies thyroïdiennes, dont 3/4 sont des femmes. Un simple bilan sanguin suffit à la diagnostiquer !" },
    ],
    "05-26": [
        { nom: "Journée nationale du Pinot Grigio", description: "Le Pinot Gris est originaire de Bourgogne mais c'est l'Italie qui le rend mondialement célèbre. C'est le vin blanc le plus exporté d'Italie. Le raisin Pinot Gris est une mutation spontanée du Pinot Noir !" },
        { nom: "Journée mondiale du soleil", description: "La Terre reçoit en une heure plus d'énergie solaire qu'elle n'en consomme en un an. En 2023, 4,5% de l'électricité mondiale était solaire. Le solaire est désormais l'énergie la moins chère de l'histoire à produire !" },
    ],
    "05-27": [
        { nom: "Journée mondiale du jeu de dés", description: "Les dés à 6 faces existent depuis 2 600 ans. Les Romains jouaient aux dés compulsivement — Jules César était accro. La probabilité de faire 6 fois 6 de suite est de 1 sur 46 656. Pourtant ça arrive !" },
        { nom: "Journée nationale de la glace aux cerises", description: "Les cerises ont été introduites en Europe par les Romains depuis Giresun en Turquie — d'où le nom 'cerise'. La 'Black Forest' ice cream (forêt noire en glace) est une invention allemande de 1915 !" },
    ],
    "05-28": [
        { nom: "Journée internationale d'action pour la santé des femmes", description: "Les maladies cardiovasculaires tuent plus de femmes que tous les cancers réunis, mais restent sous-diagnostiquées. Les symptômes de l'infarctus sont différents chez les femmes. La médecine a longtemps étudié uniquement les hommes !" },
        { nom: "Journée nationale du hamburger", description: "Le hamburger fut popularisé à l'Exposition Universelle de Saint-Louis en 1904. Un Américain mange en moyenne 3 hamburgers par semaine. La chaîne McDonald's sert 70 millions de clients par jour dans 100 pays !" },
    ],
    "05-29": [
        { nom: "Journée internationale de l'Everest", description: "Edmund Hillary et Tenzing Norgay atteignirent le sommet le 29 mai 1953. Depuis, 6 300 personnes ont réussi l'ascension. 300 corps restent sur la montagne — le froid extrême les conserve. Le sommet se déplace de 4cm par an !" },
        { nom: "Journée nationale des biscuits au beurre de cacahuète", description: "Le biscuit au beurre de cacahuète avec sa marque de fourchette caractéristique date de 1936. La marque de fourchette aplatit les boules de pâte pour une cuisson uniforme — c'est fonctionnel, pas décoratif !" },
    ],
    "05-30": [
        { nom: "Journée nationale du macaroni au fromage", description: "Thomas Jefferson servit des pâtes au fromage à la Maison Blanche en 1802 après son séjour en France. La boîte Kraft Mac & Cheese fut lancée en 1937 et se vend encore à 1 million de boîtes par jour !" },
        { nom: "Journée mondiale de la sclérose en plaques", description: "La SEP touche 2,8 millions de personnes dans le monde, principalement des femmes de 20-40 ans. Les nouvelles thérapies ont transformé le pronostic : 90% des patients peuvent maintenant avoir une vie quasi-normale !" },
    ],
    "05-31": [
        { nom: "Journée mondiale sans tabac", description: "Le tabac tue 8 millions de personnes par an. 30 minutes après la dernière cigarette, la tension artérielle baisse. 5 ans après, le risque de cancer est divisé par deux. Il n'est jamais trop tard pour arrêter !" },
        { nom: "Journée nationale de la crème brûlée au citron", description: "La crème brûlée au citron est une invention provençale. Le chalumeau pour brûler le sucre fut emprunté à la chirurgie dentaire au XIXe siècle. La combinaison citron-vanille-caramel crée une symphonie de 5 saveurs !" },
    ],
    "06-01": [
        { nom: "Journée internationale des enfants", description: "750 millions d'enfants travaillent dans le monde. Le droit au jeu est inscrit dans la Convention des droits de l'enfant. Les enfants qui jouent librement développent mieux leur créativité et leur résilience !" },
        { nom: "Journée nationale du lait", description: "Le lait contient 18 des 22 nutriments essentiels. Les humains sont les seuls mammifères à consommer du lait d'autres espèces. 65% des adultes sont intolérants au lactose à des degrés divers — sans toujours le savoir !" },
    ],
    "06-02": [
        { nom: "Journée mondiale du vélo", description: "Le vélo est le mode de transport le plus efficace énergétiquement jamais inventé. Il y a 1 milliard de vélos dans le monde. Les Pays-Bas ont plus de vélos que d'habitants et des routes cyclables partout !" },
        { nom: "Journée nationale des madeleines", description: "La madeleine fut inventée en Lorraine au XVIIIe siècle. Marcel Proust la rendit immortelle dans 'À la recherche du temps perdu'. Les neurosciences ont confirmé ce que Proust décrivait : les saveurs activent la mémoire émotionnelle !" },
    ],
    "06-03": [
        { nom: "Journée mondiale de la bicyclette", description: "Un cycliste brûle 500 calories par heure. Commuter en vélo plutôt qu'en voiture économise 1 500 kg de CO2 par an. Le Tour de France, créé en 1903, est le 3e événement sportif le plus suivi au monde !" },
        { nom: "Journée nationale des glaces artisanales", description: "La crème glacée fut introduite en Europe par Catherine de Médicis au XVIe siècle. La première mention en France date de 1686 au café Procope à Paris. L'Italie compte 39 000 gelaterie — une pour 1 500 habitants !" },
    ],
    "06-04": [
        { nom: "Journée internationale des enfants victimes de conflits", description: "1 milliard d'enfants vivent dans des zones de conflit ou de fragilité. La Convention de l'ONU sur les droits de l'enfant est le traité le plus ratifié du monde. Protéger les enfants, c'est protéger l'avenir !" },
        { nom: "Journée nationale du cognac", description: "Le cognac ne peut être produit que dans la région de Cognac en Charente. 97% de la production est exportée. Il faut 9 litres de vin pour produire 1 litre de cognac. Les fûts de chêne lui donnent sa couleur ambrée !" },
    ],
    "06-05": [
        { nom: "Journée mondiale de l'environnement", description: "Célébrée depuis 1974, c'est la plus grande fête environnementale avec 143 pays participants. Les énergies renouvelables ont été multipliées par 10 en 10 ans. Les solutions existent — à nous de les mettre en œuvre !" },
        { nom: "Journée nationale des capellini aux fruits de mer", description: "Les capellini (cheveux d'ange) sont les pâtes les plus fines qui existent — 1mm de diamètre ! Elles cuisent en seulement 2-3 minutes. Les assortir aux fruits de mer est une tradition napolitaine datant du XVIIIe siècle !" },
    ],
    "06-06": [
        { nom: "Journée mondiale de la Grande Barrière de Corail", description: "La Grande Barrière de Corail est le plus grand organisme vivant de la Terre — visible depuis l'espace. Le réchauffement climatique a blanchi 50% de ses coraux. Des scientifiques travaillent à créer des coraux résistants à la chaleur !" },
        { nom: "Journée nationale du yo-yo", description: "Le yo-yo a été inventé aux Philippines comme arme de chasse il y a 2 500 ans ! Il fut introduit en Europe au XVIIIe siècle comme jouet. Le champion du monde peut enchaîner 5 tricks différents en 1 seconde !" },
    ],
    "06-07": [
        { nom: "Journée mondiale de la sécurité alimentaire", description: "828 millions de personnes souffrent de faim, alors qu'1/3 de la nourriture est gaspillée. La loi Garot française de 2016 a rendu illégal pour les supermarchés de jeter leurs invendus. Un modèle pour le monde !" },
        { nom: "Journée nationale des beignets", description: "Le beignet (donut) fut popularisé par les soldats américains en Première Guerre mondiale — des bénévoles les distribuaient dans les tranchées pour remonter le moral. La cuisine comme arme de paix !" },
    ],
    "06-08": [
        { nom: "Journée mondiale des océans", description: "L'océan produit 50% de l'oxygène que nous respirons et absorbe 30% du CO2. 8 millions de tonnes de plastique y sont déversées chaque année. The Ocean Cleanup a déjà retiré 1 000 tonnes de plastique du Pacifique !" },
        { nom: "Journée nationale des bonnes nouvelles", description: "Notre cerveau est 3x plus sensible aux mauvaises nouvelles qu'aux bonnes. Cette journée rappelle qu'il existe des bonnes nouvelles chaque jour : maladies éradiquées, pauvreté réduite, forêts replantées. Cherchez-les !" },
    ],
    "06-09": [
        { nom: "Journée nationale du tofu", description: "Le tofu existe en Chine depuis 2 200 ans. Il est plus ancien que la plupart des fromages européens. Il peut prendre presque toutes les saveurs selon sa préparation. Les Japonais en consomment 7 kg par personne par an !" },
        { nom: "Journée nationale de la bière artisanale", description: "Il existe plus de 10 000 brasseries artisanales aux États-Unis. La Belgique reconnaît officiellement la culture de la bière comme patrimoine culturel immatériel de l'UNESCO. Chaque bière est une œuvre d'art liquide !" },
    ],
    "06-10": [
        { nom: "Journée nationale de la limonade artisanale", description: "L'eau gazeuse fut inventée en 1767 par Joseph Priestley en suspendant un bol d'eau au-dessus d'une cuve de bière en fermentation. La limonade artisanale au gingembre, lavande ou basilic connaît un renouveau mondial !" },
        { nom: "Journée mondiale de la santé mentale (anticipation)", description: "1 personne sur 8 dans le monde vit avec un trouble mental. Briser le tabou, c'est aussi important que soigner. En France, 13 millions de personnes souffrent d'anxiété chronique. Parler en est le premier remède !" },
    ],
    "06-11": [
        { nom: "Journée mondiale de l'agriculture familiale", description: "500 millions d'exploitations familiales produisent 70% de la nourriture mondiale. Pourtant, ces paysans sont parmi les plus pauvres. Acheter local et de saison est le geste le plus direct pour soutenir cette agriculture vitale !" },
        { nom: "Journée nationale du restaurant", description: "La France compte 175 000 restaurants — plus que tout autre pays au monde proportionnellement. Le Guide Michelin fut créé en 1900 pour donner envie aux automobilistes de voyager et de changer leurs pneus Michelin !" },
    ],
    "06-12": [
        { nom: "Journée mondiale contre le travail des enfants", description: "160 millions d'enfants travaillent encore dans le monde. Le cacao, le coton et les briques sont les secteurs les plus touchés. L'éducation est le seul moyen de briser ce cycle — un enfant à l'école ne peut pas être au travail !" },
        { nom: "Journée nationale du pain au lait japonais", description: "Le Shokupan japonais (Hokkaido milk bread) a une mie si moelleuse qu'elle rebondit sous la pression. Le secret : la technique Tangzhong (roux de farine et lait) qui prégelatinise l'amidon. Un exploit boulanger !" },
    ],
    "06-13": [
        { nom: "Journée mondiale de la sensibilisation à l'albinisme", description: "L'albinisme touche 1 personne sur 20 000. En Afrique subsaharienne, les personnes albinos sont victimes de persécutions. Cette journée combat la discrimination et rappelle que la couleur de peau ne définit personne !" },
        { nom: "Journée nationale des friandises", description: "Les bonbons existent depuis l'Antiquité : les Égyptiens mélangeaient fruits secs, miel et épices. La réglisse est utilisée médicinalement depuis 3 000 ans. Le plus vieux bonbon industriel encore vendu ? Lemon Drops, depuis 1880 !" },
    ],
    "06-14": [
        { nom: "Journée mondiale du donneur de sang", description: "Un don de sang peut sauver jusqu'à 3 vies. Seuls 3% de la population mondiale donne son sang régulièrement alors que 110 millions de dons sont nécessaires chaque année. Donner son sang, c'est donner de la vie !" },
        { nom: "Journée nationale du cupcake à la fraise", description: "Le cupcake fut mentionné pour la première fois en 1796. Il doit son nom au fait qu'il était cuit dans des tasses en céramique. La tendance cupcake a généré 2 milliards de dollars de marché aux États-Unis !" },
    ],
    "06-15": [
        { nom: "Journée mondiale contre la maltraitance des personnes âgées", description: "1 personne âgée sur 6 est victime de maltraitance. Avec le vieillissement de la population, c'est un enjeu croissant. Les liens sociaux sont le premier facteur de bien-être des seniors — une visite vaut tous les médicaments !" },
        { nom: "Journée nationale du miel sauvage", description: "Les premières peintures rupestres de récolte de miel remontent à 15 000 ans. Du miel trouvé dans des tombes égyptiennes vieilles de 3 000 ans était encore comestible. Le miel est le seul aliment qui ne se périme jamais !" },
    ],
    "06-16": [
        { nom: "Journée internationale de l'enfant africain", description: "Le 16 juin 1976, des écoliers noirs marchèrent contre l'apartheid à Soweto. La police tira sur la foule. Leur sacrifice contribua à la fin de l'apartheid en 1994. Certaines dates changent l'histoire pour toujours !" },
        { nom: "Journée nationale de la bruschetta", description: "La bruschetta originale est simplement du pain grillé frotté à l'ail et arrosé d'huile d'olive. La tomate y fut ajoutée seulement après 1492 — quand l'Europe découvrit les Amériques. Un plat à l'histoire mondiale !" },
    ],
    "06-17": [
        { nom: "Journée mondiale de lutte contre la désertification", description: "12 millions d'hectares de terres fertiles se désertifient chaque année. 250 millions de personnes sont directement menacées. La Grande Muraille Verte africaine (8 000 km de forêts plantées) est l'un des plus grands projets de reboisement au monde !" },
        { nom: "Journée nationale de l'éclair au chocolat", description: "L'éclair fut inventé par Marie-Antoine Carême, cuisinier de Napoléon Ier. Il doit son nom au fait qu'on le mange 'en un éclair'. La pâte à choux qui le compose est aussi la base des profiteroles et des choux à la crème !" },
    ],
    "06-18": [
        { nom: "Journée nationale des sushis", description: "Le sushi originel était du poisson fermenté dans du riz pendant des mois — pas frais du tout ! La version moderne (edo-mae) fut inventée à Tokyo dans les années 1820 par les vendeurs de rue. Un plat populaire avant d'être raffiné !" },
        { nom: "Journée mondiale des réfugiés (anticipation)", description: "Plus de 100 millions de personnes ont fui leur foyer dans le monde. Les réfugiés contribuent significativement à l'économie de leur pays d'accueil. L'intégration réussie bénéficie à tout le monde !" },
    ],
    "06-19": [
        { nom: "Journée nationale du rosé", description: "La France est le premier producteur mondial de vin rosé. La Provence représente 40% de la production mondiale de rosé de qualité. Le rosé était le premier vin de l'histoire — les Grecs anciens mélangaient rouge et eau !" },
        { nom: "Journée mondiale de la sensibilisation aux crises alimentaires", description: "811 millions de personnes souffrent de faim chronique dans le monde. Pourtant, l'agriculture mondiale produit suffisamment pour nourrir 10 milliards de personnes. Le défi est la distribution, pas la production !" },
    ],
    "06-20": [
        { nom: "Journée mondiale des réfugiés", description: "100 millions de personnes dans le monde ont été forcées de fuir leur foyer — un chiffre record. Cette journée rend hommage à leur courage et appelle à plus de solidarité internationale. Le droit d'asile est un droit humain fondamental !" },
        { nom: "Journée nationale de la tarte aux cerises", description: "La tarte aux cerises américaine est emblématique — l'expression 'as American as cherry pie' le prouve. Les cerises acidulées Montmorency (pour les tartes) viennent à l'origine de la ville de Montmorency en France !" },
    ],
    "06-21": [
        { nom: "Journée internationale du yoga", description: "Le yoga a 5 000 ans d'histoire et est pratiqué par 300 millions de personnes. Il réduit le stress de 33% et améliore la flexibilité de 35% en 8 semaines. 'Yoga' vient du sanskrit 'Yuj' qui signifie relier, unir !" },
        { nom: "Fête de la Musique", description: "La Fête de la Musique, créée en France en 1982, est célébrée dans 120 pays ! Écouter de la musique libère de la dopamine, l'hormone du plaisir, comme manger du chocolat. Aujourd'hui, la musique appartient à tout le monde !" },
    ],
    "06-22": [
        { nom: "Journée mondiale des réfugiés de l'environnement", description: "D'ici 2050, le changement climatique pourrait forcer 200 millions de personnes à se déplacer. Les 'réfugiés climatiques' ne sont pas encore reconnus juridiquement. Un vide légal pour une réalité de plus en plus urgente !" },
        { nom: "Journée nationale du gâteau à la noix de coco", description: "La noix de coco pousse dans 90 pays tropicaux. Les Philippines sont le 2e producteur mondial. La noix de coco a alimenté les marins pendant des siècles — son eau remplace les sels minéraux perdus par la transpiration !" },
    ],
    "06-23": [
        { nom: "Journée olympique", description: "Le 23 juin 1894, Pierre de Coubertin fondait le CIO à Paris. Les JO modernes réunissent aujourd'hui 206 nations — plus que l'ONU ! La flamme olympique fut introduite en 1928 aux JO d'Amsterdam !" },
        { nom: "Journée internationale de la veuve", description: "245 millions de veuves vivent dans le monde, dont la moitié dans la pauvreté. Dans certains pays, elles sont encore victimes de discriminations légales. Cette journée porte leur cause au niveau international !" },
    ],
    "06-24": [
        { nom: "Journée nationale des limonades aux herbes", description: "La lavande, le basilic, le romarin et la menthe sont les herbes aromatiques les plus utilisées en limonade artisanale. La lavande de Provence est protégée par une AOP. Une boisson aussi belle que rafraîchissante !" },
        { nom: "Journée mondiale de la Saint-Jean", description: "La Saint-Jean marque traditionnellement le solstice d'été. Les feux de la Saint-Jean existent depuis les druides celtes. En France, de nombreux villages allument encore des bûchers le 24 juin — une tradition millénaire préservée !" },
    ],
    "06-25": [
        { nom: "Journée mondiale des marins", description: "1,89 million de marins font fonctionner le commerce mondial. 90% des marchandises que nous consommons ont voyagé par bateau. Ces travailleurs de l'ombre passent en moyenne 9 mois par an loin de leur famille !" },
        { nom: "Journée nationale de la crème glacée à la noix de coco", description: "La crème glacée à la noix de coco est naturellement sans lactose. Elle fut popularisée dans les pays tropicaux comme alternative à la crème animale. Les artisans glacier thaïlandais la préparent à la demande en 3 minutes !" },
    ],
    "06-26": [
        { nom: "Journée internationale contre l'abus de drogues", description: "275 millions de personnes ont utilisé des drogues en 2020. Mais la toxicomanie est avant tout une maladie, pas un choix moral. Les pays qui ont dépénalisé la consommation (Portugal, Suisse) ont vu la mortalité divisée par deux !" },
        { nom: "Journée nationale de la fondue au chocolat", description: "La fondue au chocolat fut inventée en Suisse dans les années 1950. Le chocolat chaud pour tremper dates du XVIe siècle en Espagne. Aujourd'hui, 'fondue' est un concept culinaire universel qui dépasse le fromage et le chocolat !" },
    ],
    "06-27": [
        { nom: "Journée mondiale de la microfinance", description: "Muhammad Yunus, Prix Nobel de la Paix, a montré que prêter de petites sommes à des personnes pauvres peut transformer des vies. La Grameen Bank a accordé 30 milliards de dollars de microcrédits à 9 millions d'emprunteurs !" },
        { nom: "Journée nationale des glaces artisanales (Ice Cream Day)", description: "Juillet est le mois des glaces aux États-Unis. Thomas Jefferson avait une recette personnelle de glace à la vanille en 18 étapes ! La glace artisanale italienne (gelato) contient moins de matières grasses que la crème glacée américaine !" },
    ],
    "06-28": [
        { nom: "Journée mondiale de la capote (préservatif)", description: "Le préservatif existe depuis 3 000 ans — les Égyptiens utilisaient des linges huilés. Charles Goodyear (oui, celui des pneus) inventa le préservatif en caoutchouc en 1855. Il est l'un des objets les plus importants de la santé publique !" },
        { nom: "Journée nationale de la tarte aux framboises", description: "La framboise est l'un des fruits les plus délicats : elle se conserve seulement 2-3 jours après cueillette. Sa couleur rouge intense vient des anthocyanes, de puissants antioxydants. La France produit 6 000 tonnes de framboises par an !" },
    ],
    "06-29": [
        { nom: "Journée internationale du tropique", description: "Les régions tropicales couvrent 40% de la surface terrestre et abritent 80% de la biodiversité mondiale. Elles sont aussi les plus menacées par la déforestation. L'Amazonie produit 20% de l'oxygène mondial !" },
        { nom: "Journée nationale de la camomille", description: "La camomille est l'une des plantes médicinales les plus utilisées au monde depuis 5 000 ans. Elle réduit l'anxiété et améliore le sommeil selon des études cliniques. En Égypte ancienne, on la dédiait au dieu soleil Râ !" },
    ],
    "06-30": [
        { nom: "Journée nationale des astéroïdes", description: "Le 30 juin 1908, l'événement de Toungouska : un astéroïde explosa au-dessus de la Sibérie, dévastant 2 000 km² de forêt. Si ça avait été au-dessus d'une ville... L'ONU a classé ce jour Journée des astéroïdes pour sensibiliser aux risques cosmiques !" },
        { nom: "Journée mondiale des sports de plein air", description: "L'escalade, le trail, le kayak et le VTT ont connu une croissance de 40% depuis 2020. Le contact avec la nature pendant 2 heures par semaine réduit le stress de 28% selon une étude de l'OMS. La nature est le meilleur médecin !" },
    ],
}