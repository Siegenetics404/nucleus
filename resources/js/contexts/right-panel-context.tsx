import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface RightPanelContextValue {
    content: ReactNode | null;
    setContent: (content: ReactNode | null) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const RightPanelContext = createContext<RightPanelContextValue | null>(null);

export function RightPanelProvider({ children }: { children: ReactNode }) {
    const [content, setContent] = useState<ReactNode | null>(null);
    const [open, setOpen] = useState(false);

    return <RightPanelContext.Provider value={{ content, setContent, open, setOpen }}>{children}</RightPanelContext.Provider>;
}

function useRightPanelContext() {
    const ctx = useContext(RightPanelContext);
    if (!ctx) throw new Error('useRightPanelContext must be used within RightPanelProvider');
    return ctx;
}

// Pages call this to register what shows in the panel.
// Pass `null` (or just don't call it) to have no panel/tab on that page.
export function useRightPanel(content: ReactNode | null) {
    const { setContent } = useRightPanelContext();
    useEffect(() => {
        setContent(content);
        return () => setContent(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);
}

export { useRightPanelContext };
