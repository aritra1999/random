import { countryCurrencyLocales } from "./countryCurrencyLocals";

export function buildCountryCurrencyLocaleList(input: string): string[] {
	return countryCurrencyLocales.filter((str) => str.indexOf(input) !== -1).slice(0, 10);
}

export function getListItemFromCountryLocal(countryCode: string): string {
    return `${getFlagEmoji(countryCode)} ${getRegionName(countryCode)}(${countryCode})`;
}

function getFlagEmoji(countryCode: string) {
    return countryCode.substring(0,2).toUpperCase().replace(/./g, (char: string) => 
        String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

function getRegionName(countryCode: string) {
    return new Intl.DisplayNames(['en'], {type: 'region'}).of(countryCode.slice(0, 2));
}
