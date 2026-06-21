import { about } from "@/content/about";

export default function WhoamiBlock() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#232b34] bg-[#0d1117] shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-[#232b34] bg-[#0a0e13] px-3.5 py-2.5">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-[12.5px] text-[#6b7785]">jestin@portfolio: ~</span>
      </div>
      <div className="p-5 font-mono text-[13.5px] leading-[1.7] text-[#c9d1d9]">
        <p>
          <span className="text-[#56d364]">jestin@portfolio</span>
          <span className="text-[#8b949e]">:</span>
          <span className="text-[#79c0ff]">~</span>
          <span className="text-[#8b949e]">$</span> whoami
        </p>
        {about.whoami.map((line) => (
          <p key={line.key} className="whitespace-pre-wrap break-words">
            <span className="inline-block w-[88px] text-[#8b949e]">{line.key}</span>
            <span className={line.key === "status" ? "text-[#e3b341]" : ""}>{line.value}</span>
          </p>
        ))}
        <p className="mt-1">
          <span className="text-[#56d364]">jestin@portfolio</span>
          <span className="text-[#8b949e]">:</span>
          <span className="text-[#79c0ff]">~</span>
          <span className="text-[#8b949e]">$</span> cat about.txt
        </p>
      </div>
    </div>
  );
}
