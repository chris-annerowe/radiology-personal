import DailySalesTable from "@/components/reports/daily-sales-table";


export default function DailySalesReport({
    searchParams,
}: {
    searchParams: { [key: string]: string | null };
}){
    const date = searchParams['date'];
    
    return (
        <DailySalesTable date={date}/>
    )   
    
}