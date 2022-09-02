interface SeedEntry {
    description: string;
    status: string;
    createdAt: number
}

interface SeedData {
    entries: SeedEntry[];
}


export const seedData: SeedData = {
    entries: [
        {
            description: "Pendiente: Duis qui irure consectetur proident consequat eu proident velit anim minim ad laborum id reprehenderit.",
            status: "pending",
            createdAt: Date.now(),
        },
        {
            description: "En progreso: Mollit adipisicing fugiat ad irure ut.",
            status: "in-progress",
            createdAt: Date.now() - 100000,
        },
        {
            description: "Finalizada: Pariatur reprehenderit cupidatat laboris esse adipisicing esse ullamco quis elit amet exercitation exercitation.",
            status: "finished",
            createdAt: Date.now() - 1000000,
        },
    ]
}