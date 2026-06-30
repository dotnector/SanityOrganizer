# Sanity Organizer

Sanity Organizer is a Home Assistant custom panel that lets you organize Home Assistant objects in a virtual folder tree without modifying Home Assistant data.

## What It Organizes

- Devices
- Entities
- Helpers
- Automations
- Scripts
- Scenes

## What It Does Not Organize

- Areas
- Labels
- Categories

## Data Safety

- Stores references only (no object duplication)
- Uses Home Assistant JSON user storage (`frontend/get_user_data`, `frontend/set_user_data`)
- Never writes to Home Assistant core database

## Features

- Unlimited nested folders
- Drag and drop for folders and object references
- Multi-select object assignment
- Search
- Rename and delete folders
- Move objects between folders
- Context menus
- Expand/collapse folder tree
- Persisted expanded folder state
- Missing reference handling
- Loading and error states

## Installation (HACS)

1. Add this repository as a custom repository in HACS with category `Frontend`.
2. Install `Sanity Organizer` from HACS.
3. Restart Home Assistant.
4. Add to `configuration.yaml`:

```yaml
panel_custom:
  - name: sanity-organizer
    sidebar_title: Sanity Organizer
    sidebar_icon: mdi:folder-multiple-outline
    url_path: sanity-organizer
    module_url: /local/community/sanity-organizer/dist/sanity-organizer.js
```

5. Refresh browser cache and open the new sidebar item.

## Development

```bash
npm install
npm run dev
npm run build
```

## Execution Modes

Sanity Organizer now runs in two modes with the same UI, domain model, and business services:

1. Standalone Vite mode
- Used by `npm run dev`
- Automatically uses a mock runtime
- Does not require Home Assistant
- Persists organizer state in browser LocalStorage

2. Home Assistant custom panel mode
- Automatically uses the real Home Assistant runtime
- Loads objects through the Home Assistant WebSocket API
- Persists organizer state with Home Assistant user storage

Runtime selection is automatic and centralized. The application layer does not know whether it is connected to the mock runtime or the Home Assistant runtime.

## Mock Development Data

The standalone runtime provides realistic mock data for:

- Devices
- Entities
- Helpers
- Automations
- Scripts
- Scenes

It includes:

- Duplicate display names
- Missing references
- Deep folder hierarchies
- Persistent local mock storage

Mock dataset sizes:

- `small` about 50 objects
- `medium` about 500 objects
- `large` about 5000 objects

You can choose the mock dataset size with a query parameter:

```text
http://localhost:5173/?mockSize=small
http://localhost:5173/?mockSize=medium
http://localhost:5173/?mockSize=large
```

The selected size is remembered in LocalStorage for subsequent development sessions.

## Notes

- The panel depends on Home Assistant frontend runtime and WebSocket APIs.
- Device/entity naming is resolved from live Home Assistant state and registries.
