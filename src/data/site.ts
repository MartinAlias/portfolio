// ─────────────────────────────────────────────────────────────────────────────
//  All of the site's content lives in this file.
//  Search for "TODO" to find anything that still needs real details.
//  Set a field to an empty string / empty array to hide it on the page.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Martin Horciak',
  handle: 'MartinAlias',
  title: 'Infrastructure & Security Engineer',
  tagline:
    'Infrastructure and security engineer with 5+ years securing mission-critical server, cloud and storage environments, now building safe, read-only AI agents for networks and security.',
  location: 'Toronto, ON',
  // Set to false if you are not currently looking.
  openToWork: true,
  about: [
    "I'm an infrastructure and security engineer with 5+ years of experience designing, deploying and administering mission-critical server and storage environments securely. My day-to-day spans VMware vSphere, Windows Server, Microsoft 365 and Azure, backup and disaster recovery with Druva and Veeam, and ITIL-aligned change and incident management.",
    "On the security side I've driven SOC 2 readiness, rolled out just-in-time privileged access with PrivX and Azure PIM, run vulnerability assessments with Wazuh and SentinelOne, and deployed SIEM and IDS/IPS controls. I hold TCM Security's Practical Junior Penetration Tester (PJPT) and I'm working toward CompTIA Security+.",
    'Outside work I build AI agents that are safe by design. LabWarden is an AI network and security engineer for my home lab that can observe and advise but never change anything. AI Race Engineer applies the same idea to motorsport: an agent that proposes changes and applies them only once a human approves.',
  ],
  // Headline numbers on the home page (from the resume).
  stats: [
    { value: '5+', label: 'years in infrastructure & security' },
    { value: '82%', label: 'better threat detection coverage after SIEM and IDS/IPS rollout' },
    { value: '18%', label: 'cloud spend cut through capacity planning' },
    { value: '8+ hrs', label: 'of manual ops work automated every week' },
  ],
};

export const links = {
  email: 'MartinHorciak@gmail.com',
  // Shown on the contact page. Set to '' to hide it.
  phone: '(647) 862-9401',
  github: 'https://github.com/MartinAlias',
  linkedin: 'https://www.linkedin.com/in/martinhorciak',
  // TODO: TryHackMe / Hack The Box profile URLs, or '' to hide.
  tryhackme: '',
  hackthebox: '',
  // Replace public/resume.pdf to update. Set to '' to hide the buttons.
  resume: '/resume.pdf',
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
export const skills = [
  { group: 'Platforms', items: ['VMware vSphere 8', 'XEN', 'Windows Server', 'Active Directory', 'Azure / Azure AD', 'AWS', 'GCP', 'Microsoft 365', 'Docker', 'Vercel'] },
  { group: 'Security operations', items: ['Wazuh (SIEM/XDR)', 'SentinelOne', 'SIEM', 'IDS/IPS', 'iptables', 'Vulnerability management', 'Root cause analysis'] },
  { group: 'Access & compliance', items: ['PrivX', 'Azure PIM (just-in-time access)', 'SOC 2 readiness', 'GDPR', 'ITIL change & incident management'] },
  // TODO: check this group matches what you covered for the PJPT.
  { group: 'Offensive security', items: ['Internal network pen-testing (PJPT)', 'Active Directory attacks', 'Nmap', 'Metasploit', 'Burp Suite'] },
  { group: 'Backup & DR', items: ['Druva', 'Veeam', 'NetApp', 'Cohesity', 'Disaster recovery planning', 'DR runbooks'] },
  { group: 'Monitoring & ITSM', items: ['Zabbix', 'ServiceNow', 'Health & SLA dashboards'] },
  { group: 'Automation & data', items: ['PowerShell', 'Python', 'Bash', 'Ansible', 'Rewst', 'SQL Server', 'MySQL', 'MongoDB', 'Firestore'] },
  { group: 'Networking', items: ['DNS', 'DHCP', 'VPN', 'Firewalls', 'VLANs'] },
  { group: 'AI & agents', items: ['Claude API', 'Tool use / function calling', 'MCP', 'Human-in-the-loop design'] },
];

// ── Certifications ──────────────────────────────────────────────────────────
// status: 'earned' | 'in-progress' | 'planned'
export const certifications: { name: string; issuer: string; status: 'earned' | 'in-progress' | 'planned'; date?: string; url?: string }[] = [
  { name: 'Practical Junior Penetration Tester (PJPT)', issuer: 'TCM Security', status: 'earned', date: '2026' },
  { name: 'Security+', issuer: 'CompTIA', status: 'in-progress' },
];

// ── Experience ──────────────────────────────────────────────────────────────
// Newest first.
export const experience: { role: string; org: string; location: string; period: string; points: string[]; tech: string[] }[] = [
  {
    role: 'Network & Systems Administrator',
    org: 'Integrated Building Services Inc.',
    location: 'Toronto, ON',
    // TODO: add dates (the resume only says "Contract").
    period: 'Contract',
    points: [
      'Installed, configured and administered network hardware, hypervisors (VMware, XEN) and firewalls; deployed SIEM, IDS/IPS and iptables controls that improved threat detection coverage by 82%.',
      'Wrote PowerShell and Bash automation that eliminated 8+ hours a week of manual operational tasks.',
      'Monitored network performance and error logs to keep the environment secure.',
      'Administered SQL Server, MongoDB and MySQL databases, and troubleshot complex hardware, OS and application issues with structured RCA alongside vendors and internal IT teams.',
    ],
    tech: ['VMware', 'XEN', 'SIEM', 'IDS/IPS', 'iptables', 'PowerShell', 'Bash', 'SQL Server', 'MongoDB', 'MySQL'],
  },
  {
    role: 'IT Infrastructure & Systems Specialist',
    org: 'ACT360',
    location: 'Toronto, ON',
    period: 'Dec 2025 – Jun 2026',
    points: [
      'Administered Windows Server environments and core network services (DNS, DHCP, VPN, Active Directory), managing the full hardware lifecycle from procurement to decommission.',
      'Authored and maintained DR runbooks, Ansible playbooks, change records and audit-ready documentation, improving knowledge sharing and reducing mean time to resolve.',
      'Ran root cause analysis on escalated L1/L2 incidents; corrective actions eliminated repeat failures across 3 recurring issue categories and cut ticket volume by 12%.',
      'Delivered end-user training for new and changed systems, and built Rewst automations to streamline routine operations.',
    ],
    tech: ['Windows Server', 'Active Directory', 'DNS/DHCP', 'VPN', 'Ansible', 'Rewst'],
  },
  {
    role: 'Security Specialist',
    org: 'Advantage Group International',
    location: 'Toronto, ON',
    period: 'Jun 2024 – Dec 2025',
    points: [
      'Managed VMware vSphere 8, the Microsoft 365 tenant (Exchange Online, SharePoint, Teams) and Azure IaaS workloads; capacity planning and cost-benefit analysis cut cloud infrastructure spend by 18%.',
      'Drove SOC 2 readiness as part of the Security, Privacy and Compliance team, documenting and validating controls mapped to the Trust Services Criteria and GDPR.',
      'Deployed PrivX and Azure PIM for just-in-time privileged access, and authored ITIL-aligned change and incident management procedures adopted across the organization.',
      'Built Zabbix dashboards tracking uptime, SLA compliance and resource utilization for executive-level reporting.',
      'Ran in-depth vulnerability assessments and worked with IT teams on remediation, root cause analysis and prevention using Wazuh (SIEM/XDR) and SentinelOne.',
    ],
    tech: ['vSphere 8', 'Microsoft 365', 'Azure', 'SOC 2', 'GDPR', 'PrivX', 'Azure PIM', 'Zabbix', 'Wazuh', 'SentinelOne'],
  },
  {
    role: 'Full Stack Developer',
    org: 'El-Mae-Dan Technologies Inc.',
    location: 'Toronto, ON',
    period: 'Contract · Mar 2022 – Jul 2022',
    points: [
      'Built a reliable, scalable game used by more than 15,000 players across Apple, Android and the web using WebGL.',
      'Led backend development of real-time storage on SQL and Firestore, improving data processing efficiency by 60%.',
      'Managed the technical side of the project from planning through deployment and post-launch support.',
    ],
    tech: ['WebGL', 'SQL', 'Firestore'],
  },
];

export const education: { school: string; credential: string; location: string; period?: string; notes?: string[] }[] = [
  {
    school: 'University of Guelph',
    credential: 'Bachelor of Computing, Computer Science',
    location: 'Guelph, ON',
  },
];

// ── Labs, CTFs & write-ups ──────────────────────────────────────────────────
// An empty array hides the section. Example entry:
//   { title: 'TryHackMe: Jr Penetration Tester path', kind: 'Lab platform', url: 'https://...', note: 'Top 5%' },
export const writeups: { title: string; kind: string; url?: string; note: string }[] = [];

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
