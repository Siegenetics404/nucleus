export default function WebhookComponent() {
    return (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b border-[#1E1E26] px-4">
                <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-wider text-[#6B6B76] uppercase">Webhook</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{/* blank for now */}</div>
        </div>
    );
}
