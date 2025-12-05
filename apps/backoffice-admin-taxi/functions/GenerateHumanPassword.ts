export default function GenerateHumanPassword(length: number = 8): string {
    const chars = "ABCDEFabcdef23456789@$!%*?&";
    // const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789(@$!%*?&)";
    // Removed ambiguous chars: 0 O I l 1

    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
};