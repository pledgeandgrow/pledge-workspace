import { DocArticle, DocCategory, DocSearchResult } from '@/types/documentation';
// UUID import removed as it's not being used

// Mock data for documentation categories
const mockCategories: DocCategory[] = [
  {
    id: '1',
    title: 'Premiers pas',
    slug: 'getting-started',
    description: 'Apprenez à utiliser la plateforme et configurez votre compte',
    icon: 'rocket',
    order: 1
  },
  {
    id: '2',
    title: 'Documents',
    slug: 'documents',
    description: 'Créez et gérez vos devis, factures et autres documents',
    icon: 'file-text',
    order: 2
  },
  {
    id: '3',
    title: 'Workflows',
    slug: 'workflows',
    description: 'Automatisez vos processus avec des workflows personnalisés',
    icon: 'git-branch',
    order: 3
  },
  {
    id: '4',
    title: 'API',
    slug: 'api',
    description: 'Intégrez vos outils avec notre API',
    icon: 'code',
    order: 4
  },
  {
    id: '5',
    title: 'Paramètres',
    slug: 'settings',
    description: 'Configurez votre compte et vos préférences',
    icon: 'settings',
    order: 5
  }
];

// Mock data for documentation articles
const mockArticles: DocArticle[] = [
  // Getting Started Articles
  {
    id: '101',
    title: 'Bienvenue sur Pledge Workspace',
    slug: 'welcome',
    content: `
# Bienvenue sur Pledge Workspace

Pledge Workspace est une plateforme complète pour la gestion de documents et l'automatisation de processus métier. Cette documentation vous aidera à comprendre comment utiliser efficacement toutes les fonctionnalités disponibles.

## Qu'est-ce que Pledge Workspace?

Pledge Workspace est une suite d'outils conçue pour simplifier la création et la gestion de documents professionnels tels que les devis, factures, contrats et conventions de stage. La plateforme offre également des fonctionnalités d'automatisation via des workflows personnalisables et une API robuste pour l'intégration avec d'autres services.

## Fonctionnalités principales

- **Création de documents** : Générez facilement des devis, factures, contrats et autres documents professionnels.
- **Workflows automatisés** : Configurez des workflows pour automatiser vos processus métier.
- **API et webhooks** : Intégrez Pledge Workspace avec vos outils existants ou des services tiers.
- **Gestion des documents** : Organisez, recherchez et suivez tous vos documents en un seul endroit.

## Comment démarrer

1. Créez un compte ou connectez-vous
2. Configurez les informations de votre entreprise dans les paramètres
3. Explorez les différents outils disponibles dans le workspace
4. Créez votre premier document

Pour plus d'informations, consultez les articles dans la section "Premiers pas".
    `,
    categoryId: '1',
    createdAt: new Date(2025, 0, 15).toISOString(),
    updatedAt: new Date(2025, 0, 15).toISOString(),
    author: 'Équipe Pledge',
    tags: ['introduction', 'démarrage'],
    order: 1
  },
  {
    id: '102',
    title: 'Créer votre compte',
    slug: 'create-account',
    content: `
# Créer votre compte

Pour commencer à utiliser Pledge Workspace, vous devez créer un compte. Ce guide vous explique comment procéder.

## Étapes pour créer un compte

1. Accédez à la page d'accueil de Pledge Workspace
2. Cliquez sur le bouton "S'inscrire" dans le coin supérieur droit
3. Remplissez le formulaire d'inscription avec vos informations personnelles
4. Acceptez les conditions d'utilisation et la politique de confidentialité
5. Cliquez sur "Créer un compte"
6. Vérifiez votre adresse e-mail en cliquant sur le lien dans l'e-mail de confirmation

## Configuration initiale

Après avoir créé votre compte, nous vous recommandons de:

1. Compléter votre profil
2. Configurer les informations de votre entreprise
3. Explorer le tableau de bord et les outils disponibles

## Connexion à votre compte

Une fois votre compte créé, vous pouvez vous connecter à tout moment en:

1. Accédant à la page d'accueil
2. Cliquant sur "Se connecter"
3. Entrant votre adresse e-mail et votre mot de passe

## Récupération de mot de passe

Si vous oubliez votre mot de passe:

1. Cliquez sur "Mot de passe oublié?" sur la page de connexion
2. Entrez votre adresse e-mail
3. Suivez les instructions dans l'e-mail de réinitialisation que vous recevrez
    `,
    categoryId: '1',
    createdAt: new Date(2025, 0, 16).toISOString(),
    updatedAt: new Date(2025, 0, 16).toISOString(),
    author: 'Équipe Pledge',
    tags: ['compte', 'inscription', 'connexion'],
    order: 2
  },
  // Documents Articles
  {
    id: '201',
    title: 'Créer un devis',
    slug: 'create-quote',
    content: `
# Créer un devis

Les devis sont essentiels pour présenter vos services et tarifs à vos clients potentiels. Voici comment créer un devis professionnel avec Pledge Workspace.

## Accéder à l'outil de devis

1. Connectez-vous à votre compte Pledge Workspace
2. Accédez à la section "Workspace" depuis le tableau de bord
3. Cliquez sur l'outil "Devis" dans la liste des outils disponibles

## Remplir le formulaire de devis

Le formulaire de devis est organisé en plusieurs onglets pour une meilleure organisation:

### Onglet Client
- Renseignez les informations du client (nom, adresse, email, etc.)
- Si le client est une entreprise, cochez la case correspondante pour afficher des champs supplémentaires

### Onglet Devis
- Donnez un titre à votre devis
- Définissez un numéro de devis (généré automatiquement par défaut)
- Spécifiez la date d'émission et la date de validité
- Ajoutez des conditions de règlement et autres informations importantes

### Onglet Articles
- Ajoutez les produits ou services que vous proposez
- Spécifiez la quantité, le prix unitaire et le taux de TVA pour chaque article
- Le sous-total, la TVA et le total sont calculés automatiquement

### Onglet Entreprise
- Vérifiez que les informations de votre entreprise sont correctes
- Ces informations sont pré-remplies à partir de vos paramètres

## Prévisualiser et finaliser

- Utilisez l'aperçu en temps réel pour vérifier l'apparence de votre devis
- Apportez des modifications si nécessaire
- Cliquez sur "Enregistrer" pour sauvegarder votre devis
- Cliquez sur "Exporter PDF" pour générer un fichier PDF prêt à être envoyé

## Envoyer le devis

Après avoir créé votre devis, vous pouvez:
- Le télécharger au format PDF
- L'envoyer directement par email depuis la plateforme
- Le partager via un lien sécurisé

## Suivi des devis

Tous vos devis sont accessibles dans la section "Documents" où vous pouvez:
- Voir leur statut (brouillon, envoyé, accepté, etc.)
- Les modifier
- Les convertir en factures
- Suivre leur évolution
    `,
    categoryId: '2',
    createdAt: new Date(2025, 1, 10).toISOString(),
    updatedAt: new Date(2025, 1, 15).toISOString(),
    author: 'Équipe Pledge',
    tags: ['devis', 'création', 'client'],
    order: 1
  },
  {
    id: '202',
    title: 'Créer une facture',
    slug: 'create-invoice',
    content: `
# Créer une facture

Les factures sont des documents essentiels pour votre activité. Voici comment créer une facture professionnelle avec Pledge Workspace.

## Accéder à l'outil de facturation

1. Connectez-vous à votre compte Pledge Workspace
2. Accédez à la section "Workspace" depuis le tableau de bord
3. Cliquez sur l'outil "Facture" dans la liste des outils disponibles

## Remplir le formulaire de facture

Le formulaire de facture est organisé en plusieurs onglets pour une meilleure organisation:

### Onglet Client
- Renseignez les informations du client (nom, adresse, email, etc.)
- Si le client est une entreprise, cochez la case correspondante pour afficher des champs supplémentaires

### Onglet Facture
- Donnez un titre à votre facture
- Définissez un numéro de facture (généré automatiquement par défaut)
- Spécifiez la date d'émission et la date d'échéance
- Ajoutez des conditions de règlement et autres informations importantes

### Onglet Articles
- Ajoutez les produits ou services que vous facturez
- Spécifiez la quantité, le prix unitaire et le taux de TVA pour chaque article
- Le sous-total, la TVA et le total sont calculés automatiquement

### Onglet Entreprise
- Vérifiez que les informations de votre entreprise sont correctes
- Ces informations sont pré-remplies à partir de vos paramètres

## Prévisualiser et finaliser

- Utilisez l'aperçu en temps réel pour vérifier l'apparence de votre facture
- Apportez des modifications si nécessaire
- Cliquez sur "Enregistrer" pour sauvegarder votre facture
- Cliquez sur "Exporter PDF" pour générer un fichier PDF prêt à être envoyé

## Envoyer la facture

Après avoir créé votre facture, vous pouvez:
- La télécharger au format PDF
- L'envoyer directement par email depuis la plateforme
- La partager via un lien sécurisé

## Suivi des factures

Toutes vos factures sont accessibles dans la section "Documents" où vous pouvez:
- Voir leur statut (envoyée, payée, en retard, etc.)
- Les modifier
- Enregistrer les paiements reçus
- Envoyer des rappels automatiques
    `,
    categoryId: '2',
    createdAt: new Date(2025, 1, 12).toISOString(),
    updatedAt: new Date(2025, 1, 16).toISOString(),
    author: 'Équipe Pledge',
    tags: ['facture', 'création', 'client'],
    order: 2
  },
  // Workflows Articles
  {
    id: '301',
    title: 'Introduction aux workflows',
    slug: 'workflows-intro',
    content: `
# Introduction aux workflows

Les workflows vous permettent d'automatiser vos processus métier et de connecter Pledge Workspace à d'autres outils et services.

## Qu'est-ce qu'un workflow?

Un workflow est une séquence d'étapes automatisées qui s'exécutent en réponse à un déclencheur spécifique. Par exemple, vous pouvez créer un workflow qui génère automatiquement une facture lorsqu'un nouveau client est ajouté à votre système.

## Types de déclencheurs

Pledge Workspace prend en charge plusieurs types de déclencheurs:

- **Webhook**: Déclenche un workflow lorsqu'une requête HTTP est reçue sur un point de terminaison spécifique
- **Planification**: Exécute un workflow à des intervalles réguliers ou à des moments précis
- **API**: Permet de déclencher un workflow via un appel API
- **Événement**: Réagit à des événements internes de la plateforme (création de document, mise à jour, etc.)

## Types d'actions

Une fois un workflow déclenché, il peut exécuter diverses actions:

- **Création de document**: Génère automatiquement des devis, factures ou autres documents
- **Envoi d'email**: Envoie des notifications ou des documents par email
- **Mise à jour de document**: Modifie le statut ou les informations d'un document existant
- **Appel API**: Interagit avec des services externes via leur API
- **Fonction personnalisée**: Exécute une logique métier spécifique

## Avantages des workflows

L'utilisation des workflows présente plusieurs avantages:

- **Gain de temps**: Automatisez les tâches répétitives
- **Réduction des erreurs**: Éliminez les erreurs humaines dans les processus
- **Cohérence**: Assurez-vous que vos processus sont exécutés de manière cohérente
- **Intégration**: Connectez Pledge Workspace à votre écosystème d'outils existant

## Cas d'utilisation courants

- Génération automatique de devis à partir de formulaires web
- Envoi de rappels pour les factures impayées
- Création de documents récurrents (factures mensuelles, rapports, etc.)
- Synchronisation des données avec d'autres systèmes (CRM, comptabilité, etc.)
- Notifications automatiques pour les événements importants
    `,
    categoryId: '3',
    createdAt: new Date(2025, 2, 5).toISOString(),
    updatedAt: new Date(2025, 2, 5).toISOString(),
    author: 'Équipe Pledge',
    tags: ['workflows', 'automatisation', 'introduction'],
    order: 1
  },
  // API Articles
  {
    id: '401',
    title: 'Présentation de l\'API',
    slug: 'api-overview',
    content: `
# Présentation de l'API

L'API Pledge Workspace vous permet d'intégrer nos fonctionnalités à vos applications et services existants. Cette documentation vous aidera à comprendre comment utiliser notre API efficacement.

## Base URL

Toutes les requêtes API doivent être envoyées à l'URL de base suivante:

\`\`\`
https://api.pledgeandgrow.com/v1
\`\`\`

## Authentification

L'API utilise des clés API pour l'authentification. Vous pouvez générer des clés API dans les paramètres de votre compte.

Pour vous authentifier, incluez votre clé API dans l'en-tête \`Authorization\` de vos requêtes:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Format des requêtes et réponses

L'API accepte et renvoie des données au format JSON. Assurez-vous d'inclure l'en-tête \`Content-Type: application/json\` dans vos requêtes.

## Pagination

Pour les endpoints qui renvoient de grandes collections d'objets, l'API utilise la pagination. Les paramètres de requête suivants sont disponibles:

- \`limit\`: Nombre d'éléments à renvoyer (défaut: 20, max: 100)
- \`offset\`: Nombre d'éléments à ignorer (défaut: 0)

## Gestion des erreurs

L'API utilise les codes de statut HTTP standard pour indiquer le succès ou l'échec d'une requête. En cas d'erreur, la réponse inclut un objet JSON avec des détails sur l'erreur:

\`\`\`json
{
  "error": {
    "code": "invalid_request",
    "message": "Description détaillée de l'erreur",
    "status": 400
  }
}
\`\`\`

## Limites de taux

Pour assurer la stabilité du service, l'API impose des limites de taux. Les limites actuelles sont:

- 100 requêtes par minute pour les comptes standard
- 1000 requêtes par minute pour les comptes premium

Les en-têtes suivants sont inclus dans chaque réponse pour vous aider à gérer vos limites:

- \`X-RateLimit-Limit\`: Nombre total de requêtes autorisées par période
- \`X-RateLimit-Remaining\`: Nombre de requêtes restantes dans la période actuelle
- \`X-RateLimit-Reset\`: Temps (en secondes) avant la réinitialisation du compteur

## Webhooks

En plus des endpoints API traditionnels, Pledge Workspace propose des webhooks pour recevoir des notifications en temps réel sur certains événements. Consultez la section "Webhooks" pour plus d'informations.
    `,
    categoryId: '4',
    createdAt: new Date(2025, 3, 10).toISOString(),
    updatedAt: new Date(2025, 3, 10).toISOString(),
    author: 'Équipe Pledge',
    tags: ['api', 'intégration', 'développement'],
    order: 1
  },
  // Settings Articles
  {
    id: '501',
    title: 'Configuration du profil',
    slug: 'profile-settings',
    content: `
# Configuration du profil

La configuration de votre profil est une étape importante pour personnaliser votre expérience sur Pledge Workspace. Ce guide vous explique comment gérer vos informations personnelles et vos préférences.

## Accéder aux paramètres du profil

1. Connectez-vous à votre compte Pledge Workspace
2. Cliquez sur votre avatar dans le coin supérieur droit
3. Sélectionnez "Paramètres" dans le menu déroulant
4. Cliquez sur "Profil" dans le menu de navigation des paramètres

## Informations personnelles

Dans cette section, vous pouvez mettre à jour:

- Votre nom complet
- Votre adresse email
- Votre numéro de téléphone
- Votre photo de profil

Pour modifier votre photo de profil:
1. Cliquez sur l'icône de caméra sur votre avatar actuel
2. Sélectionnez une nouvelle image depuis votre ordinateur
3. Recadrez l'image si nécessaire
4. Cliquez sur "Enregistrer"

## Sécurité du compte

Dans l'onglet "Sécurité", vous pouvez:

- Changer votre mot de passe
- Activer l'authentification à deux facteurs (2FA)
- Consulter les sessions actives
- Révoquer l'accès des appareils non reconnus

### Activer l'authentification à deux facteurs

L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte:

1. Cliquez sur "Activer l'authentification à deux facteurs"
2. Choisissez votre méthode préférée (application d'authentification ou SMS)
3. Suivez les instructions à l'écran pour terminer la configuration
4. Conservez vos codes de récupération dans un endroit sûr

## Préférences de notification

Personnalisez les notifications que vous recevez:

- Notifications par email
- Notifications dans l'application
- Alertes pour les documents
- Alertes pour les workflows

## Supprimer votre compte

Si vous souhaitez supprimer votre compte:

1. Accédez à l'onglet "Danger"
2. Cliquez sur "Supprimer mon compte"
3. Lisez attentivement les informations sur les conséquences
4. Entrez votre mot de passe pour confirmer
5. Cliquez sur "Supprimer définitivement"

**Attention**: Cette action est irréversible et supprimera toutes vos données.
    `,
    categoryId: '5',
    createdAt: new Date(2025, 4, 5).toISOString(),
    updatedAt: new Date(2025, 4, 5).toISOString(),
    author: 'Équipe Pledge',
    tags: ['profil', 'paramètres', 'sécurité'],
    order: 1
  }
];

export const documentationService = {
  // Get all categories
  getCategories: async (): Promise<DocCategory[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockCategories].sort((a, b) => a.order - b.order);
  },

  // Get category by slug
  getCategoryBySlug: async (slug: string): Promise<DocCategory | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const category = mockCategories.find(cat => cat.slug === slug);
    return category || null;
  },

  // Get articles by category
  getArticlesByCategory: async (categoryId: string): Promise<DocArticle[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockArticles
      .filter(article => article.categoryId === categoryId)
      .sort((a, b) => a.order - b.order);
  },

  // Get article by slug
  getArticleBySlug: async (slug: string): Promise<DocArticle | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const article = mockArticles.find(art => art.slug === slug);
    return article || null;
  },

  // Search documentation
  searchDocumentation: async (query: string): Promise<DocSearchResult[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!query || query.trim().length < 2) {
      return [];
    }
    
    const lowerQuery = query.toLowerCase();
    const results: DocSearchResult[] = [];
    
    // Search in categories
    mockCategories.forEach(category => {
      const titleMatch = category.title.toLowerCase().includes(lowerQuery);
      const descMatch = category.description.toLowerCase().includes(lowerQuery);
      
      if (titleMatch || descMatch) {
        results.push({
          id: category.id,
          title: category.title,
          type: 'category',
          slug: category.slug,
          excerpt: category.description,
          relevance: titleMatch ? 0.8 : 0.5
        });
      }
    });
    
    // Search in articles
    mockArticles.forEach(article => {
      const titleMatch = article.title.toLowerCase().includes(lowerQuery);
      const contentMatch = article.content.toLowerCase().includes(lowerQuery);
      const tagMatch = article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false;
      
      if (titleMatch || contentMatch || tagMatch) {
        // Extract excerpt from content if there's a match
        let excerpt = article.content.substring(0, 150) + '...';
        
        if (contentMatch) {
          const matchIndex = article.content.toLowerCase().indexOf(lowerQuery);
          const startIndex = Math.max(0, matchIndex - 50);
          const endIndex = Math.min(article.content.length, matchIndex + 100);
          excerpt = (startIndex > 0 ? '...' : '') + 
                   article.content.substring(startIndex, endIndex).trim() + 
                   (endIndex < article.content.length ? '...' : '');
        }
        
        results.push({
          id: article.id,
          title: article.title,
          type: 'article',
          slug: article.slug,
          categoryId: article.categoryId,
          excerpt,
          relevance: titleMatch ? 1 : (tagMatch ? 0.7 : 0.6)
        });
      }
    });
    
    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance);
  }
};
