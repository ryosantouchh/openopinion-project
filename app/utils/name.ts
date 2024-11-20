export function obscureName(name: string): string {
    if (name.length <= 32) {
        // If the name is 10 characters or less, return it as is
        return name
    } else {
        // Get the first 5 characters
        const first_part = name.slice(0, 5)
        // Get the last 5 characters
        const last_part = name.slice(-5)
        // Calculate the number of asterisks needed
        const middle_part = Array(name.length - 32 + 1).join("*")
        // Concatenate the parts
        return first_part + middle_part + last_part
    }
}

export function getImageUrl(address: string): string {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=/${address}`
}