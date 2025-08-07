'use client'
import { Button, Datepicker, Label, Select } from "flowbite-react";
import { useState } from "react";


export default function ManagementReports(){
  const [reportType, setReportType] = useState('');  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleReportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(e.target.value);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  
  const handleReport = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // You can now use reportType and selectedDate here
        console.log('Report Type:', reportType);
        console.log('Selected Date:', selectedDate);

        //case selection to redirect to report based on which report selected. Use html2pdf to allow download
        switch(reportType){
            case 'dailySales':
                console.log("Daily")
                const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : ''; // YYYY-MM-DD
                window.location.href=`/reports/dailySales?date=${formattedDate}`;
                break;
            case 'monthlyRev':
                window.location.href='/reports/monthlyRevenue'
                break;
            default:
                console.log("No report chosen")
        }
    }

    return(
        <>
            <form onSubmit={handleReport}>
                <div className="mb-2 block">
                    <Label htmlFor="manageReports" value="Management Reports" />
                </div>

                <Select
                    id="manageReports"
                    name="manageReports"
                    defaultValue=""
                    onChange={handleReportChange}
                >
                    <option value=""> </option>
                    <option value="monthlyRev">Total Monthly Revenue</option>
                    <option value="dailySales">Daily Sales</option>
                    <option value="orders">Detailed Orders</option>
                </Select>

                {reportType === 'dailySales' && (
                    <>
                        <div className="mb-2 mt-3 block">
                            <Label htmlFor="reportDate" value="Select Date" />
                        </div>
                    
                    <Datepicker
                        id="reportDate"
                        name="reportDate"
                        maxDate={new Date()}
                        size={8}
                        onSelectedDateChanged={handleDateChange}
                        />
                    </>
                )}

                <div>
                    <Button className="mt-10" type="submit">
                    View
                    </Button>
                </div>
            </form>

        </>
    )
}