const CRYPTING_DATA_KEY = "CryptoData";
const LAST_CALL_DATE_KEY = "LastCallDate";

export function GetCryptoFromLocalStorage() {
    var lastObject = localStorage.getItem(CRYPTING_DATA_KEY);
    var data: any = [];
    if (lastObject !== null) data = JSON.parse(lastObject!);

    lastObject = localStorage.getItem(LAST_CALL_DATE_KEY);
    var date: Date = new Date(0);
    if (lastObject !== null) date = new Date(Date.parse(lastObject!));

    return {
        arr: data,
        date: date
    };
}

export function SaveCrypto(newCrypto: any[]) {
    localStorage.setItem(CRYPTING_DATA_KEY, JSON.stringify(newCrypto));
    localStorage.setItem(LAST_CALL_DATE_KEY, JSON.stringify(new Date()));
}