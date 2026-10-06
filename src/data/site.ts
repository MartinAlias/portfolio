// ─────────────────────────────────────────────────────────────────────────────
//  All of the site's content lives in this file.
//  Search for "TODO" to find every placeholder that still needs real details.
//  Set a field to an empty string / empty array to hide it on the page.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Martin Horciak',
  handle: 'MartinAlias',
  // TODO: confirm your headline.
  title: 'Cybersecurity & AI Engineer',
  tagline:
    'I build safe, read-only AI agents for networks and security, run a home lab to break and harden things, and learn by shipping.',
  // TODO: your city / region, or '' to hide.
  location: 'TODO: City, Country',
  // TODO: set to false if you are not currently looking.
  openToWork: true,
  about: [
    "I'm interested in everything security: penetration testing tools, network defense, and how AI changes both sides of the game. I'm comfortable moving between languages and stacks, and I learn best by building real tools.",
    'Right now I focus on AI agents that are safe by design. LabWarden is an AI network and security engineer for my home lab that can observe and advise but never change anything. Race Engineer applies the same idea to motorsport: an agent that proposes changes and only applies them once a human approves.',
    // TODO: add a paragraph about your background: education, current role, what you are looking for.
    'TODO: A sentence or two about your background (education, current role) and the kind of role you want next.',
  ],
};

export const links = {
  // TODO: the address you want public (left blank so it isn't published without your OK).
  email: '',
  github: 'https://github.com/MartinAlias',
  // TODO: your LinkedIn URL, or '' to hide.
  linkedin: '',
  // TODO: TryHackMe / Hack The Box profile URLs, or '' to hide.
  tryhackme: '',
  hackthebox: '',
  // Put your resume at public/resume.pdf. Set to '' to hide the button.
  resume: '',
};

// Shown as a scripted terminal session. `in` lines are typed, `out` lines print.
export type TermLine = { in?: string; out?: string; tone?: 'ok' | 'warn' | 'bad' | 'dim' | 'accent' };

export type FeaturedProject = {
  id: string;
  name: string;
  summary: string;
  status: string;
  stack: string[];
  highlights: { title: string; body: string }[];
  repo?: string;
  privateNote?: string;
  terminalTitle: string;
  terminal: TermLine[];
};

export const featured: FeaturedProject[] = [
  {
    id: 'labwarden',
    name: 'LabWarden',
    summary:
      'A read-only AI network & security engineer for the home lab. It observes devices, VLANs, firewall rules, containers, DNS and logs, keeps a versioned model of the network, diagnoses problems, recommends a fix you apply yourself, and then verifies it.',
    status: 'Phase 0: foundation. Live collectors, MCP server and AI agent in progress.',
    stack: ['Python 3.11', 'SQLite', 'Plugin entry points', 'MCP', 'Claude', 'uv', 'pytest'],
    highlights: [
      {
        title: 'Read-only by design, enforced in three layers',
        body: 'Read-only credentials; a GET-only Docker socket proxy and an SSH forced-command allowlist; and code-level checks so collector plugins can only define read methods. The AI has no "run any command" tool.',
      },
      {
        title: 'Vendor-neutral Lab Model',
        body: 'One schema for devices, interfaces, subnets, routes, DNS, firewall/NAT rules, containers and services. Diagnosis works the same on OPNsense, UniFi or a consumer router.',
      },
      {
        title: 'Snapshots and diffs',
        body: 'Every collection is stored in SQLite. Diffs between snapshots drive change tracking, drift detection and fix verification.',
      },
    ],
    privateNote: 'Private repo. Code walkthrough available on request.',
    terminalTitle: 'labwarden ~ homelab',
    terminal: [
      { in: 'labwarden check' },
      { out: '✓ config ok  ·  4 targets validated  ·  no connections made', tone: 'ok' },
      { in: 'labwarden collect --label after-vlan-change' },
      { out: '  pihole      dns, clients              ok   212 records', tone: 'dim' },
      { out: '  docker      containers, networks      ok    18 containers', tone: 'dim' },
      { out: '  linux/ssh   interfaces, routes, fw    ok     3 hosts', tone: 'dim' },
      { out: '✓ snapshot #42 saved', tone: 'ok' },
      { in: 'labwarden diff' },
      { out: 'snapshot #41 → #42', tone: 'accent' },
      { out: '+ firewall  allow 10.20.0.0/24 → 10.10.0.5:443  (iot → nas)', tone: 'warn' },
      { out: '~ device    nas01  vlan 1 → 10', tone: 'warn' },
      { out: '- route     10.10.0.0/24 via 192.168.1.1', tone: 'bad' },
      { out: '3 changes · 1 removed route may explain "NAS can\'t reach the internet"', tone: 'dim' },
    ],
  },
  {
    id: 'race-engineer',
    name: 'AI Race Engineer',
    summary:
      'A virtual motorcycle race engineer for the terminal. It logs bikes, tracks, sessions, setups, lap times and rider feedback, offers offline advice from a symptom guide, and lets you talk a problem through with a Claude-powered engineer that proposes setup changes and applies them only when you accept.',
    status: 'Working CLI: logging, offline advice and the AI engineer.',
    stack: ['Python 3.11', 'SQLite', 'Claude API (tool use)', 'YAML knowledge base', 'pytest'],
    highlights: [
      {
        title: 'Agent with a human in the loop',
        body: 'The AI engineer works only through scoped tools over the local database. It proposes at most two changes at a time, checks them against the bike\'s allowed ranges, and applies nothing without approval.',
      },
      {
        title: 'Offline-first',
        body: 'With no signal at the track, feedback is queued and the deterministic symptom guide answers instead. Queued feedback is analyzed once you are back online.',
      },
      {
        title: 'It learns from outcomes',
        body: 'Setups are never edited in place. Every change records the symptom it targets and how it worked, so advice improves for each bike.',
      },
    ],
    privateNote: 'Private repo. Code walkthrough available on request.',
    terminalTitle: 're ~ Brno FP1',
    terminal: [
      { in: 're lap add 1:43.10 1:42.31 1:42.05' },
      { out: '3 laps added · best 1:42.05', tone: 'dim' },
      { in: 're feedback "front feels slippery mid corner T3, T7" --severity 3' },
      { out: 'tagged: front_push_mid  ·  corners: T3, T7', tone: 'accent' },
      { in: 're engineer' },
      { out: 'engineer › Does it push on throttle pickup, or while still off the gas?', tone: 'dim' },
      { in: 'off the gas, at max lean' },
      { out: 'engineer › Proposal: fork.rebound 10 → 8 (2 clicks out)', tone: 'warn' },
      { out: '           Slower rebound keeps the front loaded mid-corner.', tone: 'dim' },
      { out: '           Within range 0–20 for this bike. Apply? [y/N]', tone: 'dim' },
      { in: 'y' },
      { out: '✓ setup #7 created (proposed by engineer)', tone: 'ok' },
      { in: 're outcome better --resolved --notes "front stays planted"' },
      { out: '✓ recorded · best lap −0.41s vs FP1', tone: 'ok' },
    ],
  },
];

// ── Home lab ────────────────────────────────────────────────────────────────
// TODO: replace with your real hardware and services.
export const homelab = {
  intro:
    'My home lab is where I practice network segmentation, self-hosting, monitoring and attack/defense. It is also the test bed for LabWarden.',
  hardware: [
    { name: 'TODO: Firewall / router', detail: 'e.g. OPNsense on a mini PC (4× 2.5GbE)' },
    { name: 'TODO: Hypervisor', detail: 'e.g. Proxmox VE on a used SFF PC, 64 GB RAM' },
    { name: 'TODO: Storage', detail: 'e.g. TrueNAS, 2× 4 TB mirror' },
    { name: 'TODO: Switch / AP', detail: 'e.g. managed VLAN-aware switch + Wi-Fi AP' },
  ],
  services: [
    'TODO: Pi-hole (DNS filtering)',
    'TODO: Docker host (self-hosted apps)',
    'TODO: Wazuh / Security Onion (SIEM, IDS)',
    'TODO: Kali + vulnerable VMs (attack range)',
    'TODO: WireGuard (remote access)',
    'TODO: Grafana + Prometheus (monitoring)',
  ],
  // Used for the network diagram. Keep to 3–5 segments and notes under ~18 characters.
  vlans: [
    { id: 10, name: 'Trusted', note: 'workstations, NAS' },
    { id: 20, name: 'IoT', note: 'internet only' },
    { id: 30, name: 'Lab', note: 'isolated range' },
    { id: 99, name: 'Mgmt', note: 'admin only' },
  ],
};

// ── Skills ──────────────────────────────────────────────────────────────────
// TODO: trim to what you can talk about confidently in an interview.
export const skills = [
  { group: 'Security', items: ['Network segmentation', 'Firewall rules', 'Vulnerability scanning', 'Pen-testing methodology', 'Log analysis', 'Least-privilege design'] },
  { group: 'Tools', items: ['Nmap', 'Wireshark', 'Burp Suite', 'Metasploit', 'Kali Linux', 'Pi-hole', 'Docker'] },
  { group: 'AI & agents', items: ['Claude API', 'Tool use / function calling', 'MCP', 'Human-in-the-loop design', 'Prompt design'] },
  { group: 'Languages', items: ['Python', 'JavaScript / TypeScript', 'Swift', 'SQL', 'Bash', 'PowerShell'] },
  { group: 'Infra', items: ['Linux', 'Proxmox', 'Git / GitHub', 'SQLite', 'Firebase', 'Vercel'] },
];

// ── Certifications ──────────────────────────────────────────────────────────
// status: 'earned' | 'in-progress' | 'planned'
// TODO: replace with your actual certifications.
export const certifications: { name: string; issuer: string; status: 'earned' | 'in-progress' | 'planned'; date?: string; url?: string }[] = [
  { name: 'TODO: CompTIA Security+', issuer: 'CompTIA', status: 'in-progress' },
  { name: 'TODO: Google Cybersecurity Certificate', issuer: 'Google', status: 'planned' },
];

// ── Experience / education ──────────────────────────────────────────────────
// TODO: replace with your real history. Newest first.
export const experience: { role: string; org: string; period: string; points: string[] }[] = [
  {
    role: 'Independent projects',
    org: 'Self-directed',
    period: '2025 – Present',
    points: [
      'Designing and building LabWarden, a read-only AI network & security agent with a plugin collector framework.',
      'Built AI Race Engineer, a Claude tool-use agent with range-checked, human-approved changes and offline fallback.',
      'Running a segmented home lab for self-hosting, monitoring and attack/defense practice.',
    ],
  },
  {
    role: 'TODO: Job title',
    org: 'TODO: Company',
    period: 'TODO: 20XX – 20XX',
    points: ['TODO: what you did and the impact, in one line.'],
  },
  {
    role: 'TODO: Degree / program',
    org: 'TODO: School',
    period: 'TODO: 20XX – 20XX',
    points: ['RUHacks 2021 participant (Snippy).'],
  },
];

// ── Labs, CTFs & write-ups ──────────────────────────────────────────────────
// TODO: link real write-ups, CTF results or lab rooms. Empty array hides the section.
export const writeups: { title: string; kind: string; url?: string; note: string }[] = [
  { title: 'TODO: TryHackMe path / rank', kind: 'Lab platform', note: 'e.g. Jr Penetration Tester path, top X%' },
  { title: 'TODO: CTF write-up', kind: 'Write-up', note: 'e.g. how I solved a web challenge at <event>' },
  { title: 'TODO: Home lab build log', kind: 'Blog', note: 'e.g. segmenting IoT with VLANs and OPNsense' },
];

// ── Other projects ──────────────────────────────────────────────────────────
export const projects: { name: string; description: string; stack: string[]; repo?: string; live?: string; year: string }[] = [
  {
    name: 'Snippy',
    description:
      'RUHacks 2021 team project: a Firebase portal with Google sign-in for tracking student assignments, a companion Discord bot, and a 3D-printed Arduino macro keypad.',
    stack: ['Firebase', 'discord.js', 'Arduino', 'Fusion 360'],
    repo: 'https://github.com/MartinAlias/Snippy',
    live: 'https://fir-test1-6d174.web.app/',
    year: '2021',
  },
  {
    name: 'On-Track',
    description:
      'A web app to help students returning to in-person learning: calendar, to-do list, daily schedule, sleep tracker and alarm, and a 24/7 lo-fi player.',
    stack: ['React', 'JavaScript'],
    repo: 'https://github.com/MartinAlias/On-Track',
    year: '2022',
  },
  {
    name: 'Super Smash Flash',
    description: 'My first battle platform game, built as a high school group project.',
    stack: ['Swift'],
    repo: 'https://github.com/MartinAlias/Super-Smash-Flash',
    year: 'High school',
  },
];
