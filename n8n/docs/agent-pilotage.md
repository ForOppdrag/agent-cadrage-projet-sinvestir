# Agent IA de pilotage facturation et dashboard

## Objectif

Analyser les donnees de facturation interne, detecter retards, doublons, montants inhabituels, factures echues et priorites operationnelles.

## Flux n8n

1. Webhook POST `/agent-pilotage-facturation`
2. Set pour normaliser les donnees de facturation
3. OpenAI pour detecter anomalies et produire une synthese
4. IF pour verifier anomalies critiques ou validation humaine
5. Supabase pour inserer dans `pilotage_analyses`
6. Email Send, Gmail ou Slack pour notifier le responsable
7. Respond to Webhook pour repondre a Next.js

## Regle importante

Les emails de relance peuvent etre prepares, mais ils ne doivent pas etre envoyes automatiquement sans validation humaine lorsque le contenu est sensible.

## Credentials a reconnecter

- OpenAI
- Supabase
- SMTP, Gmail ou Slack
