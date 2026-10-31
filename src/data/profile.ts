// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: 'Enamul Haq Chowdhury',
  shortName: 'Enamul',
  title: 'Senior Software Engineer',
  roles: [
    'Senior Software Engineer',
    'Java & Spring Boot Specialist',
    'Microservices Architect',
    'Distributed Systems Engineer',
  ],
  location: 'Dhaka, Bangladesh',
  tagline:
    'I design scalable microservices and modernize legacy platforms, turning slow, monolithic systems into fast, resilient distributed services.',
  summary: [
    'Senior software engineer with 5+ years building production-grade microservices and web applications with Java, Spring Boot and modern distributed systems.',
    'I help organizations modernize legacy platforms and optimize high-volume data processing, from national-scale government systems handling 80M+ records to e-commerce search serving high-volume product discovery.',
    'My work spans backend services, search and caching, event-driven messaging, security and observability, plus frontend integration and mentoring the engineers around me.',
  ],
  // Split so scrapers can't read the address from the HTML; it is assembled in the browser.
  emailUser: 'sakibenam3618',
  emailDomain: 'gmail.com',
  github: 'https://github.com/kaiyoken3618',
  githubHandle: 'kaiyoken3618',
  linkedin: 'https://www.linkedin.com/in/enamul-haq-chowdhury-2543981a4/',
  cv: '/Enamul_Haq_Chowdhury_CV.pdf',
  openTo: 'Open to senior backend & platform engineering roles',
};

export const stats = [
  { value: 5, suffix: '+', label: 'Years building production systems' },
  { value: 80, suffix: 'M+', label: 'Records searched on the national E-TIN platform' },
  { value: 93, suffix: '%', label: 'Faster search and data processing' },
  { value: 500, suffix: 'K+', label: 'Records moved by concurrent migration pipelines' },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    company: 'Synesis IT PLC',
    role: 'Senior Software Engineer',
    period: 'Sep 2025 – Present',
    location: 'Bangladesh',
    current: true,
    summary:
      'Leading the modernization of the national E-TIN platform from a legacy monolith to a scalable microservices architecture.',
    highlights: [
      'Designed and built high-availability backend services with Java 21+, Spring Boot and REST APIs.',
      'Cut search and data-processing time by 93% across 80M+ records using Elasticsearch, Redis caching, multithreading, query optimization and connection pooling.',
      'Implemented event-driven communication with RabbitMQ; hardened security with Spring Security, RBAC and two-factor authentication.',
      'Improved observability with Zipkin distributed tracing, centralized configuration and service discovery.',
      'Run code reviews, enforce engineering standards and mentor junior developers.',
    ],
    stack: ['Java 21', 'Spring Boot', 'Elasticsearch', 'Redis', 'RabbitMQ', 'Spring Security', 'Zipkin'],
  },
  {
    company: 'Technonext',
    role: 'Full-Stack Software Developer',
    period: 'Feb 2025 – Sep 2025',
    location: 'Dhaka',
    summary: 'Built search and data infrastructure for high-volume product discovery.',
    highlights: [
      'Designed a scalable Search Service using Spring Boot, Elasticsearch and the ELK Stack.',
      'Engineered data-migration pipelines processing 500K+ records with Java multithreading and concurrency.',
      'Built resilient inter-service communication with RabbitMQ and gRPC.',
      'Reduced latency with Redis caching and query optimization; monitored production with Grafana, ELK and APM.',
      'Containerized services with Docker for consistent deployments.',
    ],
    stack: ['Spring Boot', 'Elasticsearch', 'ELK', 'gRPC', 'RabbitMQ', 'Redis', 'Docker', 'Grafana'],
  },
  {
    company: 'Syntax Solution Ltd',
    role: 'Full-Stack Software Developer',
    period: 'Jun 2024 – Feb 2025',
    location: 'Dhaka',
    summary: 'Built core commerce services inside a distributed microservices ecosystem.',
    highlights: [
      'Designed and developed a scalable Catalog Service with Spring Boot 3, Java 21 and MongoDB.',
      'Implemented social login, OAuth and OTP-based verification flows.',
      'Built service discovery and API gateway with Netflix Eureka and Spring Cloud Gateway.',
      'Practiced TDD with JUnit 5 and integration testing with Rest Assured.',
      'Configured HashiCorp Vault for secrets management.',
    ],
    stack: ['Spring Boot 3', 'Java 21', 'MongoDB', 'OAuth2', 'Eureka', 'Spring Cloud Gateway', 'Vault', 'JUnit 5'],
  },
  {
    company: 'Dynamic Megasoft Ltd',
    role: 'Full-Stack Software Developer',
    period: 'Oct 2022 – Jun 2024',
    location: 'Remote',
    summary: 'Delivered end-to-end features across backend and frontend.',
    highlights: [
      'Built and optimized Spring Boot services, improving query efficiency for performance-critical workflows.',
      'Built reusable frontend components and supported end-to-end feature delivery.',
      'Contributed to code reviews and technical documentation.',
    ],
    stack: ['Spring Boot', 'SQL', 'TypeScript', 'REST APIs'],
  },
  {
    company: 'Pantheon Systems, Inc',
    role: 'Technical Support Engineer L3',
    period: 'Mar 2021 – Jan 2023',
    location: 'Remote',
    summary: 'Diagnosed issues in distributed web-hosting infrastructure.',
    highlights: [
      'Diagnosed and resolved distributed-system issues using logs and monitoring tools.',
      'Reproduced and debugged Solr and Redis performance problems.',
      'Developed an NLP project with NLTK, Keras and spaCy.',
    ],
    stack: ['Solr', 'Redis', 'Monitoring', 'Python', 'NLP'],
  },
];

export type Project = {
  title: string;
  kicker: string;
  description: string;
  metric?: string;
  flow: string[];
  stack: string[];
  link?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    title: 'National E-TIN Platform Modernization',
    kicker: 'Synesis IT · Government scale',
    description:
      "Migrating Bangladesh's national taxpayer identification platform from a legacy monolith to microservices, with event-driven messaging, hardened security and full tracing.",
    metric: '93% faster on 80M+ records',
    flow: ['Gateway', 'Services', 'RabbitMQ', 'Elasticsearch'],
    stack: ['Java 21', 'Spring Boot', 'Elasticsearch', 'Redis', 'RabbitMQ', 'Zipkin'],
  },
  {
    title: 'High-Volume Product Search Service',
    kicker: 'Technonext · E-commerce',
    description:
      'A scalable search service for product discovery on Elasticsearch and the ELK Stack, with Redis caching and gRPC/RabbitMQ links to other services.',
    metric: 'Lower latency via caching',
    flow: ['Client', 'Search API', 'Redis', 'Elasticsearch'],
    stack: ['Spring Boot', 'Elasticsearch', 'ELK', 'gRPC', 'Redis'],
  },
  {
    title: 'Concurrent Data Migration Pipelines',
    kicker: 'Technonext · Data engineering',
    description:
      'Multithreaded Java pipelines that move and transform large datasets between systems safely and quickly, monitored with Grafana and APM.',
    metric: '500K+ records migrated',
    flow: ['Source DB', 'Workers', 'Transform', 'Target'],
    stack: ['Java', 'Concurrency', 'Docker', 'Grafana'],
  },
  {
    title: 'Catalog Service & Auth Gateway',
    kicker: 'Syntax Solution · Microservices',
    description:
      'A Catalog Service on Spring Boot 3 and MongoDB behind Spring Cloud Gateway and Eureka, with OAuth, social login, OTP and Vault-managed secrets.',
    metric: 'Built test-first (TDD)',
    flow: ['Gateway', 'Eureka', 'Catalog', 'MongoDB'],
    stack: ['Spring Boot 3', 'MongoDB', 'OAuth2', 'Vault', 'JUnit 5'],
  },
  {
    title: 'Detection of Cricketing Activities Using Deep Learning',
    kicker: 'Research · IEEE publication',
    description:
      'Undergraduate thesis: a convolutional neural network that classifies cricket shots and umpire signals from images.',
    metric: 'Published on IEEE Xplore',
    flow: ['Images', 'CNN', 'Classifier', 'Activity'],
    stack: ['Deep Learning', 'CNN', 'Python', 'Computer Vision'],
    link: { href: 'https://ieeexplore.ieee.org/document/9707392', label: 'Read the paper' },
  },
];

export const skillGroups = [
  {
    id: 'backend',
    label: 'Backend',
    skills: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'gRPC', 'JWT', 'OAuth2', 'Spring Cloud Gateway'],
  },
  {
    id: 'distributed',
    label: 'Distributed Systems',
    skills: ['Microservices', 'RabbitMQ', 'Redis', 'Service Discovery', 'Consul', 'Eureka', 'Multithreading', 'Caching', 'API Design'],
  },
  {
    id: 'data',
    label: 'Data & Search',
    skills: ['Elasticsearch', 'MySQL', 'MongoDB', 'SQL Server', 'Query Optimization'],
  },
  {
    id: 'devops',
    label: 'DevOps & Observability',
    skills: ['Docker', 'ELK Stack', 'Grafana', 'Zipkin', 'APM Tools', 'HashiCorp Vault', 'Git', 'CI/CD'],
  },
  {
    id: 'testing',
    label: 'Testing',
    skills: ['JUnit 5', 'Rest Assured', 'TDD', 'Postman'],
  },
  {
    id: 'languages',
    label: 'Languages & Frontend',
    skills: ['Java', 'TypeScript', 'C++', 'HTML', 'CSS', 'SASS'],
  },
];

export const education = [
  {
    school: 'Ahsanullah University of Science and Technology',
    degree: 'B.Sc. in Computer Science & Engineering',
    period: 'Apr 2016 – Jan 2021',
    detail: 'CGPA 3.4 / 4.00 · Thesis published on IEEE Xplore',
    link: 'https://ieeexplore.ieee.org/document/9707392',
  },
  {
    school: 'Dhaka Residential Model College',
    degree: 'HSC & SSC',
    period: '',
    detail: 'GPA 5.00 / 5.00 in both',
  },
];

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#terminal', label: 'Terminal' },
  { href: '#contact', label: 'Contact' },
];
