// Utility functions to replace scaffold-stark utilities

export const feltToHex = (felt: bigint | string | number): string => {
    if (typeof felt === 'string') {
        return felt.startsWith('0x') ? felt : `0x${felt}`;
    }
    return `0x${felt.toString(16)}`;
};

export const addAddressPadding = (address: string): string => {
    if (!address) return address;
    if (address.startsWith('0x')) {
        return address.padEnd(66, '0');
    }
    return `0x${address.padStart(64, '0')}`;
};