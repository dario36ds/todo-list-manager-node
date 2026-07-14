# ✅ To-Do List Manager (Node.js + Express + SQLite)

Applicazione full-stack didattica per la gestione di liste ed elementi (todo list a due livelli), con backend REST in Node.js/Express e frontend vanilla JS pensato per testare a mano ogni operazione CRUD.

## 📖 Descrizione

Il progetto gestisce due entità collegate:

- **Liste** (`List`): contenitori con titolo e descrizione
- **Elementi** (`Element`): singoli task appartenenti a una lista, con testo e stato (fatto/da fare)

Il frontend espone un pulsante per ogni operazione (GET, POST, PUT, DELETE) così da poter osservare in modo esplicito il comportamento di ciascuna chiamata API.

## ✨ Funzionalità principali

- CRUD completo sulle **liste** (crea, leggi, rinomina, elimina)
- CRUD completo sugli **elementi** di una lista specifica
- Menu a tendina popolati dinamicamente dopo ogni operazione
- Persistenza dati su **SQLite** con creazione automatica delle tabelle all'avvio

## 🛠️ Stack tecnologico

**Backend**
- Node.js + Express 5
- SQLite3
- CORS

**Frontend**
- HTML/CSS/JavaScript vanilla (fetch API)

**Dev tooling**
- `nodemon` (reload backend)
- `live-server` (reload frontend)
- `concurrently` (avvio parallelo backend + frontend)

## 🔌 API Endpoints

| Metodo | Endpoint              | Descrizione                              |
|--------|-----------------------|-------------------------------------------|
| GET    | `/lists`              | Elenco di tutte le liste                   |
| POST   | `/list`                | Crea una nuova lista                       |
| PUT    | `/list/:id`            | Rinomina una lista                         |
| DELETE | `/list/:id`            | Elimina una lista                          |
| GET    | `/list/:id/elements`   | Elementi di una lista (con stato e titolo) |
| GET    | `/elements/:id`        | Elementi per id lista (variante)           |
| POST   | `/element`             | Crea un elemento in una lista              |
| PUT    | `/element/:id`         | Rinomina un elemento                       |
| PUT    | `/check/:id`           | Aggiorna lo stato (fatto/da fare)          |
| DELETE | `/element/:id`         | Elimina un elemento                        |

## 📁 Struttura del progetto

```
todo-list-manager-node/
├── backend/
│   ├── server.js      # Route Express e logica CRUD
│   └── db.js          # Connessione SQLite + creazione tabelle
├── frontend/
│   ├── index.html     # UI con pulsanti per ogni operazione
│   ├── api.js          # Wrapper generico per le chiamate fetch
│   ├── main.js          # Binding pulsanti/tendine → chiamate API
│   └── style.css
└── package.json
```

## 🚀 Avvio in locale

```bash
git clone https://github.com/dario36ds/todo-list-manager-node.git
cd todo-list-manager-node
npm install
npm run dev
```

Questo avvia in parallelo:
- Backend su `http://localhost:3000`
- Frontend su `http://localhost:5173`

Il database SQLite (`database/app.sqlite`) viene creato automaticamente al primo avvio.

## 👤 Autore

**Dario Stacchini**
