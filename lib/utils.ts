

export const getAge = (dateString: string) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const formatDICOMDate = (dateString: string) => {
    console.log("Date String: "+dateString);
    var date = new Date(dateString);
    console.log("Date: "+ date);

    console.log("Month: "+date.getMonth());
    console.log("Year: "+date.getFullYear());
    var day = date.getDate().toString().padStart(2,"0");
    var month = (date.getMonth()+1).toString().padStart(2,"0");
    var year = date.getFullYear().toString().substring(2);
    var dicomDate = day+month+year;
    console.log("Formatted Date: "+ dicomDate);
    return dicomDate
}

export const toJSON = (param: any): any => {

    return JSON.stringify(
        param,
        (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );

}