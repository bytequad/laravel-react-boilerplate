export function getTwoInitials(name: string): string {
    // Remove extra spaces and convert the name to uppercase
    const words = name.trim().toUpperCase().split(/\s+/);

    let initials: string;

    if (words.length === 1) {
        // If only one word, use the first and last character
        const singleWord = words[0];
        initials = (singleWord[0] || '') + (singleWord.slice(-1) || '');
    } else {
        // Extract the first letter of the first two words
        initials = words
            .slice(0, 2)
            .map((word) => word[0] || '')
            .join('');
    }

    // Ensure exactly two characters by padding with 'X' if necessary
    return (initials + 'XX').substring(0, 2);
}

export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number,
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}
