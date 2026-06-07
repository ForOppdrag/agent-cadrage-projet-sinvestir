# Agent IA de pre-analyse patrimoniale

## Objectif

Structurer une demande patrimoniale utilisateur avant passage a un conseiller humain. L'agent produit une fiche preparatoire, pas un conseil financier personnalise.

## Flux n8n

1. Webhook POST `/agent-preanalyse-patrimoniale`
2. Set pour normaliser les champs patrimoniaux
3. OpenAI pour produire une analyse prudente en JSON
4. IF pour verifier `validation_humaine_requise` ou `niveau_sensibilite = eleve`
5. Supabase pour inserer dans `patrimoine_analyses`
6. Email Send ou Gmail pour notifier le conseiller
7. Respond to Webhook pour repondre a Next.js

## Validation humaine

Toute dimension financiere, fiscale, juridique, successorale, patrimoniale ou contractuelle impose une validation humaine.

## Credentials a reconnecter

- OpenAI
- Supabase
- SMTP ou Gmail
