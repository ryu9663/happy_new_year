# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple New Year card generator web application built with vanilla HTML, CSS, and JavaScript. The app allows users to create and share personalized New Year greeting cards through URL-based sharing without requiring a backend server.

## Architecture

**Single-page application structure:**
- `index.html` - Complete application in a single file containing HTML structure, CSS styling, and JavaScript logic
- No build process, package.json, or external dependencies
- Pure client-side application using modern browser APIs

**Key components:**
- **Editor mode** - Form interface for creating cards (left panel)
- **Preview mode** - Real-time preview of the card (right panel) 
- **Share mode** - Full-screen card view when accessed via hash URL
- **Snow animation** - Canvas-based particle system overlay

**Data flow:**
- Form inputs → real-time preview updates → base64url-encoded JSON in URL hash
- Hash parsing → state restoration → theme application → share mode activation

## Core Features

**Card creation:**
- Form fields: recipient (to), message, sender (from), theme selection
- Character limits: 40 chars for names, 700 chars for message
- Three predefined themes with CSS custom properties

**URL-based sharing:**
- No server storage - all data encoded in URL fragment
- Base64url encoding of JSON payload for safe URL sharing
- Automatic share mode activation when hash present

**Visual elements:**
- Responsive design with CSS Grid
- Glassmorphism UI with backdrop filters
- Animated snow particles with canvas rendering
- Theme switching via CSS custom properties

## Development Notes

**File editing:**
- All code exists in `index.html` - edit HTML structure, CSS styles, or JavaScript logic within this single file
- CSS is in `<style>` tag in document head
- JavaScript is in `<script>` tag before closing body tag

**Testing:**
- Open `index.html` directly in browser (no build process required)
- Test different themes, form inputs, and sharing functionality
- Verify responsive behavior and snow animation performance

**Code organization:**
- CSS: Custom properties for theming, mobile-first responsive design
- JavaScript: Modular functions for encoding/decoding, theme management, DOM manipulation, and canvas animation
- No external libraries or frameworks used
- <div class='card' id='preview'>..</div> 를 카드ui라고 칭할거야