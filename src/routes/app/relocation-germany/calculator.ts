

export async function fetchConvertionRate(): Promise<number> {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/9ef965b573df66e9a4da2d12/pair/EUR/INR`);
    const rate = await response.json();
    return rate.conversion_rate;
}

export async function fetchTax(salary: number): Promise<string> {
    const taxResponse = await fetch("https://www.arbeitnow.com/api/tools/salary-calculator/germany", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-csrf-token": "",
                "x-requested-with": "XMLHttpRequest",
                "Referer": "https://www.arbeitnow.com/tools/salary-calculator/germany",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `gross_salary=${salary}&salary_period=year&health_insurance_type=public&private_health_insurance_contribution=0&tax_class=1&state_code=BW&part_of_church=0&locale=en`,
            "method": "POST"
        });
    return await taxResponse.text();
}

export function parseDeductions(taxBreakDown: string) {
    let ele = document.createElement('html');
    ele.innerHTML = taxBreakDown;
    const deductionList = ele.getElementsByClassName('underline-offset-4');
    const deduction = deductionList[deductionList.length - 1].innerHTML.substring(0, deductionList[deductionList.length - 1].innerHTML.length - 2);
    return parseFloat(deduction.replace(/\./g, '').replace(',', '.'));
} 