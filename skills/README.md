# Project-Local Skills

This directory contains project-local skills for the `web-reverse-engineer-demo` repository.

## Overview

Project-local skills are loaded and utilized specifically in the context of this repository. They are copied from or inspired by the global machine-level skills in your machine-level skills directory.

## Key Principles

1. **Repo-Level Source of Truth**: This project-local copy is the source of truth for the demo repository. 
2. **Isolation**: Editing these files only affects agent execution within this workspace. It does **not** affect the global machine-level agent skills in `~/.agents/skills/`.
3. **Collaboration**: Storing skills in the codebase allows them to be shared with team members, committed to version control, and tracked alongside the implementation demos they support.
4. **Customization**: This project-local skill is custom-tailored for clean-room reverse-engineering, featuring an upgraded workflow and audit utility script specifically optimized for this demo application.

## Available Skills

- **[web-reverse-engineer](web-reverse-engineer/SKILL.md)**: Guidelines, workflows, and automated utilities to inspect reference website components and recreate them in a clean-room fashion.
