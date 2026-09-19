<div align="center">
    <img src="https://raw.githubusercontent.com/neplexlabs/commandkit/main/apps/website/static/img/ckit_logo.svg" width="75%" />
    <br />
    <a href="https://commandkit.dev/discord"><img src="https://img.shields.io/discord/1055188344188973066?color=5865F2&logo=discord&logoColor=white" alt="support server" /></a>
    <a href="https://www.npmjs.com/package/commandkit"><img src="https://img.shields.io/npm/v/commandkit?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/commandkit"><img src="https://img.shields.io/npm/dt/commandkit?maxAge=3600" alt="npm downloads" /></a>
</div>

<p align="center">Stop rebuilding command and event handlers for every new discord.js bot. CommandKit does it for you — and a lot more.</p>

## Why CommandKit?

Every new discord.js project starts the same way: write a command handler, write an event handler, set up interaction collectors, register slash commands with the API, figure out a project structure. It's hours of boilerplate before you write any real bot logic.

Most existing discord.js frameworks solve this by giving you a handler class you instantiate and point at a folder — and that's about it. They're loaders, not frameworks. Others like Sapphire go further and have decent features, but require heavy OOP boilerplate where everything is a class extending a base class.

CommandKit takes a different approach entirely. It works like a proper meta-framework — think **Next.js for Discord bots**. It ships with a smart CLI that handles bundling, TypeScript/JSX compilation, hot-reloading, command registration, and project scaffolding automatically. You run `commandkit dev` and everything just works — zero configuration.

The design philosophy is **convention over configuration**: put a file in `src/app/commands/` and it's a command. Put a file in `src/app/events/` and it's an event listener. Export a `chatInput` function and it handles slash commands. Export a `message` function in the same file and it handles prefix commands too. No registration calls, no base classes, no decorators. The framework knows what to do with your code based on where it is and what it exports — so you skip the setup and go straight to building.

## Features

### Automatic command and event handling
Drop your command files in a folder, export a function, and they just work. Slash commands, context menu commands, and prefix commands are all supported under a single unified command structure — no separate handler for each type. Commands are automatically registered and kept in sync with Discord. Events work the same way: create a file, export a listener, and CommandKit handles the rest.

### JSX components for Discord UI
discord.js builder chains (`ActionRowBuilder` → `ButtonBuilder` → `setCustomId` → ...) get messy fast. CommandKit lets you write Discord components in JSX — the same declarative syntax used in React — so your UI code is clean and readable.

### Built-in component handlers (no more collectors)
Buttons get `onClick`. Modals get `onSubmit`. Select menus get `onSelect`. Define a component and its behavior in one place — no `InteractionCollector` setup, no timeout management, no cleanup boilerplate.

### Command middlewares
Run logic before or after any command executes — permission checks, cooldowns, logging, analytics — without touching the command itself. A proper middleware layer, like you'd find in Express.

### Unified prefix commands
Message-based (prefix) commands live in the same file as your slash commands and context menus. One command file handles all input types. No separate handler needed.

### Caching with Redis support
The `@commandkit/cache` plugin gives you a customizable caching layer — in-memory by default, Redis-backed when you need persistence. Just add the `'use cache'` directive to any function.

### Plugin system with custom events
Extend CommandKit through plugins that hook into the framework lifecycle. Plugins can emit custom events — for example, listening to an external webhook and firing events your bot can react to. This isn't a wrapper around `node:events`; it's a structured extension system for building modular, decoupled bot features. Official plugins include `@commandkit/i18n` for localization and `@commandkit/analytics` for usage tracking.

### AI-powered command execution
The `@commandkit/ai` plugin lets users interact with your bot through natural language. Instead of memorizing slash command names, users just talk to your bot — and the AI figures out which command to run. Built on the [AI SDK](https://ai-sdk.dev) with support for Google Gemini, OpenAI, and more. Includes built-in tools, custom tool support, lifecycle hooks, and per-user model selection.

### Zero-config TypeScript and JavaScript
Native TypeScript and JSX support with no configuration. No `tsconfig.json` fiddling, no separate build step, no bundler setup. The CLI handles compilation, bundling, hot-reloading, and project scaffolding.

## Who is this for?

- **Beginners** who don't want to spend hours building handlers before they can do anything useful
- **Experienced developers** tired of rebuilding the same boilerplate for every new bot project
- **Teams and freelancers** who need a reliable, structured foundation they can build on quickly

CommandKit has been used in production client projects and has saved hours of setup time on each one. It's not overhead — it's the setup work you'd do anyway, already done well.

## Getting Started

```bash
npm create commandkit
```

Follow the prompts, then run `commandkit dev` to start your bot. Check out the [documentation](https://commandkit.dev) for guides and API reference.

## Support and Suggestions

Submit any queries or suggestions in our [Discord community](https://commandkit.dev/discord).