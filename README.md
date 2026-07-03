# Nucleus

> **A Self-Organizing Cognitive Memory Architecture for Large Language Models**

Nucleus is a self-organizing memory engine that extends large language models with persistent, graph-connected long-term memory. Instead of retraining the model, it continuously extracts, links, compresses, and retrieves knowledge, allowing AI systems to build an evolving understanding while minimizing token usage.

---

## Vision

Modern LLMs excel at reasoning but suffer from a fundamental limitation: **they forget**.

Conversation history is expensive to keep, context windows are finite, and most RAG systems simply retrieve documents without understanding how knowledge evolves over time.

Nucleus aims to solve this by acting as a **cognitive memory layer** between the user and the language model.

Rather than storing every conversation forever, Nucleus continuously:

- Learns from interactions
- Extracts meaningful knowledge
- Removes redundant information
- Builds semantic relationships
- Retrieves only the memories relevant to the current query

The result is an AI that becomes increasingly knowledgeable about its environment while keeping inference efficient.

---

# Core Principles

- **Persistent Memory** — Knowledge survives across conversations.
- **Self-Organizing** — Memories evolve instead of accumulating endlessly.
- **Relationship-Based** — Memories form connected knowledge rather than isolated records.
- **Token Efficient** — Retrieve only what is relevant.
- **Model Agnostic** — Works with local and cloud-hosted LLMs.
- **Continuous Learning** — Improves without retraining the underlying model.

---

# Current Features

- ✅ Persistent conversation storage
- ✅ Automatic memory extraction
- ✅ Long-term memory database
- ✅ Structured memory classification
- ✅ Session-aware conversations
- ✅ Event-driven memory pipeline using n8n
- ✅ PostgreSQL-backed storage

Unlike traditional RAG systems, memory is not simply stored—it is continuously refined into a structured knowledge graph.

---

# Planned Features

## Phase 1

- [ ] Memory deduplication
- [ ] Memory updating
- [ ] Importance scoring
- [ ] Automatic memory decay
- [ ] Conflict detection

## Phase 2

- [ ] Embedding generation
- [ ] Semantic vector search
- [ ] Graph-based memory relationships
- [ ] Memory clustering
- [ ] Knowledge compression

## Phase 3

- [ ] Autonomous memory synthesis
- [ ] Multi-agent shared memory
- [ ] Temporal reasoning
- [ ] Episodic vs semantic memory
- [ ] Cognitive planning engine

---

# Technology Stack

- **n8n** — Workflow orchestration
- **PostgreSQL** — Persistent memory storage
- **Local LLMs** (Qwen, Llama, etc.) or cloud providers
- **Embedding Model** _(planned)_
- **Vector Database** _(planned)_
- **Graph Database** _(planned)_

---

# Project Structure

```
Nucleus
│
├── Chat Pipeline
│   ├── Conversation Storage
│   ├── Context Assembly
│   └── Response Generation
│
├── Memory Engine
│   ├── Extraction
│   ├── Classification
│   ├── Transformation
│   └── Persistence
│
├── Retrieval Engine
│   ├── Semantic Search
│   ├── Graph Traversal
│   └── Context Ranking
│
└── Future Cognitive Layer
    ├── Planning
    ├── Reflection
    └── Self-Improvement
```

---

# Long-Term Goal

Nucleus is not intended to be another RAG framework.

The goal is to become a **cognitive operating system** for AI—one that enables language models to develop persistent, structured, and evolving knowledge over time while remaining efficient, interpretable, and model-independent.

---

## Status

🚧 Nucleus is currently under active development.

The architecture, APIs, and memory engine are evolving rapidly and may change before the first stable release.
