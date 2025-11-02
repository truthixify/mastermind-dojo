import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getActiveVariant(variant: Record<string, any>): string | undefined {
    return Object.keys(variant).find(key => variant[key] !== undefined)
}

export function contractAddressToHex(addressValue: any): `0x${string}` {
    if (!addressValue) return '0x0' as `0x${string}`;

    let bigIntValue: bigint;

    // Handle different input types
    if (typeof addressValue === 'bigint') {
        bigIntValue = addressValue;
    } else if (typeof addressValue === 'number') {
        bigIntValue = BigInt(addressValue);
    } else if (typeof addressValue === 'string') {
        // If it's already a hex string, return as is (with proper formatting)
        if (addressValue.startsWith('0x')) {
            return addressValue?.toLowerCase().padStart(66, '0') as `0x${string}`; // Ensure 64 chars after 0x
        }
        // If it's a decimal string, convert to BigInt
        bigIntValue = BigInt(addressValue);
    } else {
        // Handle objects that might have toString method or valueOf
        bigIntValue = BigInt(addressValue.toString());
    }

    // Convert to hex string
    let hexString = bigIntValue.toString(16);

    // Pad to 64 characters (32 bytes) and add 0x prefix
    const paddedHex = '0x' + hexString.padStart(64, '0');

    return paddedHex as `0x${string}`;
}

export const shortenAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}