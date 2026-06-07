# Agents IA S'investir

## Agent IA de pre-analyse patrimoniale

Cet agent aide a structurer une situation patrimoniale avant intervention d'un conseiller humain. Il collecte le contexte, reformule l'objectif, detecte les informations manquantes, classe le besoin et prepare une checklist de documents.

Lien avec S'investir : il soutient l'application d'analyse de patrimoine en rendant les demandes plus claires et plus exploitables.

## Agent IA de pilotage facturation + dashboard

Cet agent analyse les donnees de facturation interne pour detecter retards, doublons, montants inhabituels et indicateurs critiques. Il produit une synthese utile pour un dashboard de pilotage.

Lien avec S'investir : il relie le logiciel de facturation interne et le dashboard de pilotage.

## Valeur business

- Gain de temps sur la qualification des demandes.
- Meilleure priorisation des sujets sensibles.
- Donnees structurees pour Supabase et dashboard.
- Notifications internes exploitables.
- POC demonstrable pour une candidature Agent Builder.

## Stack

Next.js App Router pour les interfaces, routes API pour transmettre les demandes, n8n pour orchestrer les agents, OpenAI ou LLM compatible pour l'analyse, Supabase pour le stockage, Gmail/SMTP ou Slack pour les notifications, Vercel pour le deploiement futur.

## Validation humaine

La validation humaine est obligatoire parce que les deux agents peuvent toucher a des sujets financiers, fiscaux, juridiques, patrimoniaux, contractuels ou operationnels sensibles. L'IA prepare, structure et alerte ; elle ne decide pas seule.
