# Plugin d'exemple : conventions DSI

Un plugin regroupe des **skills**, des **commandes**, des **hooks** et des **connexions (serveurs MCP)** pour les partager dans une équipe.

Installation dans Claude Code :

```
/plugin marketplace add <proprietaire>/<depot>
/plugin install conventions-dsi
```

Skills fournis : `/conventions-dsi:revue-conformite`, `/conventions-dsi:ticket-vers-story`.

Étape suivante possible : ajouter un fichier `.mcp.json` pour brancher un outil interne (ticketing, CMDB) via un serveur MCP.
