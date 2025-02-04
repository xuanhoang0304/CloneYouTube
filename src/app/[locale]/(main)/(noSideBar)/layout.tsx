export default function NoSideBarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="flex gap-x-8 h-[calc(100%-56px)]">{children}</div>;
}
