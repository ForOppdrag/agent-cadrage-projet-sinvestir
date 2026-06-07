# Import du workflow dans n8n

1. Ouvrir n8n.
2. Aller dans **Workflows** puis **Import from file**.
3. Selectionner `n8n/workflows/agent-cadrage-projet-mvp.json`.
4. Ouvrir le noeud **OpenAI - analyser et generer la fiche projet** et recreer le credential OpenAI.
5. Ouvrir le noeud **Gmail - envoyer la fiche au referent** et recreer le credential Gmail OAuth2.
6. Verifier le chemin du webhook : `agent-cadrage-projet`.
7. Activer le workflow.
8. Copier l'URL de production du webhook dans `N8N_WEBHOOK_URL`.

Selon la version de n8n, certains noms de parametres OpenAI ou Gmail peuvent differer. Si l'import signale une erreur, conserver les 5 etapes conceptuelles et recreer manuellement les noeuds avec les memes noms.
