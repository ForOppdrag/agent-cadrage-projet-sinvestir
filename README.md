# Agent IA de cadrage projet - S'investir

POC local d'agent IA capable de transformer un brief metier brut en fiche projet structuree, challengee et exploitable par une equipe interne.

## Objectif du POC

L'objectif est de montrer comment S'investir peut cadrer plus rapidement des demandes internes : automatisation, dashboard, integration CRM, besoin patrimonial sensible ou projet no-code/low-code.

Le POC aide a :

- reformuler le besoin reel ;
- separer le MVP de la version avancee ;
- identifier les zones floues ;
- lister les risques et validations humaines ;
- produire une fiche projet actionnable.

## Stack technique

- **Next.js** : interface web de saisie du brief.
- **n8n** : orchestration du workflow et appel au LLM.
- **Supabase** : stockage futur des briefs, fiches projet et logs.
- **OpenAI ou LLM compatible** : analyse IA du brief.
- **Gmail ou SMTP** : notification du referent interne.
- **Vercel** : deploiement futur de l'interface.

## Fonctionnement general

1. Un utilisateur saisit un brief depuis l'interface Next.js.
2. L'API Next.js valide les champs obligatoires.
3. L'API envoie le payload vers le webhook n8n.
4. n8n normalise les donnees.
5. n8n appelle le LLM avec le prompt de cadrage projet.
6. n8n verifie si une validation humaine est necessaire.
7. n8n envoie la fiche projet au referent interne.

## Installation locale

```bash
cd "%USERPROFILE%\Desktop\Agents IA\agent-cadrage-projet-sinvestir"
npm install
```

## Configuration des variables d'environnement

Copier le fichier `.env.example` vers `.env.local`, puis renseigner les valeurs locales.

```bash
copy .env.example .env.local
```

Variables essentielles pour le MVP :

- `NEXT_PUBLIC_APP_URL`
- `N8N_WEBHOOK_URL`

Les cles OpenAI, Supabase et SMTP/Gmail ne doivent jamais etre publiees sur GitHub.

## Import du workflow n8n

1. Ouvrir n8n.
2. Importer `n8n/workflows/agent-cadrage-projet-mvp.json`.
3. Reconnecter les credentials OpenAI et Gmail.
4. Verifier que le webhook est actif en POST.
5. Copier l'URL du webhook dans `.env.local`.

Voir aussi `n8n/docs/import-n8n.md`.

## Lancement de l'interface Next.js

```bash
npm run check-env
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Deploiement futur sur Vercel

Le projet est pret pour Vercel :

1. publier le repository sur GitHub ;
2. connecter le repository a Vercel ;
3. ajouter les variables d'environnement dans Vercel ;
4. verifier que l'URL du webhook n8n est accessible depuis Internet.

## Securite et limites

- Ne jamais exposer les cles API cote client.
- Ne jamais publier `.env.local`.
- Ne jamais laisser l'agent prendre seul une decision financiere, juridique, contractuelle, RH ou commerciale sensible.
- Imposer une validation humaine pour les sujets sensibles.
- Filtrer les donnees sensibles avant envoi par email, Slack ou outil tiers.

## Demonstration possible en entretien

Le POC peut etre presente en 10 minutes :

1. montrer le formulaire Next.js ;
2. saisir un brief metier brut ;
3. declencher le webhook n8n ;
4. montrer la fiche projet generee ;
5. expliquer la validation humaine ;
6. presenter la roadmap Supabase, Slack, HubSpot, WooCommerce et dashboard.
