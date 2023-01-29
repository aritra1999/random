export function getListItemFromCountryLocal(countryCode: string): string {
    return `${getFlagEmoji(countryCode)}  ${getRegionName(countryCode)}(${countryCode})`;
}

function getFlagEmoji(countryCode: string) {
    return countryCode.substring(0,2).toUpperCase().replace(/./g, (char: string) => 
        String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

function getRegionName(countryCode: string) {
    return new Intl.DisplayNames(['en'], {type: 'region'}).of(countryCode.slice(0, 2));
}

export function roundOff(amount: number): number {
    return Math.round(amount * 100) / 100;
}

export function getCountryCurrencySymbol (currency: string) {
    return (0).toLocaleString(
        'en-US',
        {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    ).replace(/\d/g, '').trim()
}