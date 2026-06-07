# Import des workflows agents dans n8n

## Fichiers a importer

- `n8n/workflows/agent-preanalyse-patrimoniale.json`
- `n8n/workflows/agent-pilotage-facturation-dashboard.json`

## Etapes

1. Ouvrir n8n.
2. Importer chaque fichier JSON.
3. Reconnecter les credentials OpenAI.
4. Reconnecter Supabase avec les variables de votre environnement.
5. Reconnecter SMTP, Gmail ou Slack selon le canal choisi.
6. Activer les workflows.
7. Copier les URLs de webhook dans `.env.local`.

## URLs locales attendues

- `N8N_PATRIMOINE_WEBHOOK_URL=http://localhost:5678/webhook/agent-preanalyse-patrimoniale`
- `N8N_PILOTAGE_WEBHOOK_URL=http://localhost:5678/webhook/agent-pilotage-facturation`

Selon la version de n8n, certains types de noeuds ou champs peuvent devoir etre ajustes manuellement. Les noms et notes des noeuds indiquent l'intention fonctionnelle.
