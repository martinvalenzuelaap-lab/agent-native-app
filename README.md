# Agent-native App Architecture

> **Personal Agent as the AI Runtime for Apps.**

Agent-native App Architecture is an emerging application pattern: apps expose deterministic state, tools, events, and UI, while delegating AI decision-making to the user's **personal agent** instead of embedding isolated assistants inside every app.

## Origin story

This pattern came from running a real personal agent environment with multiple self-hosted services: entry pages, file browsers, office-style UIs, health dashboards, and personal quest systems.

The first version was messy: service runtime data, app databases, generated files, uploads, caches, and agent context all lived too close to the agent home directory. The agent workspace became a dumping ground.

The fix was to make each service its own Dockerized app with its own runtime boundary:

```text
agent-home/
  skills/
  config.yaml
  memories/

services/
  app-a/
    compose.yaml
    data/
  app-b/
    compose.yaml
    data/
```

That solved runtime cleanliness, but exposed another problem: some apps need AI reasoning to work well. Embedding a separate agent lifecycle inside every app would duplicate memory, prompts, permissions, scheduling, and governance.

The cleaner boundary is:

```text
App: state, UI, API, validation, MCP tools, events, runtime data
Personal Agent: user context, reasoning, planning, AI decisions, cross-app orchestration
```

A third option was to use existing SaaS products and write Skills for the agent. That works when the SaaS already matches the workflow, but it breaks down when the app needs custom data, custom UI, custom AI decision points, or future extensibility.

Agent-native Apps are the middle path:

- app data stays inside each service boundary
- the agent home stays clean
- the app does not embed a hardcoded agent lifecycle
- the app exposes API/MCP/Skill/manifest surfaces
- the user's personal agent provides the AI runtime
- the same app can be used by Hermes Agent, Claude Code, Codex, or other MCP-capable agents

See [`docs/motivation.md`](docs/motivation.md) and [`docs/agent-portability.md`](docs/agent-portability.md) for the expanded version.

## Working definition

An **Agent-native App** is an application designed to be understood, operated, and extended by a user's personal agent, without depending on one specific agent implementation.

The app owns the reliable system parts:

- data model and persistence
- deterministic business rules
- API and human UI
- permissions and validation
- MCP tools/resources
- events and webhooks
- deployment and operations contract
- runtime data inside the app boundary

The user's personal agent owns the AI parts:

- intent understanding
- planning and recommendation
- summarization and analysis
- cross-app reasoning
- long-term user context
- human-in-the-loop decisions
- writing structured results back to the app

## What this is not

Agent-native App Architecture is **not**:

- an app with an embedded chatbot
- a SaaS-specific assistant per product
- a replacement for MCP
- a new LLM runtime
- a new agent framework
- a requirement that every app must ship its own agent
- a Hermes-only app convention

It is a packaging and integration pattern for making apps usable by personal agents.

## Why it matters

Most AI apps today create islands:

```text
App A + its own chatbot + isolated memory
App B + its own chatbot + isolated memory
App C + its own chatbot + isolated memory
```

The user has to repeat context. Memory is fragmented. Permissions are scattered. Each app only sees a slice of the user's life.

Agent-native Apps invert the relationship:

```text
Personal Agent
  ├─ user memory
  ├─ reasoning / planning
  ├─ cross-app orchestration
  └─ approval policy
        ↓
Agent-native Apps
  ├─ deterministic core
  ├─ UI / API / DB
  ├─ MCP tools
  ├─ events
  └─ AI logic contracts
```

The personal agent becomes the external AI runtime. Apps remain reliable deterministic systems.

## Traditional AI App vs Agent-native App

```text
Traditional AI App:
App + embedded AI + isolated memory + product-specific chatbot

Agent-native App:
App + deterministic core + tools/events/contracts
Personal Agent = external AI runtime + user memory + cross-app reasoning
```

## Architecture layers

1. **Runtime Layer**
   - Docker / Compose
   - API server
   - database
   - web UI
   - background workers

2. **Deterministic Core**
   - state machine
   - validation
   - permissions
   - business invariants
   - migrations

3. **Agent Connector Layer**
   - MCP tools
   - MCP resources/prompts when useful
   - events/webhooks
   - structured schemas

4. **AI Logic Contract**
   - AI decision points
   - trigger conditions
   - required context
   - expected output schema
   - write-back tools
   - approval rules
   - eval cases

5. **Agent Guidance Layer**
   - `SKILL.md`
   - operating policy
   - examples
   - failure handling
   - human approval rules

6. **Ops Contract**
   - `README.md`
   - `RUNBOOK.md`
   - healthcheck
   - backup / restore
   - migration / rollback
   - troubleshooting

## Minimal app package

A minimal Agent-native App should provide:

```text
app.yaml                     # machine-readable app manifest
ai-logic-contract.yaml       # AI delegation points
SKILL.md                     # how a personal agent should use the app
README.md                    # human + agent setup overview
RUNBOOK.md                   # operations, backup, restore, troubleshooting
compose.yaml                 # reproducible runtime
MCP server                   # tools/resources exposed to agents
Human UI                     # direct user control and visibility
Healthcheck                  # verifiable runtime status
```

## Example: Mochi Quest

Mochi Quest is a personal growth / quest system.

The app owns deterministic logic:

- goals, tasks, rewards, streaks, wallet, assessments
- task completion and coin ledger
- plan records and active plan state
- API validation
- web UI rendering

The personal agent owns AI logic:

- generating plans
- adjusting difficulty
- interpreting skipped tasks
- reviewing reward conflicts
- deciding when to notify or ask the user
- using long-term user context across apps

See [`examples/mochi-quest/`](examples/mochi-quest/) for a conceptual package.

## Docs

- [`docs/motivation.md`](docs/motivation.md) — where the pattern came from
- [`docs/architecture.md`](docs/architecture.md) — architecture layers and responsibility split
- [`docs/agent-portability.md`](docs/agent-portability.md) — keeping apps independent from a specific agent runtime
- [`docs/ai-logic-contract.md`](docs/ai-logic-contract.md) — declaring AI decision points
- [`docs/app-manifest.md`](docs/app-manifest.md) — draft `app.yaml` schema
- [`docs/challenges-and-objections.md`](docs/challenges-and-objections.md) — likely critiques and working answers

## Current status

This repository is a concept draft, not a finished standard.

The goal is to collect language, examples, templates, and feedback around a practical pattern that combines:

- Docker / Compose for runtime reproducibility
- MCP for agent-to-app tools and data
- Agent Skills for operational knowledge and behavior guidance
- app manifests and AI logic contracts for app-level delegation

## Discussion questions

- Is “Agent-native App” the right name?
- What belongs in the app manifest?
- How should apps declare AI decision points?
- How should permissions and human approval be represented?
- How much of this should be MCP metadata vs app-level convention?
- What makes an app safe for a personal agent to operate?

## License

MIT. See [`LICENSE`](LICENSE).
