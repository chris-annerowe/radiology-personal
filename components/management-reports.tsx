'use client'
import { Button, Datepicker, Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";


export default function ManagementReports(){
  const [reportType, setReportType] = useState('');  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  const handleReportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(e.target.value);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const login = async () => {
    const username = process.env.NEXT_PUBLIC_JWT_USER;
    const password = process.env.NEXT_PUBLIC_JWT_PASS;

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) throw new Error("Login failed");
  
      const data = await response.json(); // { token: "..." }
      localStorage.setItem("jwtToken", data.token); 
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  useEffect(()=>{
    login()
  },[])
  
  const handleReport = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // You can now use reportType and selectedDate here
        console.log('Report Type:', reportType);
        console.log('Selected Date:', selectedDate);

        const token = localStorage.getItem("jwtToken")
        const username = 'user'; // TODO: get from local storage or wherever logged in user is stored

        let queryParams = new URLSearchParams({ name: reportType, user: username });

        switch(reportType){
            case 'dailySales':
                console.log("Daily")
                const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : ''; // YYYY-MM-DD
                queryParams.append("date", formattedDate);
                break;
            case 'monthlyRev':
              queryParams.append("startDate", selectedDate);
                break;
            default:
                console.log("No report chosen")
        }

        const response = await fetch(`${baseUrl}/reports/view?${queryParams.toString()}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });  
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
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