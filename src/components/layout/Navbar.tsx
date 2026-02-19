'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// ─── Types ───
type DropdownId = 'shop' | 'brands' | 'collections' | 'culture' | 'currency';

// ─── Data ───
const SHOP_LINKS: { label: string; href: string; highlight?: boolean }[] = [
  { label: 'New Arrivals', href: '/shop/new-arrivals', highlight: true },
  { label: 'Dresses', href: '/shop/dresses' },
  { label: 'Tops', href: '/shop/tops' },
  { label: 'Trousers', href: '/shop/trousers' },
  { label: 'Shoes', href: '/shop/shoes' },
  { label: 'Accessories', href: '/shop/accessories' },
  { label: 'Sale', href: '/shop/sale' },
];

const FEATURED_BRANDS = [
  { name: 'Lisa Folawiyo', slug: 'lisa-folawiyo', logo: '/images/brands/lisa-folawiyo.jpg' },
  { name: 'Maki Oh', slug: 'maki-oh', logo: '/images/brands/maki-oh.jpg' },
  { name: 'Orange Culture', slug: 'orange-culture', logo: '/images/brands/orange-culture.jpg' },
  { name: 'Thebe Magugu', slug: 'thebe-magugu', logo: '/images/brands/thebe-magugu.jpg' },
] as const;

const BRAND_AZ = [
  'Adey Soile', 'Banke Kuku', 'Christie Brown', 'Duro Olowu',
  'Emmy Kasbit', 'Fruché', 'Grey', 'Imad Eduso',
  'JZO', 'Kíkí Kamanu', 'Lisa Folawiyo', 'Maki Oh',
  'Nkwo', 'Orange Culture', 'Post Imperial', 'Rich Mnisi',
  'Studio 189', 'Thebe Magugu', 'Undyed', 'Vivendii',
  'Wuman', 'XCVB', 'Zashadu',
] as const;

const COLLECTIONS = [
  { name: 'Lagos Edit', slug: 'lagos-edit', image: '/images/collections/lagos-edit.jpg' },
  { name: 'Accra Edit', slug: 'accra-edit', image: '/images/collections/accra-edit.jpg' },
  { name: 'The Wedding Season', slug: 'wedding-season', image: '/images/collections/wedding-season.jpg' },
  { name: 'Resort 25', slug: 'resort-25', image: '/images/collections/resort-25.jpg' },
] as const;

const CULTURE_LINKS = [
  { label: 'Our Story', href: '/culture/our-story', desc: 'The vision behind Kora' },
  { label: 'Fabric Encyclopedia', href: '/culture/fabrics', desc: 'Adire, Kente, Aso Oke & more' },
  { label: 'Designer Spotlights', href: '/culture/designers', desc: 'In-depth profiles & interviews' },
  { label: 'Regional Guides', href: '/culture/regions', desc: 'Fashion across the continent' },
  { label: 'The Kora Glossary', href: '/culture/glossary', desc: 'Terms, techniques & traditions' },
] as const;

const CURRENCIES = [
  { code: 'NGN', symbol: '₦', label: 'Nigerian Naira' },
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
] as const;

// ─── Animation Variants ───
const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' as const } },
};

const mobileMenuVariants: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'tween' as const, duration: 0.3, ease: 'easeOut' as const } },
  exit: { x: '100%', transition: { type: 'tween' as const, duration: 0.25, ease: 'easeIn' as const } },
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Icons ───
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── Dropdown Components ───
function ShopDropdown() {
  return (
    <div className="py-4 px-6">
      <ul className="space-y-1" role="menu">
        {SHOP_LINKS.map((link) => (
          <li key={link.href} role="none">
            <Link
              href={link.href}
              role="menuitem"
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-offwhite ${
                link.highlight
                  ? 'font-semibold text-gold'
                  : 'text-charcoal'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrandsDropdown() {
  return (
    <div className="grid grid-cols-2 gap-8 p-6" style={{ minWidth: 520 }}>
      {/* Left — Featured Brands */}
      <div>
        <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-charcoal/60">
          Featured Brands
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {FEATURED_BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group flex flex-col items-center gap-2 rounded-lg border border-offwhite p-3 transition-colors hover:border-gold/40 hover:bg-offwhite/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-offwhite text-xs font-semibold text-forest">
                {brand.name.charAt(0)}
              </div>
              <span className="text-center text-xs font-medium text-charcoal group-hover:text-gold">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right — A-Z List */}
      <div>
        <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-charcoal/60">
          All Brands A–Z
        </h3>
        <div className="max-h-52 space-y-0.5 overflow-y-auto pr-2">
          {BRAND_AZ.map((name) => (
            <Link
              key={name}
              href={`/brands/${name.toLowerCase().replace(/\s+/g, '-')}`}
              className="block rounded px-2 py-1 text-xs text-charcoal/80 transition-colors hover:bg-offwhite hover:text-charcoal"
            >
              {name}
            </Link>
          ))}
        </div>
        <Link
          href="/brands"
          className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-light"
        >
          View All Brands &rarr;
        </Link>
      </div>
    </div>
  );
}

function CollectionsDropdown() {
  return (
    <div className="p-6" style={{ minWidth: 440 }}>
      <div className="grid grid-cols-2 gap-4">
        {COLLECTIONS.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group overflow-hidden rounded-lg"
          >
            <div className="relative aspect-[4/3] w-full bg-offwhite">
              <div className="absolute inset-0 flex items-center justify-center bg-forest/10 text-sm font-medium text-forest transition-colors group-hover:bg-forest/20">
                {col.name}
              </div>
            </div>
            <p className="mt-2 text-center text-xs font-semibold text-charcoal group-hover:text-gold">
              {col.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/collections"
          className="text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-light"
        >
          View All Collections &rarr;
        </Link>
      </div>
    </div>
  );
}

function CultureDropdown() {
  return (
    <div className="py-4 px-6" style={{ minWidth: 280 }}>
      <ul className="space-y-1" role="menu">
        {CULTURE_LINKS.map((link) => (
          <li key={link.href} role="none">
            <Link
              href={link.href}
              role="menuitem"
              className="block rounded-md px-3 py-2.5 transition-colors hover:bg-offwhite"
            >
              <span className="text-sm font-medium text-charcoal">{link.label}</span>
              <span className="mt-0.5 block text-xs text-charcoal/50">{link.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CurrencyDropdown({ selected, onSelect }: { selected: string; onSelect: (code: string) => void }) {
  return (
    <div className="py-2 px-1" style={{ minWidth: 160 }}>
      <ul role="menu">
        {CURRENCIES.map((cur) => (
          <li key={cur.code} role="none">
            <button
              role="menuitem"
              onClick={() => onSelect(cur.code)}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-offwhite ${
                selected === cur.code ? 'font-semibold text-gold' : 'text-charcoal'
              }`}
            >
              <span className="w-5 text-center">{cur.symbol}</span>
              <span>{cur.code}</span>
              <span className="ml-auto text-xs text-charcoal/40">{cur.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Desktop Nav Item with Dropdown ───
function NavItem({
  id,
  label,
  isOpen,
  onOpen,
  onClose,
  children,
}: {
  id: DropdownId;
  label: string;
  isOpen: boolean;
  onOpen: (id: DropdownId) => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onOpen(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(onClose, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      isOpen ? onClose() : onOpen(id);
    }
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 font-body text-sm font-medium uppercase tracking-wider transition-colors hover:text-gold ${
          isOpen ? 'text-gold' : 'text-charcoal'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onKeyDown={handleKeyDown}
      >
        {label}
        <ChevronDownIcon
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
        {isOpen && (
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 top-full z-50 mt-2 rounded-lg border border-offwhite bg-white shadow-xl"
            role="menu"
            aria-label={`${label} menu`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Accordion Section ───
function MobileSection({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-offwhite">
      <button
        className="flex w-full items-center justify-between py-4 font-body text-sm font-semibold uppercase tracking-wider text-charcoal"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDownIcon
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Navbar ───
export function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currency, setCurrency] = useState('NGN');
  const navRef = useRef<HTMLElement>(null);

  const closeAll = useCallback(() => setOpenDropdown(null), []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeAll();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeAll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleCurrencySelect = (code: string) => {
    setCurrency(code);
    closeAll();
  };

  const currentCurrencySymbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? '₦';

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 border-b border-offwhite bg-white/95 backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* ─── Left: Logo ─── */}
        <Link
          href="/"
          className="font-heading text-2xl font-bold tracking-tight text-forest"
          aria-label="Kora home"
        >
          Kora
        </Link>

        {/* ─── Center: Desktop Nav ─── */}
        <div className="hidden items-center gap-8 lg:flex">
          <NavItem id="shop" label="Shop" isOpen={openDropdown === 'shop'} onOpen={setOpenDropdown} onClose={closeAll}>
            <ShopDropdown />
          </NavItem>

          <NavItem id="brands" label="Brands" isOpen={openDropdown === 'brands'} onOpen={setOpenDropdown} onClose={closeAll}>
            <BrandsDropdown />
          </NavItem>

          <NavItem id="collections" label="Collections" isOpen={openDropdown === 'collections'} onOpen={setOpenDropdown} onClose={closeAll}>
            <CollectionsDropdown />
          </NavItem>

          <NavItem id="culture" label="Culture" isOpen={openDropdown === 'culture'} onOpen={setOpenDropdown} onClose={closeAll}>
            <CultureDropdown />
          </NavItem>

          <Link
            href="/partners"
            className="font-body text-sm font-medium uppercase tracking-wider text-charcoal transition-colors hover:text-gold"
          >
            Become a Partner
          </Link>
        </div>

        {/* ─── Right: Actions ─── */}
        <div className="flex items-center gap-3">
          {/* Currency Selector (desktop) */}
          <div className="relative hidden lg:block">
            <button
              className={`flex items-center gap-1 rounded-md px-2 py-1 font-body text-sm font-medium transition-colors hover:text-gold ${
                openDropdown === 'currency' ? 'text-gold' : 'text-charcoal'
              }`}
              onClick={() => setOpenDropdown(openDropdown === 'currency' ? null : 'currency')}
              aria-expanded={openDropdown === 'currency'}
              aria-haspopup="true"
              aria-label="Select currency"
            >
              {currentCurrencySymbol} {currency}
              <ChevronDownIcon
                className={`transition-transform ${openDropdown === 'currency' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openDropdown === 'currency' && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 top-full z-50 mt-2 rounded-lg border border-offwhite bg-white shadow-xl"
                  role="menu"
                  aria-label="Currency menu"
                >
                  <CurrencyDropdown selected={currency} onSelect={handleCurrencySelect} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Icon Buttons */}
          <Link href="/search" className="p-2 text-charcoal transition-colors hover:text-gold" aria-label="Search">
            <SearchIcon />
          </Link>
          <Link href="/wishlist" className="hidden p-2 text-charcoal transition-colors hover:text-gold sm:block" aria-label="Wishlist">
            <HeartIcon />
          </Link>
          <Link href="/account" className="hidden p-2 text-charcoal transition-colors hover:text-gold sm:block" aria-label="Account">
            <UserIcon />
          </Link>
          <Link href="/cart" className="p-2 text-charcoal transition-colors hover:text-gold" aria-label="Shopping bag">
            <BagIcon />
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="p-2 text-charcoal lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>
        </div>
      </div>

      {/* ─── Mobile Full-Screen Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-over Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-offwhite px-6 py-4">
                <span className="font-heading text-xl font-bold text-forest">Kora</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-charcoal"
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6">
                {/* Shop */}
                <MobileSection label="Shop" defaultOpen>
                  <ul className="space-y-1">
                    {SHOP_LINKS.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block rounded-md px-3 py-2 text-sm ${
                            link.highlight ? 'font-semibold text-gold' : 'text-charcoal/80'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </MobileSection>

                {/* Brands */}
                <MobileSection label="Brands">
                  <div className="mb-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-charcoal/50">Featured</p>
                    <div className="grid grid-cols-2 gap-2">
                      {FEATURED_BRANDS.map((brand) => (
                        <Link
                          key={brand.slug}
                          href={`/brands/${brand.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 rounded-md border border-offwhite p-2 text-xs font-medium text-charcoal"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-offwhite text-[10px] font-bold text-forest">
                            {brand.name.charAt(0)}
                          </span>
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/brands"
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-semibold uppercase tracking-wider text-gold"
                  >
                    View All Brands &rarr;
                  </Link>
                </MobileSection>

                {/* Collections */}
                <MobileSection label="Collections">
                  <div className="grid grid-cols-2 gap-3">
                    {COLLECTIONS.map((col) => (
                      <Link
                        key={col.slug}
                        href={`/collections/${col.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="group"
                      >
                        <div className="aspect-[4/3] rounded-md bg-offwhite flex items-center justify-center text-xs font-medium text-forest">
                          {col.name}
                        </div>
                        <p className="mt-1 text-center text-xs font-medium text-charcoal">
                          {col.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Link
                      href="/collections"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-semibold uppercase tracking-wider text-gold"
                    >
                      View All Collections &rarr;
                    </Link>
                  </div>
                </MobileSection>

                {/* Culture */}
                <MobileSection label="Culture">
                  <ul className="space-y-1">
                    {CULTURE_LINKS.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md px-3 py-2"
                        >
                          <span className="text-sm font-medium text-charcoal">{link.label}</span>
                          <span className="mt-0.5 block text-xs text-charcoal/50">{link.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </MobileSection>

                {/* Become a Partner */}
                <div className="border-b border-offwhite py-4">
                  <Link
                    href="/partners"
                    onClick={() => setMobileOpen(false)}
                    className="font-body text-sm font-semibold uppercase tracking-wider text-charcoal"
                  >
                    Become a Partner
                  </Link>
                </div>

                {/* Currency (mobile) */}
                <div className="border-b border-offwhite py-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-charcoal/50">Currency</p>
                  <div className="flex gap-2">
                    {CURRENCIES.map((cur) => (
                      <button
                        key={cur.code}
                        onClick={() => setCurrency(cur.code)}
                        className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                          currency === cur.code
                            ? 'border-gold bg-gold/10 text-gold'
                            : 'border-offwhite text-charcoal/70 hover:border-gold/40'
                        }`}
                      >
                        {cur.symbol} {cur.code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Footer Links */}
              <div className="border-t border-offwhite px-6 py-4">
                <div className="flex justify-around">
                  <Link href="/search" onClick={() => setMobileOpen(false)} className="flex flex-col items-center gap-1 text-charcoal" aria-label="Search">
                    <SearchIcon />
                    <span className="text-[10px] uppercase tracking-wider">Search</span>
                  </Link>
                  <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex flex-col items-center gap-1 text-charcoal" aria-label="Wishlist">
                    <HeartIcon />
                    <span className="text-[10px] uppercase tracking-wider">Wishlist</span>
                  </Link>
                  <Link href="/account" onClick={() => setMobileOpen(false)} className="flex flex-col items-center gap-1 text-charcoal" aria-label="Account">
                    <UserIcon />
                    <span className="text-[10px] uppercase tracking-wider">Account</span>
                  </Link>
                  <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex flex-col items-center gap-1 text-charcoal" aria-label="Cart">
                    <BagIcon />
                    <span className="text-[10px] uppercase tracking-wider">Cart</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
