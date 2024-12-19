type Role = {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    display_name: string | null;
    is_active: number;
    description: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type RolesResponse = {
    current_page: number;
    data: Role[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};
