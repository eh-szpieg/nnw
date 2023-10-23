function label(key){
    switch (key) {
        case "personalDetails":
            return 'Imie i nazwisko';
        case "accountNumber":
            return 'Numer konta bankowego';
        case "accidentDate":
            return 'Data zdarzenia';
        case "ICD10Code":
            return 'Kod ICD';
        case "adressData":
            return "Adres";
        case "description":
            return 'Rozpoznanie';
        case "alcohol":
            return 'Czy Klient był pod wpływem alkoholu?';
        case "policyNumber":
            return 'Numer polisy';    
        case "dateFrom":
            return 'Data rozpoczęcia ochrony';  
        case "dateTo":
            return 'Data zakończenia ochrony';  
        case "ubeczpieczony":
            return 'Dane ubezpieczonego';
        case "ubezpieczony":
            return 'Dane ubezpieczonego';
        case "ubezpieczajacy":
            return 'Dane ubezpieczającego';  
        case "produkt":
            return 'Produkt';  
        case "policyNumber":
            return 'Numer polisy';  
        case "coveragePeriod":
            return 'Okres ubezpieczenia';
        case "peselNumber":
            return 'PESEL';  
        default:
            return 'Nieznany';
    }
}
export default label;