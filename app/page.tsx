'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Copy,
  Filter,
  HelpCircle,
  LayoutDashboard,
  MapPin,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Sun,
  Moon,
  Sparkles,
  Ticket,
  UserRound,
  Users,
  X,
  Zap,
} from 'lucide-react'

const roles = ['Member', 'Instructor', 'Admin'] as const
type Role = (typeof roles)[number]

type Event = {
  title: string
  date: string
  day: string
  time: string
  format: string
  location: string
  topic: string
  attendees: number
  capacity: number
  image: string
  accent: string
  speaker: string
  initials: string
}

const events: Event[] = [
  {
    title: 'Build with Generative AI on AWS',
    date: 'OCT 24',
    day: '24',
    time: '10:00 AM – 1:00 PM PST',
    format: 'Online',
    location: 'AWS Virtual Event',
    topic: 'GenAI',
    attendees: 45,
    capacity: 50,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85',
    accent: '#b45c34',
    speaker: 'Maya Chen',
    initials: 'MC',
  },
  {
    title: 'Serverless Patterns Workshop',
    date: 'NOV 02',
    day: '02',
    time: '9:00 AM – 12:00 PM PST',
    format: 'In-person',
    location: 'Seattle, WA',
    topic: 'Serverless',
    attendees: 32,
    capacity: 60,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    accent: '#315f78',
    speaker: 'Ravi Patel',
    initials: 'RP',
  },
  {
    title: 'Architecting for the Future',
    date: 'NOV 14',
    day: '14',
    time: '1:00 PM – 3:30 PM PST',
    format: 'Hybrid',
    location: 'Austin, TX + Online',
    topic: 'Architecture',
    attendees: 78,
    capacity: 100,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
    accent: '#304d79',
    speaker: 'Jordan Lee',
    initials: 'JL',
  },
]

const topics = ['All topics', 'GenAI', 'DevOps', 'Serverless', 'Security', 'Architecture']
const ownedEvents = [
  { title: 'AWS Community Day: Portland', date: 'DEC 08', status: 'Published', attendees: '186 registered' },
  { title: 'Intro to Amazon Bedrock', date: 'NOV 22', status: 'Approved', attendees: '42 registered' },
  { title: 'Cloud Cost Optimization 101', date: 'JAN 16', status: 'Draft', attendees: 'Not published' },
]
const attendees = [
  { name: 'Nadia Williams', email: 'nadia.w@example.com', ticket: 'EVT-2048', status: 'Checked in', initials: 'NW' },
  { name: 'Owen Wright', email: 'owen.w@example.com', ticket: 'EVT-2049', status: 'Not checked in', initials: 'OW' },
  { name: 'Priya Shah', email: 'priya.s@example.com', ticket: 'EVT-2050', status: 'Not checked in', initials: 'PS' },
  { name: 'Marcus Green', email: 'marcus.g@example.com', ticket: 'EVT-2051', status: 'Checked in', initials: 'MG' },
]

function Logo() {
  return <div className="flex items-center gap-2.5"><div className="grid size-8 place-items-center rounded-lg bg-[#ff9900] text-[#111827]"><Zap className="size-4 fill-current" /></div><span className="text-[15px] font-semibold tracking-tight text-white">aws<span className="text-[#ff9900]">//</span>community</span></div>
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = { Published: 'border-[#2d7759]/40 bg-[#163a2f] text-[#75d4ad]', Approved: 'border-[#315d87]/50 bg-[#172d43] text-[#8dbcf0]', Draft: 'border-white/10 bg-white/[0.05] text-[#a9b1c1]', 'Under Review': 'border-[#8d6a2a]/40 bg-[#3b2d12] text-[#f3c66b]' }
  return <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${styles[status] || styles.Draft}`}>{status}</span>
}

function Metric({ icon: Icon, label, value, detail }: { icon: typeof Users; label: string; value: string; detail: string }) {
  return <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"><div className="mb-3 flex items-center gap-2 text-xs text-[#8993a6]"><Icon className="size-3.5 text-[#ff9900]" />{label}</div><div className="text-2xl font-semibold tracking-tight text-white">{value}</div><div className="mt-1 text-xs text-[#697386]">{detail}</div></div>
}

export default function Page() {
  const [role, setRole] = useState<Role>('Member')
  const [topic, setTopic] = useState('All topics')
  const [query, setQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [registered, setRegistered] = useState<string[]>([])
  const [checkedIn, setCheckedIn] = useState<string[]>(['Nadia Williams', 'Marcus Green'])
  const [reviewed, setReviewed] = useState<string[]>([])
  const [mobileNav, setMobileNav] = useState(false)
  const [lightCopy, setLightCopy] = useState(false)

  const filteredEvents = useMemo(() => events.filter((event) => (topic === 'All topics' || event.topic === topic) && event.title.toLowerCase().includes(query.toLowerCase())), [topic, query])
  const activeRoleDescription = role === 'Member' ? 'Discover events, meet builders, and grow your cloud skills.' : role === 'Instructor' ? 'Create memorable learning experiences for your community.' : 'Keep the AWS community safe, relevant, and growing.'

  const register = (title: string) => setRegistered((current) => current.includes(title) ? current : [...current, title])

  return <div className={`min-h-screen bg-[#090d16] text-[#f4f6fb] ${lightCopy ? 'light-copy' : ''}`}>
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#090d16]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center gap-4 px-4 sm:gap-5 sm:px-5 lg:px-8">
        <button aria-label="Open navigation" className="rounded-md p-2 text-[#8993a6] hover:bg-white/5 lg:hidden" onClick={() => setMobileNav(!mobileNav)}><Menu className="size-5" /></button>
        <Logo />
        <div className="hidden h-7 w-px bg-white/10 lg:block" />
        <nav className={`${mobileNav ? 'absolute left-4 right-4 top-16 flex' : 'hidden'} flex-col gap-1 rounded-xl border border-white/10 bg-[#101722] p-3 shadow-2xl lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
          {['Discover', 'My events', 'Community'].map((item, index) => <button key={item} className={`rounded-md px-3 py-2 text-sm ${index === 0 ? 'bg-white/[0.07] text-white' : 'text-[#8993a6] hover:text-white'}`}>{item}</button>)}
          <div className="my-1 border-t border-white/10 lg:hidden" />
          <div className="flex gap-2 pt-1 lg:hidden">
            <Link href="/login?mode=signin" className="flex-1 rounded-lg border border-white/10 bg-white/5 py-2 text-center text-xs font-medium text-[#c5cfdd]">Đăng nhập</Link>
            <Link href="/login?mode=signup" className="flex-1 rounded-lg bg-[#ff9900] py-2 text-center text-xs font-semibold text-[#17110a]">Đăng ký</Link>
          </div>
        </nav>
        <div className="relative ml-auto hidden min-w-0 max-w-[300px] flex-1 md:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#697386]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events, topics, people..." className="h-9 w-full rounded-lg border border-white/[0.1] bg-white/[0.035] pl-9 pr-3 text-sm text-white outline-none placeholder:text-[#697386] focus:border-[#ff9900]/60" /></div>
        <div className="flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.035] p-1"><span className="hidden px-2 text-[11px] font-medium uppercase tracking-wider text-[#697386] xl:block">View as</span>{roles.map((item) => <button key={item} onClick={() => setRole(item)} className={`rounded-full px-2.5 py-1.5 text-[11px] font-medium transition ${role === item ? 'bg-[#ff9900] text-[#17110a]' : 'text-[#8d98aa] hover:text-white'}`}>{item}</button>)}</div>
        <button aria-label={lightCopy ? 'Use dark copy' : 'Use white copy'} onClick={() => setLightCopy((current) => !current)} className="rounded-md p-2 text-[#8993a6] hover:bg-white/5" title={lightCopy ? 'Use dark copy' : 'Use white copy'}>{lightCopy ? <Moon className="size-4" /> : <Sun className="size-4" />}</button>
        <button aria-label="Open help" className="hidden rounded-md p-2 text-[#8993a6] hover:bg-white/5 sm:block"><HelpCircle className="size-4" /></button>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/login?mode=signin"
            className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-[#c5cfdd] transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            Đăng nhập
          </Link>
          <Link
            href="/login?mode=signup"
            className="rounded-lg bg-[#ff9900] px-3 py-1.5 text-xs font-semibold text-[#17110a] transition hover:bg-[#ffad3e] shadow-sm"
          >
            Đăng ký
          </Link>
          <Link
            href="/login"
            title="Tài khoản cá nhân"
            className="grid size-8 place-items-center rounded-full bg-[#294965] text-xs font-semibold text-[#b8defb] transition hover:ring-2 hover:ring-[#ff9900]/50"
          >
            AL
          </Link>
        </div>
      </div>
    </header>

    <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 lg:px-8">
      <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#ffad3e]"><Sparkles className="size-3.5" />AWS CLOUD DEVELOPER COMMUNITY</div><h1 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{role === 'Member' ? 'Find your next cloud chapter.' : role === 'Instructor' ? 'Your community, in motion.' : 'Community operations center.'}</h1><p className="mt-2 max-w-xl text-sm text-[#8993a6]">{activeRoleDescription}</p></div><div className="flex gap-2"><Button variant="outline" className="border-white/10 bg-white/[0.035] text-[#ccd4e1] hover:bg-white/[0.08]" onClick={() => setTopic('All topics')}><Filter data-icon="inline-start" />All filters</Button><Button className="bg-[#ff9900] text-[#17110a] hover:bg-[#ffad3e]" onClick={() => setRole(role === 'Member' ? 'Instructor' : role === 'Instructor' ? 'Admin' : 'Member')}><LayoutDashboard data-icon="inline-start" />Switch workspace</Button></div></div>

      {role === 'Member' && <>
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-[#ff9900]/20 bg-[radial-gradient(circle_at_85%_15%,rgba(255,153,0,0.16),transparent_36%),linear-gradient(115deg,#121d2b,#101722_58%,#101923)] px-6 py-7 sm:px-8"><div className="relative max-w-2xl"><span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-[#b7c1d1]"><Activity className="size-3.5 text-[#ff9900]" />12 events happening this month</span><h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Learn. Build. Connect.</h2><p className="mt-2 max-w-lg text-sm leading-6 text-[#98a4b7]">Hands-on workshops, architecture deep dives, and conversations with the people shaping what&apos;s next on AWS.</p><div className="mt-5 flex max-w-xl items-center gap-2 rounded-xl border border-white/10 bg-[#090d16]/60 p-1.5"><Search className="ml-2 size-4 text-[#7e8b9e]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by event, topic, or location" className="h-9 min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-[#697386]" /><Button size="sm" className="bg-[#ff9900] text-[#17110a] hover:bg-[#ffad3e]">Search</Button></div></div><div className="pointer-events-none absolute -right-12 -top-16 hidden size-64 rounded-full border border-[#ff9900]/10 sm:block" /><div className="pointer-events-none absolute -right-4 -top-8 hidden size-48 rounded-full border border-[#ff9900]/10 sm:block" /></section>
        <div className="mb-5 flex items-center justify-between"><div className="flex gap-2 overflow-x-auto pb-1">{topics.map((item) => <button key={item} onClick={() => setTopic(item)} className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-medium transition ${topic === item ? 'border-[#ff9900]/50 bg-[#ff9900]/10 text-[#ffb340]' : 'border-white/10 bg-white/[0.025] text-[#8993a6] hover:border-white/20 hover:text-white'}`}>{item}</button>)}</div><span className="hidden text-xs text-[#697386] sm:block">{filteredEvents.length} upcoming events</span></div>
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredEvents.map((event) => { const isRegistered = registered.includes(event.title); return <article key={event.title} className="group overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101722] transition hover:-translate-y-0.5 hover:border-white/20"><div className="relative h-40 overflow-hidden" style={{ background: event.accent }}><img src={event.image} alt="" className="h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#101722] via-transparent to-black/10" /><div className="absolute left-4 top-4 flex items-start gap-2"><div className="rounded-lg border border-white/20 bg-[#0b111a]/85 px-2.5 py-2 text-center backdrop-blur"><div className="text-[10px] font-semibold tracking-widest text-[#ffad3e]">{event.date.split(' ')[0]}</div><div className="text-xl font-semibold leading-5 text-white">{event.day}</div></div><span className="rounded-full border border-white/15 bg-[#0b111a]/75 px-2.5 py-1 text-[10px] font-medium text-[#dce3ee] backdrop-blur">{event.format}</span></div></div><div className="p-5"><div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-medium uppercase tracking-wider text-[#ffad3e]">{event.topic}</span><button aria-label="More event options" className="text-[#697386] hover:text-white"><MoreHorizontal className="size-4" /></button></div><h3 className="min-h-12 text-[17px] font-semibold leading-6 text-white">{event.title}</h3><div className="mt-3 flex flex-col gap-2 text-xs text-[#8d98aa]"><span className="flex items-center gap-2"><Clock3 className="size-3.5 text-[#697386]" />{event.time}</span><span className="flex items-center gap-2"><MapPin className="size-3.5 text-[#697386]" />{event.location}</span></div><div className="mt-5"><div className="mb-2 flex justify-between text-xs"><span className="text-[#8993a6]">{event.attendees}/{event.capacity} registered</span><span className="text-[#aeb8c8]">{Math.round(event.attendees / event.capacity * 100)}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full rounded-full bg-[#ff9900]" style={{ width: `${event.attendees / event.capacity * 100}%` }} /></div></div><div className="mt-5 flex gap-2"><Button variant="outline" className="flex-1 border-white/10 bg-transparent text-[#c5cfdd] hover:bg-white/[0.06]" onClick={() => setSelectedEvent(event)}>View details</Button><Button className="flex-1 bg-[#ff9900] text-[#17110a] hover:bg-[#ffad3e]" onClick={() => register(event.title)}>{isRegistered ? <><Check data-icon="inline-start" />Registered</> : <><Ticket data-icon="inline-start" />Register</>}</Button></div></div></article> })}</section>
      </>}

      {role === 'Instructor' && <InstructorView onCreate={() => setSelectedEvent(events[0])} />}
      {role === 'Admin' && <AdminView reviewed={reviewed} onReview={(title) => setReviewed((current) => [...current, title])} />}
    </main>

    {selectedEvent && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" onClick={() => setSelectedEvent(null)}><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-white/10 bg-[#101722] shadow-2xl sm:rounded-2xl" onClick={(event) => event.stopPropagation()}><div className="relative h-36 overflow-hidden sm:h-44"><img src={selectedEvent.image} alt="" className="h-full w-full object-cover opacity-70" /><div className="absolute inset-0 bg-gradient-to-t from-[#101722] to-transparent" /><button aria-label="Close details" onClick={() => setSelectedEvent(null)} className="absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"><X className="size-4" /></button><div className="absolute bottom-5 left-6"><span className="text-xs font-medium uppercase tracking-wider text-[#ffad3e]">{selectedEvent.topic} · {selectedEvent.format}</span><h2 className="mt-1 text-2xl font-semibold text-white">{selectedEvent.title}</h2></div></div><div className="grid gap-6 p-6 sm:grid-cols-[1fr_190px]"><div><div className="flex flex-wrap gap-4 text-xs text-[#a0abba]"><span className="flex items-center gap-2"><CalendarDays className="size-4 text-[#ff9900]" />{selectedEvent.date}, 2026</span><span className="flex items-center gap-2"><MapPin className="size-4 text-[#ff9900]" />{selectedEvent.location}</span></div><div className="mt-6"><h3 className="mb-3 text-sm font-semibold text-white">Agenda</h3><div className="flex flex-col gap-3 border-l border-white/10 pl-4 text-sm"><div><span className="text-xs text-[#ff9900]">10:00 AM</span><p className="mt-1 text-[#b8c2d1]">Welcome &amp; community connections</p></div><div><span className="text-xs text-[#ff9900]">10:30 AM</span><p className="mt-1 text-[#b8c2d1]">{selectedEvent.topic} in practice</p></div><div><span className="text-xs text-[#ff9900]">12:15 PM</span><p className="mt-1 text-[#b8c2d1]">Open Q&amp;A and next steps</p></div></div></div></div><div className="rounded-xl border border-white/10 bg-white/[0.03] p-4"><div className="mb-4 text-xs text-[#8993a6]">Hosted by</div><div className="flex items-center gap-2"><div className="grid size-8 place-items-center rounded-full bg-[#294965] text-[10px] font-semibold">{selectedEvent.initials}</div><div><div className="text-sm font-medium text-white">{selectedEvent.speaker}</div><div className="text-[11px] text-[#8993a6]">AWS Community Builder</div></div></div><div className="my-4 h-px bg-white/[0.08]" /><div className="mb-2 flex justify-between text-xs"><span className="text-[#8993a6]">Remaining spots</span><span className="text-white">{selectedEvent.capacity - selectedEvent.attendees}</span></div><div className="h-1.5 rounded-full bg-white/[0.08]"><div className="h-full w-[90%] rounded-full bg-[#ff9900]" /></div><Button className="mt-5 w-full bg-[#ff9900] text-[#17110a] hover:bg-[#ffad3e]" onClick={() => { register(selectedEvent.title); setSelectedEvent(null) }}>{registered.includes(selectedEvent.title) ? 'You are registered' : 'Register now'}</Button><button className="mt-3 flex w-full items-center justify-center gap-1.5 text-xs text-[#8993a6] hover:text-white"><CalendarDays className="size-3.5" />Add to calendar</button></div></div></div></div>}
  </div>
}

function InstructorView({ onCreate }: { onCreate: () => void }) {
  const [filter, setFilter] = useState('All')
  const [attendeeSearch, setAttendeeSearch] = useState('')
  const [localChecked, setLocalChecked] = useState<string[]>(['Nadia Williams', 'Marcus Green'])
  const filtered = attendees.filter((person) => person.name.toLowerCase().includes(attendeeSearch.toLowerCase()) || person.email.toLowerCase().includes(attendeeSearch.toLowerCase()))
  return <div><div className="mb-7 grid gap-4 sm:grid-cols-3"><Metric icon={CalendarDays} label="Your events" value="12" detail="3 drafts need attention" /><Metric icon={Users} label="Total attendance" value="1,248" detail="+18% from last month" /><Metric icon={CheckCircle2} label="Avg. check-in" value="92%" detail="Across published events" /></div><div className="grid gap-5 xl:grid-cols-[1.15fr_1fr]"><section className="rounded-2xl border border-white/[0.09] bg-[#101722] p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-medium uppercase tracking-wider text-[#ffad3e]">Instructor studio</p><h2 className="mt-1 text-lg font-semibold text-white">Your events</h2></div><Button className="bg-[#ff9900] text-[#17110a] hover:bg-[#ffad3e]" onClick={onCreate}><Plus data-icon="inline-start" />Create event</Button></div><div className="flex gap-2 border-b border-white/[0.08] pb-4">{['All', 'Published', 'Under Review', 'Draft'].map((item) => <button key={item} onClick={() => setFilter(item)} className={`text-xs ${filter === item ? 'font-medium text-[#ffad3e]' : 'text-[#697386]'}`}>{item}</button>)}</div><div className="mt-2 flex flex-col">{ownedEvents.filter((item) => filter === 'All' || item.status === filter).map((item) => <div key={item.title} className="flex items-center gap-3 border-b border-white/[0.06] py-4 last:border-0"><div className="grid size-10 shrink-0 place-items-center rounded-lg border border-[#ff9900]/20 bg-[#ff9900]/10 text-xs font-semibold text-[#ffad3e]">{item.date.split(' ')[1]}</div><div className="min-w-0 flex-1"><div className="truncate text-sm font-medium text-white">{item.title}</div><div className="mt-1 text-xs text-[#697386]">{item.attendees}</div></div><StatusPill status={item.status} /><button aria-label={`Open ${item.title}`} className="text-[#697386] hover:text-white"><ArrowUpRight className="size-4" /></button></div>)}</div></section><section className="rounded-2xl border border-white/[0.09] bg-[#101722] p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-medium uppercase tracking-wider text-[#ffad3e]">Live desk</p><h2 className="mt-1 text-lg font-semibold text-white">Check-in attendees</h2></div><span className="rounded-full bg-[#163a2f] px-2.5 py-1 text-[11px] text-[#75d4ad]">Live now</span></div><div className="relative mb-3"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#697386]" /><input value={attendeeSearch} onChange={(event) => setAttendeeSearch(event.target.value)} placeholder="Search attendees..." className="h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 text-sm text-white outline-none placeholder:text-[#697386]" /></div><div className="flex flex-col">{filtered.map((person) => { const checked = localChecked.includes(person.name); return <div key={person.name} className="flex items-center gap-3 border-b border-white/[0.06] py-3 last:border-0"><div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#294965] text-[10px] font-semibold text-[#b8defb]">{person.initials}</div><div className="min-w-0 flex-1"><div className="truncate text-sm text-white">{person.name}</div><div className="truncate text-[11px] text-[#697386]">{person.email}</div></div><button onClick={() => setLocalChecked((current) => checked ? current.filter((name) => name !== person.name) : [...current, person.name])} className={`rounded-md border px-2.5 py-1.5 text-[11px] font-medium ${checked ? 'border-[#2d7759]/40 bg-[#163a2f] text-[#75d4ad]' : 'border-white/10 text-[#aab4c3] hover:bg-white/5'}`}>{checked ? 'Checked in' : 'Check in'}</button></div>})}</div></section></div></div>
}

function AdminView({ reviewed, onReview }: { reviewed: string[]; onReview: (title: string) => void }) {
  const queue = [{ title: 'AWS Community Day: Portland', owner: 'Sarah Kim', submitted: '2h ago', topic: 'Community Day' }, { title: 'FinOps Foundations Workshop', owner: 'Derek Wong', submitted: '5h ago', topic: 'Cost Optimization' }, { title: 'Secure by Design: API Gateway', owner: 'Lena Ortiz', submitted: 'Yesterday', topic: 'Security' }]
  return <div><div className="mb-7 grid gap-4 sm:grid-cols-3"><Metric icon={ShieldCheck} label="Pending review" value="08" detail="2 high priority" /><Metric icon={Users} label="Active members" value="24.8k" detail="+6.4% this quarter" /><Metric icon={Activity} label="Published events" value="184" detail="This calendar year" /></div><div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]"><section className="rounded-2xl border border-white/[0.09] bg-[#101722] p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-medium uppercase tracking-wider text-[#ffad3e]">Moderation queue</p><h2 className="mt-1 text-lg font-semibold text-white">Events awaiting review</h2></div><button className="text-xs text-[#8993a6] hover:text-white">View all <ArrowUpRight className="ml-1 inline size-3" /></button></div><div className="flex flex-col gap-3">{queue.map((item) => { const done = reviewed.includes(item.title); return <div key={item.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"><div className="flex items-start gap-3"><div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#ff9900]/10 text-[#ffad3e]"><Code2 className="size-4" /></div><div className="min-w-0 flex-1"><div className="text-sm font-medium text-white">{item.title}</div><div className="mt-1 text-xs text-[#697386]">{item.owner} · {item.topic} · submitted {item.submitted}</div></div><StatusPill status={done ? 'Approved' : 'Under Review'} /></div>{!done && <div className="mt-4 flex gap-2"><Button size="sm" className="bg-[#ff9900] text-[#17110a] hover:bg-[#ffad3e]" onClick={() => onReview(item.title)}><Check data-icon="inline-start" />Quick approve</Button><Button size="sm" variant="outline" className="border-white/10 bg-transparent text-[#c5cfdd] hover:bg-white/[0.06]" onClick={() => onReview(item.title)}>Reject</Button></div>}</div>})}</div></section><section className="rounded-2xl border border-white/[0.09] bg-[#101722] p-5"><div className="mb-6"><p className="text-xs font-medium uppercase tracking-wider text-[#ffad3e]">Audit trail</p><h2 className="mt-1 text-lg font-semibold text-white">Event lifecycle</h2></div><div className="flex flex-col gap-0">{['Published', 'Approved', 'Submitted', 'Created'].map((label, index) => <div key={label} className="relative flex gap-4 pb-6 last:pb-0"><div className="relative flex flex-col items-center"><div className={`grid size-7 place-items-center rounded-full border ${index === 0 ? 'border-[#ff9900]/50 bg-[#ff9900]/15 text-[#ffad3e]' : 'border-white/10 bg-white/[0.04] text-[#697386]'}`}>{index === 0 ? <Check className="size-3.5" /> : <span className="size-1.5 rounded-full bg-current" />}</div>{index < 3 && <div className="absolute top-7 h-full w-px bg-white/10" />}</div><div className="pt-1"><div className="text-sm font-medium text-white">{label}</div><div className="mt-1 text-xs text-[#697386]">{index === 0 ? 'Oct 18, 2026 · System' : index === 1 ? 'Oct 17, 2026 · Admin review' : index === 2 ? 'Oct 16, 2026 · Sarah Kim' : 'Oct 15, 2026 · Sarah Kim'}</div></div></div>)}</div><div className="mt-5 rounded-xl border border-[#ff9900]/20 bg-[#ff9900]/[0.06] p-4"><div className="flex gap-3"><Copy className="mt-0.5 size-4 text-[#ff9900]" /><div><div className="text-sm font-medium text-white">Every action is traceable</div><p className="mt-1 text-xs leading-5 text-[#8993a6]">Audit records are immutable and retained for compliance reporting.</p></div></div></div></section></div></div>
}
