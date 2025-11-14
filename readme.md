Gestion d'Utilisateurs

Description : Une application web complète et simple, construite avec React et une API Express/Node.js, permettant la gestion complète des utilisateurs (Inscription, Authentification et opérations CRUD).

Objectifs du Projet

Ce projet a été conçu pour atteindre les buts suivants :

- Permettre aux utilisateurs de s'inscrire et de se connecter de manière sécurisée (grâce à Bcrypt et JWT).

- Offrir une interface simple (front-end React) pour gérer les utilisateurs enregistrés (Lister, Créer, Modifier et Supprimer les données).

- Fournir une API RESTful robuste côté Express pour interagir avec le front-end et la base de données.

Ce projet utilise l'environnement Node.js (runtime JavaScript) et les technologies suivantes :

Node.js : L'environnement d'exécution pour le code JavaScript côté serveur.
Express : Un framework minimaliste et flexible pour construire l'API RESTful côté serveur.
React : La librairie JavaScript pour la construction de l'interface utilisateur (front-end).
Bcrypt : Utilisé pour hacher les mots de passe de manière sécurisée avant de les stocker en base de données.
Dotenv (.env) : "Permet de charger les variables d'environnement (secrets, clés, etc.) à partir d'un fichier .env pour la configuration."
Middleware : Fonctions exécutées entre la réception de la requête et l'envoi de la réponse (ex : vérification d'authentification).
JSON Web Token (JWT) : Un standard pour la création de jetons d'accès sécurisés pour l'authentification des utilisateurs.

Installation
Suivez ces étapes pour configurer et installer le projet sur votre machine locale.

Étapes

Dans le terminal:

1 - Clonez le dépôt : git clone https://github.com/antoine62232/Gestion-Utilisateurs.git

2 - Accédez au répertoire du projet : cd Gestion-Utilisateurs

3 - Installez les dépendances (Front-end et Back-end) : 

# Pour le Back-end (dossier GestionUtilisateursBack)
cd GestionUtilisateursBack
npm install

# Pour le Front-end (dossier GestionUtilisateursFront)
cd GestionUtilisateursFront
npm install



4 - Configuration des variables d'environnement :

Créez un fichier nommé .env à la racine de votre dossier GestionUtilisateursBack.

Ajoutez les variables requises, en les basant sur votre fichier bdd.js :

# Variables d'environnement pour le Back-end et la BDD
PORT=3000                 ; Port sur lequel tourne l'API Express
DB_HOST=localhost         ; ou l'adresse IP de votre serveur MySQL
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=usersManagement   ; (Le nom de la BDD créée)
DB_PORT=3306              ; Port MySQL par défaut
JWT_SECRET=une_chaine_tres_secrete_et_aleatoire_et_longue

5 - Démarrage des Serveurs :

Lancez les serveurs en utilisant les scripts définis dans chaque package.json.

# Lancez le Back-end (dans le dossier GestionUtilisateursBack)
npm start (Utilise nodemon pour le redémarrage automatique)

# Lancez le Front-end (dans le dossier GestionUtilisateursFront)
npm run dev (Lance Vite)

L'application sera accessible dans votre navigateur à l'adresse : http://localhost:5173.
