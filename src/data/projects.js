import medicareDashboard from '../assets/medicare/dashboard.jpg';
import medicareInventory from '../assets/medicare/inventory.jpg';
import medicareSales from '../assets/medicare/sales.jpg';

// Projects shown in "Selected work", in display order. Content here is taken
// from each project's own code and documentation; add a project by appending
// an entry, and give it a `caseStudy` to get a page at /work/<slug>.
//
// `demoUrl` and `repoUrl` stay null until a public URL is confirmed.
export const projects = [
  {
    slug: 'medicare',
    name: 'Medicare',
    tagline: 'Pharmacy management system',
    summary:
      'A multi-branch pharmacy management application for inventory, medicine expiry tracking, purchasing, and day-to-day sales, built so the stock count is always explainable.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Jest'],
    image: {
      src: medicareDashboard,
      width: 1194,
      height: 567,
      alt: 'Medicare dashboard showing monthly sales, transactions, items sold, and counts of low-stock, out-of-stock, and expiring products.',
    },
    demoUrl: null,
    repoUrl: 'https://github.com/strngcd/medicare-v1',
    caseStudy: {
      overview:
        'Medicare is an internal operations system for a pharmacy with more than one branch. It covers the medicine catalog and batches, branch inventory, purchasing and receiving, a point of sale, refunds and voids, transfers between branches, staff permissions, alerts, reports, and a full audit trail.',
      problem:
        'A pharmacy has to know exactly what it holds, where it holds it, and when each batch expires. When stock is tracked loosely, expired medicine can reach the counter, branches disagree about what is on the shelf, and nobody can say why a number changed. Medicare treats every change to stock as a recorded event, so the current count can always be traced back to the sales, purchases, transfers, and adjustments that produced it.',
      users: [
        'Pharmacy owners who need one view across every branch.',
        'Pharmacists and cashiers selling and receiving stock at a single branch.',
        'Administrators managing staff access, suppliers, and purchasing.',
      ],
      role: 'Designed and built the application: database schema and migrations, the Express API, business rules, the React client, and the automated test suites.',
      features: [
        'Medicine and cosmetic catalog with batches, strengths, and categories, seeded with a starter catalog of 499 medicines and 95 cosmetic products.',
        'Branch inventory backed by an append-only stock ledger with before and after quantities for every movement.',
        'Point of sale that sells first-expiring stock first (FEFO) and never sells expired batches.',
        'Purchasing and receiving, supplier payments, refunds, voids, and stock transfers between branches.',
        'Role- and branch-based permissions, with cost and profit figures hidden from staff who lack financial access.',
        'Expiry, low-stock, and out-of-stock alerts, a dashboard, and filterable reports with exports.',
        'Password-reset and account-setup emails with single-use, expiring links.',
        'A full audit trail of state changes and login history.',
      ],
      stack: [
        { label: 'Frontend', items: ['React', 'Vite', 'React Router', 'Recharts'] },
        { label: 'Backend', items: ['Node.js', 'Express', 'Zod validation', 'Nodemailer', 'PDFKit'] },
        { label: 'Data', items: ['PostgreSQL', 'Explicit SQL with pg (no ORM)', 'node-pg-migrate'] },
        { label: 'Testing', items: ['Jest', 'Supertest', 'React Testing Library'] },
      ],
      decisions: [
        {
          title: 'The server and database own every business rule',
          body: 'The client only previews totals and hides actions a user cannot take. Prices, discounts, tax, stock allocation, and permissions are recalculated on the server inside one transaction, so a modified request cannot bypass a rule.',
        },
        {
          title: 'One code path changes stock',
          body: 'Sales, receiving, refunds, voids, transfers, adjustments, and disposals all go through a single inventory ledger module. It locks the affected rows, rejects negative stock, and appends an immutable movement record.',
        },
        {
          title: 'Layered modules with explicit SQL',
          body: 'Each domain follows routes → controller → service → repository. Repositories write SQL directly and accept the active transaction, which keeps queries visible and makes multi-step operations atomic.',
        },
        {
          title: 'Rules enforced in the database as well',
          body: 'Migrations add triggers that make the stock ledger, audit log, sale lines, refunds, and receiving records append-only, block deletion of business records, and forbid negative stock. Mistakes are corrected with new records, not edits.',
        },
      ],
      challenges: [
        {
          title: 'Retries must not duplicate a sale',
          body: 'A dropped connection at the counter can cause a request to be sent twice. Critical POST requests accept an Idempotency-Key header, and a retry replays the stored response instead of creating a second transaction.',
        },
        {
          title: 'Money and dates without drift',
          body: 'Amounts are handled with decimal arithmetic and never become floating-point numbers. "Today", expiry, and report periods follow the business time zone rather than the server clock.',
        },
        {
          title: 'Deleting records that might be in use',
          body: 'A branch, staff member, or supplier created by mistake can be removed only while nothing refers to it. The check locks the record first, so a sale or purchase arriving at the same moment cannot slip past it. Deletion is soft: the row stays for the audit trail but is hidden and frozen.',
        },
        {
          title: 'Fast reports that stay exact',
          body: 'Report aggregates are cached in memory, and any successful write marks them stale, so a sale or refund appears on the next read. Cache keys include branch scope and permission flags so one user never sees another user’s view.',
        },
      ],
      quality: [
        'Server-side sessions with random tokens stored only as SHA-256 hashes, in HttpOnly, SameSite=Strict cookies.',
        'CSRF protection on every state-changing request.',
        'Passwords hashed with bcrypt, with failed logins rate-limited per email address and per IP address.',
        'Permissions recalculated on every request, including branch access checks.',
        'Secret-like fields are stripped from audit records.',
        'API, service, transaction, and security tests with Jest and Supertest, run against a dedicated PostgreSQL test database. Client tests use React Testing Library.',
      ],
      gallery: [
        {
          src: medicareInventory,
          width: 1194,
          height: 567,
          alt: 'Medicare inventory table listing products by batch and branch, with expiry date, quantity, price, stock value, and status.',
          caption: 'Inventory is tracked per batch and branch. Expired stock is kept but never sold.',
        },
        {
          src: medicareSales,
          width: 1194,
          height: 567,
          alt: 'Medicare sales list with receipt numbers, dates, branch, staff, item counts, payment method, status, and totals.',
          caption: 'Sales history with filters. Receipt numbers are random codes, not sequential IDs.',
        },
      ],
      // Optional: list of strings, written by Bilal. The section is hidden while empty.
      lessons: [],
    },
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
