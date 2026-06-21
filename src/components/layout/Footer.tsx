export default function Footer() {
  return (
    <footer className="mt-14 flex flex-wrap justify-between gap-3 border-t border-line py-7 pb-16 font-mono text-[12.5px] text-muted">
      <span>© 2026 Jestin Coler — built in the open</span>
      <span className="flex gap-3">
        <a href="https://github.com/jcoler76" className="hover:text-accent">github</a>
        <a href="mailto:jestin@jestincoler.com" className="hover:text-accent">email</a>
      </span>
    </footer>
  );
}
